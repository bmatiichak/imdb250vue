<template>
  <PagePreloader />
  <Notification />
  <PosterBg :poster="posterBg" />
  <Header />
  <MoviesList :list="moviesList" @changePoster="onChangePoster" />
  <MoviesPagination
    :current-page="currentPage"
    :per-page="moviesPerPage"
    :total="moviesLength"
    @pageChanged="onPageChanged"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "@/components/MoviesList";
import PosterBg from "@/components/PosterBg";
import MoviesPagination from "@/components/MoviesPagination";
import PagePreloader from "@/components/PagePreloader";
import Header from "@/components/Header";
import Notification from "@/components/Notification";

export default {
  name: "HomeView",
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    PagePreloader,
    Header,
    Notification,
  },
  data: () => ({
    posterBg: "",
  }),
  computed: {
    ...mapGetters("moviesStore", [
      "moviesList",
      "currentPage",
      "moviesPerPage",
      "moviesLength",
    ]),
  },
  watch: {
    "$route.query": {
      handler: "onPageQueryChange",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions("moviesStore", ["changeCurrentPage"]),
    onPageQueryChange({ page = 1 }) {
      this.changeCurrentPage(Number(page));
    },
    onChangePoster(poster) {
      this.posterBg = poster;
    },
    onPageChanged(page) {
      this.$router.push({ query: { page } });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Arial, Helvetica, Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
