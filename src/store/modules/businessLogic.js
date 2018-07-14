// import crud from '@/api/pouchDB'
import  apolloClient from "@/apolloClient"
import { ALL_SUPPLIERS_QUERY } from "@/constants/graphql"
import { CREATE_SUPPLIER_MUTATION } from "@/constants/graphql"
import { forEach } from "async";


const state = {
    testRemoteDispatch: false,
    suppliers: [{}],
};

const getters = {
    testRemoteDispatch(state) {
        return state.testRemoteDispatch;
    },
    
    allSuppliers(state) {
        return state.suppliers
    }
};

const mutations = {
    testRemoteDispatch(state, payload) {
        // mutate state
        console.log("testRemoteDispatch was: ", state.testRemoteDispatch);
        state.testRemoteDispatch = payload;
        console.log("testRemoteDispatch is now: ", state.testRemoteDispatch);
    },

    allSuppliers(state, payload) {
        state.suppliers = payload        
    },
    addSupplier(state, payload) {
        
        state.suppliers.push(payload)
        console.log("after addSupplier suppliers is:", state.suppliers)
    }
};

const actions = {
    // Dialogue actions
    testRemoteDispatch: ({ commit }, payload) => {
        commit("testRemoteDispatch", payload);  
    },

    async getSuppliers({ commit, dispatch }) {
        const response = await apolloClient.query({
            query: ALL_SUPPLIERS_QUERY
        })
        commit("allSuppliers", response.data.allSuppliers);
        console.log("Vuex Action Response is: ", response.data.allSuppliers)
        dispatch("registerSuppliersAsTags", response.data.allSuppliers)
    },

    async createSupplier({ commit, dispatch }, payload) {
        var mutable = payload
        console.log("create Supplier payload ", payload)
        commit("addSupplier", mutable) // Optimistic Update of state before db  
        const response = await apolloClient.mutate({
            mutation: CREATE_SUPPLIER_MUTATION,
            variables: payload
        })
        console.log("Vuex createSupplier Response is: ", response.data.createSupplier)
 
        const update = await dispatch('getSuppliers')
    },
    
    // captureNewSupplier: ({ dispatch }, payload) => {
    //     payload._id = "supplier_" + payload.name
    //     // crud.create(payload)
    //     // crud.info()
    // },

    registerSuppliersAsTags: ({ commit }, payload) => {
        let supWords = {}
        for (var i = 0, len = payload.length; i < len; i++) {
            arrangeSupWords(payload[i]);
        }
        function arrangeSupWords(supplier) 
        {
            supWords = Object.assign(supWords, {
                [supplier.name]: "Supplier",
                [supplier.nickname]: "Supplier"
            })
        }
        commit("newTags", supWords)
        console.log("supWords", supWords)
    },

    // updateExistingSupplier: ({ commit }, payload) => {
    //     //   crud.update(payload)
    // },
};

export default {
    state,
    mutations,
    actions,
    getters
}