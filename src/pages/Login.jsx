import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm } from '../utils/Yup';
import AuthNavBar from '../components/AuthNavBar';

export default function Login() {
  const [formdata, setFormdata] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginForm),
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const passVisible = () => {
    setVisible(!visible);
  };

  const onSubmit = async () => {
    const mockUser = {
      name: 'Frontend Only User',
      email: formdata.email,
    };

    setMessage('Login Successful!');
    navigate('/dashboard');
  };

  return (
    <>
      <AuthNavBar variant="login" />
      <div className="min-h-screen flex justify-end items-center px-6 py-10 bg-no-repeat bg-cover bg-center loginBackground">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Email</label>
            <input
              type="email"
              {...register('email')}
              name="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full mb-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 placeholder:text-gray-400 transition duration-300"
            />
            {errors.email?.message && <p className="text-red-500">{errors.email.message}</p>}

            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Password</label>
            <div className="relative mb-4">
              <input
                type={visible ? 'text' : 'password'}
                {...register('password')}
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full mb-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-800 placeholder:text-gray-400 transition duration-300"
              />
              <button
                type="button"
                onClick={passVisible}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 focus:outline-none"
              >
                {visible ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password?.message && <p className="text-red-500">{errors.password.message}</p>}

            <button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 transition-all duration-300 loginGradientBtn"
            >
              Login
            </button>
            {message && <p className="mt-3 text-center text-green-600">{message}</p>}

            <Link
              to="/signup"
              className="block text-sm text-blue-600 mt-4 text-center hover:underline"
            >
              Don't have an account? SignUp
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
