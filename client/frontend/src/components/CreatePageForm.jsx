import { useState } from "react";
import PageBuilder from "./PageBuilder";
import { DndContext } from "@dnd-kit/core";
import { AVAILABLE_BLOCKS } from "./Blocks";

export default function CreatePageForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [layout, setLayout] = useState([]);

  const handleSave = async () => {
    if (!name || !slug) {
      alert("Please Enter the Page Name and Slug!");
      throw Error;
    }

    try {
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
    } catch (error) {
      console.log("Error in Saving Page: ", error);
    }
  };

  return (
    <DndContext>
      <div className="flex flex-col gap-4 min-h-full">
        {/* Unified Sidebar */}

        <div className="w-full bg-white px-4 h-16 flex items-center justify-between shadow-lg">
          <h2 className="text-xl font-medium">Create Page</h2>
          <div className="flex gap-4 w-[50%]">
            <input
              placeholder="Page Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 focus:outline-none rounded"
            />
            <input
              placeholder="Slug (e.g. contact-us)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full p-2 border border-gray-300 focus:outline-none rounded"
            />

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              // disabled={!name || !slug}
            >
              Save Page
            </button>
          </div>
        </div>

        <div className="flex min-h-full w-full">
          <div className="w-64 bg-white py-2 px-4 shadow-lg overflow-y-auto">
            <h2 className="font-semibold mb-2">Available Components</h2>
            <div className="space-y-2">
              {AVAILABLE_BLOCKS.map((block) => (
                <div
                  key={block.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("block-id", block.id);
                  }}
                  className="cursor-move p-2 bg-white border border-gray-300 focus:outline-none rounded hover:bg-gray-100"
                >
                  {block.label}
                </div>
              ))}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 overflow-y-auto pl-4">
            <PageBuilder layout={layout} setLayout={setLayout} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
