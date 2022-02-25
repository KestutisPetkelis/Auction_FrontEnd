import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Header = ({toolbar, setToolbar, setMessage, thisUser, setThisUser}) => {
    const divStyle = {
        width: "100%", 
        height: "100px",
        // border: "1px solid blue",
        marginTop: "0px",
        marginBottom: "10px",
        marginLeft: "10px",
        // padding: "20px",
        backgroundColor: "aliceblue",
        
    };

    const nav=useNavigate()

    const logout = async() =>{
      const options = {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",     // reikia sesijai palaikyti
        //body: JSON.stringify(user) // nereikia -= body: JSON.stringify(user) =- nes GET metodas
      }
  
      const res = await fetch('http://localhost:4000/logout', options)
      const data = await res.json()
      console.log(data)
      
      setMessage("")
      setToolbar(true)
      setThisUser({username:"", money:""})
      nav("/")
    }
// ************************
    useEffect(()=>{
      const fechtPooling = setInterval(() => {
      fetchData()
      //console.log('refetch')
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

      const res = await fetch('http://localhost:4000/info', options)
      const data = await res.json()
      //console.log("this user ", data)

      if(data.activeuser){
        //console.log("Active user on single post", data.activeuser.username)
        setThisUser({username:data.activeuser.username, money:data.activeuser.money})
      }
    }

  return (
    <div style={divStyle}>
        <div >
          {toolbar &&
            <div className='d-flex just-evenly'>
              <button><Link className='text-nondec' to="/"> Login </Link></button>
              <button><Link className='text-nondec' to="/register"> Register </Link></button>
            </div>
          }
          {!toolbar &&
            <div>
              <div className='d-flex just-between'>
                <div className='userinfo'> User: <i>{thisUser.username}</i> </div> 
                <div className='userinfo'>Money: <i>{thisUser.money} €</i></div>
              </div>
              <div className='d-flex just-evenly'>
                <button><Link className='text-nondec' to="/createauction"> Create auction </Link></button>                
                <button><Link className='text-nondec' to="/allauctions"> All auctions </Link></button>
                <button><Link className='text-nondec' to="/bidshistory"> My bids history </Link></button>
                {/* <button><Link className='text-nondec' to="/singleauction/:id"> Single auction </Link></button> */}
                <button onClick={()=>logout()}>Logout</button>
              </div>
            </div>
          }
          
        </div>
    </div>
  )
}

export default Header