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
      <div id="board" class="hero-body" style="">
        <h1 class="title">{{question.content}}</h1>
        <br>
        <div v-for="option in question.options">
          <br>
          <a @click="choose(option)" class="button is-primary is-large">{{option}}</a>
        </div>
      </div>
      <div id="thanks" class="title" style="display:none">
        <h1>Thanks for participating in our survey</h1>
        <h3>The game will start in a few minutes</h3>
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
      choiceData: this.choice
    }
  },
  methods: {
    choose: function (option) {
      this.$emit('choose', option)
      document.querySelector('#board').setAttribute('style', 'display:none')
      document.querySelector('#thanks').setAttribute('style', '')
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
