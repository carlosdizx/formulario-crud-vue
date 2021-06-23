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
    },
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
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
    async registrarUsuario({ commit }, user) {
      try {
        const res = await (
          await fetch(
            "https://identitytoolkit.googleapis.com/v1/" +
              "accounts:signUp?key=AIzaSyDAVDt38rRKtPm-6q9S_H2v0Gq7u_V_wbY",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: user.email,
                password: user.password,
                returnSecureToken: true
              })
            }
          )
        ).json();
        if (res.error) {
          console.log(res.error);
          return;
        }
        commit("setUser", res);
        await router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async ingresoUsuario({ commit }, user) {
      try {
        const res = await (
          await fetch(
            "https://identitytoolkit.googleapis.com/v1/" +
              "accounts:signInWithPassword?key=AIzaSyDAVDt38rRKtPm-6q9S_H2v0Gq7u_V_wbY",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: user.email,
                password: user.password,
                returnSecureToken: true
              })
            }
          )
        ).json();
        if (res.error) {
          return console.log(res.error);
        }
        commit("setUser", res);
        await router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async cargarTareas({ commit, state }) {
      try{
      console.log(state.user)
        const response = await (
          await fetch(
            `https://udemy-api-arena-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`
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
    async setTareas({ commit, state }, tarea) {
      try {
        const response = await fetch(
          `https://udemy-api-arena-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,
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
    async deleteTareas({ commit, state }, id) {
      try {
        await fetch(
          `https://udemy-api-arena-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,
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
    async updateTarea({ commit, state }, tarea) {
      try {
        const response = await (
          await fetch(
            `https://udemy-api-arena-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,
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
  getters: {
    userAutenticado(state) {
      return !!state.user
    }
  },
  modules: {}
});
