<template>
    <el-menu
      :default-active="this.$route.path"
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <i class="el-icon-headset"></i>
          <span> {{ item.navItem }}</span>
        </template>

      </el-menu-item>


    </el-menu>
</template>

<script>
  export default {
      data() { 
        return { 
            navList:[ 
            {name:'/findMusic',navItem:'发现音乐'}, 
          
            ] } 
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>