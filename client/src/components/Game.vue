<template lang="html">
  <div>
    <question :hardcoded = 'hardcoded'></question>
    <options :hardcoded = 'hardcoded'></options>
  </div>
</template>

<script>
import Question from './game/Question'
import Options from './game/Options'

const initialData = () => {
  return {
    hardcoded: [
      {
        content: 'Makanan paling favorit untuk sarapan ?',
        options: ['Bubur Ayam', 'Roti', 'Gorengan', 'Ketoprak', 'Nasi Uduk'],
        result: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      }, {
        content: 'Tempat favorit untuk liburan akhir pekan ?',
        options: ['Rumah', 'Mall', 'Kafe', 'Tempat Wisata', 'Lainnya'],
        result: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      }, {
        content: 'Menu warteg paling favorit ?',
        options: ['Nasi sayur asem', 'Nasi sayur lodeh', 'Nasi empal', 'Nasi semur jengkol', 'Nasi campur'],
        result: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      }, {
        content: 'Yang dilakukan ketika stack?',
        options: ['Cari di Stackoverflow', 'Tanya temen', 'Istirahat', 'Lainnya'],
        result: [[0, 0], [0, 0], [0, 0], [0, 0]]
      }
    ]
  }
}
export default {
  components: {
    Question,
    Options
  },
  data: initialData
}

</script>

<style lang="css">
</style>
