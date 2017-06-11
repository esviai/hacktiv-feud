<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
    <div v-if="isLogin">
      <survey id="survey" style="" v-bind:question="question" v-bind:choice="choice" v-on:next="next" v-on:choose="setAnswer"></survey>
      <game id="game" style="display:none" v-bind:question="question" v-bind:choice="choice" v-bind:result="result" v-on:choose="gameOn"></game>
    </div>
    <login v-else :user="user" v-on:loginManual="prosesLogin" v-on:signUpBaru="prosesSignUp"></login>
  </div>
</template>

<script>
import Survey from './components/Survey'
import Login from './components/Login'
import Game from './components/Game'
import axios from 'axios'
import firebase from 'firebase'
// import jwtDecode from 'jwt-decode'

export default {
  name: 'app',
  components: {
    Survey,
    Game,
    Login
  },
  data () {
    return {
      questions: [],
      question: {},
      choice: 0,
      user: {},
      isLogin: false,
      result: {}
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
      var self = this
      axios.get(`http://localhost:3000/api/questions`)
        .then((response) => {
          self.questions = response.data
          firebase.database().ref(`hacktivfeud/question_idx/index`).once('value')
            .then(function (data) {
              firebase.database().ref(`hacktivfeud/question_idx`).update({index: data.val() + 1})
            })
          firebase.database().ref(`hacktivfeud/question_idx/index`).on('value', function (indexData) {
            self.question = self.questions[indexData.val() % self.questions.length]
          })
        })
    },
    setAnswer: function (choice) {
      this.choice = this.question.options.indexOf(choice)
      var self = this
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
    },
    gameOn: function (choice) {
      var self = this
      firebase.database().ref(`hacktivfeud/${this.question._id}/result`).on('value', function (data) {
        var arr2 = []
        for (var key in data.val()) {
          arr2.push(data.val()[key])
        }
        var arr3 = []
        for (let i = 0; i < arr2.length; i++) {
          arr3.push(arr2[i].survey)
        }
        var arr4 = []
        let red = arr3.reduce((total, num) => { return total + num })
        for (let i = 0; i < arr3.length; i++) {
          arr4.push(arr3[i] * 100 / red)
        }
        self.choice = self.question.options.indexOf(choice)
        self.result = arr4[self.choice]
        var playerId = 'sidik'// jwtDecode(window.localStorage.token)
        // console.log(playerId)
        firebase.database().ref(`hacktivfeud/player/${playerId}`).once('value')
          .then(function (data) {
            firebase.database().ref(`hacktivfeud/player/${playerId}`).update({score: data.val().score + self.result})
          })
          .catch(function () {
            firebase.database().ref(`hacktivfeud/player/${playerId}`).set({
              score: self.result
            })
          })
      })
    },
    prosesLogin: function (user) {
      var self = this
      axios.post('http://localhost:3000/signin', {username: user.username, password: user.password})
        .then((response) => {
          console.log(response.data)
          window.localStorage.token = response.data
          console.log('AAAAAAAAAAAAAAAA')
          console.log(self.isLogin)
          window.localStorage.isLogin = true
          window.location.href = 'http://localhost:8080/'
        })
        .catch((err) => {
          console.log(err)
          window.localStorage.isLogin = false
          window.location.href = 'http://localhost:8080/'
        })
    },
    prosesSignUp: function (user) {
      axios.post('http://localhost:3000/signup', {username: user.username, password: user.password, name: user.name, phone: user.phone, email: user.email})
        .then((response) => {
          console.log('response signup ', response)
          window.localStorage.isLogin = false
          window.location.href = 'http://localhost:8080/'
          location.reload()
        })
        .catch((err) => {
          console.log('err signup ', err)
          window.localStorage.isLogin = false
          window.location.href = 'http://localhost:8080/'
        })
    },
    next: function () {
      document.querySelector('#survey').setAttribute('style', 'display:none')
      document.querySelector('#game').setAttribute('style', '')
    },
    logout: function () {
      this.isLogin = false
    }
  },
  created: function () {
    this.getData()
    this.configFirebase()
    this.isLogin = localStorage.isLogin
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
