<template>
  <article
    v-if="user"
    class="
      history-cards-container
      margin-center
      padding-10px
      border-5px
      flex
      column
    "
  >
    <div class="history-card-header">
      <h1>Moves History</h1>
    </div>
    <div
      class="history-card-body flex column"
      v-for="(move, index) in user.moves"
      :key="move._id"
    >
      <div
        v-if="index < 3"
        class="history-card-body-wrapper flex column border-5px padding-10px"
      >
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
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
.history-cards-container {
  background-color: rgb(48, 48, 48);
  justify-content: center;
  align-items: center;
  width: 100%;
  .history-card-header {
    text-align: center;
    width: 100%;
  }

  .history-card-body {
    width: 100%;
    .history-card-body-wrapper {
      background-color: rgb(78, 78, 78);
      border-bottom: 2px solid rgb(35, 35, 35);
      height: 30%;
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>