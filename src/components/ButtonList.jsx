import React from 'react'
import Button from './Button'

const list = ["All", "Gaming", "Cooking", "Cricket", "Soccer", "Live", "Valantines", "Songs"]
const ButtonList = () => {
  return (
    <div className='flex flex-wrap'>
      {
        list.map((btnItem) => <Button name={btnItem} key={btnItem} />)
      }
    </div>
  )
}

export default ButtonList
