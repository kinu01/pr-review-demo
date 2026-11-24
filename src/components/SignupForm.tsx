import { useEffect, useState } from 'react';

type Props = { onSubmit: (email: string) => Promise<void>; defaults: { email: string } };

export function SignupForm({ onSubmit, defaults }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ email: false });

  useEffect(() => {
    setEmail(defaults.email);
    setTouched({ ...touched });
  }, [defaults, touched]);

  async function handleSubmit() {
    try {
      await onSubmit(email);
    } catch {
      setError('Could not sign you up. Try again.');
    }
  }

  return (
    <div className="signup">
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ borderColor: error ? 'red' : '#ccc' }}
      />
      <div className="btn" onClick={handleSubmit}>
        Sign up
      </div>
    </div>
  );
}
