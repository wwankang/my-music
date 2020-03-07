
<template>
   <div>
    <el-row>
      <el-col :span="2">
        <!-- 当前播放: {{currentPlaying.name}} -->
        <el-tag type="success">{{currentPlaying.name}}</el-tag>
      </el-col>
      <el-col :span="4">
        <!-- el-icon-d-arrow-left -->
        <el-button size="small" @click="playPre" id="play" title="上一曲" icon="el-icon-d-arrow-left" circle></el-button>

        <el-button  @click="play" id="play" :title="music.isPlay?'暂停':'播放'" :icon="music.isPlay?'el-icon-video-pause':'el-icon-video-play'" circle></el-button>
        <el-button size="small" @click="playNext" id="play" title="下一曲" icon="el-icon-d-arrow-right" circle></el-button>

      </el-col>
      <el-col :span="8"  style="padding-left: 20px">
        <el-slider @change="changeTime" :format-tooltip="formatTime" :max="music.maxTime" v-model="music.currentTime"  style="width: 100%;"></el-slider>
      </el-col>
      <el-col :span="2" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">
        {{formatTime(music.currentTime)}}/{{formatTime(music.maxTime)}}
      </el-col>
      <el-col :span="2">
        <el-popover placement="top" trigger="hover">
          <div style="text-align: center" width="50">
             <el-slider v-model="music.volume" @input="changeVolume"></el-slider>
          </div>
          <el-button slot="reference" title="音量" icon="el-icon-headset" circle></el-button>
          <!-- el-icon-s-unfold -->
        </el-popover>     
        <!-- el-icon-headset -->
      </el-col>
      <el-col :span="2">
        <el-popover placement="top" trigger="click">
          <div style="text-align: center">
            <playList></playList>
          </div>
         <el-button  slot="reference" title="播放列表" icon="el-icon-s-unfold" circle></el-button>
          <!-- el-icon-s-unfold -->
        </el-popover>
      </el-col>
      
    </el-row>
    <audio ref="music"  src=""> </audio>
  </div>
</template>
 
<script>
  import playList from '@/views/playList'

  export default{
    components:{
      playList
    },
    data(){
      return {
        music:{
          isPlay:false,
          currentTime:0,
          maxTime:0,
          volume:100
        },
        currentPlaying:{},
        currentPlayList:[]
      }
    },
    mounted(){
      this.$nextTick(()=>{
        setInterval(this.listenMusic,1000)
        this.$refs.music.addEventListener('ended',this.playNext,false)
        
      })
     
      
    },
    methods:{
      listenMusic(){
        if(!this.$refs.music){
          return
        }
        
        if(this.$refs.music.readyState){
          this.music.maxTime = this.$refs.music.duration
        }
        this.music.isPlay=!this.$refs.music.paused
        this.music.currentTime = this.$refs.music.currentTime
      },
      play(){
        if(this.$refs.music.paused){
          this.$refs.music.play()
        }else{
          this.$refs.music.pause()
        }
        this.music.isPlay=!this.$refs.music.paused
        this.$nextTick(()=>{
          document.getElementById('play').blur()
        })
      },
      changeTime(time){
        this.$refs.music.currentTime = time
      },
      changeVolume(v){
        // console.log(v)
        this.music.volume = v 
        // if(this.music.volume>100){
        //   this.music.volume = 100
        // }
        // if(this.music.volume<0){
        //   this.music.volume = 0
        // }
        this.$refs.music.volume = this.music.volume/100
        // console.log(this.$refs.music.volume)
      },
      formatTime(time){
        let it = parseInt(time)
        let m = parseInt(it/60)
        let s = parseInt(it%60)
        return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
      },
      playNext() {
        console.log("playNext")
        console.log(this.currentPlayList)
        console.log(this.currentPlaying)
        var playIndex;
        this.currentPlayList.filter((item,index)=>{
           if(item.id===this.currentPlaying.id){
              playIndex = index
           }
        });
        if(this.currentPlayList.length === playIndex+1){
          playIndex = 0
        }else{
          playIndex += 1
        }
        console.log("foreachPlayList"+playIndex)
        this.$store.dispatch('getSongUrlByRow', this.currentPlayList[playIndex])
      },
      playPre() {
        console.log("playPre")
        console.log(this.currentPlayList)
        console.log(this.currentPlaying)
        var playIndex;
        this.currentPlayList.filter((item,index)=>{
           if(item.id===this.currentPlaying.id){
              playIndex = index
           }
        });
        if(this.currentPlayList.length === 0){
          playIndex = this.currentPlayList.length-1
        }else{
          playIndex -= 1
        }
        console.log("foreachPlayList"+playIndex)
        this.$store.dispatch('getSongUrlByRow', this.currentPlayList[playIndex])
      }
    },
    computed: {
      songUrl() {
        console.log("songUrl-change")
        return this.$store.getters.songUrl;
      },
      playingSong(){
        console.log("playingSong-change")
        return this.$store.getters.playingSong;
      },
     
      playList() {
        return this.$store.getters.playList;
      }
    },
    watch:{
      songUrl(val) {
        this.$refs.music.src = val;
        this.$refs.music.play()

      },
      playingSong(val){
        this.currentPlaying = val
      },
      playList(val){
        this.currentPlayList = val
      }
    }
  }
</script>