<template>
  <Transition name="fade">
    <div v-if="msg.txt" :class="msgClass" class="user-msg">
      <p>{{ msg.txt }}</p>
    </div>
  </Transition>
</template>

<script>
import { eventBus } from "../services/eventBus.service";
export default {
  data() {
    return {
      msg: { txt: "" },
    };
  },
  methods: {
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => (this.msg = ""), 2000);
    },
  },
  computed: {
    msgClass() {
      return { [this.msg.type]: true };
    },
  },
  created() {
    this.unsub = eventBus.on("user-msg", (msg) => this.showMsg(msg));
  },
  unmounted() {
    this.unsub();
  },
};
</script>

<style lang="scss">
.user-msg {
  position: absolute;
  inset: 88px 40px auto auto;

  min-width: 200px;
  height: 40px;
  background-color: rgba(83, 99, 45, 0.782);
  color: beige;
  border-radius: 10px;
  padding: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(150%);
}

.success {
  background-color: rgb(79, 122, 79);
}
.fail {
  background-color: rgb(177, 94, 94);
}
</style>