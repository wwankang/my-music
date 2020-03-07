<template>
    <el-autocomplete size="small"
      class="inline-input"
      v-model="keywords"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @keyup.enter.native="search()"
      @select="handleSelect"
      :suffix-icon="icon_class">
        <template slot-scope="{ item }" size="mini">
            <span class="name">{{ item.name }}</span>
            <span class="addr">{{ item.artists[0].name }}</span>
        </template>  
    </el-autocomplete>
</template>
<script>

import {searchSuggest} from '@/api/search'

export default {
    data(){
        return {
            keywords:"",
            icon_class:"el-icon-search"
        }
    },
    methods: {
        async querySearchAsync(keywords, cb) {
            const result = await searchSuggest(keywords);
            console.log(result)
            if(result){
                cb(result.result.songs)
            }
        },
        handleSelect(item) {
            console.log(item);
            this.keywords = item.name
            this.search()
        },
        search(){
            console.log("search "+this.keywords)
            if(this.keywords!==""){
                var name = this.keywords;
                this.icon_class = "el-icon-loading"
                this.$store.dispatch('setSongList', name).then(() => {
                    this.icon_class = "el-icon-search"
                    this.$router.push({path: '/searchMusic'})
                }).catch((err) => {
                    this.icon_class = "el-icon-search"
                })
            }
        }
        
    }
    
}
</script>
<style>
    .inline-input {
        margin-top: 10px
    }
</style>
