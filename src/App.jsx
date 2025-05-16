import { useState } from 'react'
import Aurora from './components/Aurora'
import viteLogo from '/vite.svg'
import './App.css'
import Weather from './components/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Aurora
      colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]}
      blend={0.5}
      amplitude={1.0}
      speed={0.5}
      />
      <Weather/>
    </>
  )
}

export default App
