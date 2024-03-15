

const express = require('express');
const {Router} = require('express');
const cors = require('cors');
const path = require('path'); // Importa el módulo path
const fs = require('fs-extra');

const app = express();

app.use(cors());

app.use(express.json());



const route = Router();


route.get('/', (req,res) => {
    console.log("entro")

    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
})



route.get('/numero', async(req,res) => {

    const datos = await fs.readJson('./data.json');

    console.log(datos)


    let numeroAleatorio = 0
    do {
        let calculate = Math.floor(Math.random() * 150) + 1;
        numeroAleatorio = calculate;

        if(datos.filter((item) => item.Numero == numeroAleatorio).length > 0){
            console.log("se repitio el " , numeroAleatorio)
        } 
    } while ((datos.filter((item) => item.Numero == numeroAleatorio)).length > 0);


    const update = [...datos, { Numero: numeroAleatorio }]


    await fs.writeJson('./data.json', update);


    res.status(200).json({ numero: numeroAleatorio });

});




app.use(route)


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

