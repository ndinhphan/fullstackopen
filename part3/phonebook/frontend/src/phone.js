import axios from 'axios'

// const baseUrl = 'https://pure-tor-96619.herokuapp.com/api/persons' || 'http://localhost:3001/persons'
const baseUrl = 'api/persons'
const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

const create = (newPerson) =>{
  const promise = axios.post(baseUrl,newPerson)
  return promise.then(response => response.data)
}

const remove = (personId) =>{
  const promise = axios.delete(`${baseUrl}/${personId}`)
  return promise.then(response => response)
}

const update = (personId,changedPerson) =>{
  const promise = axios.put(`${baseUrl}/${personId}`,changedPerson)
  return promise.then(response => response.data)}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, remove, update}