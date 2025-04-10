import React, { useState } from "react";
import ComponentPalette from "./ComponentPalette";
import CanvasEditor from "./CanvasEditor";
import InspectorPanel from "./InspectorPanel";

export default function AppBuilderPage() {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Component Sidebar */}
      <ComponentPalette onAdd={(comp) => setComponents([...components, comp])} />

      {/* Canvas */}
      <CanvasEditor
        components={components}
        onSelect={setSelectedComponent}
      />

      {/* Inspector Panel */}
      <InspectorPanel
        selected={selectedComponent}
        onUpdate={(updated) =>
          setComponents((prev) =>
            prev.map((c) => (c.id === updated.id ? updated : c))
          )
        }
      />
    </div>
  );
}
