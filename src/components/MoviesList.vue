<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <BContainer class="movie-container">
    <h3 class="list-title">{{ listTitle }}</h3>
    <BRow>
      <template v-if="ifExists">
        <BCol cols="6" md="4" lg="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="onMouseOver(movie.Poster)"
            @removeItem="onRemoveItem"
            @showModal="onShowMovieInfo"
          />
        </BCol>
      </template>
      <template v-else>
        <h2>Oooops. There are no movies...</h2>
      </template>
    </BRow>
    <BModal
      modal-class="movie-modal"
      :id="movieInfoModalID"
      size="xl"
      hide-footer
      hide-header
    >
      <MovieInfoModalContent
        :movie="selectedMovie"
        @closeModal="onCloseModal"
      />
    </BModal>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "./MovieItem";
import MovieInfoModalContent from "./MovieInfoModalContent";

export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    movieInfoModalID: "movie-info",
    selectedMovieId: "",
  }),
  components: {
    MovieItem,
    MovieInfoModalContent,
  },
  computed: {
    ...mapGetters("moviesStore", ["isSearchActive"]),
    ifExists() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearchActive ? "Your search result:" : "IMDB Top 250";
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null;
    },
  },
  methods: {
    ...mapActions("moviesStore", ["removeMovie"]),
    ...mapActions(["showNotify"]),
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Are you deleting ${title}?`
      );
      if (isConfirmed) {
        console.log(id);
        this.removeMovie(id);
        this.showNotify({
          msg: "Movie has been deleted from your list",
          variant: "success",
          title: "Success!",
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieId = id;
      this.$bvModal.show(this.movieInfoModalID);
    },
    onCloseModal() {
      this.selectedMovieId = null;
      this.$bvModal.hide(this.movieInfoModalID);
    },
  },
  emits: ["changePoster"],
};
</script>

<style lang="scss" scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}

.movie-container {
  margin-bottom: 30px;
}
</style>

<style lang="scss">
.movie-modal {
  .modal-body {
    padding: 0;
  }
}
</style>
