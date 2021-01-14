import axios from "axios";
import FormData from "form-data";
import { baseURL } from "../utils";

interface SurfaceProps {
  info: string;
  closestFunction?: string;
  doThePlot?: boolean;
}

export const estimateSurface = async (props: SurfaceProps): Promise<number> => {
  const body = new FormData();
  body.append("info", props.info);
  body.append("closestFunction", props.closestFunction || "");
  body.append("doThePlot", (props.doThePlot || false).toString());
  const body2 = {
    info: props.info,
    closestFunction: props.closestFunction || "",
    doThePlot: (props.doThePlot || false).toString(),
  };
  console.log(body2);
  const URL = baseURL + "/estimateSurface";
  const res = await axios({
    method: "POST",
    url: URL,
    data: body2,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
