<template>
<v-layout row wrap>
    <v-flex>
        <h3>These Are Recognised Suppliers of Ours</h3>
        <h3>These Suppliers Are Strange to Me</h3>
        <p>Are you sure that this is captured correctly? If so, please update the Supplier Table.</p>

    </v-flex>
    <v-card>
        <v-card-title primary-title>
            Supplier Sentences
        </v-card-title>
        <v-list two-line>
            <template v-for="(item, index) in supplierSentences.knownSuppliers">
                <v-list-tile :key="index" avatar>
                    <v-list-tile-avatar>
                        <emoji  emoji="smile" :size="40"></emoji>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="item"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
        <v-list two-line>
            <template v-for="(item, index) in supplierSentences.unknownSuppliers">
                <v-list-tile :key="index" avatar>
                    <v-list-tile-avatar>
                        <emoji  emoji="frown" :size="40"></emoji>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-html="item"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-card>

</v-layout>
</template>

<script>
export default {
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.supplierSentences = this.$store.getters.supplierSentences;
      console.log(
        "​initialize -> this.supplierSentences",
        this.supplierSentences
      );
    }
  },
  data() {
    return {
      supplierSentences: {}
    };
  },
  computed: {
    // knownSuppliers() {
    //   return this.$store.getters.supplierSentences.knownSuppliers;
    // },
    // unknownSuppliers() {
    //   return this.$store.getters.supplierSentences.unknownSuppliers;
    // }
  }
};
</script>
