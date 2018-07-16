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
    // console.log('​-------------------------');
    // console.log('​state.words', state.words);
    // console.log('​-------------------------');

  },
  rawLog(state, payload) {
    // mutate state
    state.rawLog = payload;
  },
  finSentences(state, payload) {
    // mutate state
    state.finSentences = payload;
    console.log('​finSentences -> state.finSentences', state.finSentences);
  },
  finSentencesNot(state, payload) {
    // mutate state
    state.finSentencesNot = payload;
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
    // console.log('​-----------------------------------');
    // console.log('​asyncnewRawLog -> payload', payload.dayDescribed);
    // console.log('​-----------------------------------');

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
    // console.log('​analysedText', analysedText.data());
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
      // console.log('​pullOutText -> finOnlyText', finOnlyText);
      return finOnlyText
    }

    // console.log('​financialSentences', financialSentences);
    // console.log('​otherSentences', otherSentences);
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
    console.log('​payload', payload);
    var words = state.words
    console.log('​words', words);
    var output = hasKnownSupplier(payload)
    console.log('​output', output);

    function hasKnownSupplier(inputArray) {
      var array = inputArray
      var knownSupplier = []
      var unknownSupplier = []
      for (var i = 0, len = array.length; i < len; i++) {
        if (nlp(array[i]).match('#Supplier').found) {
          knownSupplier.push(array[i])
        }
      }
      // console.log('​pullOutText -> finOnlyText', finOnlyText);
      return knownSupplier
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
