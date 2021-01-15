<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Pour plus d'informations sur le calcul de la surface et les algorithmes
      d'intelligence artificielle mis en jeu, <br />veuillez vous référer à la
      <a
        href="https://gitlab.paris-digital-lab.com/sonergia-conformity"
        target="_blank"
        rel="noopener"
        >documentation</a
      >.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
