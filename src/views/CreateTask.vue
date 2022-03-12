<template>
  <div class="home">
    <h5>{{ contractAddress }}</h5>
    <h1>Create Task:</h1>
    <div>
        <input type="text" v-model="url" placeholder="url">
        <input type="text" v-model="value" placeholder="value">
        <button v-on:click="createTask">Create Task</button>
    </div>
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
      url:"",
      value:"",
    };
  },
  created: async function () {
    this.contractAddress = this.$route.params.contractAddress;

    this.loadWeb3();
    this.contract = new window.web3.eth.Contract(ABI, this.contractAddress);
    window.web3.eth.defaultAccount = window.web3.eth.accounts.givenProvider.selectedAddress;
  },
  methods: {
    loadWeb3: async function () {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
      }
    },
    createTask: async function(){
      // alert('createTask');
      let tx = await this.contract.methods.createTask(this.url).send({from: window.web3.eth.defaultAccount, value: this.value});
      console.log(tx);
    },
    getTaskById: async function (id) {
      return await this.contract.methods.tasks(id).call();
    },
  },
};
</script>
