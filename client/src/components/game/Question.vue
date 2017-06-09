<template lang="html">
  <div>
    <p v-for="hardcoded in hardcoded">{{hardcoded.question}}</p>
  </div>
</template>

<script>
export default {
  props: ['hardcoded']
}
</script>

<style lang="css">
</style>
