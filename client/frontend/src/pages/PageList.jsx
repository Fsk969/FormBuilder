// pages/PageList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PageList() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/pages")
      .then((res) => res.json())
      .then(setPages);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pages</h1>
      <ul className="space-y-2">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link to={`/pages/${page.slug}`} className="text-blue-600 hover:underline">
              📄 {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
