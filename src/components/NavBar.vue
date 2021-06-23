<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">
      Formularios
    </router-link>
    <div class="d-flex">
      <router-link v-if="userAutenticado" class="btn btn-dark" to="/">
        Tareas
      </router-link>
      <router-link  @click="cerrarSession" v-if="userAutenticado" class="btn btn-danger" to="/ingreso">
        Cerrar sesion
      </router-link>
      <router-link v-if="!userAutenticado" class="btn mr-2 btn-success" to="/ingreso">
        Iniciar sesion
      </router-link>
      <router-link v-if="!userAutenticado" class="btn btn-primary" to="/registro">
        Registrar
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["userAutenticado"])
  },
  methods:{
    ...mapActions(['cerrarSession'])
  }
};
</script>
