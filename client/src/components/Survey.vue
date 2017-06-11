<template>
  <div class="container">

    <!-- Nav Bar Sign Out -->

    <div style='width: 100%; background-color: white; position: fixed; top: -2px; z-index: 5000; right: 0px;'>
      <nav class='nav container' style='max-width: 1000px'>
        <div class='nav-left'>
          <a class='nav-item'>
              <img src='http://i.imgur.com/NYfFAFr.png' alt='Hacktiv8 100 logo'>
            </a>
        </div>
        <p class="nav-item">Hai, yang di sana</p>
        <div class='nav-item'>
          <div class='field is-grouped'>
            <p class='control'>
              <a class='button is-warning' v-on:click='signout'>
                Sign Out
              </a>
            </p>
          </div>
        </div>
      </nav>
    </div>

    <section class="hero">
      <div class="hero-body">
        <div class="columns">
          <!-- <div class="column is-one-third">
            <figure class="image"><img src="http://i.imgur.com/NYfFAFr.png" alt=""></figure>
          </div> -->
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
        <a @click="next" class="button is-primary is-large">Play On!</a>
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
    },
    next: function () {
      this.$emit('next')
    },
    signout: function () {
      localStorage.clear()
      this.$emit('logout')
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
