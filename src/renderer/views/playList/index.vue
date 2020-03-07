<template>
  <el-table
    :data="playList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%" size="mini" :cell-style="rowClass" :header-cell-style="headClass">
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
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="搜索"/>
      </template>
      <template slot-scope="scope">
        <i title="播放" style="cursor:pointer" class="el-icon-caret-right" @click="handlePlay(scope.row)"></i>
        &nbsp;&nbsp;
        <i title="删除" style="cursor:pointer" class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></i>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        search: ''
      }
    },
    methods: {
        handlePlay(row){
            this.$store.dispatch('getSongUrlByRow', row)
        },
        formatTime(row,column,time){
            let it = parseInt(time/1000)
            let m = parseInt(it/60)
            let s = parseInt(it%60)
            return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
        },
        handleDelete(index, row) {
            console.log("handleDelete-->row:"+row);
            this.$store.commit('REMOVE_PLAYLIST', index)
        },
        tableHeaderStyle ({row, column, rowIndex, columnIndex}) {
            return 'background-color:#1989fa;'+
                    'color:#fff;'+
                    'height:30px;'
        },
      // 表头样式设置
        headClass () {
            return 'text-align: center;background:#eef1f6;'
        },
        // 表格样式设置
        rowClass () {
            return 'text-align: center;'
        }
    },
    computed: {
      playList() {
        return this.$store.getters.playList;
      }
    }
  }
</script>