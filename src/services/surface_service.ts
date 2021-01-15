import axios from "axios";
import { baseURL } from "../utils";

interface SurfaceProps {
  type: string;
  info: string;
}

export interface SurfaceOutput {
  surface: number;
  coordinates: string;
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
  const responseRaw = res.data;
  console.log(responseRaw);
  const surfaceOutput = {
    surface: responseRaw[0],
    coordinates: responseRaw[1].toString(),
  };
  return surfaceOutput;
};
