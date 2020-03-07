<template>
    <el-container class="container">
  <el-header>Header</el-header>
  <el-container>
    <el-container>
    <el-aside width="20%">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
      <el-footer>Footer</el-footer>
  </el-container>
</el-container>

</template>

<script>

import searchViewer from '@/views/Search'
import tableViewer from '@/views/MusicTable'
import audioViewer from '@/views/Audio'

export default {
  name: 'Home',
  components: {
    searchViewer,
    tableViewer,
    audioViewer
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style>
  
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    
    
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    flex:0 0 200px
  }
  
  .el-main {
    flex: 1; 
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    
  }
  
  body > .el-container {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    height: 100%
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
