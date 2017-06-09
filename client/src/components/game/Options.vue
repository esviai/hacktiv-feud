<template lang="html">
  <div id="options">
    <div class="field">
      <ul v-for="options in question" class="control">
        <li v-for="option in options.options">
          <label class="radio">
            <input type="radio" name="option" :value="option" @click="choose(option)">
            {{option}}
          </label>
        </li>
      </ul>
    </div>
    <div class="field is-grouped">
      <p class="control">
        <button class="button is-primary" @click="choose(option)">Submit</button>
      </p>
      <p class="control">
        <button class="button is-link">Cancel</button>
      </p>
    </div>
  </div>

</template>

<script>
export default {
  props: ['question', 'choice'],
  methods: {
    choose: function (option) {
      this.$emit('choose', option)
    }
  }
}
</script>

<style lang="css">
</style>
