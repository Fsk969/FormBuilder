import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/forms")
      .then((res) => res.json())
      .then((data) => setForms(data));
  }, []);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Forms</h2>
        <ul className="space-y-2">
          {forms.map((form) => (
            <li key={form.slug}>
              <Link
                to={`renderer/${form.slug}`}
                className="block hover:underline"
              >
                ➕ {form.name}
              </Link>
              <Link
                to={`entries/${form.slug}`}
                className="ml-4 text-sm text-blue-500 hover:underline"
              >
                📄 View Entries
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
    