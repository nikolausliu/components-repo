<template>
  <div class="cascader-demo">
    <div class="demo-title">基础用法</div>
    <van-cell-group>
      <van-field
        v-model="label"
        label="配送地址"
        placeholder="请选择配送地址"
        readonly
        @click="cascaderVisible = true"
      />
    </van-cell-group>
    <div class="demo-title">使用初始值、自定义颜色、无圆角</div>
    <van-cell-group>
      <van-field
        v-model="label2"
        label="配送地址"
        placeholder="请选择配送地址"
        readonly
        @click="cascaderVisible2 = true"
      />
    </van-cell-group>
    <van-popup position="bottom" v-model="cascaderVisible">
      <v-cascader title="配送至" v-model="value" :options="areaData" @select-done="onSelectDone"></v-cascader>
    </van-popup>
    <van-popup position="bottom" v-model="cascaderVisible2">
      <v-cascader title="配送至" v-model="value2" :options="areaData" @select-done="onSelectDone2" menu-active-class="menu-on" item-active-class="item-on" :radius="false"></v-cascader>
    </van-popup>
  </div>
</template>

<script>
import { VCascader } from "@/components";
import { Popup, CellGroup, Field } from "vant";
import areaData from "@/utils/data";
import { recursiveQueryInMatrix } from "@/utils/utils";
export default {
  components: {
    [VCascader.name]: VCascader,
    [Popup.name]: Popup,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field
  },

  data() {
    return {
      areaData,

      value: [],
      label: "",
      cascaderVisible: false,

      value2: ["110000", "110100", "110101"],
      label2: "",
      cascaderVisible2: false
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.label2 = this.value2.map(val => recursiveQueryInMatrix(val, this.areaData).label).join('-');
    },
    onSelectDone(payload) {
      this.cascaderVisible = false;
      this.label = payload.label.join("-");
    },
    onSelectDone2(payload) {
      this.cascaderVisible2 = false;
      this.label2 = payload.label.join("-");
    }
  }
};
</script>

<style lang="less">
@blue:#1989fa;
.demo-title {
  padding: 20px 15px 15px;
  color: rgba(69, 90, 100, 0.6);
  font-size: 14px;
}
.van-popup {
  background-color: transparent;
}
.menu-on {
  color: @blue;
}
.item-on {
  color: @blue;
}
</style>
