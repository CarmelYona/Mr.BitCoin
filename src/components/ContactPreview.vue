<template>
  <div>
    <h3>{{ contact.name }}</h3>
    <h5>{{ contact.phone }}</h5>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
</style>