import '@babel/polyfill'

import Vue from 'vue'
import VueApollo from 'vue-apollo'
import apolloClient from '@/apolloClient'

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

Vue.mixin({
  methods: {
    // async stall(stallTime = 3000) {
    //   await new Promise(resolve => setTimeout(resolve, stallTime));
    // }
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
