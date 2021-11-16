import React from "react";
import { Routes, Route } from "react-router";
import GalleryList from "../components/GalleryList";
import UploadPage from "./UploadPage";

const HomePage = () => {
  return (
    <Routes>
      <Route path="/" element={<GalleryList />} />
      <Route path="upload" element={<UploadPage />} />
    </Routes>
  );
};

export default HomePage;
