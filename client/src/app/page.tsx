
"use client"

import dynamic from 'next/dynamic'

import "@/app/App.scss"

const Home = dynamic(()=> import('../page/home/Home'),{
  loading:()=><p>Loading..</p>,
  ssr:false,
  
}

) 
export default function App() {

  return (
 
      <Home/>
     
  );
}
