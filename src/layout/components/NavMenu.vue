<template>
  <el-menu
    class="nav-menu"
    :default-active="activeMenu"
    :collapse="isCollapse"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="false"
    :active-text-color="variables.menuActiveText"
    :collapse-transition="false"
    mode="horizontal"
  >
    <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.scss';

export default {
  name: 'NavMenu',
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>

