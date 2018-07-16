import nlp from 'compromise'
import apolloClient from "@/apolloClient"
import {
  CREATE_RAWLOGS_MUTATION
} from '../../constants/graphql';

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
  potentialSupplier: null,
  rawLog: {},
  finItems: [{
    value: false,
    sentence: "unknown",
    number: 0,
    provider: "unknown",
    item: "unknown"
  }],
  finSentences: ["Nothing Here Yet"],
  finSentencesNot: ["Nothing Here Yet"],
  supplierSentences: {
    knownSuppliers: ["Nothing Here Yet"],
    unknownSuppliers: ["Nothing Here Yet"]
  },
  gotFin: false,
};

const getters = {
  potentialSupplier: state => {
    return state.potentialSupplier;
  },
  rawLog(state) {
    return state.rawLog;
  },
  finSentences(state) {
    return state.finSentences;
  },
  finSentencesNot(state) {
    return state.finSentencesNot;
  },
  finSentencesNot(state) {
    return state.finSentencesNot;
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
  rawLog(state, payload) {
    // mutate state
    state.rawLog = payload;
  },
  finSentences(state, payload) {
    // mutate state
    state.finSentences = payload;
  },
  finSentencesNot(state, payload) {
    // mutate state
    state.finSentencesNot = payload;
  },
  supplierSentences(state, payload) {
    // mutate state
    state.supplierSentences = payload;
    state.showSupplierSentences = true
    console.log('​supplierSentences -> state.showSupplierSentences', state.showSupplierSentences);
    console.log('​supplierSentences -> state.supplierSentences', state.supplierSentences);


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
  async newRawLog({
    commit,
    dispatch
  }, payload) {
    commit("rawLog", payload);

    const response = await apolloClient.mutate({
      mutation: CREATE_RAWLOGS_MUTATION,
      variables: payload
    });
    console.log("​-------------------------------------");
    console.log("​asyncnewRawLog -> response", response.data);
    console.log("​-------------------------------------");
    dispatch("analyseText", payload)
  },

  analyseText({
    commit,
    dispatch,
    state
  }, payload) {
    let rawText = payload.text
    let {
      words
    } = state

    let analysedText = nlp(rawText, words)
    dispatch("finSentences", analysedText)

  },

  finSentences({
    commit,
    dispatch,
    state
  }, payload) {
    var financialSentences = payload
      .sentences()
      .if("#Money").data();

    var otherSentences = payload
      .sentences()
      .ifNo("#Money").data();

    var financialSentences = pullOutText(financialSentences) // simplifies the array from this form:  [{},{}]  to this:  ["some sentence", "another sentence"]
    var otherSentences = pullOutText(otherSentences)

    function pullOutText(inputArray) {
      var array = inputArray
      var finOnlyText = []
      for (var i = 0, len = array.length; i < len; i++) {
        finOnlyText.push(inputArray[i].text)
      }
      return finOnlyText
    }

    commit("finSentences", financialSentences);
    commit("finSentencesNot", otherSentences)
    commit("gotFin", true)
    dispatch("analyseFinSentences", financialSentences)
    // dispatch("finSentenceEvaluate", financialSentences);
  },
  analyseFinSentences({
    commit,
    state
  }, payload) {
    var words = state.words
    commit("supplierSentences", knownOrNot(payload))
    console.log('​knownOrNot(payload)', knownOrNot(payload));


    function knownOrNot(inputArray) {
      var array = inputArray
      var knownSuppliers = []
      var unknownSuppliers = []
      for (var i = 0, len = array.length; i < len; i++) {
        if (nlp(array[i]).match('#Supplier').found) {
          knownSuppliers.push(array[i])
        } else {
          unknownSuppliers.push(array[i])
        }
      }
      return {
        knownSuppliers,
        unknownSuppliers
      }
    }

  },






  openActivityLog: ({
    commit
  }, payload) => {
    commit("openActivityLog", payload);
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

  finSentenceEvaluate({
    commit,
    dispatch
  }, payload) {
    // commit('finSentences', )
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
