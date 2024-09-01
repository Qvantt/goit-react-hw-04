import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { searchImages } from "./api";
import { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    fetchImages(searchQuery, 1);
  };

  const fetchImages = async (searchQuery, pageNum) => {
    setLoading(true);
    try {
      const data = await searchImages(searchQuery, pageNum);
      setImages((prevImages) => [...prevImages, ...data.results]);
    } catch (err) {
      setError("Failed to fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={Boolean(selectedImage)}
          onRequestClose={handleCloseModal}
          image={selectedImage}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
