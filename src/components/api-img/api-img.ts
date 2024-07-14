import axios from "axios";
import { Image } from "../../../App.types";

// Интерфейс для структуры изображения

// Интерфейс для ответа от функции fetchImages
export interface FetchImagesResponse {
  results: Image[]; // массив изображений
  total: number; // общее количество изображений
}

// Функция fetchImages принимает searchQuery и page в качестве параметров и возвращает Promise с типом FetchImagesResponse
async function fetchImages(
  searchQuery: string,
  page: number
): Promise<FetchImagesResponse> {
  const API_KEY: string = "mskXwYk7bCouuxf64aJE3hOqbVNI95fUDMc0-66QkWM"; // Ваш API ключ
  const baseUrl = "https://api.unsplash.com/search/photos/";

  const params = new URLSearchParams({
    query: searchQuery,
    client_id: API_KEY,
    per_page: "12",
    page: page.toString(),
  });

  try {
    const response = await axios.get<{ results: Image[]; total: number }>(
      `${baseUrl}?${params}`
    );
    const { results, total } = response.data;
    return { results, total };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Error fetching images");
  }
}

export default fetchImages;
