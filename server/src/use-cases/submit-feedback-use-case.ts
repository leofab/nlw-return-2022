import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repositories";

export interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor (
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) {}
    async execute(request: SubmitFeedbackUseCaseRequest) {
       const { type, comment, screenshot } = request;

       if(!type) {
              throw new Error('Type is required');
       }

       if(!comment) {
              throw new Error('Comment is required');
       }

       if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
           throw new Error('Screenshot must be base64 encoded PNG image');
       }

       

       await this.feedbacksRepository.create({
           type,
           comment,
           screenshot,
       });

       await this.mailAdapter.sendMail({
           subject: 'Novo Feedback',
           body: [
            `<div>`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
           ].join('\n')
       })
    }
}