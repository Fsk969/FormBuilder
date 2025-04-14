import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaWpforms } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineContactPage } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function Home() {
  const [forms, setForms] = useState([]);
  const [pages, setPages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const toggleActive = () => setIsActive(!isActive);

  console.log("Pages", pages);

  const links = [
    { name: "Dashboard", path: "/", icon: <MdOutlineDashboard /> },
    { name: "Form Builder", path: "/form-builder", icon: <FaWpforms /> },
    {
      name: "Create Page",
      path: "/admin/create-page",
      icon: <MdOutlineContactPage />,
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/api/forms")
      .then((res) => res.json())
      .then((data) => setForms(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/pages")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setPages(data))
      .catch((err) => {
        console.error("Failed to fetch pages:", err);
        // Optional: set error state and show user-friendly message
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 w-64 h-screen bg-white  px-6 py-8 shadow-sm flex flex-col justify-between">
        <div>
          {/* Profile Header */}
          <div className="flex items-center gap-3 mb-8 rounded shadow p-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
              <CgProfile className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Fsk
              </h4>
              <span className="text-xs text-green-600">Online</span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium 
                ${
                  location.pathname === link.path
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* My Forms Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-2 text-sm font-semibold text-gray-500">
              <h1 className="text-sm uppercase text-gray-700">My Forms</h1>
              <Link
                to="/form-builder"
                className="text-blue-600 text-xs hover:underline"
              >
                + Add
              </Link>
            </div>
            <ul className="space-y-2">
              {forms.map((form) => (
                <Link
                  key={form.name}
                  to={`/renderer/${form.slug}`}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className={`w-2 h-2 rounded-full ${form.color}`}></span>
                  {form.name}
                </Link>
              ))}
            </ul>
          </div>
          {/* My Pages Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-2 text-sm font-semibold text-gray-500">
              <h1 className="text-sm uppercase text-gray-700">My Pages</h1>
              <Link
                to="/admin/create-page"
                className="text-blue-600 text-xs hover:underline"
              >
                + Add
              </Link>
            </div>
            <ul className="space-y-2">
              {pages.map((page) => (
                <Link
                  key={page.name}
                  to={`/pages/${page.slug}`}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className={`w-2 h-2 rounded-full ${page.color}`}></span>
                  {page.name}
                </Link>
              ))}
            </ul>
          </div>
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
