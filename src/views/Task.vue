<template>
  <div class="home">
    <h1>Tasks:</h1>
    <h5>{{ contractAddress }}</h5>
    <div>
        <h3>Task: {{ task.url }}</h3>
        <p>Value: {{ task.value }} WEI</p>
        <p>Is solved: {{ task.isSolved }}</p>
        <p>Is in voting phase: {{ task.isInVotingPahse }}</p>
        <p>Asker: {{ task.asker }}</p>
    </div>
    <input type="text" v-model="solutionUrl" placeholder="Solution Url">
    <button v-on:click="solveTask">Solve Task</button>
  </div>
</template>

<script>
import Web3 from "web3";
import { ABI } from "@/constants/contract.js";

export default {
  name: "Tasks",
  components: {},
  data() {
    return {
      contractAddress: null,
      contract: null,
      task: {'url':'Loading...'},
      solutionUrl: "",
    };
  },
  created: async function () {
    this.contractAddress = this.$route.params.contractAddress;
    this.taskId = this.$route.params.taskId;

    this.loadWeb3();
    this.contract = new window.web3.eth.Contract(ABI, this.contractAddress);

    this.task = await this.getTaskById(this.taskId);
    console.log(this.task);

    this.validatingFee = await this.contract.methods.VALIDATING_FEE().call();

    console.log(this.validatingFee);
    window.web3.eth.defaultAccount = window.web3.eth.accounts.givenProvider.selectedAddress;
  },
  methods: {
    loadWeb3: async function () {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
      }
    },
    getTaskById: async function (id) {
      return await this.contract.methods.tasks(id).call();
    },
    solveTask: async function () {
      this.contract.methods.solveTask(this.taskId, this.solutionUrl).send({
        from: window.web3.eth.defaultAccount,
        value: this.validatingFee,
      });
    },
  },
};
</script>
