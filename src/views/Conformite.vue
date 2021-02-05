<template>
  <div>
    <h1>Conformité de la Protection</h1>
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
    <div v-if="this.fetched">
      Distance : {{ Math.round(this.responsePredict * 100) / 100 }} cm
    </div>
    <div v-if="this.loading">Calcul en cours</div>
  </div>
</template>

<script>
import FileUploader from "../components/FileUploader.vue";
import { predictConformity } from "../services/conformity_service.ts";

export default {
  components: { FileUploader },
  data() {
    return {
      fetched: false,
      failed: false,
      loading: false,
      responseImage: "",
      responsePredict: 0,
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
      const response = await predictConformity(this.inputFile);
      if (response) {
        this.responseImage = response.image;
        this.responsePredict = response.prediction;
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
