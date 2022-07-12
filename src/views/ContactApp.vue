<template>
  <ContactFilter @filter="onFilter" />
  <div class="add-link">
    <RouterLink to="/contact/edit">Add a Contact</RouterLink>
  </div>
  <ContactList @remove-contact="removeContact" :contacts="contactsToShow" />
</template>

<script>
import ContactList from "@/components/ContactList.vue";
import ContactFilter from "@/components/ContactFilter.vue";
export default {
  data() {
    return {
      filterBy: { name: "" },
    };
  },
  methods: {
    removeContact(contactId) {
      this.$store.dispatch({ type: "removeContact", contactId });
    },
    onFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    contactsToShow() {
      const regex = new RegExp(this.filterBy.name, "i");
      return this.contacts.filter((contact) => regex.test(contact.name));
    },
    contacts() {
      return this.$store.getters.contacts;
    },
  },
  async created() {
    this.$store.dispatch({ type: "loadContacts" });
  },
  components: {
    ContactList,
    ContactFilter,
  },
};
</script>

<style>
a:hover {
  color: white;
}
.add-link {
  padding-left: 15px;

}
</style>