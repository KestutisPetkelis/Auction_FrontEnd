import React from 'react'
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const BidsHistory = () => {

  const [allauctions, setAllauctions] = useState([])
  const [thisuser, setThisuser] =useState("")
  const nav = useNavigate()

  const getsingle=(arg)=>{
      console.log("nav", arg)
      nav("/singleauction/"+arg)
  }

  useEffect(() =>{
    const fechtPooling = setInterval(() => {
      fetchData()
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
        const myBids = data.allAuctions.filter(x => x.bids.find(y=>y.username===data.user.username))
        // console.log("Bids? ", myBids)
        setAllauctions(myBids)
      }
      //setAllauctions(data.allAuctions)
      
    }


  return (
    <div>
        <h4>My Bids History</h4>
        <h5><i>(Click on picture if you want observe an auction with your bid or take part in it further)</i></h5>
        <div className=' d-flex column-reverse'>
        {allauctions.map((x, index)=>
            <div key={index} className="postcard2 d-flex">
              <div className='littleimg'>
                <img onClick={()=>getsingle(x._id)}  className='littleimg pointer' src={x.image} alt="nieko..."/>
              </div>
              <div className='flex1 text-left'>
                <p>Auction owner: <b>{x.username}</b></p>
                <p><i>{x.title}</i></p>
                <p>Start price: <b>{x.startprice} €</b> </p>
                <p>End time: <i><b>{(new Date(x.time)).toLocaleString('lt-Lt')}</b></i></p>
              </div>
              <div className='flex1'>
               <p>Bidders: </p> 
              </div>
              {x.bids.length>0 &&
              <div className='flex2 d-flex column-reverse just-start'>
              {x.bids.map((y,i)=>
                < div key={i} className="text-left ">
                  <span className='w-60 d-inline'>{y.username} </span>
                  <span className='w-60 d-inline'> Bid: <b>{y.bid}</b> €</span>
                  <span> Bid time: <i><b>{(new Date(y.time)).toLocaleString('lt-Lt')}</b></i></span>
                </div>
              )}
              
              </div>
              }
              {/* <Auction index={index} user = {x} /> */}
            </div>
        )}
      
      </div>
    </div>
  )
}

export default BidsHistory