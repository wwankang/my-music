<template>

    <el-row :gutter="20" style="-webkit-app-region: drag;"  >
      <el-col :span="8">
        <el-image :src="require('@/assets/img/beauty.jpg')" style="width: 45px; height: 45px"></el-image>
      </el-col>
      <el-col :span="8" >
        <!-- <search style="-webkit-app-region:no-drag;"></search> -->
        <searchInput style="-webkit-app-region:no-drag;"></searchInput>
      </el-col>
      <el-col  :span="8" >
        <div class="operation-button" style="float: right;">
          <el-button type="primary" icon="el-icon-minus" circle size="medium" @click="min()" style="-webkit-app-region: no-drag;"></el-button>
          <el-button type="success" icon="el-icon-copy-document" circle size="medium" @click="max()" style="-webkit-app-region: no-drag;"></el-button>
          <el-button type="info" icon="el-icon-close" circle size="medium" @click="close()" style="-webkit-app-region: no-drag;"></el-button>
        </div>
      </el-col>
      
    </el-row>
</template>
<script>
import search from '@/views/Search'
import searchInput from '@/components/common'
const { ipcRenderer } = require("electron")


export default {
  name: 'Search',
  components: {
    search,
    searchInput
  },
  computed: {
    
  },
  methods: {
    close(){
      ipcRenderer.send('close'); 
    },
    min(){
      ipcRenderer.send('min'); 
    },
    max(){
      ipcRenderer.send('max'); 
    }
    
  }
}
</script>

<style>
.el-button{
  margin-left: 0
}
.operation-button{
  margin-top: 10px;
  margin-right: 10px;
}

  
</style>

