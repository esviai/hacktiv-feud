<template lang="html">
  <div>
    <tr v-for="options in hardcoded">
      <td v-for="option in options.options">{{option}}</td>
    </tr>
  </div>
</template>

<script>
export default {
  props: ['hardcoded']
}
</script>

<style lang="css">
</style>
