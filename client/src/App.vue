<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
    <!-- <survey v-if="isLogin" v-bind:question="question" v-bind:choice="choice" v-on:choose="setAnswer"></survey> -->
    <game v-if="isLogin" v-bind:question="question" v-bind:choice="choice" v-bind:result="result" v-on:choose="gameOn"></game>
    <login v-else :isLogin="isLogin" :user="user"
    v-on:loginManual="prosesLogin" v-on:signUpBaru="prosesSignUp"></login>
  </div>
</template>

<script>
import Survey from './components/Survey'
import Game from './components/Game'
// import Login from './components/Login'
import axios from 'axios'
import firebase from 'firebase'

export default {
  name: 'app',
  components: {
    Survey,
    Game
    // Login
  },
  data () {
    return {
      questions: [],
      question: {},
      choice: 0,
      user: {},
      isLogin: true,
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
          console.log(response)
          self.questions = response.data
          firebase.database().ref(`hacktivfeud/question_idx/index`).once('value')
            .then(function (data) {
              console.log('asdskjadjkasdkjad', data.val())
              firebase.database().ref(`hacktivfeud/question_idx`).update({index: data.val() + 1})
            })
          firebase.database().ref(`hacktivfeud/question_idx/index`).on('value', function (indexData) {
            console.log('AAAAAAAAAA')
            console.log(indexData.val())
            self.question = self.questions[indexData.val() % self.questions.length]
            console.log(self.question)
          })
        })
    },
    setAnswer: function (choice) {
      this.choice = this.question.options.indexOf(choice)
      var self = this
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
    },
    gameOn: function (choice) {
      var self = this
      firebase.database().ref(`hacktivfeud/${this.question._id}/result`).on('value', function (data) {
        // var arr1 = Object.keys(data.val()).map((val) => { return val })
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
      })
    },
    prosesLogin: function (obj) {
      alert(obj.username + obj.password + '\njangan lupa localStorage.isLoginnya diganti juga')
    },
    prosesSignUp: function (obj) {
      alert(JSON.stringify(obj))
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
