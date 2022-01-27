<template>
  <div class="homeloading" >
    <img src="../assets/loading.gif" alt="" />
  </div>
</template>

<style lang="scss">
    .homeloading {
  background: rgba(white, 0.8);
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    opacity: 0.9;
  }
}
</style>