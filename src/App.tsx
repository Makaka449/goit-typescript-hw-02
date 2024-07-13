import { useEffect, useState } from "react";
import { searchImagesApi } from "./api";
import ImageGallery from "./components/ImageGallery/ImageCard/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";


interface Image {
  id: string;
  url: string;
  
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modalImage, setModalImage] = useState<Image | null>(null);

  useEffect(() => {
    const searchImages = async () => {
      try {
        setIsLoading(true);
        const data = await searchImagesApi(query, page);
        setImages((prev) => [...prev, ...data]);
        console.log("data", data);
      } catch (error) {
        setError(true);
        toast.error("Зображення не знайдено😮");
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      searchImages();
    }
  }, [query, page]);

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: Image) => {
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage message="Произошла ошибка при загрузке изображений" />}
      {isLoading && <Loader />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImage && <ImageModal image={modalImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
