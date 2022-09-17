import axios from 'axios';

const apiRootTesting = 'https://glacial-fortress-06174.herokuapp.com/main';

export const fetchHomePageContent = async () => {
  const response = await axios.get(`${apiRootTesting}/home-page-content`);

  const { data } = response;

  return data;
}

export const fetchNavbar = async () => {
  const response = await axios.get(`${apiRootTesting}/get-navbar`);

  const { data } = response;

  return data;
}

export const fetchOneCategoryContent = async categoryId => {
  const response = await axios.post(`${apiRootTesting}/one-category-content`, { categoryId });

  const { data } = response;

  return data;
}

export const fetchOneSubcategoryContent = async subCategoryId => {
  const response = await axios.post(`${apiRootTesting}/one-subcategory-content`, { subCategoryId });

  const { data } = response;

  return data;
}

export const fetchOneProduct = async productId => {
  const response = await axios.post(`${apiRootTesting}/get-one-product`, { productId });

  const { data } = response;

  return data;
}

export const searchQuery = async query => {
  const response = await axios.post(`${apiRootTesting}/search-query`, { query });

  const { data } = response;

  return data;
}

// export const fetchItemsByCategory = async categoryIds => {
//   const response = await axios.post('/items-by-category', {
//     categoryIds,
//   });

//   const { data } = response;

//   return data;
// }