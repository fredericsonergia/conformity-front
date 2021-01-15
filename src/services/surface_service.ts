import axios from "axios";
import { baseURL } from "../utils";

interface SurfaceProps {
  info: string;
  closestFunction?: string;
  doThePlot?: boolean;
}

export interface SurfaceOutput {
  surface: number;
  coordinates: string;
}

export const estimateSurface = async (
  props: SurfaceProps
): Promise<SurfaceOutput> => {
  const body = {
    info: props.info,
    closestFunction: props.closestFunction || "",
    doThePlot: props.doThePlot || false,
  };
  console.log(body);
  const URL = baseURL + "/estimateSurface";
  const res = await axios({
    method: "POST",
    url: URL,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseRaw = res.data;
  console.log(responseRaw);
  const response = responseRaw.split("[");
  const surfaceOutput = {
    surface: response[0],
    coordinates: response[1].split("]")[0].replace(/\s+/g, ""),
  };
  console.log(surfaceOutput);
  return surfaceOutput;
};
