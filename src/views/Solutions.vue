<template>
  <div class="home">
    <h1>Tasks:</h1>
    <h5>{{ contractAddress }}</h5>
    <div v-for="solution in solutions" :key="solution">
        <p>Solution: {{ solution.url }}</p>
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
      solutions: [],
    };
  },
  created: async function () {
    this.contractAddress = this.$route.params.contractAddress;

    this.loadWeb3();
    this.contract = new window.web3.eth.Contract(ABI, this.contractAddress);

    for(let i = 0; i < 3; i++) {
        try {
            let task = await this.getSolutionById(i);
            console.log(i);
            console.log(task);
            this.solutions.push(task);
        } catch(e) {
            // console.log(e);
        }
    }
  },
  methods: {
    loadWeb3: async function () {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
      }
    },
    getSolutionById: async function (id) {
      return await this.contract.methods.solutions(id).call();
    },
  },
};
</script>
