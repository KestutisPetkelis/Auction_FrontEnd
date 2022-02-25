import React from 'react'
import { useRef } from 'react'

const Login = ({toolbar, setToolbar, message, setMessage, setThisUser}) => {

    const inputs ={
        name: useRef(),
        password: useRef(),
    }

    const loginUser = async()=>{
        console.log("login")
        const user = {
            name: inputs.name.current.value,
            password: inputs.password.current.value
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",     // reikia sesijai palaikyti
            body: JSON.stringify(user)
        }

        const res = await fetch('http://localhost:4000/login', options)
        const data = await res.json()
        console.log(data, data.user)
        setMessage(data.message)
        if (data.success){
            setToolbar(false)
            setThisUser(data.user)
        }
        
    }


  return (
    <div>
        {toolbar &&
            <div>
                <h3>LOGIN PAGE</h3>
                <label>Name: </label><br></br>
                <input type="text" size="30" ref={inputs.name}/><br></br>
                <label>Password: </label><br></br>
                <input type="password" size="30" ref={inputs.password}/><br></br>
                <br></br>
                <button onClick={()=>loginUser()}>Login</button>
                <h4>{message}</h4>
        </div>
        }
        {!toolbar &&
            <div>
                <h4>{message}</h4>
            </div>
        }
    </div>
  )
}

export default Login