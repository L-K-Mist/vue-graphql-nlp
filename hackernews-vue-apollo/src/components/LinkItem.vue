<template>
    <v-card>{{link.description}} ({{link.url}})</v-card>
</template>



<script>
export default {
  name: "LinkItem",
  props: ["link"]
};
</script>