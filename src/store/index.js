import { createStore } from "vuex";
import router from "../router";

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
    cargar(state, payload) {
      state.tareas = payload;
    },
    set(state, payload) {
      state.tareas.push(payload);
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload);
    },
    tarea(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push("/");
        return;
      }
      state.tarea = state.tareas.find(item => item.id === payload);
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item =>
        item.id === payload.id ? payload : item
      );
      router.push("/");
    }
  },
  actions: {
    async cargarTareas({ commit }) {
      try {
        const response = await (
          await fetch(
            "https://udemy-api-arena-default-rtdb.firebaseio.com/tareas.json"
          )
        ).json();
        const array = [];
        for (const id in response) {
          array.push(response[id]);
        }
        commit("cargar", array);
      } catch (error) {
        console.log(error);
      }
    },
    async setTareas({ commit }, tarea) {
      try {
        const response = await fetch(
          `https://udemy-api-arena-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(tarea)
          }
        );
        const dataDB = await response.json();
        console.log(dataDB);
      } catch (error) {
        console.log(error);
      }
      commit("set", tarea);
    },
    async deleteTareas({ commit }, id) {
      try {
        await fetch(
          `https://udemy-api-arena-default-rtdb.firebaseio.com/tareas/${id}.json`,
          {
            method: "DELETE"
          }
        );
      } catch (e) {
        console.log(e);
      }
      commit("eliminar", id);
    },
    setTarea({ commit }, id) {
      commit("tarea", id);
    },
    async updateTarea({ commit }, tarea) {
      try {
        const response = await (
          await fetch(
            `https://udemy-api-arena-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(tarea)
            }
          )
        ).json();
      } catch (e) {
        console.log(e);
      }
      commit("update", tarea);
    }
  },
  modules: {}
});
