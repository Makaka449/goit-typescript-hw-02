export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
    // Добавьте другие размеры, если необходимо
  };
  alt_description?: string;
  title: string;
  // Добавьте другие полезные поля
}
