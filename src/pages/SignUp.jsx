import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFom } from '../utils/Yup';
import AuthNavBar from '../components/AuthNavBar';

export default function SignUp() {
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    profile: null,
  });

  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpFom),
  });

  const passVisible = () => setVisible(!visible);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile') {
      setFormdata((prev) => ({ ...prev, profile: files[0] }));
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClick = async (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      profile: formdata.profile ? URL.createObjectURL(formdata.profile) : null,
    };
    localStorage.setItem('user', JSON.stringify(newUser));

    try {
      const res = await fetch('https://getform.io/f/aololnkb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      if (res.ok) {
        setMessage('Signup Successful!');
        navigate('/dashboard');
      } else {
        setMessage('Formspree submission failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <>
      <AuthNavBar variant="signup" />
      <div className="min-h-screen flex justify-end items-center px-6 py-10 loginBackground">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
          <form onSubmit={handleSubmit(handleClick)}>
            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Name</label>
            <input
              type="text"
              {...register('name')}
              name="name"
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full mb-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
            />
            <p className="text-red-600">{errors.name?.message}</p>

            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Email</label>
            <input
              type="email"
              {...register('email')}
              name="email"
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full mb-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
            />
            <p className="text-red-600">{errors.email?.message}</p>

            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Password</label>
            <div className="relative mb-2">
              <input
                type={visible ? 'text' : 'password'}
                {...register('password')}
                name="password"
                autoComplete="off"
                onChange={handleChange}
                placeholder="********"
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
              />
              <button
                type="button"
                onClick={passVisible}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
                {visible ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password?.message && <p className="text-red-500">{errors.password.message}</p>}

            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Role</label>
            <select
              {...register('role')}
              name="role"
              onChange={handleChange}
              className="w-full mb-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
            >
              <option value="">Select role</option>
              <option value="Tester">Tester</option>
              <option value="Developer">Developer</option>
              <option value="ProjectManager">Project Manager</option>
            </select>
            <p className="text-red-600">{errors.role?.message}</p>

            <label className="block text-gray-600 font-semibold mb-1 tracking-wide">Profile Image</label>
            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="profile"
                  className="cursor-pointer px-2 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                  Choose File
                </label>
                <span className="text-sm text-gray-600">
                  {formdata?.profile?.name || 'No file chosen'}
                </span>
              </div>
              <input
                id="profile"
                type="file"
                name="profile"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 loginGradientBtn"
            >
              SignUp
            </button>

            {message && <p className="mt-3 text-center text-green-600">{message}</p>}

            <Link
              to="/"
              className="block text-sm text-blue-600 mt-4 text-center hover:underline"
            >
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
