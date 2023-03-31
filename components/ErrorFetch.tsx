import React from 'react'

export default function ErrorFetch({ error }: IErrorFetch) {
    return (
        <div>
            <h1><span className='text-3xl'>{error}</span></h1>
        </div>
    )
}
