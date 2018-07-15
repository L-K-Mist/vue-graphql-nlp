import nlp from 'compromise'
import apolloClient from "@/apolloClient"
import { CREATE_RAWLOGS_MUTATION } from '../../constants/graphql';

/**
 * let doc = nlp('expresso').debug();
Object.assign(doc.world().words, {
  expresso: 'Coffee'
});
doc = nlp('another expresso').debug();
 */

nlp.plugin({
    patterns: {
        '/R[0-9]+/': 'Money',
        '(of|worth of|worth)': 'FinItemPhrase',
        'from #Noun': 'MaybeSupplier',
    },
});

const state = {
    words: {},
    missingSupplier: false,
    potentialSupplier: null,
    rawLog: {
        
    },
    rawlogDebug: null,
    finItems: [{
        value: false,
        sentence: "unknown",
        number: 0,
        provider: "unknown",
        item: "unknown"
    }],
    finSentences: [{
        "text": "Got shoes for R70 from Mike. ",
        "normal": "got shoes for r70 from mike"
    }, {
        "text": "Bought R70 worth Cement, Lime, and Soda from usual guys. ",
        "normal": "bought r70 worth cement lime and soda from usual guys"
    }, {
        "text": " Got R90.00 worth of Peas from Bluff Checkers",
        "normal": "got r90.00 worth of peas from bluff checkers"
    }],
    gotFin: false,
};

const getters = {
    rawlogDebug: state => {
        return state.rawlogDebug;
    },
    missingSupplier: state => {
        return state.missingSupplier;
    },
    potentialSupplier: state => {
        return state.potentialSupplier;
    },
    rawLog(state) {
        return state.rawLog;
    },
    finSentences(state) {
        return state.finSentences;
    },
    gotFin(state) {
        return state.gotFin;
    },
    finItems(state) {
        return state.finItems;
    }
};

const mutations = {
    newTags: (state, payload) => { // These are for optimistic updates between sessions. Sessions start with words from the database.
        state.words = Object.assign(state.words, payload)
        console.log('​-------------------------');
        console.log('​state.words', state.words);
        console.log('​-------------------------');
        
    },

    rawlogDebug: (state, payload) => {
        state.rawlogDebug = payload;
    },
    missingSupplier: (state, payload) => {
        state.missingSupplier = payload;
    },
    // potentialSupplier: (state, payload) => { // A future feature: something to use NLP to suggest new supplier name when text doesn't match existing suppliers.
    //     state.potentialSupplier = payload;
    // },
    rawLog(state, payload) {
        // mutate state
        state.rawLog = payload;
    },
    finSentences(state, payload) {
        // mutate state
        state.finSentences = payload;
    },
    gotFin(state, payload) {
        // mutate state
        state.gotFin = payload;
    },
    finItems(state, payload) {
        state.finItems = payload;
    }
};

const actions = {
  // Dialogue actions
  openActivityLog: ({ commit }, payload) => {
    commit("openActivityLog", payload);
  },
  async newRawLog({ commit, dispatch }, payload) {
    commit("rawLog", payload);
    console.log('​-----------------------------------');
    console.log('​asyncnewRawLog -> payload', payload.dayDescribed);
    console.log('​-----------------------------------');
    
    const response = await apolloClient.mutate({
      mutation: CREATE_RAWLOGS_MUTATION,
      variables: payload
    });
    console.log("​-------------------------------------");
    console.log("​asyncnewRawLog -> response", response.data);
    console.log("​-------------------------------------");
  },

  /**
var myWords={
  'university of toronto':'Organization',
  'girble':'CuteThing'
}
var r = nlp('he studied girbles at the University-of-Toronto', myWords)
r.match('#CuteThing').found
//true
r.organizations().length
//1
   */

  finSentences({ commit, dispatch }, payload) {
    var financialSentences = nlp(payload)
      .sentences()
      .if("#Money");
    commit("finSentences", financialSentences.data());
    dispatch("finSentenceEvaluate", financialSentences);
  },
  finSentenceEvaluate({ commit, dispatch }, payload) {
    // commit('finSentences', )
  }
};
export default {
    state,
    mutations,
    actions,
    getters
}