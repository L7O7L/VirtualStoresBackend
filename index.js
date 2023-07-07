import { json_formater } from './PlazaVea/plazavea.js';
import { json_formater_wong } from './Tottus/tottus.js';
import { upload } from './Upload/upload.js';
import fs from 'fs';


// json_formater_wong().then((result) => {

//     const jsonData = JSON.stringify(result);

//     fs.writeFile('tottus.json', jsonData, 'utf-8', (err) => {

//         if (err) {
//             console.error('Error al escribir el archivo:', err);
//             return;
//         }

//         console.log('Archivo JSON creado correctamente.');

//     })
// });

// }).catch((error) => {
//     console.error(error); // Manejar cualquier error que ocurra durante la ejecución
// });

// json_formater().then((result) => {

//     const jsonData = JSON.stringify(result);

//     fs.writeFile('plazavea.json', jsonData, 'utf-8', (err) => {

//         if (err) {
//             console.error('Error al escribir el archivo:', err);
//             return;
//         }

//         console.log('Archivo JSON creado correctamente.');

//     })

// }).catch((error) => {
//     console.error(error); // Manejar cualquier error que ocurra durante la ejecución
// });

await upload();






