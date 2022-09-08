<template>
  <div class="pagination">
    <button :disabled="pageNum.start == 1" @click="$emit('pagesInfo',pageNo-1)">上一页</button>
    <button v-if="pageNum.start>1" @click="$emit('pagesInfo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="pageNum.start>2">···</button>

    <button v-for="(item,index) in pageNum.end" :key="index" v-show="item >= pageNum.start" @click="$emit('pagesInfo',item)" :class="{active:pageNo == item}">{{item}}</button>

    <button v-if="pageNum.end<totalPage-1">···</button>
    <button v-if="pageNum.end<totalPage" @click="$emit('pagesInfo',totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNum.end == totalPage" @click="$emit('pagesInfo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>

    <!-- <h1>{{pageNum}}---当前页{{pageNo}}---总页数{{ totalPage }}</h1> -->
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continue'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算开始和结束页码
    pageNum() {
      let start = 0
      let end = 0
      // 连续页数大于总页数   4 3
      if (this.continue > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        start = this.pageNo - parseInt(this.continue / 2)
        end = this.pageNo + parseInt(this.continue / 2)

        if (start < 1) start = 1

        if (end > this.totalPage) {
          end = this.totalPage
          start = this.totalPage - this.continue + 1  
        }
      }
      // console.log(start, end, this.totalPage)
      return { start, end }
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  cursor: not-allowed;
  background-color: #409eff;
  color: #fff;
}
</style>