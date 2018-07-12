<template>
  <v-app>
    <v-toolbar
      app
     >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click.stop="myDialogVisible = true"></v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-width>
        <v-layout column justify-center>
          <v-flex xs12>
              <v-container fluid grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12 
                  >
                    <v-card>
                      <v-card-title>If you want to play directly with the graphCool GraphQL database click &nbsp;<a href="https://api.graph.cool/simple/v1/cjjg0n07x5q1n0139fkwu9lrp" target="blank"> this link</a></v-card-title>
                    </v-card>
                    <router-view></router-view>
                    </v-flex>
                    <v-flex>
                    </v-flex>
                </v-layout>
              </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <create-link  :dialogVisible="myDialogVisible"
           @close="myDialogClose"></create-link>
    <v-footer :fixed="fixed" app>
    <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>

import CreateLink from "@/components/CreateLink";
export default {
  data() {
    return {
      myDialogVisible: false,
      title: "Vuetify GraphCool",
      fixed: false
    };
  },
  methods: {
    myDialogClose() {
      this.myDialogVisible = false;
      // other code
    }
  },
  name: "app",
  components: {
    // LinkList,
    CreateLink,

  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
