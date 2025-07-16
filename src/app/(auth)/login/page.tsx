"use client"
import '@/app/(auth)/auth.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/authContext';
import Link from 'next/link';
import { User } from '../../../../types/auth';

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const { login } = useAuth();
    const navigate = useRouter();

    const onSubmit = (data: User) => {
        const success = login(data.username, data.password);
        if (success) navigate.push('/dashboard');
        else alert('Invalid credentials');
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <h2>Login</h2>
                <input {...register('username', { required: 'Username is required' })} placeholder="Username" />
                {errors.username && <p className='auth-error'>{errors.username.message}</p>}
                <input type="password" {...register('password', {required: 'Password is required'})} placeholder="Password" />
                {errors.password && <p className='auth-error'>{errors.password.message}</p>}
                <button type="submit">Login</button>
                <Link href="/signup">create a new account</Link>
            </form>
    </div>
    );
};

export default Login;