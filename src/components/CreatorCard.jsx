import React from 'react'

function CreatorCard({ name, url, description, imageURL }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {imageURL && (
          <img
            src={imageURL}
            alt={name}
            style={styles.image}
          />
        )}

        <div style={styles.content}>
          <h2 style={styles.name}>{name}</h2>
          <p style={styles.description}>{description}</p>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            Visit Profile
          </a>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    width: '300px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '200px',
    borderRadius: '8px',
    marginBottom: '12px',
    objectFit: 'cover',   
    },
  content: {
    textAlign: 'left',
  },
  name: {
    margin: '0 0 8px',
  },
  description: {
    fontSize: '14px',
    color: '#555',
  },
  link: {
    display: 'inline-block',
    marginTop: '8px',
    color: '#007bff',
    textDecoration: 'none',
  },
}

export default CreatorCard
