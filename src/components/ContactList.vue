<template>
  <section class="contact-list">
    <TransitionGroup name="list">
      <article
        v-for="contact in contacts"
        :key="contact._id"
        class="contact-preview-container"
      >
        <div class="contact-wrapper">
          <RouterLink :to="`/contact/${contact._id}`">
            <contact-preview :contact="contact" />
          </RouterLink>

          <div class="action flex">
            <RouterLink
              :title="'Edit ' + contact.name"
              :to="`/contact/edit/${contact._id}`"
              ><img src="../assets/imgs/pen.png"
            /></RouterLink>
            <a
              :title="'Delete ' + contact.name"
              class="btn-delete"
              @click="removeContact(contact._id, contact.name)"
            >
              <img src="../assets/imgs/trash.png" />
            </a>
          </div>
        </div>
      </article>
    </TransitionGroup>
  </section>
</template>

<script>
import { eventBus } from "../services/eventBus.service";
import ContactPreview from "./ContactPreview.vue";
export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeContact(contactId, contactName) {
      this.$emit("remove-contact", contactId);
      eventBus.emit("user-msg", {
        txt: `${contactName} Deleted`,
        type: "success",
      });
    },
  },
  components: {
    ContactPreview,
  },
};
</script>

<style lang="scss">
.contact-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  background-color: rgb(26, 26, 26);
  padding: 10px;

  .contact-preview-container {
    background-color: rgb(31, 31, 31);
    padding: 10px;
    cursor: pointer;
    .contact-wrapper {
      display: flex;
      justify-content: space-between;
      .action {
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 10%;
        display: none;
        a {
          align-items: center;
          width: 50%;
          height: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 3px;
          padding: 5px;
          &:hover {
            background-color: rgb(102, 102, 101);
          }
        }
        .btn-delete {
          margin-left: 5px;
        }
      }
    }
    &:hover {
      .action {
        display: block;
        display: flex;
      }
    }
  }

  .list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
  .list-leave-active {
    position: absolute;
  }
}
</style>