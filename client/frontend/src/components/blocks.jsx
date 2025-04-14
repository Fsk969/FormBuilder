// components/blocks.jsx
export const AVAILABLE_BLOCKS = [
  {
    id: "text",
    label: "Text",
    defaultProps: { content: "Sample Text", width: "100%", height: "auto" },
    render: (props) => (
      <p
        style={{ width: props.width, height: props.height }}
        className="text-lg"
      >
        {props.content}
      </p>
    ),
    edit: (props, onChange) => (
      <div className="space-y-2">
        <input
          type="text"
          value={props.content}
          onChange={(e) => onChange({ ...props, content: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Width"
          value={props.width}
          onChange={(e) => onChange({ ...props, width: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Height"
          value={props.height}
          onChange={(e) => onChange({ ...props, height: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>
    ),
  },
  {
    id: "heading",
    label: "Heading",
    defaultProps: { content: "Heading", width: "100%", height: "auto" },
    render: (props) => (
      <h2
        style={{ width: props.width, height: props.height }}
        className="text-2xl font-Medium"
      >
        {props.content}
      </h2>
    ),
    edit: (props, onChange) => (
      <div className="space-y-2">
        <input
          type="text"
          value={props.content}
          onChange={(e) => onChange({ ...props, content: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Width"
          value={props.width}
          onChange={(e) => onChange({ ...props, width: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Height"
          value={props.height}
          onChange={(e) => onChange({ ...props, height: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>
    ),
  },
  {
    id: "button",
    label: "Button",
    defaultProps: { label: "Click Me", width: "fit-content", height: "auto" },
    render: (props) => (
      <button
        style={{ width: props.width, height: props.height }}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {props.label}
      </button>
    ),
    edit: (props, onChange) => (
      <div className="space-y-2">
        <input
          type="text"
          value={props.label}
          onChange={(e) => onChange({ ...props, label: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Width"
          value={props.width}
          onChange={(e) => onChange({ ...props, width: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Height"
          value={props.height}
          onChange={(e) => onChange({ ...props, height: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>
    ),
  },
  {
    id: "input",
    label: "Input Field",
    defaultProps: {
      placeholder: "Enter something...",
      width: "100%",
      height: "auto",
    },
    render: (props) => (
      <input
        type="text"
        placeholder={props.placeholder}
        style={{ width: props.width, height: props.height }}
        className="p-2 border border-gray-300 rounded"
      />
    ),
    edit: (props, onChange) => (
      <div className="space-y-2">
        <input
          type="text"
          value={props.placeholder}
          onChange={(e) => onChange({ ...props, placeholder: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Width"
          value={props.width}
          onChange={(e) => onChange({ ...props, width: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Height"
          value={props.height}
          onChange={(e) => onChange({ ...props, height: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>
    ),
  },
  {
    id: "textarea",
    label: "Textarea",
    defaultProps: {
      placeholder: "Your message...",
      width: "100%",
      height: "auto",
    },
    render: (props) => (
      <textarea
        placeholder={props.placeholder}
        style={{ width: props.width, height: props.height }}
        className="p-2 border border-gray-300 rounded"
      />
    ),
    edit: (props, onChange) => (
      <div className="space-y-2">
        <input
          type="text"
          value={props.placeholder}
          onChange={(e) => onChange({ ...props, placeholder: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Width"
          value={props.width}
          onChange={(e) => onChange({ ...props, width: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Height"
          value={props.height}
          onChange={(e) => onChange({ ...props, height: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>
    ),
  },
  {
    id: "form",
    label: "Form",
    defaultProps: {
      fields: [
        {
          key: Date.now(),
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
          required: true,
        },
      ],
    },

    render: (
      props,
      context = {} // ✅ Provide fallback
    ) => {
      const {
        formData = {},
        handleChange = () => {},
        handleSubmit = (e) => e.preventDefault(),
        submitting = false,
      } = context;

      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          {props.fields?.map((field) => (
            <div key={field.key} className="space-y-1">
              <label className="block font-semibold">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.label] || ""}
                onChange={(e) => handleChange(field.label, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      );
    },

    edit: (props, onChange) => {
      const updateField = (idx, newField) => {
        const updatedFields = [...props.fields];
        updatedFields[idx] = newField;
        onChange({ ...props, fields: updatedFields });
      };

      const addField = () => {
        onChange({
          ...props,
          fields: [
            ...props.fields,
            {
              key: Date.now(),
              label: "New Field",
              type: "text",
              placeholder: "",
              required: false,
            },
          ],
        });
      };

      return (
        <div className="space-y-3">
          {props.fields.map((field, idx) => (
            <div
              key={field.key}
              className="p-2 border border-gray-300 rounded space-y-2"
            >
              <input
                type="text"
                value={field.label}
                onChange={(e) =>
                  updateField(idx, { ...field, label: e.target.value })
                }
                placeholder="Label"
                className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
              />
              <input
                type="text"
                value={field.placeholder}
                onChange={(e) =>
                  updateField(idx, { ...field, placeholder: e.target.value })
                }
                placeholder="Placeholder"
                className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
              />
              <select
                value={field.type}
                onChange={(e) =>
                  updateField(idx, { ...field, type: e.target.value })
                }
                className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="password">Password</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(idx, { ...field, required: e.target.checked })
                  }
                />
                Required
              </label>
            </div>
          ))}

          <button
            type="button"
            onClick={addField}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            Add Field
          </button>
        </div>
      );
    },
  },
  {
    id: "columns",
    label: "Column Layout",
    defaultProps: {
      columns: 3,
    },
    render: ({ columns }) => (
      <div className={`grid gap-4 grid-cols-${columns}`}>
        {[...Array(columns)].map((_, i) => (
          <div
            key={i}
            className="p-4 border border-gray-300 bg-gray-100 text-center"
          >
            Column {i + 1}
          </div>
        ))}
      </div>
    ),
    edit: (props, onChange) => (
      <div className="space-y-2">
        <label className="block text-sm font-medium">Columns</label>
        <select
          value={props.columns}
          onChange={(e) =>
            onChange({ ...props, columns: parseInt(e.target.value) })
          }
          className="w-full border border-gray-300 px-2 py-2 rounded"
        >
          {[2, 3, 4].map((col) => (
            <option key={col} value={col}>
              {col} Columns
            </option>
          ))}
        </select>
      </div>
    ),
  },
  {
    id: "rows",
    label: "Row Layout",
    defaultProps: {
      rows: 3,
    },
    render: ({ rows }) => (
      <div className="flex flex-col gap-4">
        {[...Array(rows)].map((_, i) => (
          <div
            key={i}
            className="h-24 border border-gray-300 bg-gray-100 flex items-center justify-center"
          >
            Row {i + 1}
          </div>
        ))}
      </div>
    ),
    edit: (props, onChange) => (
      <div className="space-y-2">
        <label className="block text-sm font-medium">Rows</label>
        <select
          value={props.rows}
          onChange={(e) =>
            onChange({ ...props, rows: parseInt(e.target.value, 10) })
          }
          className="w-full border border-gray-300 px-2 py-2 rounded"
        >
          {[2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Row{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
    ),
  },
  {
    id: "checkbox",
    label: "Checkbox",
    defaultProps: { label: "Accept terms", width: "auto", height: "auto" },
    render: (props) => (
      <label
        style={{ width: props.width, height: props.height }}
        className="flex items-center gap-2"
      >
        <input type="checkbox" />
        {props.label}
      </label>
    ),
    edit: (props, onChange) => (
      <div className="space-y-2">
        <input
          type="text"
          value={props.label}
          onChange={(e) => onChange({ ...props, label: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Width"
          value={props.width}
          onChange={(e) => onChange({ ...props, width: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="Height"
          value={props.height}
          onChange={(e) => onChange({ ...props, height: e.target.value })}
          className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>
    ),
  },
  {
    id: "table",
    label: "Table",
    defaultProps: {
      rowData: [],
      columnDefs: [],
      width: "100%",
      height: "auto",
    },
    render: (props) => (
      <div style={{ width: props.width, height: props.height }}>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              {props.columnDefs.map((col, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  {col.headerName || (
                    <span className="text-gray-400 italic">Untitled</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.rowData.length > 0 ? (
              props.rowData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {props.columnDefs.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {row[col.field] || ""}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                {props.columnDefs.map((_, i) => (
                  <td
                    key={i}
                    className="border border-gray-300 px-4 py-2 text-center text-gray-400"
                  >
                    Empty
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    ),
    edit: (props, onChange) => {
      const updateRowData = (index, field, value) => {
        const updated = [...props.rowData];
        updated[index] = { ...updated[index], [field]: value };
        onChange({ ...props, rowData: updated });
      };

      const updateColumnDefs = (index, key, value) => {
        const updated = [...props.columnDefs];
        updated[index] = { ...updated[index], [key]: value };
        onChange({ ...props, columnDefs: updated });
      };

      const addColumn = () => {
        const updated = [...props.columnDefs, { headerName: "", field: "" }];
        onChange({ ...props, columnDefs: updated });
      };

      const addRow = () => {
        const newRow = {};
        props.columnDefs.forEach((col) => {
          newRow[col.field] = "";
        });
        onChange({ ...props, rowData: [...props.rowData, newRow] });
      };

      return (
        <div className="space-y-4">
          <h4 className="font-semibold">Columns</h4>
          {props.columnDefs.map((col, i) => (
            <div key={i} className="flex gap-2 mb-2 flex-col">
              <input
                type="text"
                placeholder="Header Name"
                value={col.headerName}
                onChange={(e) =>
                  updateColumnDefs(i, "headerName", e.target.value)
                }
                className="flex-1 px-2 py-1 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Field"
                value={col.field}
                onChange={(e) => updateColumnDefs(i, "field", e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button
            onClick={addColumn}
            className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Column
          </button>

          <h4 className="font-semibold mt-4">Rows</h4>
          {props.rowData.map((row, i) => (
            <div key={i} className="flex gap-2 mb-2 flex-col">
              {props.columnDefs.map((col) => (
                <input
                  key={col.field}
                  type="text"
                  placeholder={col.field}
                  value={row[col.field] || ""}
                  onChange={(e) => updateRowData(i, col.field, e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded"
                />
              ))}
            </div>
          ))}
          {props.columnDefs.length > 0 && (
            <button
              onClick={addRow}
              className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Row
            </button>
          )}

          <div className="flex gap-2 mt-4 flex-col">
            <input
              type="text"
              placeholder="Width"
              value={props.width}
              onChange={(e) => onChange({ ...props, width: e.target.value })}
              className="flex-1 px-2 py-1 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Height"
              value={props.height}
              onChange={(e) => onChange({ ...props, height: e.target.value })}
              className="flex-1 px-2 py-1 border border-gray-300 rounded"
            />
          </div>
        </div>
      );
    },
  },
];
