<template>
  <header class="app-header">
    <h1>Mr.BitCoin</h1>
    <nav class="nav-links-wrapper">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contact">Contacts</RouterLink>
      <RouterLink to="/statistics">Statistics</RouterLink>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
.app-header {
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: rgb(34, 34, 34);
  border-radius: 4px;
}
</style>