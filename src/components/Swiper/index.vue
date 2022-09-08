<template>
  <div class="swiper-container"
       ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(item,index) in list"
           :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: "Swiper",
  props: ['list'],
  watch: {
    // 监听bannerList数据的变化
    list: {
      immediate: true,
      handler (newValue, oldValue) {
        // 如果执行handler方法，代表组件
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    }
  }
}
</script>

<style>
</style>