<template>
  <div>
    <div v-if="selfInfo">
      <NetworkInfo :info="selfInfo.selfNet" />
      <ConfigManager />
    </div>
    <div v-else-if="error">
      Error
    </div>
    <div v-else>Loading</div>
    <Snack/>
  </div>
</template>

<script>
import NetworkInfo from "@/components/NetworkInfo";
import ConfigManager from "@/components/ConfigManager";
import Snack from "@/components/Snack"

export default {
  data: () => ({
    selfInfo: null,
    tableID: null,
    error: false,
  }),
  components: { NetworkInfo, ConfigManager,Snack },
  methods: {
    fetchData() {
      fetch("http://172.20.168.131:13380/info")
        .then((response) => response.json())
        .then((data) => {
          if (data.error != true) this.selfInfo = data;
          else this.error = true;
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
