import { API_BASE_URL } from "./api";

const getImagePath = (fileName, type = "gallery") => {
  const path = type === "gallery" ? "/media/gallery/" : "/media/avatars/";
  return `${API_BASE_URL}${path}${fileName}`;
};

export { getImagePath };
