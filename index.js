import { json_formater } from "./PlazaVea/plazavea.js";
import express from 'express';
import fs from "fs";

const app = express();

app.set('port', 3000);

await json_formater().then((result) => {

    const jsonData = JSON.stringify(result);

    fs.writeFile('plazavea.json', jsonData, 'utf-8', (err) => {

        if (err) {
            console.error('Error al escribir el archivo:', err);
            return;
        }

        console.log('Archivo JSON creado correctamente.');

    })

    app.get('/api', (req, res) => {

        res.json(result);
    
    })

}).catch((error) => {
    console.error(error); // Manejar cualquier error que ocurra durante la ejecución
});

app.listen(app.get('port'), () => {

    console.log('Server on port 3000')

});



