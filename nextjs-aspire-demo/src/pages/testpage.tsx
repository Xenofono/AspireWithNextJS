import Image from 'next/image'
import { useEffect } from 'react'



export default function Home() {

    useEffect(() => {
        fetch("api/hello")
        .then(x => x.json())
        .then(x => console.log(x))
    }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      
      <p>TESTAR</p>
    </main>
  )
}
