<template>
  <v-snackbar v-model="show" :timeout="5000">
    {{ word }}
  </v-snackbar>
</template>

<script>
export default {
  props: ["text"],
  data: () => ({
    show: false,
    word: "Default",
  }),
  created() {
    this.$bus.$on("showSnack", (word) => {
      this.show = true;
      this.word = word;
    });
  },
};
</script>

<style></style>
