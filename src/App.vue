<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppBar from "./components/AppBar.vue"

</script>

<template>
    <v-app class="wrapper">
      <AppBar />

      <v-main>
        <v-container fluid style="width: 100vw">
          <RouterView />
        </v-container>
      </v-main>
    </v-app>
</template>
