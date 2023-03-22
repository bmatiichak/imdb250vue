<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <BContainer>
    <h3 class="list-title">{{ listTitle }}</h3>
    <BRow>
      <template v-if="ifExists">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="onMouseOver(movie.Poster)"
            @removeItem="onRemoveItem"
          />
        </BCol>
      </template>
      <template v-else>
        <h2>Oooops. There are no movies...</h2>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MovieItem from "./MovieItem";

export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    MovieItem,
  },
  computed: {
    ...mapGetters("moviesStore", ["isSearchActive"]),
    ifExists() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearchActive ? "Your search result:" : "IMDB Top 250";
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
  },
  emits: ["changePoster"],
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>
