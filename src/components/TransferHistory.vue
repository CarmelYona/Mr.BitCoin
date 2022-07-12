<template>
  <article v-if="user" class="history-container margin-center">
    <h1>Moves History</h1>
    <div v-for="move in user.moves" :key="move._id">
      <div>
        <h3>To: {{ move.to }}</h3>
        <h4>{{ move.coins }}</h4>
        <h5><span>Status:</span>{{ move.status }}</h5>
        <h6>{{ move.date }}</h6>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.$store.dispatch({ type: "loadUser" });
    this.loadUser();
  },
  methods: {
    loadUser() {
      this.user = this.$store.getters.user;
    },
  },
  // props: {
  //   user: {
  //     type: Object,
  //     default: () => {},
  //   },
  // },
};
</script>

<style>
.history-container {
  background-color: rgb(48, 48, 48);
}
</style>