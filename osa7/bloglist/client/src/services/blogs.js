import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;

  config = {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {
  const object = {
    ...newObject,
    likes: newObject.likes + 1
  }

  const response = await axios.put(`${baseUrl}/${object.id}`, object);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.status;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove, setToken };
