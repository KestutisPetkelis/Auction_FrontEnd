import React from 'react'
import { useRef, useState } from 'react'

const Register = () => {

    const [message, setMessage] = useState("")
    const inputs ={
        name: useRef(),
        password: useRef(),
        password2: useRef()
    }

    const registerUser= async()=>{
        const user ={
            name: inputs.name.current.value,
            password: inputs.password.current.value,
            password2: inputs.password2.current.value
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            // credentials: "include",     // reikia sesijai palaikyti
            body: JSON.stringify(user)
        }

        const res = await fetch('http://localhost:4000/registeruser', options)
        const data = await res.json()

        setMessage(data.message)

        inputs.name.current.value=""
        inputs.password.current.value=""
        inputs.password2.current.value=""
        // console.log(data)
        // console.log(data.message)
    }
  return (
    <div>
       <div>
            <h3>REGISTRATION PAGE</h3><br></br>
            <label>Registration name: </label><br></br>
            <input type="text" size="30" ref={inputs.name} placeholder="Length 3-20 symbols"/><br></br>
            <label>Password: </label><br></br>
            <input type="password" size="30" ref={inputs.password} placeholder="Length 3-20 symbols"/><br></br>
            <label>Repeat password: </label><br></br>
            <input type="password" size="30" ref={inputs.password2}/><br></br><br></br>
            <button onClick={()=>registerUser()}>Register</button>
            <h4>{message}</h4>
       </div>

    </div>
  )
}

export default Register