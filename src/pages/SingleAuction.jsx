import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

const SingleAuction = () => {
    const {id}= useParams()
    const [thisauction, setThisauction] = useState({})
    const [thisuser, setThisuser] =useState("")
    const [bids, setBids] = useState([])

    const inputBid = useRef()

    console.log(id)

    useEffect(()=>{
        fetchData()
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
  
        const res = await fetch('http://localhost:4000/auction/'+id, options)
        const data = await res.json()
        console.log("single auction ", data)

        if(data.user){
            console.log("Active user on single post", data.user)
            setThisuser(data.user)
        }
        setThisauction(data.singleauction)
        setBids(data.singleauction.bids)
    }

    const addbid = async(id) =>{
        if(thisauction.time<Date.now()){
          alert(" This auction is not active")
          return
        }
        if(Number(inputBid.current.value)>thisuser.money){
          alert("Your cannot bid more than you have money")
          return
        }
        if (Number(inputBid.current.value)<=thisauction.sellprice){
          alert("Your bid must be bigeer than current bid")
          return
        }
        const thisbid ={
            bid: Number(inputBid.current.value),
            username: thisuser.username,
            id: id
        }
        console.log("add bid ", thisbid)

        const options = {           // reikia sesijai palaikyti ir GET metodui, ne tik POST
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(thisbid) 
        }

        const res = await fetch('http://localhost:4000/addbid', options)
        const data = await res.json()
        inputBid.current.value=""                           
        console.log(data)
        fetchData()
    }
    

  return (
    <div>
        <div className='d-flex just-evenly postcard'>
          <div className='flex2'>
            <img className='postimg' src={thisauction.image} alt="nieko ner..."/>
          </div>
          <div className='d-flex column just-center flex3 text-left'>
            <p className='mv-5'> <i>{thisauction.title}</i></p>
            <p className='mv-5'>Owner: <b>{thisauction.username}</b></p> 
            <p className='mv-5'>End time: {(new Date(thisauction.time)).toLocaleString('lt-Lt')}</p>
            {thisauction.time>Date.now() &&
              <div>
                <input type='text' size='20' ref={inputBid}/> <button onClick={()=>addbid(thisauction._id)}> Make bid </button>
              </div>
            }
          </div>
          <div className='flex3 text-left'>
            <p className='mv-5'>Start price: <i>{thisauction.startprice}</i></p>
            <p className='mv-5'>Current price: <b>{thisauction.sellprice}</b></p> 
          </div>
                
        </div>
        
        <div>
            <h3>Bids</h3>
            {bids.map((x,index)=>
                <div key={index}>
                    <div className='d-flex postcard just-center'>
                        {/* <div className=' d-flex '> */}
                          <p className='mh-20' >Bidder: <b>{x.username} </b></p>
                          <p className='mh-20'> Bid: <i> {x.bid} € </i></p>
                          <p className='mh-20'> Bid time: <i>{(new Date(x.time)).toLocaleString('lt-Lt')}</i></p>
                        {/* </div> */}
                    </div>
                   
                </div>
            )}
        </div>
    </div>
  )
}

export default SingleAuction