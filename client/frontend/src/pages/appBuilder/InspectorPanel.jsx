import React from "react";

export default function InspectorPanel({ selected, onUpdate }) {
  if (!selected)
    return (
      <aside className="w-64 bg-white p-4 border-l">Select a component</aside>
    );

  return (
    <aside className="w-64 bg-white p-4 border-l">
      <h3 className="font-bold mb-2">🛠 Edit Component</h3>
      <input
        className="input mb-2"
        placeholder="Label"
        value={selected.props.label}
        onChange={(e) =>
          onUpdate({
            ...selected,
            props: { ...selected.props, label: e.target.value },
          })
        }
      />
    </aside>
  );
}
