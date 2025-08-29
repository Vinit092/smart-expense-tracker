import React from 'react'

const InfoCard = ({icon, label, color, value, className}) => {
  return (
    <>
      <div className={`${className} flex gap-6 stat-card bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50`}>
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl hover:scale-110 duration-300`}>
        {icon}
        </div>

        <div className=''>
        <h6 className='text-sm text-gray-500 mb-1 hover:text-purple-500 duration-500 cursor-default text-shadow-lg'>{label}</h6>
        <span className='text-[22px] text-shadow-lg'>₹{value}</span>
        </div>
      </div>
    </>
  )
}

export default InfoCard
