"use client";

import "./login.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND_URL = 'https://dihycare-backend.vercel.app';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('Login successful!');
        router.push('/home');
      } else {
        setError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please check your internet and try again.');
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
          <form onSubmit={handleLogin} className="w-[50%] flex h-[50vh] justify-around flex-col">
            <h2>Login</h2>
            <div>
              <div className="input-field mb-[2vw]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <label>Email</label>
              </div>
              <div className="input-field mb-[2vw]">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <label>Password</label>
              </div>
              <div className="forget">
                <label htmlFor="remember">
                  <input type="checkbox" id="remember" />
                  <p>Remember me</p>
                </label>
                <a href="/forgot">Forgot password?</a>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex justify-center items-center flex-col w-[100%]">
              <button 
                type="submit" 
                className="w-[100%]"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Next'}
              </button>
              <div className="register">
                <p>Don't have an account?</p>
                <a href="/register" className="hover:text-[#ffffff] transition-all duration-300">
                  Register
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}