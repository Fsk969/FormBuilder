import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Renderer() {
  const { slug } = useParams();
  const [schema, setSchema] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/api/forms/${slug}`)
      .then((res) => res.json())
      .then((data) => setSchema(data.schema || []));
  }, [slug]);

  
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3000/api/forms/${slug}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) alert("Form submitted!");
    
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl mb-4">Fill Out Form</h1>
      {schema.map((field, i) => (
        <input
          key={i}
          className="input"
          placeholder={field.label}
          type={field.type}
          onChange={(e) => handleChange(field.name, e.target.value)}
        />
      ))}
      <button className="btn mt-4" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
