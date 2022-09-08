<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leave"
           @mouseenter="enter">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort"
               v-show="isShow">
            <div class="all-sort-list2"
                 @click="goSearch">
              <div class="item"
                   v-for="(c1, index) in categoryList"
                   :key="c1.categoryId"
                   :class="{ cur: currrentIndex == index }">
                <h3 @mouseenter="current(index)">
                  <a :data-categoryName="c1.categoryName"
                     :data-categoryname1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 2.3级分类 -->
                <div class="item-list clearfix"
                     :style="{
                    display: currrentIndex == index ? 'block' : 'none',
                  }">
                  <div class="subitem"
                       v-for="(c2, index) in c1.categoryChild"
                       :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName"
                           :data-categoryname2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild"
                            :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName"
                             :data-categoryname3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 请求数据（vuex）=> 反显数据 => 三级联动
// 按需引入
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data () {
    return {
      currrentIndex: -1,
      isShow: true,
    };
  },
  mounted () {
    // this.$store.dispatch("categoryList");
    //判断路由地址控制store隐藏
    if (this.$route.path.includes("/search") || this.$route.path.includes("/detail") ) {
    // if (this.$route.path == "/search" || this.$route.path == "/detail") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    goSearch (e) {
      let { categoryname, categoryname1id, categoryname2id, categoryname3id } =
        e.target.dataset;
      // 点击了一级名称（判断不是点击空白）
      if (categoryname) {
        // 设置路由参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 判断点击的是几级目录
        if (categoryname1id) {
          query.category1Id = categoryname1id;
        } else if (categoryname2id) {
          query.category2Id = categoryname2id;
        } else {
          query.category3Id = categoryname3id;
        }
        // 路由跳转
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          // console.log("location", location);
          this.$router.push(location);
        }

      }
    },

    // 鼠标移入
    // current(index){
    //   // this.currrentIndex=index;
    // },
    // 三级联动节流
    current: throttle(function (index) {
      this.currrentIndex = index;
    }, 50),
    // 鼠标移出
    leave () {
      this.currrentIndex = "-1";
      // if (this.$route.path == "/search" || this.$route.path == "/detail") {
        if (this.$route.path.includes("/search")|| this.$route.path.includes("/detail") ) {
        this.isShow = false;
      }
    },
    enter () {
      // if (this.$route.path == "/search" || this.$route.path == "/detail") {
        if (this.$route.path.includes("/search")  || this.$route.path.includes("/detail")) {
        this.isShow = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      // height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }

    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>