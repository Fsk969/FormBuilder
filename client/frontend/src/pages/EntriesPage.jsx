import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EntriesPage() {
  const { slug } = useParams();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    visible: false,
    entry: null,
    index: null,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/forms/${slug}/entries`)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);

        console.log("Data", data);
        setLoading(false);
      });
  }, [slug]);

  const openModal = (entry, index) => {
    setModal({ visible: true, entry: { ...entry }, index });
  };

  const handleChange = (key, value) => {
    setModal({
      ...modal,
      entry: {
        ...modal.entry,
        data: { ...modal.entry.data, [key]: value },
      },
    });
  };

  const handleSave = async () => {
    const updatedEntry = modal.entry;

    try {
      const res = await fetch(
        `http://localhost:3000/api/forms/${slug}/entries/${updatedEntry.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: updatedEntry.data }),
        }
      );

      if (!res.ok) throw new Error("Failed to update");

      const updated = [...entries];
      updated[modal.index] = updatedEntry;
      setEntries(updated);
      setModal({ visible: false, entry: null, index: null });
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed. Check console for error.");
    }
  };

  const keys = entries.length > 0 ? Object.keys(entries[0].data || {}) : [];

  return (
    <div className="w-full px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6 capitalize text-gray-800 tracking-tight">
        {slug} Entries
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-gray-400">No entries found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b">
              <tr>
                {keys.map((key) => (
                  <th key={key} className="text-left px-6 py-3 font-medium">
                    {key}
                  </th>
                ))}
                <th className="text-left px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              {entries.map((entry, i) => (
                <tr key={entry.id || i}>
                  {keys.map((key) => (
                    <td key={key} className="px-6 py-4">
                      {entry.data?.[key] ?? "—"}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(entry, i)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Entry</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              {keys.map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {key}
                  </label>
                  <input
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={modal.entry.data[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModal({ visible: false, entry: null })}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
