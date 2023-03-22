<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Notification",
  computed: {
    ...mapGetters(["msgPool"]),
  },
  watch: {
    msgPool: "showNotification",
  },
  methods: {
    showNotification({ variant, msg, title }) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: 2000,
        toastClass: "toasty",
      });
    },
  },
};
</script>

<style lang="scss">
.toasty.toast:not(.show) {
  display: block;
}
.toast-header {
  justify-content: space-between;
  > .close {
    background: transparent;
    border: none;
    font-size: 16px;
    line-height: 16px;
  }
}
</style>
