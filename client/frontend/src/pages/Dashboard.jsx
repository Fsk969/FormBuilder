import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";

export default function Dashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/forms")
      .then((res) => res.json())
      .then((data) => setForms(data));
  }, []);

  return (
    <div className="flex min-h-screen">
      <aside className="fixed left-0 top-0 w-64 h-screen bg-white  px-6 py-8 shadow-sm flex flex-col justify-between">
        <div>
          {/* Profile Header */}
          <div className="flex items-center gap-3 mb-8 rounded shadow p-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
              <CgProfile className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Fsk</h4>
              <span className="text-xs text-green-600">Online</span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="space-y-2">
            {forms.map((form) => (
              <>
                <Link
                  key={form.name}
                  to={`renderer/${form.slug}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium 
                      ${
                        location.pathname === `renderer/${form.slug}`
                          ? "bg-gray-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                >
                  {/* <span className="text-lg">{form.icon}</span> */}
                  {form.name}
                </Link>
                <Link
                  key={form.name}
                  to={`entries/${form.slug}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium 
                      ${
                        location.pathname === form.path
                          ? "bg-gray-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                >
                  {/* <span className="text-lg">{form.icon}</span> */}
                  <CiBoxList />
                  {form.name} List
                </Link>
              </>
            ))}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="space-y-4">
          <Link
            to="/settings"
            className="flex items-center gap-3 text-gray-600 hover:text-blue-600 text-sm"
          >
            <IoSettingsOutline className="text-lg" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 py-2 ml-64 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
