<template>
  <h1 class="my-5">Formularios con Vue.js</h1>

  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>
  <hr />
  <ListaTareas />
</template>

<script>
import { mapActions } from "vuex";
import Input from "../components/Input";
import ListaTareas from "../components/ListaTareas";
const shortid = require("shortid");

export default {
  name: "Home",
  components: { Input, ListaTareas },
  data() {
    return {
      tarea: {
        id: "",
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0
      }
    };
  },
  methods: {
    ...mapActions(["setTareas"]),
    procesarFormulario() {
      if (this.tarea.nombre.trim() === "") {
        console.log("Campo vacío");
        alert("complete el campo nombre");
        return;
      }
      this.tarea.id = shortid.generate();
      this.setTareas(this.tarea);
      this.tarea = {
        id: "",
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0
      };
    }
  }
};
</script>
