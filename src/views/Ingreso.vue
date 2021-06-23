<template>
  <h1 class="my-5">Ingreso de Usuarios</h1>
  <div class="alert alert-danger" v-if="error.tipo !== null">
    {{ error.message }}
  </div>
  <form @submit.prevent="procesarFormulario">
    <input
      type="email"
      placeholder="email"
      class="form-control my-2"
      v-model.trim="email"
      :class="[error.tipo === 'email' ? 'is-invalid' : '']"
    />
    <input
      type="password"
      placeholder="password"
      class="form-control my-2"
      v-model.trim="pass1"
      :class="[error.tipo === 'password' ? 'is-invalid' : '']"
    />
    <button type="submit" class="btn btn-primary" :disabled="bloquear">
      Ingresar
    </button>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      pass1: ""
    };
  },
  computed: {
    ...mapState(["error"]),
    bloquear() {
      if (!this.email.includes("@")) {
        return true;
      }
      return this.pass1.length <= 5;
    }
  },
  methods: {
    ...mapActions(["ingresoUsuario"]),
    async procesarFormulario() {
      await this.ingresoUsuario({ email: this.email, password: this.pass1 });
      if (this.error.tipo === null) {
        this.email = "";
        this.pass1 = "";
      }
    }
  }
};
</script>
