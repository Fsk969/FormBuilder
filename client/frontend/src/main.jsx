import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Builder from "./pages/Builder";
import Renderer from "./pages/Renderer";
import Dashboard from "./pages/Dashboard";
import EntriesPage from "./pages/Entriespage";
import Home from "./pages/Home";
import AppBuilderPage from "./pages/appBuilder/AppBuilderPage";
import PageList from "./pages/PageList";
import PageViewer from "./pages/PageViewer";
import CreatePageForm from "./components/CreatePageForm";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/app-builder" element={<AppBuilderPage />} />
        <Route path="/pages" element={<PageList />} />
        <Route path="/pages/:slug" element={<PageViewer />} />
        <Route path="/admin/create-page" element={<CreatePageForm />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="renderer/:slug" element={<Renderer />} />
          <Route path="entries/:slug" element={<EntriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
