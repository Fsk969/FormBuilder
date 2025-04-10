// pages/CreatePageForm.jsx
import { useState } from "react";
import PageBuilder from "./PageBuilder";

export default function CreatePageForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [layout, setLayout] = useState([]);

  const handleSave = async () => {
    const res = await fetch("http://localhost:3000/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        content: { layout }, // saving the layout JSON
      }),
    });

    if (res.ok) {
      alert("Page saved!");
    } else {
      alert("Error saving page.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Page</h1>

      <div className="space-y-4">
        <input
          placeholder="Page Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <PageBuilder
        onSave={(layout) => {
          setLayout(layout);
          handleSave();
        }}
      />
    </div>
  );
}
