import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Builder from "./pages/Builder";
import Renderer from "./pages/Renderer";
import Dashboard from "./pages/Dashboard";
import EntriesPage from "./pages/Entriespage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/builder" element={<Builder />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="renderer/:slug" element={<Renderer />} />
          <Route path="entries/:slug" element={<EntriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
