<template>
  <v-card class="my-4">
    <v-card-title>Here to configure your network!</v-card-title>
    <v-card-text>
      <p>
        Your Network: <b>{{ info.desc }}</b>
      </p>
      <p>
        Prefix: <b>{{ info.network }}</b>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["info"],
};
</script>

<style></style>
