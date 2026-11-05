'use server';
type FeedbackState = {
  ok: boolean;
  message: string;
};

export async function SubmitFeedback(
  _previous: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const name = String(formData.get('name') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (name === '' || message === '') {
    return { ok: false, message: 'Name and message are required.' };
  }
  console.log(`Feedback from ${name}:${message}`);
  return { ok: true, message: `Thanks, ${name}! Your feedback was received.` };
}
