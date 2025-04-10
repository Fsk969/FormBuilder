import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function ComponentPalette({ onAdd }) {
  const components = [
    { type: "input", label: "Input Field" },
    { type: "button", label: "Button" },
    { type: "text", label: "Text Block" },
  ];

  return (
    <aside className="w-60 bg-white border-r p-4 space-y-4">
      <h3 className="font-bold text-lg">🧩 Components</h3>
      {components.map((c, idx) => (
        <button
          key={idx}
          onClick={() =>
            onAdd({ id: uuidv4(), type: c.type, props: { label: c.label } })
          }
          className="w-full bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
        >
          ➕ {c.label}
        </button>
      ))}
    </aside>
  );
}
