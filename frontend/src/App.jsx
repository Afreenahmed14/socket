import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Comment from './components/Comment'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div>
      <Comment/>
     </div>

  )
}

export default App
