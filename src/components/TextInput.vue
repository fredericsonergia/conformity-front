<template>
  <div class="input">
    {{ propA.before }}
    <input type="text" v-model="input" :placeholder="propA.placeholder" />
    {{ propA.unite }}
    <button v-on:click="propA.onSubmit(input)">Envoyer</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";

interface InputProps {
  placeholder: string;
  onSubmit: (input: string) => void;
  unite: string;
  before: string;
}

@Component
export default class TextInput extends Vue {
  @Prop() propA!: InputProps;

  @Provide() input = "";
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
