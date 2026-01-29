import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lottie from "lottie-react"
import  supabase  from './client'
import ShowCreators from './pages/ShowCreators'
import AddCreator from './pages/AddCreator'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import gardenAnimation from './assets/gardenernergy.json'
import './App.css'



function App() {
  const [creators, setCreators] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')

      if (error) {
        setError(error.message)
      } else {
        setCreators(data)
      }
    }

    fetchCreators()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }
  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '20px 0',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    zIndex: 1000,
    borderBottom: '2px solid #ddd',
    color: '#6a0dad',
    fontFamily: "'Playfair Display', serif"

  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={headerStyle}>Gardening Creator Collection</h1>

      <Lottie
        animationData={gardenAnimation}
        loop={true}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.25
        }}
      />
      <div style={{ marginTop: "140px" }}>


      <Routes>



        <Route
          path="/"
          element={<ShowCreators creators={creators} setCreators={setCreators} />}
        />


        <Route
          path="/new"
          element={<AddCreator setCreators={setCreators} />}
        />


        <Route
          path="/creator/:id"
          element={<ViewCreator />}
        />


        <Route
          path="/edit/:id"
          element={<EditCreator />}
        />

      </Routes>
    </div>
    </div>
    
  )
}

export default App