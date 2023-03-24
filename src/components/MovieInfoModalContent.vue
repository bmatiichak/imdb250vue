<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="movie-info-wrapper">
    <header class="movie-info-header">
      <h4 class="movie-header-title">Movie view</h4>
      <BIconX class="close-icon" @click="closeModal" />
    </header>
    <div class="movie-info-content">
      <BRow>
        <BCol sm="4">
          <div class="movie-poster-wrapper">
            <div class="movie-poster" :style="posterStyle"></div>
          </div>
        </BCol>
        <BCol sm="8">
          <h4 class="movie-title">{{ movie.Title }}</h4>
          <BFormRating
            class="movie-rating"
            v-model="movie.imdbRating"
            readonly
            show-value
            precision="1"
            stars="10"
            show-value-max
            no-border
          />
          <p class="movie-description">{{ movie.Plot }}</p>
          <div class="mt-3 mb-4 movie-badges">
            <BBadge class="bg-success">{{ movie.Year }}</BBadge>
            <BBadge class="bg-success">{{ movie.Runtime }}</BBadge>
            <BBadge class="bg-success">{{ movie.Genre }}</BBadge>
            <BBadge class="bg-success">{{ movie.Language }}</BBadge>
          </div>
          <table class="table small">
            <tbody>
              <tr>
                <th>Box Office</th>
                <td>{{ movie.BoxOffice }}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{{ movie.Country }}</td>
              </tr>
              <tr>
                <th>Director</th>
                <td>{{ movie.Director }}</td>
              </tr>
              <tr>
                <th>Writer</th>
                <td>{{ movie.Writer }}</td>
              </tr>
              <tr>
                <th>Actors</th>
                <td>{{ movie.Actors }}</td>
              </tr>
              <tr>
                <th>Awards</th>
                <td>{{ movie.Awards }}</td>
              </tr>
            </tbody>
          </table>
        </BCol>
      </BRow>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieInfoModalContent",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    defaultPosterBg:
      "linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(85, 15, 117) 100%)",
  }),
  computed: {
    posterStyle() {
      return {
        "background-image": this.posterBg,
      };
    },
    posterBg() {
      return this.movie ? `url(${this.movie.Poster})` : this.defaultPosterBg;
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.movie-info-header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(85, 15, 117) 100%);
  color: #fff;
}

.movie-header-title {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.25rem;
}

.movie-info-content {
  padding: 1rem;
  background-color: #fff;
}

.movie-poster-wrapper {
  position: relative;
  padding-bottom: 150%;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.movie-poster {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
}

.movie-title {
  font-size: 2rem;
  font-weight: 300;
  line-height: 1.2;
}

.movie-rating.b-rating {
  padding: 0;
  flex-wrap: wrap;
  &:focus {
    box-shadow: none;
  }
}
.movie-rating :deep(.b-rating-star),
.movie-rating :deep(.b-rating-value) {
  justify-content: flex-start;
  flex-grow: 0 !important;
  font-size: 1.2rem;
  padding: 0;
}

.movie-rating :deep(.b-rating-star) {
  padding: 0 0.1rem;
}

.movie-rating :deep(.b-rating-value) {
  font-weight: 400;
  margin-left: 5px;
}

.movie-rating :deep(.b-rating-star .b-rating-icon) {
  color: #f5c518;
}

.movie-description {
  font-size: 1.2rem;
  font-weight: 300;
}

.movie-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.close-icon {
  font-size: 24px;
  cursor: pointer;
}
</style>
