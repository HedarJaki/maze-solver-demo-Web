// import { useState } from 'react'
import './style.css'
import IterativeSection from './page/iterativePage'
import RecursiveSection from './page/recursivePage'
import SimpleMazeSolver from './page/demopage'
import DualMazeSolver from './page/dualMazeSolver'
// import { Play, RotateCcw } from 'lucide-react';

function App() {

  return (
    <div className='cihuy-2'>
      <DualMazeSolver/>
      <IterativeSection/>
      <RecursiveSection/>
    </div>
  )
}

export default App
