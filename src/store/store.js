import Vue from 'vue'
import Vuex from 'vuex'
import natLangProg from './modules/natLangProg'
import businessLogic from './modules/businessLogic'
import viewSwitching from './modules/viewSwitching'

/**Because of the code below I could actually programattically initialize the nlp plugin
 * 
DernOognei9O
 //my object
 var sendData = {
   field1: value1,
   field2: value2
 };

 //add element
 sendData['field3'] = value3;
 */


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    natLangProg,
    businessLogic,
    viewSwitching
  }
})
