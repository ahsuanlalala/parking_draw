<template>
  <v-app>
    <v-main class="grey lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
* {
  font-family: Microsoft JhengHei, Helvetica, Arial, sans-serif;
}
</style>
