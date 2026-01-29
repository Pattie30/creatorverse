import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  supabase  from '../client'

function AddCreator({ setCreators }) {
  const navigate = useNavigate()

  // Supabase images
  const presetImages = [
    { label: "Garden 1", url: "https://cuahixqhfpcpsclceipx.supabase.co/storage/v1/object/public/creatorverse-images/garden1.jpg" },
    { label: "Garden 2", url: "https://cuahixqhfpcpsclceipx.supabase.co/storage/v1/object/public/creatorverse-images/garden2.jpg" },
    { label: "Garden 3", url: "https://cuahixqhfpcpsclceipx.supabase.co/storage/v1/object/public/creatorverse-images/garden3.jpg" },
    { label: "Garden 4", url: "https://cuahixqhfpcpsclceipx.supabase.co/storage/v1/object/public/creatorverse-images/garden4.jpg" },
    { label: "Garden 5", url: "https://cuahixqhfpcpsclceipx.supabase.co/storage/v1/object/public/creatorverse-images/garden5.jpg" },
    { label: "Garden 6", url: "https://cuahixqhfpcpsclceipx.supabase.co/storage/v1/object/public/creatorverse-images/garden6.jpg" },
    { label: "Garden 7", url: "https://cuahixqhfpcpsclceipx.supabase.co/storage/v1/object/public/creatorverse-images/garden7.jpg" },
  ]

  // Form state
  const [creatorInput, setCreatorInput] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  })

  const [error, setError] = useState(null)

  // Handle input changes
  function updateField(e) {
    const { name, value } = e.target
    setCreatorInput(prev => ({ ...prev, [name]: value }))
  }

  // Clean input values
  function clean(value) {
    return value.trim() === "" ? null : value.trim()
  }

  
  async function submitCreator(e) {
    e.preventDefault()

    if (!creatorInput.name || !creatorInput.url || !creatorInput.description) {
      alert("Please fill out all required fields.")
      return
    }

    
    const cleanedCreator = {
      Name: clean(creatorInput.name),
      Url: clean(creatorInput.url),
      Description: clean(creatorInput.description),
      imageURL: clean(creatorInput.imageURL)
    }

    
    const { data, error } = await supabase
      .from('creators')
      .insert([cleanedCreator])
      .select()

    if (error) {
      console.error("Error adding creator:", error)
      setError("Failed to add creator. Please try again.")
      return
    }


    
    setCreators(prev => [...prev, data[0]])

    navigate('/')
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Add a New Content Creator</h1>

      <form onSubmit={submitCreator}>

        <label>
          Name:
          <input
            type="text"
            name="name"
            required
            value={creatorInput.name}
            onChange={updateField}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        <label>
          URL:
          <input
            type="text"
            name="url"
            required
            value={creatorInput.url}
            onChange={updateField}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            required
            value={creatorInput.description}
            onChange={updateField}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        {/* Dropdown for images */}
        <label>
          Choose an Image:
          <select
            name="imageURL"
            value={creatorInput.imageURL}
            onChange={updateField}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Select an image</option>
            {presetImages.map(img => (
              <option key={img.url} value={img.url}>
                {img.label}
              </option>
            ))}
          </select>
        </label>

        {/* Custom image URL */}
        <label>
          Or paste a custom Image URL:
          <input
            type="text"
            name="imageURL"
            placeholder="https://example.com/myimage.jpg"
            value={creatorInput.imageURL}
            onChange={updateField}
            style={{ width: "100%", padding: "8px", marginTop: "10px" }}
          />
        </label>

        {/* Preview IMG */}
        {creatorInput.imageURL && (
          <img
            src={creatorInput.imageURL}
            alt="Preview"
            style={{ width: "200px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  )
}

export default AddCreator