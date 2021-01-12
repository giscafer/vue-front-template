<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="showLogo" src="@/assets/images/logo.png" class="sidebar-logo mini" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="showLogo" src="@/assets/images/logo.png" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import settings from '@/settings';
export default {
  name: 'SidebarLogo',
  props: {
    showLogo: {
      type: Boolean,
      default: true
    },
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: settings.title
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: absolute;
  display: inline-block;
  width: 150px;
  height: 50px;
  line-height: $navBarHeight;
  background: $menuBg;
  // background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 60px;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
    .mini {
      width: 50px;
      height: 20px;
    }
  }
}
</style>
