import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import axios from 'axios'
import UserForm from './Components/UserForm/UserForm'

const App = () => {
const [state, setState] = useState(false)
const [newData, setNewData] = useState(null)

// useEffect(() => {
//   console.log('hello')
//   const sendData = async (data) => {
//     try {
//       const response = axios.post('https://jsonplaceholder.typicode.com/posts', data)
//       setNewData(response.data)
//     } catch (error) {
    
//       console.error(error)
//     }
//   }
//   sendData({id: 1, title: 'nene', body: 'post descr'})
// }, [])
console.log('component has been rendered');

  return (
    <>

     <Header/>
    <UserForm/>
    </>
  )
}

export default App
