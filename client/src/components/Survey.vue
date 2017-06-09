<template>
  <div class="survey">
    <div class="kiri">
      <h1>{{msg}}</h1>
      <div class="kotak-pertanyaan">
        <form class="" method="post">
          <label for="">{{question.content}}</label><br>
          <span v-for="choice in question.options" class="">
            <input type="radio" v-bind:value="choice">{{choice}}
          </span>
          <button type="submit" @click="next()">next</button>
        </form>
      </div>
    </div>
    <div class="kanan">
      <h1>ranking</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: ['question'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      index: 0
    }
  },
  methods: {
    next () {
      this.$emit('')
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
