<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
    <survey v-if="isLogin" v-bind:question="question" v-bind:choice="choice" v-on:choose="setAnswer"></survey>
    <!--<login v-else :isLogin="isLogin" :user=user></login>-->

  </div>
</template>

<script>

import Survey from './components/Survey'
// import Login from './components/Login'
import axios from 'axios'
import firebase from 'firebase'

export default {
  name: 'app',
  components: {
    Survey
    // Login
  },
  data () {
    return {
      questions: [],
      question: {},
      choice: 0,
      user: {},
      isLogin: true
    }
  },
  methods: {
    configFirebase: function () {
      var config = {
        apiKey: 'AIzaSyAzjSc2oQZkhQrCimqJYhwSpp9ZkC0O8DY',
        authDomain: 'hacktiv-feud.firebaseapp.com',
        databaseURL: 'https://hacktiv-feud.firebaseio.com',
        projectId: 'hacktiv-feud',
        storageBucket: 'hacktiv-feud.appspot.com',
        messagingSenderId: '324846643222'
      }
      firebase.initializeApp(config)
    },
    getData: function () {
      axios.get(`http://localhost:3000/api/questions`)
        .then((response) => {
          console.log(response)
          this.questions = response.data
          this.question = this.questions[1]
          console.log(this.question)
        })
    },
    setAnswer: function (choice) {
      var self = this
      this.choice = this.question.options.indexOf(choice)
      console.log(this.choice)
      firebase.database().ref(`hacktivfeud/${self.question._id}/result/${choice}/survey`).once('value')
        .then(function (data) {
          firebase.database().ref(`hacktivfeud/${self.question._id}/result/${choice}`).update({survey: data.val() + 1})
        })
        .catch(function () {
          firebase.database().ref(`hacktivfeud/${self.question._id}/result/${choice}`).set({
            survey: 1,
            game: 0
          })
        })
    }
  },
  created: function () {
    this.getData()
    this.configFirebase()
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
