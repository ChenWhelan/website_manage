import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

 
export default new Vuex.Store({
  state: {
    email:'',
    password:''
  },
  mutations:{
    setEmail(state,email){
        state.email=email
    },
    setPwd(state,password){
        state.password=password
    }
  },
  getters:{
    email:state=>state.email,
    password:state=>state.password
  }
});