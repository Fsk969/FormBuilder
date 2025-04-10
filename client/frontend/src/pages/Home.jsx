import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/forms")
      .then((res) => res.json())
      .then((data) => setForms(data));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">MyApp</h2>
        <nav className="space-y-4">
          <Link
            to="/builder"
            className="block text-gray-700 hover:text-blue-600"
          >
            🛠️ Form Builder
          </Link>
          <Link
            to="/dashboard"
            className="block text-gray-700 hover:text-blue-600"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/profile"
            className="block text-gray-700 hover:text-blue-600"
          >
            👤 Profile
          </Link>
          <Link
            to="/app-builder"
            className="block text-gray-700 hover:text-blue-600"
          >
            🏗️ App Builder
          </Link>
          <Link
            to="/admin/create-page"
            className="block text-gray-700 hover:text-blue-600"
          >
            🏗️ Create Page
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-6">Available Forms</h1>

        {forms.length === 0 ? (
          <p className="text-gray-500">
            No forms found. Try creating one using the Form Builder.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div
                key={form.slug}
                className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2 capitalize">
                    {form.name}
                  </h2>
                  <p className="text-gray-600 mb-4">Slug: {form.slug}</p>
                </div>
                <Link
                  to={`/dashboard/renderer/${form.slug}`}
                  className="inline-block mt-auto bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Go to Form
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
