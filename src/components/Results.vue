<template>
  <div class="radio">
    <div>Surface estimée : {{ this.result.result }} m²</div>
    <div>
      <map name="buildings">
        <area
          shape="poly"
          v-for="(contour, i) in buildCoords"
          :key="i"
          :coords="contour"
          v-on:click="onClick(i)"
          @mouseover="onHover(i)"
          class="area"
          href="#"
          target="_self"
        />
      </map>
      <img
        usemap="#buildings"
        :src="baseURL + this.result.fileName"
        v-on:click="raz()"
        :width="imgWidth"
      />
      <div>Surface sélectionnnée : {{ surface }} m²</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import { baseURL } from "../utils";

export interface ResultProps {
  coords: string;
  fileName: string;
  result: number;
  metrics: { label: string; value: number }[];
  contours: number[][][][];
  surfaces: number[];
}

export const ResultPropsInit: ResultProps = {
  coords: "",
  fileName: "",
  result: 0,
  metrics: [],
  contours: [],
  surfaces: [],
};

@Component
export default class Result extends Vue {
  @Prop() result!: ResultProps;
  @Provide() baseURL = baseURL;
  @Provide() imgWidth = window.innerWidth / 2;
  @Provide() surface = 0;
  @Provide() buildCoords = this.result.contours.map((cnt) => {
    let res = "";
    for (let i = 0; i < cnt.length; i++) {
      res += cnt[i]
        .map((point) => {
          return point.map((coord) =>
            Math.round((coord * this.imgWidth) / 800)
          );
        })
        .toString();
      if (i < cnt.length - 1) {
        res += ",";
      }
    }
    return res;
  });
  @Emit()
  onHover(index: number) {
    console.log(Math.round(this.result.surfaces[index]));
  }
  @Emit()
  onClick(index: number) {
    this.surface = Math.round(this.result.surfaces[index]);
  }
  @Emit()
  raz() {
    this.surface = 0;
  }
}
</script>

<style></style>
