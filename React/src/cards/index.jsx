import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.scss'
const Cards = () => {

    
    const [Cards, setCards] = useState([])
    const getData = async() => {
        try {
            const res = await axios ('https://northwind.vercel.app/api/categories')
            setCards(res.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        getData()
    }, [])
    



  return (
    <div className='Cards'>
        {Cards.map((product) => ( 
            <div className='Card' key={product.id}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>

    </div>)
    )
}
    </div>
  )



}

export default Cards