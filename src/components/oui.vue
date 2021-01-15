<template>
  <div class="radio">
    <span v-for="props in radioProps.choices" :key="props.id">
      <input type="radio" :id="props.id" :value="props.id" v-model="input" />
      <label :for="props.id">{{ props.label }} </label>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";

interface RadioProps {
  choice: { id: string; label: (input: string) => void }[];
  method: (input: string) => void;
}

@Component
export default class RadioButtons extends Vue {
  @Prop() radioProps!: RadioProps;

  @Provide() input = "";

  @Watch("input")
  onInputChanged(val: string) {
    this.radioProps.method(val);
  }
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
