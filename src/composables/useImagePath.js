export function useImagePath() {
  const baseUrl = import.meta.env.BASE_URL;

  const getImagePath = (path) => {
    if (!path) return '';
    // Remove a barra inicial se existir
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${baseUrl}${cleanPath}`;
  };

  return {
    getImagePath,
    baseUrl
  };
}
