<template>
  <div class="surface">
    <h1>Calcul de la Surface</h1>
    <RadioButtons :radioProps="radioProps" />
    <TextInput :props="propBoth" v-if="choice === 'coords'" />
    <TextInput :props="propsAdress" v-if="choice === 'address'" />
    <div v-if="loading">Loading</div>
    <div v-if="this.fetched">{{ this.result }} m²</div>
    <img
      v-if="this.fetched"
      :src="baseURL + '/static/' + coords.trim() + '_plotted' + '.png'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Emit } from "vue-property-decorator";
import TextInput from "../components/TextInput.vue";
import RadioButtons from "../components/oui.vue";
import { estimateSurface, SurfaceOutput } from "../services/surface_service";
import { baseURL } from "../utils";

@Component({ components: { TextInput, RadioButtons } })
export default class Surface extends Vue {
  @Provide() baseURL = baseURL;
  @Provide() result = 0;
  @Provide() coords = "";
  @Provide() fetched = false;
  @Provide() loading = false;
  @Provide() choice = "";
  @Provide() propBoth = {
    placeholder: "Latitude, Longitude",
    onSubmit: (input: string) => {
      this.onSubmit(input);
    },
    unite: "°E, °N",
    before: "Latitude, Longitude",
  };
  @Provide() propsAdress = {
    placeholder: "1 rue des Pissenlits, 75000 Paris",
    onSubmit: (input: string) => {
      this.onSubmit(input);
    },
    unite: "",
    before: "Entrez l'adresse",
  };
  @Provide() radioProps = {
    choices: [
      {
        id: "address",
        label: "Adresse",
      },
      {
        id: "coords",
        label: "Coordonnées",
      },
    ],
    method: this.onRadioChange,
  };
  @Emit()
  onRadioChange(input: string) {
    this.fetched = false;
    this.choice = input;
  }
  @Emit()
  async onSubmit(input: string) {
    let info = "( , , )";
    if (this.choice === "coords") {
      const coordinates = "(" + input.trim() + ")";
      info = "(address;1;" + coordinates + ")";
    } else if (this.choice === "address") {
      console.log(input);
      info = "(" + input + ";1;(0,0))";
    }
    this.loading = true;
    this.fetched = false;
    await estimateSurface({ info: info }).then((res: SurfaceOutput) => {
      this.result = Math.round(res.surface);
      this.coords = res.coordinates;
      console.log(this.coords);
    });
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
