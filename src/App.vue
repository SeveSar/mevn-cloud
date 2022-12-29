<template>
  <AppToast />
  <TheHeader />
  <main>
    <router-view> </router-view>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/layouts/TheHeader.vue";

import AppToast from "./components/ui/AppToast.vue";

export default defineComponent({
  components: {
    TheHeader,
    AppToast,
  },
});
</script>

<style lang="scss"></style>
