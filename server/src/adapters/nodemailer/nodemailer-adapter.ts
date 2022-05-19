import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ac7820b30eba73",
      pass: "fb7fefd8d88ab8"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Léo Fabrício <leofabr3@gmail.com>',
        subject: subject,
        html: body,
    });
    }
}