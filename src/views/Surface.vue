<template>
  <div class="surface">
    <h1>Calcul de la Surface</h1>
    <!-- <button v-on:click="onclick">Utiliser la géolocalisation</button> -->
    <RadioButtons :radioProps="radioProps" />
    <button v-if="choice === 'geolocation'" v-on:click="onclick">
      Utiliser la géolocalisation
    </button>
    <TextInput :props="propBoth" v-if="choice === 'coordinates'" />
    <TextInput :props="propsAdress" v-if="choice === 'address'" />
    <div v-if="error != ''" class="error">{{ this.error }}</div>
    <div v-if="gettingLocation">
      Récupération des données de géolocalisation
    </div>
    <div v-if="loading">Calcul de la surface en cours ...</div>
    <div v-if="this.fetched">Surface estimée : {{ this.result }} m²</div>
    <img v-if="this.fetched" :src="baseURL + this.fileName" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Emit } from "vue-property-decorator";
import TextInput from "../components/TextInput.vue";
import RadioButtons from "../components/RadioButtons.vue";
import { estimateSurface, SurfaceOutput } from "../services/surface_service";
import { baseURL } from "../utils";

@Component({ components: { TextInput, RadioButtons } })
export default class Surface extends Vue {
  @Provide() baseURL = baseURL;
  @Provide() result = 0;
  @Provide() coords = "";
  @Provide() fileName = "";
  @Provide() fetched = false;
  @Provide() loading = false;
  @Provide() choice = "";
  @Provide() error = "";
  @Provide() gettingLocation = false;
  @Provide() location = { latitude: 0, longitude: 0 };
  @Provide() propBoth = {
    placeholder: "Longitude, Latitude",
    onSubmit: (input: string) => {
      this.onSubmit(input);
    },
    unite: "°E, °N",
    before: "Longitude, Latitude",
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
        id: "geolocation",
        label: "Géolocalisation",
      },
      { id: "coordinates", label: "Coordonnées" },
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
    let info = "";
    let route = "";
    if (this.choice === "coordinates") {
      info = input;
      route = this.choice;
    } else if (this.choice === "address") {
      console.log(input);
      info = input;
      route = this.choice;
    } else if (this.choice === "geolocation") {
      info = input;
      route = "coordinates";
    }
    this.error = "";
    this.loading = true;
    this.fetched = false;
    await estimateSurface({ type: route, info: info })
      .then((res: SurfaceOutput) => {
        this.result = Math.round(res.surface);
        this.coords = res.coordinates;
        this.fileName = res.fileName;
      })
      .catch((error) => {
        this.loading = false;
        this.error = error;
      });
    console.log(this.fileName)
    this.fetched = true;
    this.loading = false;
  }
  @Emit()
  onclick() {
    this.gettingLocation = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.gettingLocation = false;
        this.location = pos.coords;
        this.choice = "geolocation";
        this.onSubmit(
          this.location.longitude.toString() +
            "," +
            this.location.latitude.toString()
        );
      },
      (err) => {
        this.gettingLocation = false;
        this.error = err.message;
      }
    );
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
.error {
  color: red;
}
img {
  width: auto;
}
</style>
