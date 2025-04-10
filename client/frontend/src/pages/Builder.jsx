import React, { useState } from "react";

export default function Builder() {
  const [formName, setFormName] = useState("");
  const [slug, setSlug] = useState("");
  const [fields, setFields] = useState([]);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);

  const fieldTypes = [
    { type: "text", label: "Text Input" },
    { type: "email", label: "Email" },
    { type: "number", label: "Number" },
    { type: "button", label: "Button" },
  ];

  const addField = (type) => {
    const newField = {
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Label`,
      name: `${type}_${fields.length + 1}`,
    };
    setFields([...fields, newField]);
  };

  const updateSelectedField = (key, value) => {
    const updated = [...fields];
    updated[selectedFieldIndex][key] = value;
    setFields(updated);
  };

  const removeField = (index) => {
    const updated = fields.filter((_, i) => i !== index);
    setFields(updated);
    if (selectedFieldIndex === index) {
      setSelectedFieldIndex(null);
    } else if (selectedFieldIndex > index) {
      setSelectedFieldIndex((prev) => prev - 1);
    }
  };

  const saveForm = async () => {
    // Trim to prevent whitespace-only input
    if (!formName.trim() || !slug.trim()) {
      alert("Please enter both a valid Form Name and Slug.");
      return;
    }

    if (fields.length === 0) {
      alert("Please add at least one field before saving the form.");
      return;
    }

    try {
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
        setSelectedFieldIndex(null);
      } else {
        const error = await res.json();
        console.error("Save failed:", error);
        alert("Error saving form. Please try again.");
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert(
        "Something went wrong. Please check your connection or try again later."
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r shadow">
        <h2 className="text-xl font-semibold mb-4">Fields</h2>
        {fieldTypes.map((f) => (
          <button
            key={f.type}
            className="block w-full mb-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-left"
            onClick={() => addField(f.type)}
          >
            ➕ {f.label}
          </button>
        ))}

        <hr className="my-6" />
        <h2 className="text-lg font-medium mb-2">Form Info</h2>
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={saveForm}
        >
          💾 Save Form
        </button>
      </aside>

      {/* Canvas */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Form Preview</h1>
        <div className="space-y-4">
          {fields.map((field, i) => (
            <div
              key={i}
              onClick={() => setSelectedFieldIndex(i)}
              className={`p-4 border rounded shadow-sm relative cursor-pointer ${
                selectedFieldIndex === i
                  ? "border-blue-500 bg-blue-50"
                  : "bg-white"
              }`}
            >
              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent selecting when deleting
                  removeField(i);
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
              >
                ✖
              </button>

              <label className="block font-semibold mb-1">{field.label}</label>
              {field.type === "button" ? (
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  {field.label}
                </button>
              ) : (
                <input
                  type={field.type}
                  className="w-full p-2 border rounded"
                  placeholder={field.label}
                  disabled
                />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Properties Panel */}
      {selectedFieldIndex !== null && (
        <aside className="w-80 bg-white border-l shadow p-4">
          <h2 className="text-lg font-bold mb-4">Edit Field</h2>
          <label className="text-sm font-medium">Label</label>
          <input
            className="w-full p-2 border rounded mb-3"
            value={fields[selectedFieldIndex].label}
            onChange={(e) => updateSelectedField("label", e.target.value)}
          />
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full p-2 border rounded mb-3"
            value={fields[selectedFieldIndex].name}
            onChange={(e) => updateSelectedField("name", e.target.value)}
          />
          <label className="text-sm font-medium">Type</label>
          <select
            className="w-full p-2 border rounded"
            value={fields[selectedFieldIndex].type}
            onChange={(e) => updateSelectedField("type", e.target.value)}
          >
            {fieldTypes.map((f) => (
              <option key={f.type} value={f.type}>
                {f.label}
              </option>
            ))}
          </select>
        </aside>
      )}
    </div>
  );
}
