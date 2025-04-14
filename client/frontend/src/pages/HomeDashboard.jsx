import React, { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaWpforms } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineContactPage } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoDuplicateOutline } from "react-icons/io5";
import { FormCard } from "../components/FormCard";

const HomeDashboard = () => {
  const [forms, setForms] = useState([]);
  const [pages, setPages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const [searchForm, setSearchForm] = useState("");
  const [searchPages, setSearchPages] = useState("");

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

  const projects = [
    { name: "Product launch", color: "bg-purple-600" },
    { name: "Team brainstorm", color: "bg-blue-600" },
    { name: "Branding launch", color: "bg-teal-500" },
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

  const filteredForms = useMemo(() => {
    return forms.filter((form) =>
      form.name.toLowerCase().includes(searchForm.toLowerCase())
    );
  }, [searchForm, forms]);

  const filteredPages = useMemo(() => {
    return pages.filter((page) =>
      page.name.toLowerCase().includes(searchPages.toLowerCase())
    );
  }, [searchPages, pages]);

  const handleEdit = (form) => {
    // Navigate to edit screen or open modal
    console.log("Edit:", form);
  };

  const handleDelete = (slug) => {
    // Show confirmation modal before deleting
    if (window.confirm("Are you sure you want to delete this form?")) {
      // Call delete API here
      console.log("Deleted form:", slug);
    }
  };

  const handleDuplicate = (form) => {
    const duplicatedForm = {
      ...form,
      name: `${form.name} Copy`,
      slug: `${form.slug}-copy`,
    };
    // Call API to save duplicated form
    console.log("Duplicated form:", duplicatedForm);
  };

  return (
    <div className="">
      {/* Top Bar */}
      <div className="w-full bg-white px-4 h-16 flex items-center justify-between shadow mb-3">
        <h2 className="text-xl font-medium">Welcome, Fsk 👋</h2>
      </div>

      <h1 className="text-lg font-medium text-gray-500">Dashboard Metrics</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white w-full h-24 rounded shadow px-2 py-1 flex flex-col justify-center">
          <h1 className="text-lg text-gray-500">Total Forms Created</h1>
          <h2 className="text-2xl font-medium text-red-500">{forms.length}</h2>
        </div>
        <div className="bg-white w-full h-24 rounded shadow px-2 py-1 flex flex-col justify-center">
          <h1 className="text-lg text-gray-500">Total Pages Created</h1>
          <h2 className="text-2xl font-medium text-blue-500">{pages.length}</h2>
        </div>
      </div>

      <div>
        <div className="flex  items-center justify-between my-2">
          <h1 className="text-lg font-medium mb-2 text-gray-500">All Forms</h1>
          <div className="border border-gray-300 rounded px-2 py-1 flex flex-row items-center gap-1 bg-white">
            <IoIosSearch className="size-5 text-gray-500" />
            <input
              type="text"
              value={searchForm}
              onChange={(e) => setSearchForm(e.target.value)}
              className="focus:outline-none"
              placeholder="Search Form"
            />
          </div>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredForms.map((form) => (
            <FormCard
              key={form.slug}
              form={form}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDuplicate={handleDuplicate}
              buttonText="Go To Form"
            />
          ))}
        </div> */}

        {filteredForms.length === 0 ? (
          <p className="text-gray-500">
            No pages found. Try creating one using the Page Builder.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredForms.map((form) => (
              <div
                key={form.slug}
                className="bg-white rounded shadow p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl mb-2 capitalize text-gray-600">
                    {form.name || "Untitle form Name"}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Slug: {form.slug || "Slug is empty"}
                  </p>
                </div>
                <Link
                  to={`/renderer/${form.slug}`}
                  className="inline-block mt-auto bg-blue-600 text-white text-sm text-center px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Go to Page
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* <h1 className="text-lg font-medium mb-2 text-gray-500 mt-4">
          My Pages
        </h1> */}

        <div className="flex  items-center justify-between my-2">
          <h1 className="text-lg font-medium mb-2 text-gray-500">All Pages</h1>
          <div className="border border-gray-300 rounded px-2 py-1 flex flex-row items-center gap-1 bg-white">
            <IoIosSearch className="size-5 text-gray-500" />
            <input
              type="text"
              value={searchPages}
              onChange={(e) => setSearchPages(e.target.value)}
              className="focus:outline-none"
              placeholder="Search Pages"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPages.map((page) => (
            <FormCard
              key={page.slug}
              form={page}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDuplicate={handleDuplicate}
              buttonText="Go to Page"
              to={`/pages/${page.slug}`}
            />
          ))}
        </div>

        {/* {filteredPages.length === 0 ? (
          <p className="text-gray-500">
            No pages found. Try creating one using the Page Builder.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPages.map((page) => (
              <div
                key={page.slug}
                className="bg-white rounded shadow p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl mb-2 capitalize text-gray-600">
                    {page.name || "Untitle Page Name"}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Slug: {page.slug || "Slug is empty"}
                  </p>
                </div>
                <Link
                  to={`/pages/${page.slug}`}
                  className="inline-block mt-auto bg-blue-600 text-white text-sm text-center px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Go to Page
                </Link>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default HomeDashboard;
