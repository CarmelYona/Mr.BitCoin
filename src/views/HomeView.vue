
<template>
  <div
    v-if="user && user.name"
    class="user-details flex column margin-center border-5px padding-10px"
  >
    <h2>Welcome {{ user.name }}</h2>
    <div class="user-balance">
      <h4>
        USD - <span> {{ user.coins }}</span>
      </h4>
      <h4>
        BTC - <span> {{ btcValue }}</span>
      </h4>
      <!-- <h5>{{ user.coins * btcValue }}</h5> -->
    </div>
    <button class="btn-logout padding-10px border-5px" @click="onLogout">
      Logout
    </button>
  </div>

  <div
    v-else
    class="sign-up-container flex column border-5px margin-center padding-10px"
  >
    <div class="bit-coin flex">₿</div>
    <p>Please enter your name:</p>
    <form class="sign-up-wrapper flex" @submit.prevent="onCreateUser">
      <input v-model="name" type="text" />
      <button>Sign Up</button>
    </form>
  </div>
</template>

<script>
import { bitcoinService } from "@/services/bitcoin.service.js";
export default {
  data() {
    return {
      name: "",
      btcValue: null,
    };
  },

  created() {
    this.$store.dispatch({ type: "loadUser" });
    if (this.user) {
      this.getBtcValue();
    }
    console.log(this.user);
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    onCreateUser() {
      this.$store.dispatch({ type: "signUp", name: this.name });
      this.getBtcValue();
    },
    async getBtcValue() {
      try {
        this.btcValue = await bitcoinService.getRate(this.user.coins);
      } catch (error) {
        console.log("Failed TO get btc value ", error);
      }
    },
    onLogout() {
      console.log("hi");
      this.$store.dispatch({ type: "logout" });
      this.name = null;
    },
  },
};
</script>

<style lang="scss">
.user-details {
  background-color: rgb(40, 40, 40);
  justify-content: center;
  align-items: center;

  .btn-logout {
    background-color: rgb(118, 58, 58);
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: rgb(94, 46, 46);
    }
  }
}

.sign-up-container {
  background-color: rgb(40, 40, 40);
  align-items: center;
  justify-content: center;

  .sign-up-wrapper {
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
  .bit-coin {
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    background-color: #feb236;
    margin-bottom: 10px;
  }
}
</style>