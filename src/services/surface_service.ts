import axios from "axios";
import { baseURL } from "../utils";

interface SurfaceProps {
  type: string;
  info: string;
}

export interface SurfaceOutput {
  surface: number;
  coordinates: string;
  fileName: string;
}

export const estimateSurface = async (
  props: SurfaceProps
): Promise<SurfaceOutput> => {
  const body =
    props.type == "address"
      ? {
          address: props.info,
        }
      : {
          coordinates: props.info,
        };
  console.log(body);
  const URL = baseURL + `/estimateSurface/${props.type}`;
  const res = await axios({
    method: "POST",
    url: URL,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.data);
  const responseRaw = res.data;
  const surfaceOutput = {
    surface: responseRaw.surface,
    coordinates: responseRaw.coords.toString(),
    fileName: responseRaw.fileName
  };
  return surfaceOutput;
};
