<template>
  <div>
    <div>
      <h1 v-if="contact._id">Contact Edit</h1>
      <h1 v-else>Add Contact</h1>
    </div>

    <div class="contact-edit flex column margin-center padding-10px border-5px">
      <form
        v-if="contact"
        @submit.prevent="save"
        class="contact-edit-form flex column padding-10px"
      >
        <input placeholder="Name" v-model="contact.name" type="text" />
        <input placeholder="Phone Number" v-model="contact.phone" type="tel" />
        <input placeholder="Email" v-model="contact.email" type="email" />
      </form>
      <div class="btns-container flex padding-10px">
        <button @click="removeContact(contact._id)" class="btn-delete">
          Delete
        </button>
        <button @click="save" class="btn-save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { contactService } from "@/services/contact.service";
export default {
  data() {
    return {
      contact: [],
    };
  },
  methods: {
    async save() {
      this.$store.dispatch({ type: "saveContact", contact: this.contact });
      await contactService.save(this.contact);
      this.$router.push("/contact");
    },
    async removeContact(contactId) {
      this.$store.dispatch({ type: "removeContact", contactId });
      this.$router.push("/contact");
    },
  },
  async created() {
    const _id = this.$route.params._id;
    if (!_id) {
      this.contact = await contactService.getEmptyContact();
      return;
    }
    this.contact = await contactService.getById(_id);
  },
};
</script>

<style lang="scss">
.contact-edit {
  background-color: rgb(48, 48, 48);
  align-items: center;
  justify-content: center;
  .contact-edit-form {
    gap: 10px;
    align-items: start;

    input {
      background-color: rgb(93, 93, 93);
      color: rgb(212, 212, 212);
      padding: 5px;
      border: none;
      border-radius: 3px;
      font-size: 16px;
      font-family: sans-serif;
    }
  }

  .btns-container {
    width: 40%;
    justify-content: space-evenly;
    align-items: center;
    button {
      font-size: 16px;
      align-self: end;
      border: none;
      border-radius: 3px;
      background-color: rgb(93, 93, 93);
      color: rgb(212, 212, 212);
      padding: 5px;
      cursor: pointer;
    }
    .btn-delete {
      background-color: rgb(118, 58, 58);
      &:hover {
        background-color: rgb(94, 46, 46);
      }
    }
    .btn-save {
      background-color: rgb(75, 118, 75);
      &:hover {
        background-color: rgb(43, 68, 43);
      }
    }
  }
}
</style>