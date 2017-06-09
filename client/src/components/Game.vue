<template lang="html">
  <div>
    <question :question = 'question'></question>
    <options :question = 'question' @choose="setAnswer"></options>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import Question from './game/Question'
import Options from './game/Options'

const initialData = () => {
  return {
    questions: [],
    question: {},
    choice: 0,
    user: {},
    isLogin: true
  }
}

export default {
  components: {
    Question,
    Options
  },
  data: initialData,
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
    setAnswer: function (choice) {
      var self = this
      this.choice = this.question.options.indexOf(choice)
      console.log(this.choice)
      firebase.database().ref(`hacktivfeud/${self.question._id}/result/${choice}/game`).once('value')
        .then(function (data) {
          firebase.database().ref(`hacktivfeud/${self.question._id}/result/${choice}`).update({
            game: data.val() + 1
          })
        })
        .catch(function () {
          firebase.database().ref(`hacktivfeud/${self.question._id}/result/${choice}`)
            .set({
              game: 1
            })
        })
    },
    getData: function () {
      axios.get(`http://localhost:3000/api/questions`)
        .then((response) => {
          console.log(response)
          this.questions = response.data
          this.question = this.questions[1]
          console.log(this.question)
        })
    }
  },
  created: () => {
    this.getData()
    this.configFirebase()
  }
}
</script>

<style lang="css">
</style>
