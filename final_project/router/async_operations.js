const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Tarea 10: Obtener todos los libros usando async callback
const getAllBooksAsync = async () => {
  try {
    console.log('\n=== Tarea 10: Obtener todos los libros (Async/Await) ===');
    const response = await axios.get(`${BASE_URL}/`);
    console.log('Status:', response.status);
    console.log('Libros obtenidos:', Object.keys(response.data).length);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Tarea 11: Buscar por ISBN usando Promises
const getBookByISBN = (isbn) => {
  console.log(`\n=== Tarea 11: Buscar libro por ISBN ${isbn} (Promises) ===`);
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/isbn/${isbn}`)
      .then(response => {
        console.log('Status:', response.status);
        console.log('Libro encontrado:', response.data.title);
        console.log('Data:', JSON.stringify(response.data, null, 2));
        resolve(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
        reject(error);
      });
  });
};

// Tarea 12: Buscar por Autor usando Async/Await
const getBooksByAuthor = async (author) => {
  try {
    console.log(`\n=== Tarea 12: Buscar libros por autor "${author}" (Async/Await) ===`);
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    console.log('Status:', response.status);
    console.log('Libros encontrados:', response.data.length);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Tarea 13: Buscar por Título usando Async/Await
const getBooksByTitle = async (title) => {
  try {
    console.log(`\n=== Tarea 13: Buscar libros por título "${title}" (Async/Await) ===`);
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    console.log('Status:', response.status);
    console.log('Libros encontrados:', response.data.length);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

module.exports = {
  getAllBooksAsync,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};