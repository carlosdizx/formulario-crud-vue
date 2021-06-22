<template>
  <h1>Formulario</h1>
  <form @submit.prevent="procesarFormulario" class="my-5">
    <input
      v-model.trim="userTempalte.email"
      class="form-control my-2"
      type="email"
      placeholder="Email"
    />
    <input
      v-model.trim="userTempalte.password1"
      class="form-control my-2"
      type="password"
      placeholder="Contraseña"
    />
    <input
      class="form-control my-2"
      type="password"
      placeholder="Confirme contraseña"
      v-model.trim="userTempalte.password2"
    />
    <button class="btn btn-success" type="submit" :disabled="bloquearBoton">
      Registrar
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Registro",
  data: () => ({
    userTempalte: {
      email: "carlosbiche98@gmail.com",
      password1: "7423102ca",
      password2: "7423102ca"
    }
  }),
  computed: {
    bloquearBoton() {
      return (
        !this.userTempalte.email.includes("@") ||
        this.userTempalte.password1.length < 6 ||
        this.userTempalte.password2.length < 6 ||
        this.userTempalte.password1 !== this.userTempalte.password2
      );
    }
  },
  methods: {
    ...mapActions(["registrarUsuario"]),
    procesarFormulario() {
      this.registrarUsuario({
        email: this.userTempalte.email,
        password: this.userTempalte.password1
      });
      this.userTempalte = {
        email: "",
        password1: "",
        password2: ""
      };
    }
  }
};
</script>

<style scoped></style>
