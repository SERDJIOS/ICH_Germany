import { api } from '../api/api'

export const regUser = async userData => {
  const res = await api.post(`/register`, userData)
  return res.data
}
export const logUser = async loginData => {
  const res = await api.post(`/login`, loginData)
  return res.data
}
export const getUsers = async () => {
  const res = await api.get(`/users`)
  return res.data
}