import axios from "axios";

const URL = "http://localhost:8888/predict";

export const predictProtection = async (inputFile: File) => {
  const formData = new FormData();
  formData.append("file", inputFile);
  try {
    const res = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    let response = res.data;
    response = response.replaceAll("'", '"');
    response = JSON.parse(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};
