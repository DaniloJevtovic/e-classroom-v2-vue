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

//za razred sva odjeljenja npr ili za profesora sve predmete
//http://localhost:5555/api/courses/teacher/teacherId
//http://localhost:5555/api/stClasses/scClass/scClassId
const getSubItems = async (items, subItems, itemId) => {
  try {
    const response = await axios.get(
      url + items + "/" + subItems + "/" + itemId,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

//http://localhost:5555/api/results/student/{studentId}/quiz/{quizId}
//http://localhost:5555/api/items/subItems/{itemId}/subItems/{subItemId}
const getSubSubItems = async (
  items,
  subItems,
  subSubItems,
  itemId,
  subItemId
) => {
  try {
    const response = await axios.get(
      url +
        items +
        "/" +
        subItems +
        "/" +
        itemId +
        "/" +
        subSubItems +
        "/" +
        subItemId,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

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
        Authorization: "Bearer " + localStorage.getItem("token"),
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
          Authorization: "Bearer " + localStorage.getItem("token"),
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
    const response = await axios.delete(url + items + "/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const useCRUD = () => {
  return {
    getAll,
    getById,
    getSubItems,
    getSubSubItems,
    save,
    editById,
    deleteById,
  };
};

export default useCRUD;
