import React from 'react'
import { useRef, useState } from 'react'

const CreateAuction = () => {
  const inputsRef ={
    title: useRef(),
    image: useRef(),
    price: useRef(),
    time: useRef()
  }

  const [message, setMessage] = useState("")

  const createauction = async() =>{
    
    const auction={
      title: inputsRef.title.current.value,
      image: inputsRef.image.current.value,
      price: inputsRef.price.current.value,
      time:Number(inputsRef.time.current.value)*60000
    }
    const options = { 
      method: "POST",
      headers: {
          "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(auction) 
    }

    const res = await fetch('http://localhost:4000/createauction', options)
    const data = await res.json()
                              
    console.log(data, data.message)

    setMessage(data.message)
  
    //console.log("create auction", auction)

  }


  return (
    <div>
        <h3>Create Auction</h3>
        <div className='d-flex ali-center just-center'>
          <div className='text-left'>
            <label >Title: </label><br></br>
            <input type="text" size="80" ref={inputsRef.title} placeholder="Length 20-500 symbols"/><br></br><br></br>
            <label>Image: </label><br></br>
            <input type="text" size="80" ref={inputsRef.image} placeholder="Start with http..."/><br></br>
            <br></br>
            <label>Start price: </label><br></br>
            <input type="text" size="20" ref={inputsRef.price}/><span> €</span><br></br><br></br>
            <label>End time: </label><br></br>
            <select ref={inputsRef.time}>
              <option disabled={true} value="">Choose end time...</option>
              <option value="2">2 min</option>
              <option value="5">5 min </option>
              <option value="60">1 h</option>
              <option value="720">12 h</option>
              <option value="1440">24 h</option>

            </select>
            <br></br><br></br>

            
          </div>
          
       </div>
       <button onClick={()=>createauction()}>Create auction</button>
       <h4>{message}</h4>
    </div>
  )
}

export default CreateAuction