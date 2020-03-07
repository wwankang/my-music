<template>
<el-tabs stretch value="first">
    <el-tab-pane label="热门排行榜" name="first">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in bannerList" :key="item.targetId">
          <img :src="item.imageUrl" style="width:100%;height:100%"/>
        </el-carousel-item>
      </el-carousel>
      <!-- <img :src="imgUrl"/> -->
      <!-- <tableViewer v-bind=""></tableViewer> -->
      
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import {banner} from '@/api/banner'
import {getSongTopListByType} from '@/api/song'

import tableViewer from '@/views/MusicTable'
// import imgUrl from "@/assets/hot.jpg"
export default {
  components(){
    tableViewer
  },
  data(){
    return{
      bannerList:[],
      hotTopList:[]
    }
  },
  mounted(){
    console.log("banner---->1");
    new Promise((resolve, reject) => {
      console.log("banner---->1");
        banner().then(response => {
          if(response){
            this.bannerList = response.banners
            console.log(this.bannerList)
          }
          resolve()
        }).catch(error => {
          console.log('error',error.response)
          reject(error)
        })
      })
  },
  methods(){

    getSongTopListByTyp: {
      new Promise((resolve, reject) => {
      console.log("banner---->1");
        getSongTopListByType(1).then(response => {
          if(response){
            this.hotTopList = response
            console.log(response)
          }
          resolve()
        }).catch(error => {
          console.log('error',error.response)
          reject(error)
        })
      })
    }
    
  }
  
}
</script>

<style>
  
</style>