<template>
  <v-card>
    <v-card-title>Table / Route Config</v-card-title>
    <v-card-text>
      <div v-if="config">
        <v-radio-group v-model="config.routeTable" row>
          <v-radio label="Default" :value="1331"></v-radio>
          <v-radio label="Custom" :value="0"></v-radio>
        </v-radio-group>
        <div v-if="config.routeTable != 1331">
          <RouteEdit v-model="config.routes" />
        </div>
      </div>
      <div v-else-if="error">
        Error
      </div>
      <div v-else>Loading</div>
    </v-card-text>
    <v-card-actions v-if="config">
      <v-btn x-large color="primary" @click="apply">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RouteEdit from "@/components/RouteEdit";

export default {
  data: () => ({
    config: null,
    error: false,
  }),
  components: { RouteEdit },
  methods: {
    apply() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.config),
      };
      fetch("http://172.20.168.131:13380/config", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error == false)
            this.$bus.$emit("showSnack", "Update successfully");
          else this.$bus.$emit("showSnack", "Error");
        });
    },
    fetchData() {
      fetch("http://172.20.168.131:13380/config")
        .then((response) => response.json())
        .then((data) => {
          if (data.error == false) {
            this.config = data;
            if (this.config.routeTable != 1331) {
              this.config.routeTable = 0;
            }
          } else this.error = true;
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style></style>
