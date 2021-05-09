import axios from "axios";

const url = "http://localhost:5555/api/files/material/";

const uploadFile = async (matId, file) => {
  try {
    const response = await axios.post(url + matId, file, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

const downloadFile = async (file) => {
  try {
    const response = await axios.get(
      "http://localhost:5555/api/files/downloadFile/" + file.id,
      {
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/octet-stream",
        },
      }
    );

    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement("a");

    fileLink.href = fileURL;
    fileLink.setAttribute("download", file.name);
    document.body.appendChild(fileLink);

    fileLink.click();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const useUpDownFile = () => {
  return { uploadFile, downloadFile };
};

export default useUpDownFile;
