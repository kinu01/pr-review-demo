import { useState } from 'react';

type Props = { onSubmit: (email: string) => Promise<void> };

export function SignupForm({ onSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await onSubmit(email);
    } catch {
      setError('Could not sign you up. Try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <p id="email-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit">Sign up</button>
    </form>
  );
}
