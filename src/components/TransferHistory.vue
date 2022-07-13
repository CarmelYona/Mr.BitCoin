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
      <h2>Moves History</h2>
    </div>
    <div
      class="history-card-body flex column"
      v-for="(move, index) in moves"
      :key="move._id"
    >
      <div
        v-if="index < 3"
        class="history-card-body-wrapper flex column border-5px padding-10px"
      >
        <h3>
          To: <span>{{ move.to }}</span>
        </h3>
        <h4>${{ move.coins }}</h4>
        <h5>
          Status: <span :class="move.status">{{ move.status }}</span>
        </h5>
        <h6>{{ move.date }}</h6>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  computed: {
    moves() {
      return this.user.moves.filter(
        (move) => move.contactId === this.contact._id
      );
    },
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    contact: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
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

      h3 {
        span {
          color: rgb(241, 241, 241);
        }
      }
      h4 {
        color: rgb(80, 202, 80);
      }
      h5 {
        span {
          font-size: 13px;
          font-weight: 700;
        }
      }
      .approve {
        color: rgb(29, 29, 95);
      }
      .faile {
        color: rgb(101, 33, 33);
      }
    }
  }
}
</style>