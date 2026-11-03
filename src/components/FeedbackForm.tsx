'use client';

import { useActionState } from 'react';
import { SubmitFeedback } from '@/app/actions';

export function FeedBackForm() {
  const [state, formAction, pending] = useActionState(SubmitFeedback, {
    ok: false,
    message: '',
  });
  return (
    <form action={formAction} className="max-w-md space-y-3">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium">
          name
        </label>
        <input
          id="name"
          name="name"
          className="w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-gray-900"
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-gray-900"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {pending ? 'sending' : 'send feedback'}
      </button>
      {state.message && (
        <p className={state.ok ? 'text-green-500' : 'text-red-500'}>
          {state.message}
        </p>
      )}
    </form>
  );
}
