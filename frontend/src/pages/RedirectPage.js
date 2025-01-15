import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const RedirectPage = () => {
  const [myLink, setMyLink] = useState([])
  const { hash } = useParams()

  const getMyLink = async () => {
    const response = await fetch(`/api/link/get-link/${hash}/`)
    const data = await response.json()
    setMyLink(data)
  }

  useEffect(() => {
    getMyLink()
  }, [])

  useEffect(() => {
    if (myLink.source_link) {
      window.open(myLink.source_link, '_self', 'noreferrer')
    }
  }, [myLink.source_link])

  return (
    <div>RedirectPage</div>
  )
}

export default RedirectPage