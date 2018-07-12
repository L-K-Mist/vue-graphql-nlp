import '@babel/polyfill'
import {
  ApolloClient
} from 'apollo-client'
import {
  HttpLink
} from 'apollo-link-http'
import {
  InMemoryCache
} from 'apollo-cache-inmemory'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
 
import App from './App'
import router from './router'
import store from "./store/store";
import {
  Emoji
} from "emoji-mart-vue";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify)
Vue.component('emoji', Emoji);
Vue.config.productionTip = false

// Apollo Specific instantiations

// 3
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'https://api.graph.cool/simple/v1/cjjg0n07x5q1n0139fkwu9lrp'
})

// 4
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

// 5
Vue.use(VueApollo)

// 6
/**
 * create a new apollo client instance through VueApollo and set the defaultClient to the apolloClient we just created.You also set $loadingKey to‘ loading’ so that we can easily display a loading indicator in the UI.
 */
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(), // specify the provide object on your root component
  router,
  store,
  render: h => h(App)
})
