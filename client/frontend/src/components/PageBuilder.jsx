import { useState } from "react";
import { AVAILABLE_BLOCKS } from "./Blocks";

export default function PageBuilder({ layout, setLayout }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDrop = (event) => {
    const blockId = event.dataTransfer.getData("block-id");
    const block = AVAILABLE_BLOCKS.find((b) => b.id === blockId);
    if (block) {
      setLayout([
        ...layout,
        { key: Date.now(), id: block.id, props: block.defaultProps },
      ]);
    }
  };

  const handleDropInRow = (parentIndex, rowIndex, event) => {
    const blockId = event.dataTransfer.getData("block-id");
    const block = AVAILABLE_BLOCKS.find((b) => b.id === blockId);
    if (!block) return;

    const updated = [...layout];
    const parent = updated[parentIndex];

    // Ensure parent is row-layout type
    if (
      parent.id === "row-layout" &&
      parent.props?.children &&
      Array.isArray(parent.props.children[rowIndex])
    ) {
      parent.props.children[rowIndex].push({
        key: Date.now(),
        id: block.id,
        props: block.defaultProps,
      });
      setLayout(updated);
    }
  };

  const updateBlockProps = (index, newProps) => {
    const updated = [...layout];
    updated[index].props = newProps;
    setLayout(updated);
  };

  const removeBlock = (index) => {
    setLayout(layout.filter((_, i) => i !== index));
    setSelectedIndex(null);
  };

  return (
    <div className="flex gap-4 w-full h-full shadow-lg">
      {/* Main Canvas Area */}
      <div
        className="flex-1 min-h-[80vh] rounded p-4 bg-white shadow-lg"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h2 className="text-xl font-semibold mb-4">Page Canvas</h2>

        {layout.map((block, index) => {
          const def = AVAILABLE_BLOCKS.find((b) => b.id === block.id);
          return (
            <div
              key={block.key}
              onClick={() => setSelectedIndex(index)}
              className={`mb-4 p-3 border border-gray-300 rounded relative group cursor-pointer ${
                selectedIndex === index ? "bg-gray-100" : ""
              }`}
            >
              {/* Render with nested drop support */}
              {def?.render(block.props, (e, rowIndex) =>
                handleDropInRow(index, rowIndex, e)
              )}

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeBlock(index);
                }}
                className="absolute top-1 right-1 text-red-500 text-sm px-2 py-0.5 rounded hover:bg-red-100 hidden group-hover:block"
              >
                ✕
              </button>
            </div>
          );
        })}

        {layout.length === 0 && (
          <p className="text-gray-400 italic">Drag components here...</p>
        )}
      </div>

      {/* Right Sidebar: Edit Block */}
      {selectedIndex !== null && layout[selectedIndex] && (
        <div className="w-64  rounded p-4 bg-white shadow-lg shrink-0 relative overflow-y-auto max-h-screen">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
            aria-label="Close edit panel"
          >
            ✕
          </button>

          <h3 className="text-lg font-semibold mb-4">Edit Block</h3>

          {(() => {
            const block = layout[selectedIndex];
            const def = AVAILABLE_BLOCKS.find((b) => b.id === block.id);
            return def?.edit(block.props, (newProps) =>
              updateBlockProps(selectedIndex, newProps)
            );
          })()}
        </div>
      )}
    </div>
  );
}
