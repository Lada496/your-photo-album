import React from "react";
import { Routes, Route, Navigate } from "react-router";
import GalleryList from "../components/GalleryList";
import NotFoundPage from "./NotFoundPage";
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
