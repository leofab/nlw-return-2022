import { prisma } from '@prisma/client';
import express from 'express'

const app = express();

// GET, POST, PUT, PATCH, DELETE

//GET = Buscar informações
//POST = Criar informações
//PUT = Atualizar informações
//PATCH = Atualizar informações parcialmente
//DELETE = Deletar informações

app.use(express.json());

app.post('/feedbacks', (req,res) => {
    prisma.feedback.create({
        data: {
            type: req.body.type,
            comment: req.body.comment,
            screenshot: req.body.screenshot,
        }
    })
    
    return res.send("Hello World");
})

app.listen(3333, () => {
    console.log('Server started on port 3333');
    
})