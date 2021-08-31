<template>
  <div id="app">
    <loader></loader>

    <b-container class="text-center">
      <img alt="Allied logo" src="./assets/logo.png" style="max-width: 250px" />

      <list></list>
    </b-container>
  </div>
</template>

<script>
import Loader from "@/components/elements/Loader.vue";
import List from "@/components/List.vue";

export default {
  name: "App",
  components: {
    Loader,
    List
  },
  data() {
    return {};
  }
};
</script>
