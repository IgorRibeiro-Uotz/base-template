<template>
  <component :is="resolveLayoutVariant">
    <router-view></router-view>
  </component>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/home">home</router-link> |
      <router-link to="/">dash</router-link> |
      <AcsTextButton />
    </div>
    <router-view />
  </div> -->
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {
    LayoutBlank: () => import("@/@core/layouts/LayoutBlank"),
    LayoutContentVerticalNav: () =>
      import("@/@core/layouts/LayoutContentVerticalNav"),
  },
  computed: {
    resolveLayoutVariant() {
      let layoutComponent;

      switch (this.$route.meta.layout) {
        case "blank":
          layoutComponent = "layout-blank";
          break;

        default:
          layoutComponent = "layout-content-vertical-nav";
          break;
      }
      return layoutComponent;
    },
  },
};
</script>

<style lang="scss"></style>
