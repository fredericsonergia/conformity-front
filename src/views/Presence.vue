<template>
  <div>
    <h1>Présence de la Protection</h1>
    <div v-if="this.failed">Echec du calcul, veuillez recommencer</div>
    <br />
    <FileUploader
      v-if="!this.fetched && !this.loading"
      v-on:fileChange="this.handleFileChange"
    />
    <br />
    <button
      v-if="!this.fetched && !this.loading"
      v-on:click="this.handleSubmit"
    >
      Lancer
    </button>
    <img v-if="this.fetched" :src="dataUrl" />
    <div v-if="this.fetched && this.responsePredict">Il y a une protection</div>
    <div v-if="this.fetched && !this.responsePredict">
      Il n'y a pas de protection
    </div>
    <div v-if="this.fetched">score de confiance : {{ this.responseScore }}</div>
    <div v-if="this.loading">Calcul en cours</div>
  </div>
</template>

<script>
import FileUploader from "../components/FileUploader.vue";
import { predictPresence } from "../services/presence_service";

export default {
  components: { FileUploader },
  data() {
    return {
      fetched: false,
      loading: false,
      failed: false,
      responseImage: "",
      responseScore: 0,
      responsePredict: false,
      inputFile: undefined,
    };
  },

  computed: {
    dataUrl() {
      return "data:image/jpeg;base64," + this.responseImage;
    },
  },

  methods: {
    async handleFileChange(file) {
      this.inputFile = file;
    },
    async handleSubmit() {
      this.loading = true;
      this.fetched = false;
      const response = await predictPresence(this.inputFile);
      if (response) {
        this.responseImage = response.image;
        this.responseScore = response.score;
        this.responsePredict = response.prediction === "True";
        this.fetched = true;
      } else {
        this.failed = true;
      }

      this.loading = false;
    },
  },
};
</script>

<style></style>
