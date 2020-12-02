<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-toolbar-title>StrExp NetConfig Tool</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="http://status-cn.nia.dn42" target="_blank" text>
        <span class="mr-2">Net Status</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
