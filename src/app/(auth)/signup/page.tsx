"use client"
import '@/app/(auth)/auth.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/authContext';
import Link from 'next/link';
import { User } from '../../../../types/auth';

const Signup: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const { signup } = useAuth();
  const navigate = useRouter();

  const onSubmit = (data: User) => {
    const success = signup(data.username, data.password);
    if (success) navigate.push('/dashboard');
    else alert('User already exists');
  };

  return (
    <div className="auth-page">
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <h2>Sign Up</h2>
            <input {...register('username',{ required: 'Username is required' })} placeholder="Username" />
            {errors.username && <p className='auth-error'>{errors.username.message}</p>}
            <input type="password" {...register('password',
            {
                required: 'Password is required',
                minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
                },
                pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    message: 'Must include at least one capital letter and one special character'
                }
            }
            )} placeholder="Password" />
            {errors.password && <p className='auth-error'>{errors.password.message}</p>}
            <button type="submit">Sign Up</button>
            <Link href="/login">already have a account, click here</Link>

        </form>
 `` </div>

  );
};

export default Signup;
