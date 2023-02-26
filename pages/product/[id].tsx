import { useRouter } from 'next/router'
import React from 'react'

export default function Product() {
const router = useRouter()
const {id} = router.query

console.log(id)
 
return (
    <div>{id}</div>
  )
}
