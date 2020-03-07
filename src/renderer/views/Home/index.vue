<template>
<div class="container">
    <!-- style="-webkit-app-region: drag;"  可拖拽区域 -->
    <headerViewer class="header" ></headerViewer>
    
    <div class="main">
        <div class="sidebar">
            <sidebarViewer></sidebarViewer>
        </div>
        <div class="content">
            <!-- <tableViewer></tableViewer> -->
            <router-view></router-view>
        </div>
    </div>
    <footerViewer class="footer"></footerViewer>
</div>

</template>

<script>

import headerViewer from '@/views/header'
import tableViewer from '@/views/MusicTable'
import sidebarViewer from '@/views/sidebar'
import footerViewer from '@/views/footer'

export default {
  name: 'Home',
  components: {
    headerViewer,
    tableViewer,
    footerViewer,
    sidebarViewer
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style>
  
  .container {
        margin: 0;
        left: 0;
    }
     .header {
        /* width: 100%; */
        height: 54px;
        border-bottom: 1px solid #e4e6e9;
        background: rgb(204, 17, 17);
        margin-left: 0px;
        margin-right: 0px;
    } 
    .footer {
        width: 100%;
        height: 54px;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #e4e6e9;
        background: rgb(241, 238, 238);
    }
    .sidebar {
        position: fixed;
        top: 54px;
        bottom: 54px;
        width: 15%;
        border-right: 1px solid #e4e6e9;
        background-color: #fff;
    }
    .content {
        position: fixed;
        top: 54px;
        right: 0;
        bottom: 54px;
        left: 15.1%;
        overflow-y: auto;
        background-color: #fff;
    }
</style>
