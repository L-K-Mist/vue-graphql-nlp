import nlp from 'compromise'

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
    rawLog: null,
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
    },

    rawlogDebug: (state, payload) => {
        state.rawlogDebug = payload;
    },
    missingSupplier: (state, payload) => {
        state.missingSupplier = payload;
    },
    potentialSupplier: (state, payload) => {
        state.potentialSupplier = payload;
    },
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
  newRawLog({ commit, dispatch }, payload) {
    commit("rawLog", payload);
    commit("rawlogDebug", nlp(payload).debug())
    dispatch("finSentences", payload);
  },
  finSentences({ commit, dispatch }, payload) {
    var financialSentences = nlp(payload)
      .sentences()
      .if("#Money");
    commit("finSentences", financialSentences.data());
    dispatch("finSentenceEvaluate", financialSentences);
  },
  finSentenceEvaluate({ commit, dispatch }, payload) {
    // commit('finSentences', )
    var val;
    var items = [];
    for (val of payload.out("array")) {
      var item = {};
      item.sentence = val;
      if (!nlp(item.sentence).has("#Supplier")) {
        dispatch("missingSupplier", item.sentence);
      } else {
        dispatch('populateFinSentences', item.sentence)
          let numberText = nlp(val)
          .match("#Money")
          .out("text")
          .replace("r", "");
        item.number = parseInt(numberText, 10);
        item.provider = nlp(val)
          .match("#Supplier")
          .toTitleCase()
          .out();
        item.value = false; // something Vuetify Tabular Data needs
        item.item = nlp(val)
          .delete("#Supplier")
          .delete("#Money")
          .delete("#FinItemPhrase")
          .delete("#Preposition")
          .match("#Noun")
          .toTitleCase()
          .out();
      }
      items.push(item); //TODO rather use state.finItems.push(item) <-- because I want to push to it from different actions
      
    }
    commit("finItems", items);
    commit("gotFin", true);
  },
  missingSupplier({ commit, dispatch }, payload) {
      let potentialSupplier = nlp(payload)
          .match("#MaybeSupplier")
          .delete("from")
          .out("text");
          commit('potentialSupplier', potentialSupplier)
          commit('missingSupplier', true)
        },
        populateFinSentences({ commit, dispatch}, payload) {
  },
  triggerTest({commit, dispatch}, payload) {
      dispatch("testRemoteDispatch", true)
  }
};
export default {
    state,
    mutations,
    actions,
    getters
}