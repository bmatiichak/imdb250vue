<template>
  <div class="loader-wrapper" v-if="isShowLoader">
    <b-spinner type="grow" variant="light"></b-spinner>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PagePreloader",
  computed: {
    ...mapGetters(["isShowLoader"]),
  },
};
</script>

<style lang="scss" scoped>
.loader-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
