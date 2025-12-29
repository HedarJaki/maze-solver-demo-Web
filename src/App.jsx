// import { useState } from 'react'
import './style.css'
import IterativeSection from './page/iterativePage'
import RecursiveSection from './page/recursivePage'
import DualMazeSolver from './page/dualMazeSolver'
import MazePerformanceTester from './page/MazePerformanceTester'
// import { Play, RotateCcw } from 'lucide-react';

function App() {

  return (
    <div className='cihuy-2'>
      <MazePerformanceTester/>
      <DualMazeSolver/>
      <IterativeSection/>
      <RecursiveSection/>
    </div>
  )
}

export default App
