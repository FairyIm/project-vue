<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <Recommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="(item,index) in floorList" :key="item.id" :list="item"/>
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav";
import ListContainer from "@/pages/Home/ListContainer";
import Brand from "@/pages/Home/Brand";
import Floor from "@/pages/Home/Floor";
import Like from "@/pages/Home/Like";
import Rank from "@/pages/Home/Rank";
import Recommend from "@/pages/Home/Recommend";
import { mapState } from 'vuex';
export default {
  name: "Home",
  components: {
    TypeNav,
    ListContainer,
    Brand,
    Floor,
    Like,
    Rank,
    Recommend,
  },
  data(){
    return{
    }
  },
  mounted () {
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList
    })
  },
};
</script>

<style>
</style>