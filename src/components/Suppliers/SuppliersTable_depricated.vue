<template>
<v-card>
  <v-card-title>
    <h4>
      What I want to do with graphql, vue(tify), and nlp-compromise is create an app that turns my daily activity logs into spreadsheets.
    </h4>
  </v-card-title>
  <v-card-text>
    <v-data-table v-if="show"
      :headers="headers"
      :items="allSuppliers"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.nickname }}</td>
      </template>
    </v-data-table>
  </v-card-text>
</v-card>
</template>

<script>

export default {
  mounted() {
    this.$store.dispatch("getSuppliers");
    
  },

  // computed: {
  //   suppliers() {
  //     return this.$store.getters.suppliers;
  //   }
  // },
  // apollo: {
  //   allSuppliers: {
  //     query: ALL_SUPPLIERS_QUERY
  //   }
  // },
  computed: {
    suppliers() {
      console.log("view gets suppliers: ", this.$store.getters.allSuppliers)
      return this.$store.getters.allSuppliers
    }
  },
  data() {
    return {
      show: false,
      allSuppliers: [],
      headers: [
        {
          text: "Company Name",
          align: "left",
          //sortable: false,
          value: "name"
        },
        { text: "Email", value: "email" },
        { text: "Nick-Name (g)", value: "nickname" }
      ],
      desserts: []
    };
  },
  watch: {
    suppliers(newVal){
      console.log("watcher triggered with: ", newVal)
      this.allSuppliers = newVal
      this.show = true
    }
  }
};
</script>