import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Renderer() {
  const { slug } = useParams();
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/api/forms/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        // Check if schema is directly an array of fields
        if (Array.isArray(data.schema)) {
          setFields(data.schema);
        } else if (data.schema && Array.isArray(data.schema.fields)) {
          setFields(data.schema.fields);
        } else {
          console.error("Invalid schema format:", data.schema);
        }
      });
  }, [slug]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3000/api/forms/${slug}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Form submitted!");
      setFormData({});
    } else {
      alert("Submission failed");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl mb-4">Fill Out Form</h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <label className="block font-semibold">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.label] || ""}
              onChange={(e) => handleChange(field.label, e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
