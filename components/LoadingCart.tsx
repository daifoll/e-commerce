import React from 'react'

export default function LoadingCart() {
  return (
    <div>
    <div className="text-3xl w-72 h-9 bg-gray-400 animate-pulse"></div>
    <div className='flex flex-wrap w-full mt-5 rounded-2xl'>
        <div className="flex flex-col items-start p-2 basis-1/2 grow mb-10 animate-pulse">
            <div className="w-full h-64 overflow-hidden bg-gray-400 mt-1 rounded-2xl"></div>
        </div>
        <div className="flex flex-col items-start p-2 basis-1/3 mb-10 animate-pulse">
            <div className="w-full h-64 overflow-hidden bg-gray-400 mt-1 rounded-2xl"></div>
        </div>
    </div>
</div>
  )
}
