import axios from "axios";
const url = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = async () => {
  return axios.get(`${url}/all`).then((res) => res.data);
};

const getCountry = async (name) => {
  return axios
  .get(`${url}/name/${name}`)
  .then((res) => res.data);
};

export default { getAllCountries, getCountry };
