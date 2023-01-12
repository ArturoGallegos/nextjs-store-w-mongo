import Axios from 'axios';
const baseURL = process.env.BASE_URL || 'http://localhost:3000/api'

const AxiosAPI = Axios.create({
  withCredentials: true,
  baseURL
});

export default AxiosAPI
