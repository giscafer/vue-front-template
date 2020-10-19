<template>
  <div class="flex">
    <div class="aside" :style="{ width: asideWidth + 'px' }">
      <slot name="aside"></slot>
    </div>
    <div class="page-container">
      <p v-if="$slots.title" class="title"><slot name="title"></slot></p>
      <div class="page-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageContainer',
  props: {
    asideWidth: {
      type: Number,
      default: 280
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.flex {
  display: relative;
  .aside {
    width: 280px;
    padding: 20px 0 0 24px;
    position: relative;
    overflow: hidden;
    height: calc(100vh - #{$navBarHeight});
    box-sizing: border-box;
    background: #fff;
  }
  .page-container {
    width: calc(100% - 50px);
    background: #fff;
    margin: 0 24px 0 24px;
    .title {
      text-align: center;
      font-size: 24px;
    }
  }
}
</style>
