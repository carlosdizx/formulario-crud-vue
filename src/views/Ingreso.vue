<template>
  <h1>Login</h1>
  <form @submit.prevent="procesarFormulario" class="my-5">
    <input
      v-model.trim="userTempalte.email"
      class="form-control my-2"
      type="email"
      placeholder="Email"
    />
    <input
      v-model.trim="userTempalte.password"
      class="form-control my-2"
      type="password"
      placeholder="Contraseña"
    />
    <button class="btn btn-success" type="submit" :disabled="bloquearBoton">
      Ingresar
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Ingreso",
  data: () => ({
    userTempalte: {
      email: "carlosbiche98@gmail.com",
      password: "7423102ca"
    }
  }),
  computed: {
    bloquearBoton() {
      return (
        !this.userTempalte.email.includes("@") ||
        this.userTempalte.password.length < 6
      );
    }
  },
  methods: {
    ...mapActions(["ingresoUsuario"]),
    procesarFormulario() {
      this.ingresoUsuario({
        email: this.userTempalte.email,
        password: this.userTempalte.password
      });
    }
  }
};
</script>

<style scoped></style>
