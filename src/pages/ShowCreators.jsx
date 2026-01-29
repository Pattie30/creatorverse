import React from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import SelfSufficientMeImg from '../assets/SelfSufficientMe.png'
import Lottie from "lottie-react"
import gardenAnimation from "../assets/gardenernergy.json"
import SunImg from "../assets/theSun.jpg"

function ShowCreators({ creators, setCreators }) {
console.log("ShowCreators is rendering");

  async function removeCreator(id) {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Error deleting creator:", error)
    } else {
      
      setCreators(prev => prev.filter(c => c.id !== id))
    }
  }

  return (
    <div style={styles.container}>
      <img
        src={SunImg}
        alt="sun"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          width: "80px",
          zIndex: 1000,
          pointerEvents: "none"
        }}
      />

      <h1>Gardening Creator Collection</h1>

      <Link to="/new">
        <button style={styles.addButton}>Add a Content Creator</button>
      </Link>

      <div style={styles.list}>
        {creators.map((creator) => (
          <div key={creator.id} style={styles.card}>

            
            <Link to={`/creator/${creator.id}`} style={styles.cardLink}>
              <h2>{creator.name}</h2>

              <img
                src={
                  creator.imageURL && creator.imageURL.trim() !== ""
                    ? creator.imageURL
                    : SelfSufficientMeImg
                }
                alt={creator.name}
                style={styles.image}
              />

              <p>{creator.description}</p>

              <span style={styles.viewMore}>View Profile →</span>
            </Link>

            {/* delete */}
            <button
              onClick={() => removeCreator(creator.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>

          </div>
        ))}
      </div>
      <div style={{ marginTop: "40px" }}>
        <Lottie
          animationData={gardenAnimation}
          loop={true}
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            opacity: 0.35
          }}
        />
      </div>

    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
  },
  addButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: 'white',
    width: '250px',
    position: 'relative',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: '100%',
    borderRadius: '6px',
    marginBottom: '10px',
    objectFit: 'cover',
  },
  viewMore: {
    marginTop: '10px',
    display: 'inline-block',
    color: '#007bff',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
  },
}

export default ShowCreators