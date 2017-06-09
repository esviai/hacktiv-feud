<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
    <!--<survey v-bind:question="question"></survey>-->
    <login :isLogin="isLogin" :user=user></login>
  </div>
</template>

<script>

import Survey from './components/Survey'
import Login from './components/Login'

export default {
  name: 'app',
  components: {
    Survey,
    Login
  },
  data: {
    question: {},
    user: {},
    isLogin: false
  },
  methods: {
    getData: function () {
      this.question = {
        content: '1 apakah ?',
        options: [1, 2, 3, 4, 5]
      }
    }
  },
  created: function () {
    this.getData()
  }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
