<template>
    <div>
      <v-toolbar flat color="white">
        <v-toolbar-title>SUPPLIERS</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="primary" dark class="mb-2">New Supplier</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.nickname" label="NickName"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="suppliers"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.nickname }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
</template>
    
<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Supplier",
        align: "center",
        sortable: true,
        value: "name"
      },
      { text: "Nickname", value: "nickname" },
      { text: "Email", value: "email" }
    ],
    suppliers: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      nickname: "",
      email: ""
    },
    defaultItem: {
      name: "Formal Name",
      nickname: "The kind of name that might be spoken in a log",
      email: "Yip, good ol' email-addy"
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Supplier" : "Edit Supplier";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let result = await this.$store.dispatch("getSuppliers").then(() => {
        // Experimental combination of async-await and traditional .then promise  see: https://kendaleiv.com/using-javascript-promises-and-async-await-together/
        this.suppliers = this.$store.getters.allSuppliers;
        // // console.log('​--------------------------------------------------');
        // // console.log('​asyncinitialize -> this.suppliers', this.suppliers);
        // // console.log('​--------------------------------------------------');
      });
    },

    editItem(item) {
      console.log("​editItem -> item", item);

      this.editedIndex = this.suppliers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.suppliers.indexOf(item);
      let supToDelete = this.suppliers[index];
      // console.log('​---------------------------------------');
      // console.log('​deleteItem -> supToDelete', supToDelete.id);
      // console.log('​---------------------------------------');

      confirm("Are you sure you want to delete this item?") &&
        this.suppliers.splice(index, 1);
      this.$store.dispatch("deleteSupplier", supToDelete.id);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      // The same function is executed when save button on New Supplier dialog is clicked AND when save button is clicked for editing suppliers in-line
      if (this.editedIndex > -1) {
        //if we already have some suppliers
        Object.assign(this.suppliers[this.editedIndex], this.editedItem); //overwrite this.suppliers with new data
        this.$store.dispatch("updateSupplier", this.editedItem); // populate changes to db
      } else {
        this.suppliers.push(this.editedItem);
        this.$store.dispatch("createSupplier", this.editedItem);
      }
      console.log("​-----------------------------------------");
      console.log("​save -> this.editedItem", this.editedItem);
      console.log("​-----------------------------------------");
      this.close();
    }
  }
};
</script>
