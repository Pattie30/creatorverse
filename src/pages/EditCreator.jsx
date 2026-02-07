import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import supabase from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()

  // React state uses lowercase keys
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: ""
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function fetchCreator() {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single()

    console.log("Fetched creator:", data)   // ← PUT IT RIGHT HERE

    if (error) {
      console.error("Error loading creator:", error)
    } else {
      setFormData({
        name: data.Name || "",
        url: data.Url || "",
        description: data.Description || "",
        imageURL: data.imageURL || ""
      })
    }

    setLoading(false)
  }

  fetchCreator()
}, [id])

  function updateField(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function submitCreator(e) {
    e.preventDefault()

    // Map React lowercase → Supabase uppercase
    const updates = {
      Name: formData.name,
      Url: formData.url,
      Description: formData.description,
      imageURL: formData.imageURL
    }

    console.log("Sending updates:", updates)

    const { error } = await supabase
      .from('creators')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error("Error updating creator:", error)
    } else {
      navigate(`/creator/${id}`)
    }
  }

  if (loading) {
    return <p>Loading creator...</p>
  }

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Edit Creator</h1>
      <h2 style={{ marginTop: "-10px", color: "#555" }}>
        {formData.name}
      </h2>

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

      <form
        onSubmit={submitCreator}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={updateField}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        <label>
          URL:
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={updateField}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={updateField}
            style={{ width: "100%", padding: "8px", minHeight: "100px" }}
          />
        </label>

        <label>
          Image URL (optional):
          <input
            type="text"
            name="imageURL"
            value={formData.imageURL}
            onChange={updateField}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        {formData.imageURL && (
          <img
            src={formData.imageURL}
            alt="Preview"
            style={{
              width: "200px",
              borderRadius: "8px",
              marginTop: "10px"
            }}
          />
        )}

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Save Changes
        </button>
      </form>
    </main>
  )
}

export default EditCreator