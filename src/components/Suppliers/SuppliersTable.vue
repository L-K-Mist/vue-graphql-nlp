<template>
<div id="app">
  <v-app id="inspire">
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
  </v-app>
</div>
</template>
    
<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Supplier',
        align: 'center',
        sortable: true,
        value: 'name'
      },
      { text: 'Nickname', value: 'nickname' },
      { text: 'Email', value: 'email' },
    ],
    suppliers: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      nickname: 0,
      email: 0,
    },
    defaultItem: {
      name: '',
      nickname: 0,
      email: 0,
    }
    
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item' 
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      this.suppliers = [  // becomes result of gql query
        {
          name: 'Checkers Bluff',
          email: "check@ers.com",
          nickname: "Checkers",
        },
        {
          name: 'Bluff Hardware',
          email: "hard@ware.com",
          nickname: "Usual Guys",
        },
       
      ]
      let result = await this.$store.dispatch("getSuppliers")
      console.log("result")
    },

    editItem (item) {
      this.editedIndex = this.suppliers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.suppliers.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.suppliers.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.suppliers[this.editedIndex], this.editedItem)
      } else {
        this.suppliers.push(this.editedItem)
      }
      this.close()
    }
  }
  
}


</script>
