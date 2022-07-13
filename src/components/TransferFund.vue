<template>
  <div v-if="user" class="transfer-container">
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
import { utilService } from "../services/util.service";

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

  methods: {
    onTransfer() {
      if (this.user.coins > 0 && this.user.coins > this.coins) {
        this.$store.dispatch({ type: "transferCoins", coins: this.coins });

        this.addMove("approve", this.coins, this.contact);

        eventBus.emit("user-msg", {
          txt: `You Transfered to ${this.contact.name} ${this.coins} coins `,
          type: "success",
        });
      } else {
        this.addMove("faile", this.coins, this.contact);

        eventBus.emit("user-msg", {
          txt: `You don't have enough coins`,
          type: "fail",
        });
      }
      this.coins = null;
    },
    addMove(status, coins, contact) {
      const timeString = new Date().toLocaleTimeString();
      const dateString = new Date().toLocaleDateString();
      const move = {
        coins,
        to: contact.name,
        contactId: contact._id,
        status,
        date: dateString + " | " + timeString,
        _id: utilService.makeId(),
      };
      this.$store.dispatch({ type: "addMove", move });
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