// components/PageBuilder.jsx
import { useState } from "react";
import { AVAILABLE_BLOCKS } from "./blocks";

export default function PageBuilder({ onSave }) {
  const [canvas, setCanvas] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDrop = (blockId) => {
    const block = AVAILABLE_BLOCKS.find((b) => b.id === blockId);
    if (block) {
      setCanvas([
        ...canvas,
        {
          key: Date.now(),
          id: block.id,
          props: block.defaultProps,
        },
      ]);
    }
  };

  const updateBlockProps = (index, newProps) => {
    const updated = [...canvas];
    updated[index].props = newProps;
    setCanvas(updated);
  };

  const save = () => {
    onSave(canvas); // Save full canvas with props
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Sidebar */}
      <div className="w-1/4 border p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Components</h2>
        {AVAILABLE_BLOCKS.map((block) => (
          <div
            key={block.id}
            onClick={() => handleDrop(block.id)}
            className="p-2 mb-2 bg-gray-200 rounded cursor-pointer"
          >
            {block.label}
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div className="flex-1 border p-4 rounded shadow bg-white min-h-[300px]">
        <h2 className="font-semibold mb-4">Page Canvas</h2>
        {canvas.map((block, index) => {
          const definition = AVAILABLE_BLOCKS.find((b) => b.id === block.id);
          return (
            <div
              key={block.key}
              className={`mb-3 p-2 border rounded cursor-pointer ${
                selectedIndex === index ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              {definition?.render(block.props)}
            </div>
          );
        })}
        {canvas.length === 0 && (
          <p className="text-gray-400 italic">Drag components here...</p>
        )}
        <button
          onClick={save}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Page
        </button>
      </div>

      {/* Edit Panel */}
      {selectedIndex !== null && (
        <div className="w-1/4 border p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Edit Block</h2>
          {(() => {
            const block = canvas[selectedIndex];
            const definition = AVAILABLE_BLOCKS.find((b) => b.id === block.id);
            return definition?.edit(block.props, (newProps) =>
              updateBlockProps(selectedIndex, newProps)
            );
          })()}
        </div>
      )}
    </div>
  );
}
