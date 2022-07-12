<template>
  <article v-if="movesToShow" class="history-container margin-center">
    <h1>Moves History</h1>
    <div v-for="move in movesToShow" :key="move._id">
      <div>
        <h3>To: {{ move.to }}</h3>
        <h4>{{ move.coins }}</h4>
        <h5><span>Status: </span>{{ move.status }}</h5>
        <h6>{{ move.date }}</h6>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  created() {
    this.$store.dispatch({ type: "loadUser" });
    if (this.user) {
      this.movesToShow();
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    movesToShow() {
      const movesToShow = this.user.moves.filter((move, idx) => {
        if (idx < 3) {
          return move;
        }
      });
      console.log("movesToShow", movesToShow);
      return movesToShow;
    },
  },
};
</script>

<style>
.history-container {
  background-color: rgb(48, 48, 48);
}
</style>