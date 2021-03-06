// import crud from '@/api/pouchDB'
import apolloClient from "@/apolloClient"
import {
  ALL_SUPPLIERS_QUERY
} from "@/constants/graphql"
import {
  CREATE_SUPPLIER_MUTATION
} from "@/constants/graphql"
import {
  forEach
} from "async";
import {
  UPDATE_SUPPLIER_MUTATION,
  DELETE_SUPPLIER_MUTATION
} from "../../constants/graphql";

const state = {
  suppliers: [],
  showSupplierSentences: false
};

const getters = {
  allSuppliers(state) {
    return state.suppliers
  },
  showSupplierSentences(state) {
    return state.showSupplierSentences
  }
};

const mutations = {
  allSuppliers(state, payload) {
    let mutable = JSON.parse(JSON.stringify(payload))

    state.suppliers = mutable
  },
  addSupplier(state, payload) {
    let mutable = JSON.parse(JSON.stringify(payload))
    state.suppliers.push(mutable)
    console.log('​addSupplier -> state.suppliers', state.suppliers);
  },
  showSupplierSentences(state, payload) {
    state.showSupplierSentences = payload
  },
  //MIGHT NOT NEED THIS
  // updateSupplier(state, payload) {
  //     let mutable = 
  // }

};

const actions = {

  async getSuppliers({
    commit,
    dispatch
  }) {
    await apolloClient.query({
        query: ALL_SUPPLIERS_QUERY
      })
      .then((response) => {
        commit("allSuppliers", response.data.allSuppliers)
        dispatch("registerSuppliersAsTags", response.data.allSuppliers)
      });
  },

  async createSupplier({
    commit,
    dispatch
  }, payload) {
    var {
      name,
      nickname,
      email,
    } = payload
    // commit("addSupplier", payload) // Optimistic Update of state before db  // Not necessary since component is optimistic already. 
    const response = await apolloClient.mutate({
      mutation: CREATE_SUPPLIER_MUTATION,
      variables: {
        name,
        nickname,
        email,
      }
    })
    await dispatch('getSuppliers')
  },

  async updateSupplier({
    commit,
    dispatch
  }, payload) {
    const response = await apolloClient.mutate({
      mutation: UPDATE_SUPPLIER_MUTATION,
      variables: payload
    }).then((response) => {
      console.log('​------------------------------------------');
      console.log('​asyncupdateSupplier -> response', response);
      console.log('​------------------------------------------');
    })
  },

  async deleteSupplier({}, id) {
    const response = await apolloClient.mutate({
      mutation: DELETE_SUPPLIER_MUTATION,
      variables: {
        id
      }
    }).then((response) => {
      console.log('​------------------------------------------');
      console.log('​asyncdeleteSupplier -> response', response);
      console.log('​------------------------------------------');
    })
  },
  registerSuppliersAsTags: ({
    commit
  }, payload) => {
    let supWords = {}
    for (var i = 0, len = payload.length; i < len; i++) {
      arrangeSupWords(payload[i]);
    }

    function arrangeSupWords(supplier) {
      supWords = Object.assign(supWords, {
        [supplier.name]: "Supplier",
        [supplier.nickname]: "Supplier"
      })
    }
    commit("newTags", supWords)
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
