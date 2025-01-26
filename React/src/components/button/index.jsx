import React from 'react'
import './index.scss'

const Button = () => {
  const screen = () => {
    console.log('Hello Balls');
    
  }
  return (
    <div><button onClick={() => screen()}>Delete</button></div>
  )
}

export default Button