<template>
  <div class="home">
    <h1>Some Header</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HomeView",
  mounted() {
    this.fetchMovies();
  },
  methods: {
    ...mapActions("moviesStore", ["fetchMovies"]),
  },
};
</script>
