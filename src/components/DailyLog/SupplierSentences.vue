<template>
    <v-layout row wrap>
        <template  v-if="$store.getters.showsupplierSentences">
        <v-card class="text-xs-left">
            <v-card-title class="headline primary--text" primary-title>
                Supplier Sentences
            </v-card-title>
            <v-list two-line >
                <h3 class="ml-2 ">These Are Recognised Suppliers of Ours</h3>
                <template v-for="(item, index) in knownSuppliers">
                    <v-list-tile :key="index" avatar>
                        <v-list-tile-avatar>
                           <emoji  emoji="money_with_wings" :size="40"></emoji>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="item"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
            <v-list v-if="unknownSuppliers.length > 0" two-line>
              <v-flex class="ml-2">
                <h3>These Suppliers Are Strange to Me</h3>
                <p>Are you sure that this is captured correctly? If so, please update the Supplier Table.</p>
              </v-flex>
                <template v-for="(item, index) in unknownSuppliers">
                    <v-list-tile :key="index" avatar>
                        <v-list-tile-avatar>
                            <emoji  emoji="money_with_wings" :size="40"></emoji>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="item"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-card>
        </template>
    </v-layout>
</template>

<script>
export default {
  created() {
    this.initialize();
  },
  methods: {
    initialize() {}
  },
  data() {
    return {
      supplierSentences: {
        knownSuppliers: [],
        unknownSuppliers: []
      }
    };
  },
  computed: {
    knownSuppliers() {
      return this.$store.getters.supplierSentences.knownSuppliers; // The trick to avoid getting undefined errors is to use v-if on the component to only render this when the values are known
    },
    unknownSuppliers() {
      return this.$store.getters.supplierSentences.unknownSuppliers;
    }
  },
  watch: {
    showSupplierSentences(newVal) {
      this.showsupplierSentences = newVal;
      console.log("​showSupplierSentences -> newVal", newVal);
    },
    knownSuppliers(newVal) {
      this.supplierSentences.knownSuppliers = newVal;
    },
    unknownSuppliers(newVal) {
      this.supplierSentences.unknownSuppliers = newVal;
    }
  }
};
</script>
