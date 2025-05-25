import axios from "axios";
import React, { useEffect, useState } from "react";

const UserForm = () => {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registeredUser, setRegisteredUser] = useState(false)
  const [user, setUser] = useState(null)

  const handleChange = (e) => {
    const {name, value} = e.target
    console.log(e)
    setRegisterForm((prev) => ({
        ...prev,
        [name]: value
    }))
  }
  console.log(registerForm);
  

  const submitForm = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('http://localhost:3000/users/register', registerForm)
        console.log(response.data);
        setUser(response.data)
    } catch (error) {
        console.error(error)
    }
}

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submitForm}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={registerForm.name}
            placeholder="name"
          />
        </div>
        <div>
          <label>email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={registerForm.email}
            placeholder="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={registerForm.password}
            placeholder="password"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
