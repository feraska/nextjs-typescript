
"use client"

import dynamic from 'next/dynamic'

const Home = dynamic(()=> import('../pages/home/Home'),{
  loading:()=><p>Loading..</p>,
  ssr:false
}
) 
import "./App.scss"
// import Home from '@/pages/home/Home';




export default function App() {

  return (
 
    // <AuthContextProvider >
      <Home/>
    /* </AuthContextProvider> */
  );
}
