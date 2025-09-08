import React from 'react'

const Title = ({ text1,text2,text1ClassName,text2ClassName,divClassName }) => {
  return (
    <div className={`inline-flex gap-2 items-center ${divClassName}`}>
      <p className={`text-gray-500 ${text1ClassName}`}>{text1} <span className={`text-gray-700  ${text2ClassName}`}>{text2}</span> </p>
    </div>
  )
}

export default Title
