"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from '../src/api';

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
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      });

      const data = response.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('loginEmail', email);
      console.log('Login successful!');
      router.push('/home');
      
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Invalid email or password');
      } else {
        console.error('Login error:', err);
        setError('Connection error. Please check your internet and try again.');
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#2c6d8d] to-[#1a235e] overflow-hidden font-['Raleway']">
      <section className="h-[100vh] w-[100vw] flex justify-between items-center gap-20">
        <div className="h-[100vh] w-[60vw] flex justify-end items-center pr-[17%]">
          <a href="/" className="cursor-pointer">
            <Image src={"/CorazonClaro.png"} alt="" width={280} height={280} />
          </a>
        </div>

        <div className="flex justify-center items-center w-[50vw] h-[100vh] bg-[#89bccb] hover:w-[85vw] transition-all duration-500">
          <form onSubmit={handleLogin} className="w-[50%] flex h-[50vh] justify-around flex-col">
            <h2 className="text-[2vw] mb-[0.5vw] text-black font-normal">Login</h2>
            
            <div>
              <div className="relative border-b-[0.1vw] border-black mb-[1.5vw]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full h-[1.5vw] bg-transparent border-none outline-none text-[0.8vw] text-black peer placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute top-1/2 left-0 -translate-y-1/2 text-black text-[0.9vw] pointer-events-none transition-all duration-150 ease-in-out peer-focus:text-[0.6vw] peer-focus:top-[0.3vw] peer-focus:-translate-y-[120%] peer-valid:text-[0.6vw] peer-valid:top-[0.3vw] peer-valid:-translate-y-[120%]">
                  Email
                </label>
              </div>

              <div className="relative border-b-[0.1vw] border-black mb-[1.5vw]">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full h-[1.5vw] bg-transparent border-none outline-none text-[0.8vw] text-black peer placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute top-1/2 left-0 -translate-y-1/2 text-black text-[0.9vw] pointer-events-none transition-all duration-150 ease-in-out peer-focus:text-[0.6vw] peer-focus:top-[0.3vw] peer-focus:-translate-y-[120%] peer-valid:text-[0.6vw] peer-valid:top-[0.3vw] peer-valid:-translate-y-[120%]">
                  Password
                </label>
              </div>

              <div className="flex items-center justify-between my-[0.8vw] mb-[1.2vw] text-black">
                <label htmlFor="remember" className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="accent-black cursor-pointer"
                  />
                  <p className="ml-[0.2vw]">Remember me</p>
                </label>
                <a href="/forgot" className="hover:underline">Forgot password?</a>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex justify-center items-center flex-col w-[100%]">
              <button 
                type="submit" 
                className="bg-white text-black font-semibold border-none py-[0.6vw] px-[1vw] cursor-pointer rounded-[0.1vw] text-[0.9vw] transition-all duration-300 w-[20vw] hover:text-black hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Next'}
              </button>
              
              <div className="text-center mt-[30px] text-black">
                <p className="inline">Don't have an account? </p>
                <a href="/register" className="hover:text-white transition-all duration-300 ml-1">
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