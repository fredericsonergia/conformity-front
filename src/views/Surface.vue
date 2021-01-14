<template>
  <div class="surface">
    <h1>C'est la Surface</h1>
    <TextInput :propA="propBoth" />
    <div v-if="loading">Loading</div>
    <div v-if="this.fetched">{{ this.result }} m²</div>
    <img
      v-if="this.fetched"
      :src="baseURL + '/static/' + coords + '_plotted' + '.png'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Emit } from "vue-property-decorator";
import TextInput from "../components/TextInput.vue";
import { estimateSurface } from "../services/surface_service";
import { baseURL } from "../utils";

@Component({ components: { TextInput } })
export default class Surface extends Vue {
  @Provide() baseURL = baseURL;
  @Provide() result = 0;
  @Provide() coords = "";
  @Provide() fetched = false;
  @Provide() loading = false;
  @Provide() propBoth = {
    placeholder: "Latitude, Longitude",
    onSubmit: (input: string) => {
      this.onSubmit(input);
    },
    unite: "°E, °N",
    before: "Latitude, Longitude",
  };

  @Emit()
  async onSubmit(input: string) {
    console.log("yes");
    const coordinates = "(" + input.trim() + ")";
    const info = "('address',1," + coordinates + ")";
    this.loading = true;
    await estimateSurface({ info: info }).then(
      (res: number) => (this.result = Math.round(res))
    );
    this.coords = input;
    this.fetched = true;
    this.loading = false;
  }
}
</script>

<style scoped>
/* .surface {
  display: flex;
  flex-direction: column;
  align-it: start;
} */
.inputsContainer {
  display: flex;
  justify-content: space-around;
}
</style>
