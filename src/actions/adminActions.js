import axios from 'axios';

const apiRootTesting = 'https://glacial-fortress-06174.herokuapp.com';

export const addNewCategory = async (categoryName) => {
  const response = await axios.post(`${apiRootTesting}/add-new-category`, {
    categoryName,
  });

  const { data } = response;

  return data;
}

export const addNewSubCategory = async (categoryId, subCategoryName) => {
  const response = await axios.post(`${apiRootTesting}/add-new-subcategory`, {
    categoryId,
    subCategoryName,
  });

  const { data } = response;

  return data;
}

export const getCategories = async () => {
  const response = await axios.get(`${apiRootTesting}/get-all-categories`);

  const { data } = response;

  const { categories } = data;

  return categories;
}

export const getSubCategories = async () => {
  const response = await axios.get(`${apiRootTesting}/get-all-subcategories`);

  const { data } = response;

  const { subCategories } = data;

  return subCategories;
}

export const getSubCategoriesByCategoryId = async categoryId => {
  const response = await axios.post(`${apiRootTesting}/get-subcategories`, {
    categoryId,
  });

  const { data } = response;

  return data;
}

export const fileUpload = async imageObj => {
  console.log({imageObj})
  const response = await axios.post(`${apiRootTesting}/file-upload`, { imageObj });

  const { data } = response;

  return data;
}

export const addNewItem = async postData => {
  console.log({postData})
  const response = await axios.post(`${apiRootTesting}/add-new-item`, {
    postData,
  });

  const { data } = response;

  return data;
}

export const postEditItem = async (id, newItemFormData) => {
  const response = await axios.post(`${apiRootTesting}/edit-one-product`, {
    id,
    newItemFormData,
  });

  const { data } = response;

  return data;
}

export const postDeleteItem = async (itemId) => {
  const response = await axios.post(`${apiRootTesting}/delete-one-product`, {
    itemId,
  });

  const { data } = response;

  return data;
}