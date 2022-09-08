import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
//3. state：仓库存储数据
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
};
//2. mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST (state, categoryList) {
        state.categoryList = categoryList;
    },
    BANNERLIST (state, bannerList) {
        state.bannerList = bannerList;
    },
    FLOORLIST (state, floorList) {
        state.floorList = floorList;
    }
};
//1. actions:书写业务逻辑、处理异步
const actions = {
    async categoryList ({ commit }) {
        let res = await reqCategoryList();
        // console.log(res);
        if (res.code == "200") {
            commit('CATEGORYLIST', res.data);
        }
    },
    async getBannerList ({ commit }) {
        let res = await reqGetBannerList();
        // console.log(res);
        if (res.code == "200") {
            commit('BANNERLIST', res.data);
        }
    },
    async getFloorList ({ commit }) {
        let res = await reqGetFloorList();
        // console.log(res);
        if (res.code == "200") {
            commit('FLOORLIST', res.data);
        }
    }

};
// getters:计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}
