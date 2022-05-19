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

       await this.feedbacksRepository.create({
           type,
           comment,
           screenshot,
       });
    }
}