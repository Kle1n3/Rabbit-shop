<script lang="ts" setup name="XtxCheckbox">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
console.log(props);

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  // (e: "change", value: boolean): void;
}>();
const change = () => {
  console.log(111);

  emit("update:modelValue", !props.modelValue);
  // emit("change", !props.modelValue);
  console.log(2222);
};
</script>

<template>
  <div @click="change" class="xtx-checkbox">
    <i v-if="modelValue" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span> <slot></slot> </span>
  </div>
</template>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
