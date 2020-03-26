<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <history-card v-for="cart in history" :key="cart.id" :cart="cart"></history-card>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import HistoryCard from '../components/HistoryCard'
export default {
  computed: {
    history () {
      return this.$store.state.history
    }
  },
  components: {
    HistoryCard
  },
  created () {
    this.$store.dispatch('getHistory')
  }
}

</script>

<style>

</style>
