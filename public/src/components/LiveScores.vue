<template>
  <div class="liveScores">
    <navbar></navbar>
    <h2>This is Live Scores</h2>
    
<table class="table">
  <thead>
    <th scope="col">Home Team</th>
    <th scope="col">Away Team</th>
    <th scope="col">Score (Halftime / Full time)</th>
  </thead>
  <tbody v-for="match in currentMatchDay">
    <tr>
      <td>{{match.homeTeam.name}}</td> 
      <td>{{match.awayTeam.name}}</td>
      <td>{{match.score.halfTime.homeTeam}}-{{match.score.halfTime.awayTeam}} / {{match.score.fullTime.homeTeam}}-{{match.score.fullTime.awayTeam}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
  import navbar from './Navbar'
  import moment from 'moment'
  export default {
    name: 'LiveScores',
    props: ['liveScores'],
    mounted() {
      this.getCurrentMatches()
    },
    data() {
      return {
        date: {
          todayDate: '',
          tomorrowDate: ''
        },
      }
    },
    methods: {
      getCurrentMatches() {
        this.date.todayDate = moment().format('YYYY-MM-DD')
        this.date.tomorrowDate = moment().add(1, 'day').format('YYYY-MM-DD')
        this.$store.dispatch('getCurrentMatchDay', this.date);
      }
    },
    computed: {
      competition() {
        return this.$store.state.competitions
      },
      currentMatchDay() {
        return this.$store.state.todayMatches
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