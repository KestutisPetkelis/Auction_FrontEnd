import React from 'react'
import { useEffect, useState} from 'react'
// import { useNavigate } from 'react-router-dom'

import Auction from '../components/Auction'

const AllAuctions = () => {

  const [allauctions, setAllauctions] = useState([])
  const [thisuser, setThisuser] =useState("")

  // const nav=useNavigate()
  

  useEffect(() =>{
    const fechtPooling = setInterval(() => {
      fetchData()
     // console.log('refetch')
      }, 1000);
      return () => clearInterval(fechtPooling)
  },[])

  async function fetchData(){
      const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",     // reikia sesijai palaikyti
        //body: JSON.stringify(user) // nereikia -= body: JSON.stringify(user) =- nes GET metodas
      }

      const res = await fetch('http://localhost:4000/allauctions', options)
      const data = await res.json()
     // console.log("all auctions ", data)
      if(data.user){
         // console.log("Active user on all auctions", data.user.username)
          setThisuser(data.user.username)
      }
      setAllauctions(data.allAuctions)
      
    }

  return (
    <div>
      <h3>All Auctions</h3>
      <h5><i>(Click on picture if you want observe single auction or take part in it)</i></h5>
      <div className=' d-flex column-reverse'>
        {allauctions.map((x, index)=>
            <div key={index}>
              <Auction index={index} user = {x} />
            </div>
        )}
      
      </div>
    </div>
  )
}

export default AllAuctions