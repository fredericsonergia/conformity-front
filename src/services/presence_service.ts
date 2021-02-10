import axios from "axios";

const URL = "http://localhost:8000/presence";

export const predictPresence = async (inputFile: File) => {
  const formData = new FormData();
  formData.append("file", inputFile);
  try {
    const res = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
