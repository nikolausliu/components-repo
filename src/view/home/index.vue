<template>
  <div class="home">
    <van-cell v-for="(item, index) in list" :key="index" :title="item.title" is-link :to="item.to" />
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },

  data() {
    return {
      list: [
        {
          title: 'Cascader 级联选择器',
          to: '/demo/cascader'
        }
      ]
    };
  },

  created() {
  },

  methods: {
    
  }
};
</script>

<style lang="less">

</style>
