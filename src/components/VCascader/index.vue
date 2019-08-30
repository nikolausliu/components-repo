<template>
  <div class="v-cascader">
    <div :class="{'v-cascader__hd': true, 'v-cascader__hd--noradius': !radius}">
      <div class="v-cascader__title" v-if="title">{{title}}</div>
      <div class="v-cascader__menus">
        <div
          :class="{'v-cascader__menu': true, [menuActiveClass]: currentColumnIndex === index}"
          v-for="(menu, index) in menus"
          :key="index"
          @click="onSelectMenu(index)"
        >{{menu}}</div>
      </div>
    </div>
    <div class="v-cascader__bd">
      <div class="v-cascader__list">
        <div class="v-cascader__option">
          <div
            :class="{'v-cascader__item': true, [itemActiveClass]: localValue[currentColumnIndex] === column.value}"
            v-for="(column, index) in columns[currentColumnIndex]"
            :key="index"
            @click="onSelectItem(index)"
          >
            <van-icon name="success" v-if="localValue[currentColumnIndex] === column.value"></van-icon>
            <span>{{column.label}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
import { recursiveQueryInMatrix } from "@/utils/utils";
const defaultFieldNames = {
  label: "label",
  value: "value",
  children: "children"
};

export default {
  name: "v-cascader",

  components: {
    [Icon.name]: Icon
  },

  created() {
    this.init();
  },

  data() {
    return {
      // 多列选中的value值集合
      localValue: [],
      // 多列选中的value对应的文字集合
      menus: [],
      // 多列源数据集合
      columns: [],
      // 多列选中的index集合
      columnIndexs: [],
      // 当前展示第几列数据
      currentColumnIndex: 0
    };
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    defaultFieldNames: {
      type: Object,
      default: () => defaultFieldNames
    },
    title: {
      type: String,
      default: ""
    },
    chooseTitle: {
      type: String,
      default: "请选择"
    },
    menuActiveClass: {
      type: String,
      default: "v-cascader__menu--active"
    },
    itemActiveClass: {
      type: String,
      default: "v-cascader__item--active"
    },
    radius: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    init() {
      // 初始化
      const LABEL = this.defaultFieldNames.label;
      const VALUE = this.defaultFieldNames.value;
      const CHILDREN = this.defaultFieldNames.children;

      this.localValue = this.value;
      if (this.localValue.length === 0) {
        this.currentColumnIndex = 0;
        this.columns = [this.options];
        this.menus = [this.chooseTitle];
      } else {
        this.currentColumnIndex = this.localValue.length - 1;
        this.columns.push(this.options);
        this.localValue.forEach((val, index) => {
          const foundItem = recursiveQueryInMatrix(val, this.options, {
            VALUE,
            CHILDREN
          });
          this.menus.push(foundItem[LABEL]);
          if (
            foundItem.hasOwnProperty([CHILDREN]) &&
            foundItem[CHILDREN].length
          ) {
            this.columns.push(foundItem[CHILDREN]);
          }
        });
      }
    },
    onSelectMenu(index) {
      this.currentColumnIndex = index;
    },
    onSelectItem(index) {
      const LABEL = this.defaultFieldNames.label;
      const VALUE = this.defaultFieldNames.value;
      const CHILDREN = this.defaultFieldNames.children;

      this.columnIndexs.splice(this.currentColumnIndex, 1, index);
      const value = this.columns[this.currentColumnIndex][index][VALUE];
      const label = this.columns[this.currentColumnIndex][index][LABEL];
      this.localValue.splice(this.currentColumnIndex, 1, value);
      this.menus.splice(this.currentColumnIndex, 1, label);
      const foundItem = recursiveQueryInMatrix(
        value,
        this.columns[this.currentColumnIndex],
        { VALUE, CHILDREN }
      );
      if (foundItem.hasOwnProperty([CHILDREN]) && foundItem[CHILDREN].length) {
        if (this.columns.length > this.currentColumnIndex) {
          this.columns.splice(this.currentColumnIndex + 1);
          this.columnIndexs.splice(this.currentColumnIndex + 1);
          this.localValue.splice(this.currentColumnIndex + 1);
          this.menus.splice(this.currentColumnIndex + 1);
        }
        this.columns.push(foundItem[CHILDREN]);
        this.menus.push(this.chooseTitle);
        this.currentColumnIndex = this.currentColumnIndex + 1;
      } else {
        if (this.columns.length > this.currentColumnIndex) {
          this.columns.splice(this.currentColumnIndex + 1);
          this.columnIndexs.splice(this.currentColumnIndex + 1);
          this.localValue.splice(this.currentColumnIndex + 1);
          this.menus.splice(this.currentColumnIndex + 1);
        }
        this.$emit("select-done", {
          value: this.localValue,
          label: this.menus
        });
        this.$emit("input", this.localValue);
      }
    }
  }
};
</script>

<style lang="less">
@red: #e93b3d;
.v-cascader {
  &__hd {
    border-radius: 10px 10px 0 0;
    background: #fff;
    &--noradius {
      border-radius: 0;
    }
  }
  &__title {
    font-size: 18px;
    height: 54px;
    line-height: 54px;
    text-align: center;
  }
  &__menus {
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &__menu {
    margin-right: 25px;
    font-size: 14px;
    &--active {
      color: @red;
    }
  }
  &__bd {
    height: 430px;
    overflow-y: auto;
    background: #fff;
  }
  &__option {
    padding: 0 20px;
  }
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
    &--active {
      color: @red;
    }
    .van-icon {
      margin-right: 5px;
    }
  }
}
</style>
