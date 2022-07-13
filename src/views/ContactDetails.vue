<template>
  <div
    v-if="contact"
    class="contact-details flex column margin-center padding-10px border-5px"
  >
    <div class="contact-header flex">
      <button class="btn btn-back" @click="back">Back</button>
      <button class="btn btn-edit">
        <RouterLink :to="`/contact/edit/${contact._id}`">Edit</RouterLink>
      </button>
    </div>
    <div class="contact-wrapper flex column">
      <h1 class="contact-name">{{ contact.name }}</h1>
      <h3>{{ contact.phone }}</h3>
      <h4>{{ contact.email }}</h4>
      <div v-if="user"></div>
      <TransferFund :contact="contact" :user="user" />
    </div>
    <div class="transfer-history margin-center">
      <TransferHistory :user="user" />
    </div>
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service";
import TransferFund from "../components/TransferFund.vue";
import TransferHistory from "../components/TransferHistory.vue";
export default {
  data() {
    return {
      contact: null,
    };
  },
  methods: {
    back() {
      this.$router.push("/contact");
    },
  },
  async created() {
    const _id = this.$route.params._id;
    this.contact = await contactService.getById(_id);
    this.$store.dispatch({ type: "loadUser" });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components: { TransferFund, TransferHistory },
};
</script>

<style lang="scss">
.contact-details {
  background-color: rgb(48, 48, 48);
  align-items: center;
  justify-content: space-between;

  .contact-header {
    width: 100%;
    justify-content: space-between;
    padding: 10px;
    background-color: rgba(35, 33, 33, 0.407);
    border-bottom: 3px solid rgba(35, 33, 33, 0.407);
    .btn {
      background-color: rgb(93, 93, 93);
      color: rgb(212, 212, 212);
      padding: 5px;
      border: none;
      border-radius: 3px;
      font-size: 16px;
      font-family: sans-serif;
      cursor: pointer;
    }
  }

  .contact-wrapper {
    justify-content: center;
    align-items: center;
    padding: 0 0 40px 0;

    .contact-name {
      color: rgb(220, 110, 110);
    }
  }
  .transfer-history {
    width: 100%;
  }
}
</style>