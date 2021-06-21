<template>
  <table class="table table-dark table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Categorías</th>
        <th scope="col">Estado</th>
        <th scope="col">Número</th>
        <th scope="col">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tarea, index) in tareas" :key="tarea.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ tarea.nombre }}</td>
        <td>{{ tarea.categorias.join(", ") }}</td>
        <td>{{ tarea.estado }}</td>
        <td>{{ tarea.numero }}</td>
        <td>
          <a class="btn btn-warning btn-sm">editar</a>
          <a class="btn btn-danger btn-sm" @click="deleteTareas(tarea.id)"
            >elimiar</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["tareas"])
  },
  methods: {
    ...mapActions(["deleteTareas"])
  }
};
</script>
