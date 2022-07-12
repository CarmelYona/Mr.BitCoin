<template>
  <div class="transfer-container">
    <form class="transfer-wrapper" @submit.prevent="onTransfer">
      <input
        :placeholder="'Transfer to ' + contact.name"
        v-model="coins"
        type="text"
      />
      <button>Transfer</button>
    </form>
  </div>
</template>

<script>
import { eventBus } from "../services/eventBus.service";

export default {
  data() {
    return {
      coins: null,
    };
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
  created() {},
  methods: {
    onTransfer() {
      if (this.user.coins > 0 && this.user.coins > this.coins) {
        this.$store.dispatch({ type: "transferCoins", coins: this.coins });
        eventBus.emit("user-msg", {
          txt: `You Transfered to ${this.contact.name} ${this.coins} coins `,
          type: "success",
        });
      } else {
        eventBus.emit("user-msg", {
          txt: `You don't have enough coins`,
          type: "fail",
        });
      }
      this.coins = null;
    },
  },
};
</script>

<style lang="scss">
.transfer-container {
  .transfer-wrapper {
    input {
      background-color: rgb(93, 93, 93);
      color: rgb(212, 212, 212);
      padding: 5px;
      border: none;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      font-size: 16px;
      font-family: sans-serif;
      margin-top: 10px;
      &:focus {
        outline: none;
      }
    }
    button {
      margin-top: 10px;
      background-color: rgb(93, 93, 93);
      color: rgb(212, 212, 212);
      padding: 5px;
      border: none;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      font-size: 16px;
      font-family: sans-serif;
      cursor: pointer;
    }
  }
}
</style>