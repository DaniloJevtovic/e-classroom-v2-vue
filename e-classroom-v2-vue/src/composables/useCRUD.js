import axios from "axios";

const url = "http://localhost:5555/api/";
import { useToast } from "vue-toastification";
import router from "../router/index.js";

const toast = useToast();

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
    return err.response.data;
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
    return err.response.data;
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
    return err.response.data;
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
    return err.response.data;
  }
};

const save = async (items, data, redirect, toastDialog) => {
  try {
    const response = await axios.post(url + items, JSON.stringify(data), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (toastDialog) {
      toast.info(response.data.message, {
        timeout: 2000,
      });
    }

    console.log(response.data.message)

    if (redirect) {
      router.go(-1);
    }

    return response.data.body;
  } catch (err) {
    
    toast.error(err.response.data, {
      timeout: 2000,
    });

    return err;
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

    toast.info(response.data.message, {
      timeout: 2000,
    });

    router.go(-1);

    return response.data.body;
  } catch (err) {
    toast.error(err.response.data, {
      timeout: 2000,
    });

    return err.response.data;
  }
};

//redirect - parametar koji ce redirektovati jednu stranicu nazad - true/false
//toast - da li ce biti dijalog - true/false
const deleteById = async (items, id, redirect, toastDialog) => {
  try {
    const response = await axios.delete(url + items + "/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    console.log("redirect", redirect);
    console.log("toast", toast);

    if (redirect) {
      router.go(-1);
    }

    if (toastDialog) {
      const toast = useToast();

      toast.info(response.data, {
        timeout: 2000,
      });
    }

    console.log(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteByMultipleIds = async (items, first, firstId, second, secondId) => {
  try {
    const response = await axios.delete(
      url + items + "/" + first + "/" + firstId + "/" + second + "/" + secondId,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
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
    deleteByMultipleIds,
  };
};

export default useCRUD;
