'use client';

type CountryErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CountryError({ error, reset }: CountryErrorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold"> Something Went Wrong</h2>
      <p>{error.message}</p>
      <button
        onClick={reset}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
