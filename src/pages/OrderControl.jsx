import Title from '../components/Tittle'
import React, { useState } from 'react'

const OrderControl = () => {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
  }
  return (
    <div>
      <Title text1={'Orders'} text2={"Page"} />
      <div>
          <div  className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr]
           lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border
          border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs  sm:text-sm text-gray-700'>
            <img src="" className='w-12' alt="" />

          </div>

          <div>

          </div>
      </div>
    </div>
  )
}

export default OrderControl
