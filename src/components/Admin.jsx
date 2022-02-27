import React, { useEffect } from 'react'
import { auth } from '../firebase'
import {useNavigate} from 'react-router-dom'

const Admin = () => {
    
    let navigate = useNavigate();
    useEffect(() => {
        if(auth.currentUser){
            console.log('user exists')
        }else {
            console.log('user does not exists');
            navigate("../login")
        }
    }, [])

  return (
    <div>
        <h3></h3>
    </div>
  )
}

export default Admin