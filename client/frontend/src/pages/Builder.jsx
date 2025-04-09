import React, { useState } from "react";

export default function Builder() {
  const [formName, setFormName] = useState("");
  const [slug, setSlug] = useState("");
  const [fields, setFields] = useState([]);
  const [field, setField] = useState({ label: "", name: "", type: "text" });

  // console.log("fields", fields);
  const addField = () => {
    setFields([...fields, field]);
    setField({ label: "", name: "", type: "text" });
  };

  const saveForm = async () => {
    // Check if current field is filled (user typed but didn't click "Add Field")
    if (field.label && field.name) {
      fields.push(field); // Add to fields before saving
    }

    const res = await fetch("http://localhost:3000/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formName, slug, schema: fields }),
    });

    if (res.ok) {
      alert("Form saved successfully!");
      setFormName("");
      setSlug("");
      setFields([]);
      setField({ label: "", name: "", type: "text" });
    }

    console.log("res", res);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Form Builder</h1>
      <input
        className="input"
        placeholder="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
      />
      <input
        className="input"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <div className="my-4">
        <input
          className="input"
          placeholder="Label"
          value={field.label}
          onChange={(e) => setField({ ...field, label: e.target.value })}
        />
        <input
          className="input"
          placeholder="Name"
          value={field.name}
          onChange={(e) => setField({ ...field, name: e.target.value })}
        />
        <select
          className="input"
          value={field.type}
          onChange={(e) => setField({ ...field, type: e.target.value })}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
        </select>
        <button className="btn" onClick={addField}>
          Add Field
        </button>
      </div>

      <ul>
        {fields.map((f, i) => (
          <li key={i}>
            {f.label} ({f.type})
          </li>
        ))}
      </ul>

      <button className="btn mt-4" onClick={saveForm}>
        Save Form
      </button>
    </div>
  );
}
