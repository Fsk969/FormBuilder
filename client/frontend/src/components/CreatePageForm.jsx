import { useState } from "react";
import PageBuilder from "./PageBuilder";
import { DndContext } from "@dnd-kit/core";
import { AVAILABLE_BLOCKS } from "./blocks";

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
        content: { layout },
      }),
    });

    alert(res.ok ? "Page saved!" : "Error saving page.");
  };

  return (
    <DndContext>
      <div className="flex h-screen">
        {/* Unified Sidebar */}
        <div className="w-80 bg-gray-100 p-6 border-r overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">New Page</h1>

          <div className="space-y-4 mb-6">
            <input
              placeholder="Page Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Slug (e.g. contact-us)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <button
              onClick={handleSave}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save Page
            </button>
          </div>

          <h2 className="font-semibold mb-2">Available Components</h2>
          <div className="space-y-2">
            {AVAILABLE_BLOCKS.map((block) => (
              <div
                key={block.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("block-id", block.id);
                }}
                className="cursor-move p-2 bg-white border rounded hover:bg-gray-200"
              >
                {block.label}
              </div>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-white overflow-y-auto p-6">
          <PageBuilder layout={layout} setLayout={setLayout} />
        </div>
      </div>
    </DndContext>
  );
}
