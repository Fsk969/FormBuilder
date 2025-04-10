import React from "react";

export default function CanvasEditor({ components, onSelect }) {
  return (
    <main className="flex-1 bg-gray-50 p-6">
      <h2 className="text-xl font-bold mb-4">🎨 App Canvas</h2>
      <div className="space-y-4">
        {components.map((c) => (
          <div
            key={c.id}
            className="p-4 bg-white border rounded shadow-sm cursor-pointer hover:border-blue-500"
            onClick={() => onSelect(c)}
          >
            {c.type === "input" && <input className="input" placeholder={c.props.label} readOnly />}
            {c.type === "button" && (
              <button className="btn bg-blue-500 text-white">{c.props.label}</button>
            )}
            {c.type === "text" && <p>{c.props.label}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
