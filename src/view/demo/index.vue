<template>
  <div class="demo">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
    />
    <router-view />
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  components: {
    [NavBar.name]: NavBar
  },

  data() {
    return {
      title: this.$route.meta.title || 'demo'
    };
  },

  created() {},

  methods: {
    onClickLeft() {
      // window.$router = this.$router;
      // return;
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
</style>
