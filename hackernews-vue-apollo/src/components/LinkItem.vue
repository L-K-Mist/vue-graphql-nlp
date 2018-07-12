<template>
    <v-card>
      <v-card-text>
        {{link.description}} ({{link.url}})
      </v-card-text>
    </v-card>
</template>



<script>
export default {
  name: "LinkItem",
  props: ["link"]
};
</script>