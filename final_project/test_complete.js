const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Helper para crear un separador visual
const separator = () => console.log('\n' + '═'.repeat(70) + '\n');

// Función para esperar un poco entre requests
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const runCompleteTests = async () => {
  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║         PRUEBA COMPLETA DEL PROYECTO - TODAS LAS TAREAS         ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');

  let authToken = ''; // Variable para guardar el token

  try {
    // ========== TAREAS 1-5: ENDPOINTS PÚBLICOS ==========
    console.log('\n📚 TAREAS 1-5: ENDPOINTS PÚBLICOS (Sin autenticación)');
    separator();

    // Tarea 1
    console.log('📋 TAREA 1: Obtener lista de libros');
    const task1 = await axios.get(`${BASE_URL}/`);
    console.log('✓ Status:', task1.status);
    console.log('✓ Total de libros:', Object.keys(task1.data).length);
    await wait(500);

    // Tarea 2
    console.log('\n📖 TAREA 2: Obtener libro por ISBN (ISBN: 1)');
    const task2 = await axios.get(`${BASE_URL}/isbn/1`);
    console.log('✓ Status:', task2.status);
    console.log('✓ Libro:', task2.data.title, 'por', task2.data.author);
    await wait(500);

    // Tarea 3
    console.log('\n👤 TAREA 3: Obtener libros por autor (Chinua Achebe)');
    const task3 = await axios.get(`${BASE_URL}/author/Chinua Achebe`);
    console.log('✓ Status:', task3.status);
    console.log('✓ Libros encontrados:', task3.data.length);
    await wait(500);

    // Tarea 4
    console.log('\n🔍 TAREA 4: Obtener libros por título (Things)');
    const task4 = await axios.get(`${BASE_URL}/title/Things`);
    console.log('✓ Status:', task4.status);
    console.log('✓ Libros encontrados:', task4.data.length);
    await wait(500);

    // Tarea 5
    console.log('\n⭐ TAREA 5: Obtener reseñas del libro (ISBN: 1)');
    const task5 = await axios.get(`${BASE_URL}/review/1`);
    console.log('✓ Status:', task5.status);
    console.log('✓ Reseñas:', JSON.stringify(task5.data));
    await wait(500);

    // ========== TAREAS 6-7: AUTENTICACIÓN ==========
    separator();
    console.log('\n🔐 TAREAS 6-7: AUTENTICACIÓN DE USUARIOS');
    separator();

    // Tarea 6: Registrar usuario
    const username = 'testuser_' + Date.now();
    const password = 'testpass123';

    console.log('👤 TAREA 6: Registrar nuevo usuario');
    console.log('   Username:', username);
    const task6 = await axios.post(`${BASE_URL}/register`, {
      username: username,
      password: password
    });
    console.log('✓ Status:', task6.status);
    console.log('✓ Mensaje:', task6.data.message);
    await wait(500);

    // Tarea 7: Login
    console.log('\n🔑 TAREA 7: Login de usuario registrado');
    const task7 = await axios.post(`${BASE_URL}/customer/login`, {
      username: username,
      password: password
    });
    console.log('✓ Status:', task7.status);
    console.log('✓ Mensaje:', task7.data.message);
    
    // GUARDAR EL TOKEN
    authToken = task7.data.token;
    console.log('✓ Token recibido:', authToken.substring(0, 20) + '...');
    await wait(500);

    // ========== TAREAS 8-9: OPERACIONES AUTENTICADAS ==========
    separator();
    console.log('\n🔒 TAREAS 8-9: OPERACIONES AUTENTICADAS (Requieren login)');
    separator();

    // Tarea 8: Añadir reseña
    console.log('✍️  TAREA 8: Añadir/Modificar reseña');
    const reviewText = 'Este es un libro excelente! Lo recomiendo mucho.';
    const task8 = await axios.put(
      `${BASE_URL}/customer/auth/review/1?review=${encodeURIComponent(reviewText)}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    console.log('✓ Status:', task8.status);
    console.log('✓ Mensaje:', task8.data.message);
    console.log('✓ Reseña añadida por:', username);
    await wait(500);

    // Verificar que se añadió la reseña
    console.log('\n🔍 Verificando reseña añadida...');
    const verifyAdd = await axios.get(`${BASE_URL}/review/1`);
    console.log('✓ Reseña guardada:', verifyAdd.data[username]);
    await wait(500);

    // Tarea 9: Eliminar reseña
    console.log('\n🗑️  TAREA 9: Eliminar reseña del usuario');
    const task9 = await axios.delete(
      `${BASE_URL}/customer/auth/review/1`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    console.log('✓ Status:', task9.status);
    console.log('✓ Mensaje:', task9.data.message);
    await wait(500);

    // Verificar que se eliminó
    console.log('\n🔍 Verificando reseña eliminada...');
    const verifyDelete = await axios.get(`${BASE_URL}/review/1`);
    console.log('✓ Reseñas actuales:', JSON.stringify(verifyDelete.data));

    // ========== TAREAS 10-13: OPERACIONES ASÍNCRONAS ==========
    separator();
    console.log('\n⚡ TAREAS 10-13: OPERACIONES ASÍNCRONAS CON AXIOS');
    separator();

    // Tarea 10: Async/Await
    console.log('🔄 TAREA 10: Obtener todos los libros (Async/Await)');
    const task10 = await axios.get(`${BASE_URL}/`);
    console.log('✓ Implementación: async/await');
    console.log('✓ Libros obtenidos:', Object.keys(task10.data).length);
    await wait(500);

    // Tarea 11: Promises
    console.log('\n🔄 TAREA 11: Buscar por ISBN (Promises)');
    const task11Promise = new Promise((resolve, reject) => {
      axios.get(`${BASE_URL}/isbn/2`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
    const task11 = await task11Promise;
    console.log('✓ Implementación: Promises');
    console.log('✓ Libro:', task11.data.title);
    await wait(500);

    // Tarea 12: Async/Await con autor
    console.log('\n🔄 TAREA 12: Buscar por autor (Async/Await)');
    const task12 = await axios.get(`${BASE_URL}/author/Jane Austen`);
    console.log('✓ Implementación: async/await');
    console.log('✓ Libros encontrados:', task12.data.length);
    await wait(500);

    // Tarea 13: Async/Await con título
    console.log('\n🔄 TAREA 13: Buscar por título (Async/Await)');
    const task13 = await axios.get(`${BASE_URL}/title/Pride`);
    console.log('✓ Implementación: async/await');
    console.log('✓ Libros encontrados:', task13.data.length);

    // ========== RESUMEN FINAL ==========
    separator();
    console.log('\n╔══════════════════════════════════════════════════════════════════╗');
    console.log('║                  ✅ TODAS LAS TAREAS COMPLETADAS                 ║');
    console.log('╠══════════════════════════════════════════════════════════════════╣');
    console.log('║  ✓ Tareas 1-5:   Endpoints públicos                             ║');
    console.log('║  ✓ Tareas 6-7:   Autenticación (register/login)                 ║');
    console.log('║  ✓ Tareas 8-9:   Operaciones autenticadas (add/delete review)   ║');
    console.log('║  ✓ Tareas 10-13: Operaciones asíncronas con Axios               ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('\n❌ Error en las pruebas:', error.response?.data || error.message);
    if (error.config) {
      console.error('URL:', error.config.url);
      console.error('Method:', error.config.method);
    }
  }
};

// Ejecutar todas las pruebas
runCompleteTests();
