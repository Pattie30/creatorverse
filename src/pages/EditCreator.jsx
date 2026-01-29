import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()

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

      if (error) {
        console.error("Error loading creator:", error)
      } else {
        setFormData({
          name: data.name || "",
          url: data.url || "",
          description: data.description || "",
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

    const { error } = await supabase
      .from('creators')
      .update(formData)
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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Edit Creator</h1>

      <form
        onSubmit={submitCreator}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            required
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
            required
            value={formData.url}
            onChange={updateField}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            required
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
          
        </button>
      </form>
    </div>
  )
}

export default EditCreator