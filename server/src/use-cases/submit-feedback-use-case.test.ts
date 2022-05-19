import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {} },
    { sendMail: async () => {} },
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'bug',
            comment: 'comment',
            screenshot: 'data:image/png;base64,198273917391873',
        })).resolves.not.toThrow();
    });
    
    it('should not be able to submit a feedback without a type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'comment',
            screenshot: 'data:image/png;base64,198273917391873',
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback without a comment', async () => {

        await expect(submitFeedback.execute({
            type: 'bug',
            comment: '',
            screenshot: 'data:image/png;base64,198273917391873',
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback without a valid screenshot', async () => {

        await expect(submitFeedback.execute({
            type: 'bug',
            comment: 'comment',
            screenshot: 'str.jpg',
        })).rejects.toThrow();
    });
});