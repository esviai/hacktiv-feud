<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
    <survey v-bind:question="question" v-bind:choice="choice" v-on:choose="setAnswer"></survey>
  </div>
</template>

<script>

import Survey from './components/Survey'
export default {
  name: 'app',
  components: {
    Survey
  },
  data () {
    return {
      question: {},
      choice: 0
    }
  },
  methods: {
    getData: function () {
      this.question = {
        content: '1 apakah ?',
        options: [1, 2, 3, 4, 5]
      }
    },
    setAnswer: function (choice) {
      this.choice = choice
    }
  },
  created: function () {
    this.getData()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
