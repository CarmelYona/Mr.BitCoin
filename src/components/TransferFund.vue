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
    contact: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.loadUser();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    loadUser() {
      this.$store.dispatch({ type: "loadUser" });
    },
    onTransfer() {
      if (this.user.coins > 0 && this.user.coins > this.coins) {
        this.$store.dispatch({ type: "transferCoins", coins: this.coins });

        this.addMove("approve", this.coins, this.contact.name);

        eventBus.emit("user-msg", {
          txt: `You Transfered to ${this.contact.name} ${this.coins} coins `,
          type: "success",
        });
      } else {
        this.addMove("faile", this.coins, this.contact.name);

        eventBus.emit("user-msg", {
          txt: `You don't have enough coins`,
          type: "fail",
        });
      }
      this.coins = null;
    },
    addMove(status, coins, contact) {
      // const createdAt = new Date()
      const move = {
        coins,
        to: contact,
        status,
        date: new Date(),
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