import api from "../../../api/axios";
export const fetchData = async (endpoint, data = {}, method = "GET") => {
  try {
  const path = `/api${endpoint}`
  const response = method === "POST" ? await api.post(path, data) : await api.get(path, data)
  return response
  }
  catch (error) {
    console.log(error)
    return { error }
  }
};