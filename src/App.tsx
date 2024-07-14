import { useState, useEffect } from "react";
import fetchImages from "./components/api-img/api-img";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "../App.types";

interface FetchImagesResponse {
  results: Image[];
  total: number;
}

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loadState, setLoadState] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [totalImages, setTotalImages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoadState(true);
      try {
        const { results, total }: FetchImagesResponse = await fetchImages(
          query,
          page
        );
        if (page === 1) {
          setImages(results);
          setTotalImages(total);
        } else {
          setImages((prevImages) => [...prevImages, ...results]);
        }
        setLoadState(false);
        if (total === 0) {
          toast.error("Query applies to 0 images");
        }
      } catch (error) {
        setError("Error fetching images.");
        setLoadState(false);
      }
    };
    if (query !== "") {
      fetchData();
    }
  }, [query, page]);

  useEffect(() => {
    if (images.length === totalImages && totalImages !== 0) {
      toast.error("No more images to load");
    }
  }, [images, totalImages]);

  const handleSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const openModal = (image: Image) => {
    setModalIsOpen(true);
    setSelectedImage(image);
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {loadState && <Loader />}
      {images.length > 0 && images.length < totalImages && (
        <LoadMoreBtn onLoadMore={loadMoreImages} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        image={selectedImage}
      />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default App;
