<template>
   <v-layout row justify-center>
    <v-dialog
       v-model="intDialogVisible"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Add a new entry to the graphql database</v-card-title>
        <v-card-text>
            <v-form>
                <v-container>
                    <v-layout row wrap>
                
                    <v-flex xs12 sm10 md8>
                        <v-text-field
                        label="Description"
                        :value="description"
                        outline
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 md8>
                        <v-text-field
                        label="Link"
                        :value="url"
                        outline
                        ></v-text-field>
                    </v-flex>
            
                    </v-layout>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="createLink(); intDialogVisible=false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { CREATE_LINK_MUTATION } from "../constants/graphql";
export default {
  name: "CreateLink",
  props: {
    dialogVisible: {
      type: Boolean,

      default: false
    }
  },
  computed: {
    intDialogVisible: {
      get: function() {
        // if (this.dialogVisible) {
        //   // Some dialog initialization code could be placed here
        //   // because it is called only when this.dialogVisible changes
        // }

        return this.dialogVisible;
      },
      set: function(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  data() {
    return {
      //   dialog: this.showMe,
      description: "",
      url: ""
    };
  },
  methods: {
    createLink() {
      const { description, url } = this.$data;
      this.$apollo.mutate({
        mutation: CREATE_LINK_MUTATION,
        variables: {
          description,
          url
        }
      });
    }
  }
};
</script>