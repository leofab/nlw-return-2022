
import express from 'express'
import { routes } from './routes';

const app = express();

// GET, POST, PUT, PATCH, DELETE

//GET = Buscar informações
//POST = Criar informações
//PUT = Atualizar informações
//PATCH = Atualizar informações parcialmente
//DELETE = Deletar informações

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('Server started on port 3333');
    
});