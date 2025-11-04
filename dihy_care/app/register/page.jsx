"use client";

import "./login.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND_URL = 'https://dihycare-backend.vercel.app';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User registered successfully!', data);
        router.push('/login');
      } else {
        setErrorMsg(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMsg('Connection error. Please check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#2c6d8d]  to-[#1a235e] overflow-hidden">
      <section className="h-[100vh] w-[100vw] flex justify-between items-center gap-20">
        <div className="h-[100vh] w-[60vw] flex justify-end items-center pr-[17%]">
          <a href="/" className="cursor-pointer">
            <Image src={"/CorazonClaro.png"} alt="" width={280} height={280} />
          </a>
        </div>
        <div className="flex justify-center items-center w-[50vw] h-[100vh] bg-[#89bccb] hover:w-[85vw] transition-all duration-500">
          <form onSubmit={handleRegister} className="w-[50%] flex h-[50vh] justify-around flex-col">
            <h2>Register</h2>
            <div>
              <div className="input-field mb-[2vw]">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={loading}
                />
                <label>Name</label>
              </div>
              <div className="input-field mb-[2vw]">
                <input
                  type="text"
                  required
                  value={formData.surname}
                  onChange={(e) => setFormData({...formData, surname: e.target.value})}
                  disabled={loading}
                />
                <label>Last Name</label>
              </div>
              <div className="input-field mb-[2vw]">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={loading}
                />
                <label>Email</label>
              </div>
              <div className="input-field mb-[2vw]">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  disabled={loading}
                />
                <label>Password</label>
              </div>
            </div>

            {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

            <div className="flex justify-center items-center flex-col w-[100%]">
              <button type="submit" className="w-[100%]" disabled={loading}>
                {loading ? 'Registering...' : 'Next'}
              </button>
              <div className="register">
                <p>Already have an account?</p>
                <a href="/login" className="hover:text-[#ffffff] transition-all duration-300">
                  Login
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}