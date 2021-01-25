<template>
  <div id="app">
    <div v-if="!image">
      <input type="file" @change="onFileChange" />
    </div>
    <div v-else>
      <img :src="image" />
      <button @click="removeImage">Enlever l'image</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { image: "" };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      this.$emit("fileChange", files[0]);
    },
    createImage(file) {
      const image = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function() {
      this.image = "";
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}

img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
