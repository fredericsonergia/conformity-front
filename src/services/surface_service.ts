import axios from "axios";
import { baseURL } from "../utils";

interface SurfaceProps {
  info: string;
  closestFunction?: string;
  doThePlot?: boolean;
}

export const estimateSurface = async (props: SurfaceProps): Promise<number> => {
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
  return res.data;
};
