<template>
  <div class="home">
    <navbar></navbar>
    <h1>This is home</h1>
    <!-- <h1>Premier League Live Scores:</h1>
    <div v-for="competition in competitions">
      <liveScores :liveScores="liveScores"></liveScores> -->
      <h1>Premier League Teams:</h1>
      <div v-for = "team in teams">
        <h3>{{team.name}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import liveScores from './LiveScores'
  import navbar from './Navbar'
  export default {
    name: 'Home',
    props: ['liveScores'],
    mounted() {
      this.$store.dispatch('getCompetitions')
      this.$store.dispatch('getTeams')
    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      competitions() {
        return this.$store.state.competitions
      },
      teams(){
        return this.$store.state.plTeams
      },
      date(){
        return this.$store.state.date
      }
    },
    components: {
      liveScores,
      navbar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>