import { useState, useRef, useEffect } from "react";
import { MdOutlineEdit, MdDeleteOutline, MdMoreVert } from "react-icons/md";
import { IoDuplicateOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

export const FormCard = ({
  form,
  handleEdit,
  handleDelete,
  handleDuplicate,
  buttonText,
  to
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col justify-between relative">
      {/* Dropdown Trigger */}
      <div className="absolute top-2 right-2" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <MdMoreVert size={20} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <button
              onClick={() => {
                handleEdit(form);
                setOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <MdOutlineEdit className="text-blue-600" /> Edit
            </button>
            <button
              onClick={() => {
                handleDelete(form.slug);
                setOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <MdDeleteOutline className="text-red-600" /> Delete
            </button>
            <button
              onClick={() => {
                handleDuplicate(form);
                setOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <IoDuplicateOutline className="text-green-600" /> Duplicate
            </button>
            <button
              onClick={() => {
                window.open(`${to}`, "_blank");
                setOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <FiExternalLink className="text-gray-700" /> {buttonText}
            </button>
          </div>
        )}
      </div>

      {/* Form Content */}
      <div className="">
        <h2 className="text-xl mb-2 capitalize text-gray-600">{form.name}</h2>
        <p className="text-gray-600">Slug: {form.slug}</p>
      </div>
    </div>
  );
};
