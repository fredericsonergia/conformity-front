import axios from "axios";

const URL = "http://localhost:8000/predict_conformity";

export const predictConformity = async (inputFile: File) => {
  const request = {
    file: inputFile,
  };
  try {
    const res = await axios.post(URL, request, {
      headers: {
        "Content-Type": "application/json",
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
