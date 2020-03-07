<template>
  <el-table
    :data="songList"
    border size="small"
    style="width: 100%" @row-dblclick="handledbClick"   highlight-current-row align="center">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="name"
      label="音乐标题">
    </el-table-column>
    <el-table-column
      prop="artists[0].name"
      label="歌手">
    </el-table-column>
    <!-- {{formatTime(music.maxTime)}} -->
    <el-table-column
      prop="duration"
      :formatter="formatTime"
      label="时长">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" title="播放" icon="el-icon-caret-right" circle @click="handledbClick(scope.row)"></el-button>
        <el-button size="mini" title="添加到播放列表" icon="el-icon-plus" circle @click="handleAddPlaySong(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
 
</template>

<script>
import {playSong} from '@/api/song' 
  export default {
    data (){
      return {
        playList:playList,
        songList:songList
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      handledbClick(row, event, column) {
        // 双击播放拿到当前id 获取song url
        console.log("row.id");
        console.log(row)
        console.log(row.id);
        this.$store.dispatch('getSongUrlByRow', row)
        var arr= this.playList.filter ((item)=>{
          return item.id === row.id
        })
        if(arr.length===0){
          this.$store.commit('ADD_PLAYLIST', row)
        }
      },
      formatTime(row,column,time){
        let it = parseInt(time/1000)
        let m = parseInt(it/60)
        let s = parseInt(it%60)
        return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
      },
      handleAddPlaySong(row){
        console.log(row);
        var arr= this.playList.filter ((item)=>{
          return item.id === row.id
        })
        if(arr.length===0){
          this.$store.commit('ADD_PLAYLIST', row)
        }else{
          this.$message('列表已存在该歌曲');
        }
      }
    },

    data() {
      return {
        
      }
    },
    computed: {
      songList() {
        return this.$store.getters.songList;
      },
      playList() {
        return this.$store.getters.playList;
      }
    }


  }
</script>