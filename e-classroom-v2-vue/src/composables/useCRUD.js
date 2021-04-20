import axios from "axios";

const url = "http://localhost:5555/api/";

const getAll = async (items) => {
  try {
    const response = await axios.get(url + items, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getById = async (items, id) => {
  try {
    const response = await axios.get(url + items + "/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const save = async (items, data) => {
  try {
    const response = await axios.post(url + items, JSON.stringify(data), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const editById = async (items, id, data) => {
  try {
    const response = await axios.put(
      url + items + "/" + id,
      JSON.stringify(data),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (items, id) => {
  try {
    const response = await axios.delete(url + items + "/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const useCRUD = () => {
  return { getAll, getById, save, editById, deleteById };
};

export default useCRUD;
