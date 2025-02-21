import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { Link } from "react-router-dom";

const ImageCompressor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalImageSize, setOriginalImageSize] = useState(null); // State to store original image size
  const [compressedImageSize, setCompressedImageSize] = useState(null); // State to store compressed image size
  const [uploadStatus, setUploadStatus] = useState(""); // Status for upload errors

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setOriginalImageSize((file.size / 1024 / 1024).toFixed(2)); // Convert size to MB
    setUploadStatus(""); // Reset status before any action

    const options = {
      maxSizeMB: 1, // Maximum file size (MB)
      maxWidthOrHeight: 800, // Maximum width or height
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setCompressedImage(URL.createObjectURL(compressedFile));
      setCompressedImageSize((compressedFile.size / 1024 / 1024).toFixed(2)); // Convert size to MB
      uploadToBackend(compressedFile);
    } catch (error) {
      console.error("Compression failed:", error);
      setUploadStatus("Compression failed! Please try again."); // Show error message if compression fails
    }
  };

  const uploadToBackend = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setUploadStatus(data.message); // Show success/failure message from server
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed! Please try again."); // Show error message if upload fails
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg text-center border border-gray-300">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Image Compressor Tool</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-6 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg cursor-pointer transition duration-300 hover:bg-blue-200 focus:outline-none"
        />

        {selectedImage && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Original Image:</h3>
            <img
              src={selectedImage}
              alt="Original"
              className="w-full max-w-xs mx-auto mt-2 rounded-lg shadow-xl"
            />
            {originalImageSize && (
              <p className="mt-2 text-sm text-gray-600">
                Original Image Size: {originalImageSize} MB
              </p>
            )}
          </div>
        )}

        {compressedImage && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Compressed Image:</h3>
            <img
              src={compressedImage}
              alt="Compressed"
              className="w-full max-w-xs mx-auto mt-2 rounded-lg shadow-xl"
            />
            {compressedImageSize && (
              <p className="mt-2 text-sm text-gray-600">
                Compressed Image Size: {compressedImageSize} MB
              </p>
            )}
            {/* Added more space between the image size and download button */}
            <div className="mt-6">
              <a
                href={compressedImage}
                download="compressed-image.jpg"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              >
                Download Compressed Image
              </a>
            </div>
          </div>
        )}

        {uploadStatus && (
          <p
            className={`mt-4 text-lg font-semibold ${uploadStatus.includes("failed") ? "text-red-600" : "text-green-600"
              }`}
          >
            {uploadStatus}
          </p>
        )}
      </div>

      <div className="w-full flex-grow"></div>
      <footer className="bg-gray-900 text-white py-6 w-full text-center">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">Image Compressor Tool</h2>
            <p className="text-sm opacity-70 mt-1">
              Optimize your images with ease.
            </p>
          </div>

          {/* Center Section - Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/home" className="hover:text-gray-400 transition">About</Link>
            <Link to="/privacy" className="hover:text-gray-400 transition">Privacy Policy</Link>
            <Link to="/ContactPage" className="hover:text-gray-400 transition">Contact</Link>
          </div>



        </div>
        <div className="text-center text-sm opacity-60 mt-4">
          &copy; {new Date().getFullYear()} Image Compressor Tool. All rights reserved.
        </div>

        <div className="text-center text-md mt-4">
          <p>Image compression helps reduce the file size of your images while maintaining quality,</p>
          <p> making them easier to store, share, and upload. Whether you're optimizing photos for </p>
          <p>websites, emails, or social media, this tool ensures a smooth and efficient process.</p>
        </div>

      </footer>
    </div>

  );
};

export default ImageCompressor;
