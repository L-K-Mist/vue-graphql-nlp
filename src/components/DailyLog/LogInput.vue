<template>
  <v-card>
    <v-card-title class="headline primary--text">Data Capture</v-card-title>
      <v-container fill-height>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>      
             <v-flex xs12 sm6 md4>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="What day are we describing?"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" @input="$refs.menu.save(date)"></v-date-picker>
        </v-menu>
      </v-flex>              
            <v-text-field box
              v-model="rawLog"
              name="input-7-1"
              label="What happened this day?"
              multi-line
            ></v-text-field>
            <v-btn
              @click="submit">submit
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
  </v-card>
</template>

<script>
// TODO FIX THE DATE DATA CAPTURE

export default {
  created() {
    //this.$store.dispatch("fetchAllSuppliers");
  },
  data: () => ({
    date: "",
    menu: false,
    rawLog:
      "Got shoes for R70 from Mike. Bought R70 worth Cement, Lime, and Soda from usual guys. Got Sugar for R34 from PickNPay. Got Sweet Melon for R45 from Spar. Tonight, after a breakthrough year for America, our economy is growing and creating jobs at the fastest pace since 1999. Got R90.00 worth of Peas from Bluff Checkers"
  }),
  methods: {
    submit() {
      let raw = {
        text: this.rawLog,
        dayDescribed: this.date
      };
      if (this.date !== "") {
        this.$store.dispatch("newRawLog", raw);
        console.log("​-------------------------------------");
        console.log("​submit -> dayDescribed", raw.dayDescribed);
        console.log("​-------------------------------------");
      }
    }
  },
  watch: {
    date(newVal) {
      console.log("​-----------------------");
      console.log("​date -> newVal", newVal);
      console.log("​-----------------------");
    }
  }
};
</script>

