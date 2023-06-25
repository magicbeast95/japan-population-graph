import { useState } from 'react'

import 'normalize.css'

import PopulationGraph from './components/PopulationGraph'
import PrefectureFilter from './components/PrefectureFilter'
import Header from './components/primitives/Header'
import { Prefecture } from './types/Prefecture'

import './App.css'

function App() {
  const [selected, setSelected] = useState<Prefecture[]>([])

  return (
    <>
      <Header />
      <div className="card">
        <PrefectureFilter onUpdate={setSelected} />
        <PopulationGraph prefectures={selected} />
      </div>
    </>
  )
}

export default App
