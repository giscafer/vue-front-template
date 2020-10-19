<template>
  <div class="flex">
    <div class="aside"></div>
    <div class="page-container">
      <h3 class="title">柳州一致白阳药店-月度-规模洞察</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContainerDemo',
  props: {},
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
  display: flex;

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
