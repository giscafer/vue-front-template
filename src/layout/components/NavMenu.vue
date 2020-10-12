<template>
  <el-menu
    class="nav-menu"
    mode="horizontal"
    :router="true"
    :default-active="activeIndex"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="false"
    :active-text-color="variables.menuActiveText"
    @select="handleSelect"
  >
    <el-menu-item index="/dashboard">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="/demo">
      <template slot="title">Demo</template>
      <el-menu-item index="table">Table</el-menu-item>
      <el-menu-item index="drag-table">Drag Table</el-menu-item>
      <el-menu-item index="permission">Permission</el-menu-item>
    </el-submenu>
    <el-menu-item index="4">
      <a href="http://gitlab.sinohealth.cn/share-code/vue-front-template" target="_blank">源码</a>
    </el-menu-item>
  </el-menu>
</template>
<script>
import variables from '@/styles/variables.scss';
export default {
  name: 'NavMenu',
  data() {
    return {
      activeIndex: 'dashboard'
    };
  },
  computed: {
    variables() {
      return variables;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.nav-menu {
  // display: inline-block;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
