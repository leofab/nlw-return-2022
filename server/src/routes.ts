import { prisma } from './prisma';
import express from 'express';
import nodemailer from 'nodemailer';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ac7820b30eba73",
      pass: "fb7fefd8d88ab8"
    }
  });

routes.post('/feedbacks', async (req,res) => {
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