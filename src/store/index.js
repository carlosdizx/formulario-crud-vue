import { createStore } from "vuex";

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: "",
      nombre: "",
      categorias: [],
      estado: "",
      numero: 0
    }
  },
  mutations: {
    set(state, payload) {
      this.state.tareas.push(payload);
    },
    del(state, payload) {
      state.tareas = state.tareas.filter((value) => value.id !== payload)
    }
  },
  actions: {
    setTareas({ commit }, tarea) {
      commit("set", tarea);
    },
    deleteTareas({ commit }, id) {
      commit("del", id);
    }
  },
  modules: {}
});
