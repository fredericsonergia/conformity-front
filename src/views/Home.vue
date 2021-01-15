<template>
  <div class="accueil">
    <img
      alt="logo sonergia"
      src="../assets/cropped-LOGO_Sonergia-2020_inline.png"
    />
    <HelloWorld
      msg="Bienvenue sur l'application de vérification de la conformité"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.accueil > img {
  max-width: 50% !important;
}
</style>
