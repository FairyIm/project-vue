import { reqSearchList } from '@/api'

// state：仓库存储数据
const state = {
    searchList: {}
};
// mutations:修改state的唯一手段
const mutations = {
    SEARCHLIST (state, searchList) {
        state.searchList = searchList
    }
};
// actions:书写业务逻辑、处理异步
const actions = {
    async getSearchList ({ commit }, params = {}) {
        let res = await reqSearchList(params);
        // console.log(res);
        if (res.code == "200") {
            commit('SEARCHLIST', res.data)
        }
    }
};
// getters:计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
    goodsList (state) {
        // 服务器数组回来返回是个数组，若网络不行返回undefined
        return state.searchList.goodsList || []
    },
    attrsList (state) {
        return state.searchList.attrsList || []
    },
    trademarkList (state) {
        return state.searchList.trademarkList || []
    },

};

export default {
    state,
    mutations,
    actions,
    getters
}
