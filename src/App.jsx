import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import IterativeSection from './page/iterativePage'
import RecursiveSection from './page/recursivePage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <IterativeSection/>
        <RecursiveSection/>
        {/* <h1>Hello world</h1> */}
    </>
  )
}

export default App
