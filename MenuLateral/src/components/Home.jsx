import React from 'react'

export default function Home(user) {
  return (
    <div>
      <h1>Welcome user: {user.user.email}</h1>
    </div>
  )
}