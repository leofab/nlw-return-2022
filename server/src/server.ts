import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import express from 'express'

const app = express();

// GET, POST, PUT, PATCH, DELETE

//GET = Buscar informações
//POST = Criar informações
//PUT = Atualizar informações
//PATCH = Atualizar informações parcialmente
//DELETE = Deletar informações

app.use(express.json());

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ac7820b30eba73",
      pass: "fb7fefd8d88ab8"
    }
  });

app.post('/feedbacks', async (req,res) => {
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    });

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Léo Fabrício <leofabr3@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div>`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
        ].join('\n')
    });
    
    return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
    console.log('Server started on port 3333');
    
});