<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-one-third">
            <figure class="image"><img src="http://i.imgur.com/NYfFAFr.png" alt=""></figure>
          </div>
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">{{question.content}}</h1>
        <br>
        <div v-for="option in question.options">
          <br>
          <a class="button is-primary is-large">{{option}}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'survey',
  props: ['question', 'choice'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      choiceData: this.choice,
      question: []
    }
  },
  methods: {
    choose: function () {
      this.$emit('choose', this.choiceData)
    },
    getQuestions: function () {
      axios.get(`http://localhost:3000/api/questions`)
        .then ((response) => {
          this.question = response.data
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
