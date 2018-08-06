<template>
  <div class="liveScores">
    <navbar></navbar>
    <h2>This is Live Scores</h2>
  </div>
</template>

<script>
  import navbar from './Navbar'
  export default {
    name: 'LiveScores',
    props: ['liveScores'],
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      competition() {
        return this.$store.state.competitions
      }
    },
    components: {
      navbar

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>