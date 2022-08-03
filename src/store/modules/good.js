import { getAllCates } from "@/api/good";

const state = {
  options: [],
};

const mutations = {
  setOptions(state, arr) {
    state.options = arr;
  },
};

const actions = {
  getOptions({ commit }) {
    getAllCates().then((res) => {
      commit("setOptions", res.data.list);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
