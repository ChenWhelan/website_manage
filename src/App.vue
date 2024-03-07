<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
import Welcome from './views/Welcome.vue'

/* import HomeIndex from './page/HomeIndex.vue' */
/* import AboutSchool from './page/AboutSchool.vue' */



export default {
  name: 'App',
  components: {
    Welcome
/*     HomeIndex, */
/*     AboutSchool */
}
}
</script>
