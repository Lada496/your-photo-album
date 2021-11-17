import React from "react";
import { Routes, Route } from "react-router";
import GalleryList from "../components/GalleryList";
import UploadPage from "./UploadPage";

const ProtectedPage = () => {
  return (
    <Routes>
      <Route path="gallery" element={<GalleryList />} />
      <Route path="upload" element={<UploadPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default ProtectedPage;
