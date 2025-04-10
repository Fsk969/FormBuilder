// components/blocks.jsx
export const AVAILABLE_BLOCKS = [
  {
    id: "text",
    label: "Text",
    defaultProps: { content: "Sample Text" },
    render: (props) => <p className="text-lg">{props.content}</p>,
    edit: (props, onChange) => (
      <input
        type="text"
        value={props.content}
        onChange={(e) => onChange({ ...props, content: e.target.value })}
        className="w-full p-1 border rounded"
      />
    ),
  },
  {
    id: "heading",
    label: "Heading",
    defaultProps: { content: "Heading" },
    render: (props) => <h2 className="text-2xl font-bold">{props.content}</h2>,
    edit: (props, onChange) => (
      <input
        type="text"
        value={props.content}
        onChange={(e) => onChange({ ...props, content: e.target.value })}
        className="w-full p-1 border rounded"
      />
    ),
  },
  {
    id: "button",
    label: "Button",
    defaultProps: { label: "Click Me" },
    render: (props) => (
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        {props.label}
      </button>
    ),
    edit: (props, onChange) => (
      <input
        type="text"
        value={props.label}
        onChange={(e) => onChange({ ...props, label: e.target.value })}
        className="w-full p-1 border rounded"
      />
    ),
  },
];
