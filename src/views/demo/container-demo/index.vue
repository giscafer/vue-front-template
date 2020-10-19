<template>
  <page-container :aside-width="300">
    <template v-slot:aside>
      <h3>aside</h3>
    </template>
    <template v-slot:title>
      <span>柳州一致白阳药店-月度-规模洞察</span>
    </template>
    <template v-slot:content>
      <h3>content</h3>
    </template>
  </page-container>
</template>
<script>
export default {
  name: 'ContainerDemo',
  props: {},
  data() {
    return {
      obj: {}
    };
  },
  created() {},
  mounted() {
    console.log('可选链特性支持：' + this.obj?.name?.first);
  },
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
