const asyncOps = require('./router/async_operations');

// Función principal para ejecutar todas las pruebas
const runAsyncTests = async () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     PRUEBAS DE OPERACIONES ASÍNCRONAS (Tareas 10-13)      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  try {
    // Tarea 10: Async/Await para obtener todos los libros
    await asyncOps.getAllBooksAsync();
    
    console.log('\n' + '─'.repeat(60));
    
    // Tarea 11: Promises para buscar por ISBN
    await asyncOps.getBookByISBN(1);
    
    console.log('\n' + '─'.repeat(60));
    
    // Tarea 12: Async/Await para buscar por autor
    await asyncOps.getBooksByAuthor('Chinua Achebe');
    
    console.log('\n' + '─'.repeat(60));
    
    // Tarea 13: Async/Await para buscar por título
    await asyncOps.getBooksByTitle('Things');
    
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║           ✓ TODAS LAS PRUEBAS COMPLETADAS                 ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
  } catch (error) {
    console.error('\n❌ Error ejecutando las pruebas:', error.message);
  }
};

// Ejecutar las pruebas
runAsyncTests();