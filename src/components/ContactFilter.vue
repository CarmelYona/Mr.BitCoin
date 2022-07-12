<template>
  <div class="contact-filter">
    <input
      @input="filter"
      v-model="filterBy.name"
      type="text"
      placeholder="Search Contact"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: { name: "" },
    };
  },
  methods:{
    filter(){
        this.$emit('filter',this.filterBy)
        console.log(this.filterBy)
        console.log('yes')
    }
  }
};
</script>

<style lang="scss">
.contact-filter {
  padding: 10px;
  background-color: rgb(28, 28, 28);
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
</style>