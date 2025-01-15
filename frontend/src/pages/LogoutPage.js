import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

const LogoutPage = () => {

  const navigate = useNavigate()
  const {userInfo, updateUserInfo} = useContext(UserContext)

  useEffect(() => {
    localStorage.removeItem('access_key')
    updateUserInfo([])
    navigate('/')
  }, [])

  return (
    <div>LogoutPage</div>
  )
}

export default LogoutPage