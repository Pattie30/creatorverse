import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../client'
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

      {/* 🌞 Sun in the top-right corner */}
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

      <Link to="/new">
        <button style={styles.addButton}>Add a Content Creator</button>
      </Link>

      <div style={styles.list}>
        {creators.map((creator) => (
          <div key={creator.id} style={styles.card}>

            {/* Internal link section */}
            <Link to={`/creator/${creator.id}`} style={styles.cardLink}>
              <h2 style={styles.cardTitle}>{creator.Name}</h2>

              <img
                src={creator.imageURL ? creator.imageURL : SelfSufficientMeImg}
                alt={creator.Name}
                style={styles.image}
              />

              <p>{creator.Description}</p>
            </Link>

            {/* External link button */}
            {creator.Url ? (
              <a
                href={creator.Url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#007bff",
                  display: "block",
                  marginTop: "10px",
                  fontWeight: "bold"
                }}
              >
                Visit Creator Website
              </a>
            ) : (
              <p style={{
                color: "#777",
                fontStyle: "italic",
                marginTop: "10px"
              }}>
                No profile link available
              </p>
            )}

            {/* Button row */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Link to={`/creator/${creator.id}`}>
                <button className="secondary">View Profile</button>
              </Link>

              <button
                onClick={() => removeCreator(creator.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      <div style={{ marginTop: "200px" }}>
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
    padding: '140px, 20px 20px',
    maxWidth: '600px',
    margin: '0 auto',
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
  cardTitle: {
    marginBottom: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#672ba6",
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
  viewButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteButton: {
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