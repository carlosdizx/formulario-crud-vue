<template>
  <h1>Formulario</h1>
  <form class="my-5">
    <input
      v-model.trim="email"
      class="form-control my-2"
      type="email"
      placeholder="Email"
    />
    <input
      v-model.trim="password1"
      class="form-control my-2"
      type="password"
      placeholder="Contraseña"
    />
    <input
      class="form-control my-2"
      type="password"
      placeholder="Confirme contraseña"
      v-model.trim="password2"
    />
    <button class="btn btn-success" type="submit" :disabled="bloquearBoton">
      Registrar
    </button>
  </form>
</template>

<script>
export default {
  name: "Registro",
  data: () => ({
    email: "",
    password1: "",
    password2: ""
  }),
  computed: {
    bloquearBoton() {
      return (
        !this.email.includes("@") ||
        this.password1.length < 6 ||
        this.password2.length < 6 ||
        this.password1 !== this.password2
      );
    }
  }
};
</script>

<style scoped></style>
