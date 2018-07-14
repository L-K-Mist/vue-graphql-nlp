import Vue from 'vue'
import Router from 'vue-router'
import SuppliersTable from "@/components/Suppliers/SuppliersTable"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: SuppliersTable
    },
    // {
    //   path: '/create',
    //   component: CreateLink
    // }
  ],
  mode: 'history'
})
