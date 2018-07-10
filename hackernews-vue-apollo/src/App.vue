<template>
  <v-app>
    <v-toolbar
      app
     >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <link-list></link-list>
  
    </v-content>
      <v-footer :fixed="fixed" app>

      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import LinkList from "./components/LinkList";

export default {
  data() {
    return {
      title: "Vuetify GraphCool",
      fixed: false
    };
  },
  name: "app",
  components: {
    LinkList
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
