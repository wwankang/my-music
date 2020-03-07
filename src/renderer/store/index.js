import Vue from 'vue'
import Vuex from 'vuex'
import { searchMusic } from '@/api/search'
import { getSongUrlById } from '@/api/song'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

// export default new Vuex.Store({
//   modules,
//   plugins: [
//     createPersistedState(),
//     createSharedMutations()
//   ],
//   getters:{

//   },
//   strict: process.env.NODE_ENV !== 'production'
// })
export default new Vuex.Store({
  state:{
    songList: [],
    playingSong:{},//当前播放
    songUrl:"",
    // 播放列表
    playList:[]
  },
 mutations : {
    SET_SONGlIST (state,songList) {
      console.log("SET_SONGlIST")
      state.songList = songList
    },
    SET_PLAYINGSONG (state,song) {
      console.log("SET_PLAYINGSONG")
      state.playingSong = song
    },
    SET_SONGURL (state,url) {
      console.log("SET_SONGURL")
      state.songUrl = url
    },
    ADD_PLAYLIST (state,song){
      console.log("ADD_PLAYLIST")
      state.playList.push(song)
    },
    REMOVE_PLAYLIST (state,index){
      console.log("REMOVE_PLAYLIST-->index:"+index)
      state.playList.splice(index,1)
    }

  },
  actions : {
    setSongList (context,name) {
      return new Promise((resolve, reject) => {
        searchMusic(name).then(response => {
          

          if(response){
            console.log("store/search.js:response.result.songs =")
            console.log(JSON.stringify(response.result.songs))
            console.log("commit(SET_SONGlIST)")
            context.commit('SET_SONGlIST',response.result.songs)
          }
          resolve()
        }).catch(error => {
          console.log('error',error.response)
          reject(error)
        })
      })
      
    },
    getSongUrlByRow (context,row) {
      console.log("store/search.js--->getSongUrlByRow---->id"+row.id);
      return new Promise((resolve, reject) => {
        getSongUrlById(row.id).then(response => {

          if(response&&response.data[0].url){
            console.log(JSON.stringify(response))
            const url=  response.data[0].url
            console.log("commit(SET_SONGURL)")
            context.commit('SET_SONGURL',url)
            context.commit('SET_PLAYINGSONG',row)
          }
          resolve()
        }).catch(error => {
          console.log('error',error.response)
          reject(error)
        })
      })
      
    }
  },
  getters: {
    songList: state => {
      return state.songList
    },
    playingSong: state => {
      return state.playingSong
    },
    songUrl: state => {
      return state.songUrl
    },
    playList: state => {
      return state.playList
    }
  }
})
