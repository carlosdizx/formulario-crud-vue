<template>
  <form @submit.prevent="procesar">
    <input
      type="text"
      class="form-control my-2"
      placeholder="Ingrese nommbre"
      v-model.trim="tarea.nombre"
    />
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        id="check-1"
        v-model="tarea.categorias"
        value="JavaScript"
      />
      <label class="form-check-label" for="check-1">JavaScript</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        id="check-2"
        v-model="tarea.categorias"
        value="NodeJS"
      />
      <label class="form-check-label" for="check-2">NodeJS</label>
    </div>
    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          id="radio-1"
          value="Urgente"
          v-model="tarea.estado"
        />
        <label class="form-check-label" for="radio-1">Urgente</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          id="radio-2"
          value="Relax"
          v-model="tarea.estado"
        />
        <label class="form-check-label" for="radio-2">Relax</label>
      </div>
    </div>
    <div class="mt-2">
      <input class="form-control" type="number" v-model.number="tarea.numero" />
    </div>
    <button
      class="btn btn-dark btn-block mt-2"
      type="submit"
      :disabled="correcto"
    >
      Procesar
    </button>
  </form>
  <hr />
  <p>{{ tarea }}</p>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      tarea: {
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0
      }
    };
  },
  methods: {
    procesar() {
      console.log(this.tarea);
      this.tarea = {
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0
      };
    }
  },
  computed: {
    correcto() {
      return this.tarea.nombre.trim() === "" ? true : false;
    }
  }
};
</script>
