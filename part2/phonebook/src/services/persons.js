import axios from "axios"
const baseurl = "http://localhost:3001/persons"

const getPersons = async () => {
    return axios
    .get(baseurl)
    .then(res => res.data)
}

const addPerson = async (person) => {
    return axios
    .post(baseurl, person)
    .then(res => res.data)
}

const deletePerson = async (id) => {
    return axios
    .delete(`${baseurl}/${id}`)
    .then(res => res.data)
}

const updatePerson = async (id, person) => {
    return axios
    .put(`${baseurl}/${id}`, person)
    .then(res => res.data)
}

export default { getPersons, addPerson, deletePerson, updatePerson }    