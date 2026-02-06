import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import  supabase  from '../client'

function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error)
      } else {
        setCreator(data)
      }

      setLoading(false)
    }

    fetchCreator()
  }, [id])

  async function removeCreator() {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Error deleting creator:", error)
    } else {
      navigate("/")
    }
  }

  if (loading) {
    return <p>Loading creator...</p>
  }

  if (!creator) {
    return <p>Creator not found.</p>
  }

  return (
    <div style={styles.container}>


      <h1 style={styles.title}>{creator.Name}</h1>

      <button
        onClick={() => navigate('/')}
        style={{
          padding: "8px 16px",
          backgroundColor: "#777",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "15px"
        }}
      >
        ← Back to Home
      </button>


      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.Name}
          style={styles.image}
        />
      )}

      <p>{creator.Description}</p>


      {creator.Url ? (

        <a
          href={creator.Url}
          target="_blank"
          rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <button style={styles.linkButton}>
          Visit Profile
        </button>
      </a>
      ) : (
      <p style={{ color: "#777", fontStyle: "italic", marginTop: "10px" }}>
        No profile link available
      </p>
)}

      {/* edit */}
      <Link to={`/edit/${id}`}>
        <button style={styles.editButton}>
          Edit Creator
        </button>
      </Link>

      {/* delete */}
      <button
        onClick={removeCreator}
        style={styles.deleteButton}
      >
        Delete Creator
      </button>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2E7D32',
    textTransform: 'uppercase',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '20px',
    objectFit: 'cover',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '30px',
  },
  linkButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '30px',
    marginRight: '10px',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  }
}

export default ViewCreator