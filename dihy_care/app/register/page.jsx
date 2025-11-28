"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from '../src/api';

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
      const response = await api.post('/auth/register', formData);

      const data = response.data; 

      console.log('User registered successfully!', data);
      router.push('/login');
      
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.error) {
            setErrorMsg(err.response.data.error);
        } else {
             setErrorMsg(`Error ${err.response.status}: Registration failed. Please try again.`);
        }
      } else {
        console.error('Registration failed:', err);
        setErrorMsg('Connection error. Please check your internet and try again.');
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
          <form onSubmit={handleRegister} className="w-[50%] flex h-[50vh] justify-around flex-col">
            <h2 className="text-[2vw] mb-[0.5vw] text-black font-normal">Register</h2>
            
            <div>
              {/* Name Input Field */}
              <div className="relative border-b-[0.1vw] border-black mb-[1.5vw]">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={loading}
                  className="w-full h-[1.5vw] bg-transparent border-none outline-none text-[0.8vw] text-black peer placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute top-1/2 left-0 -translate-y-1/2 text-black text-[0.9vw] pointer-events-none transition-all duration-150 ease-in-out peer-focus:text-[0.6vw] peer-focus:top-[0.3vw] peer-focus:-translate-y-[120%] peer-valid:text-[0.6vw] peer-valid:top-[0.3vw] peer-valid:-translate-y-[120%]">
                  Name
                </label>
              </div>

              {/* Surname Input Field */}
              <div className="relative border-b-[0.1vw] border-black mb-[1.5vw]">
                <input
                  type="text"
                  required
                  value={formData.surname}
                  onChange={(e) => setFormData({...formData, surname: e.target.value})}
                  disabled={loading}
                  className="w-full h-[1.5vw] bg-transparent border-none outline-none text-[0.8vw] text-black peer placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute top-1/2 left-0 -translate-y-1/2 text-black text-[0.9vw] pointer-events-none transition-all duration-150 ease-in-out peer-focus:text-[0.6vw] peer-focus:top-[0.3vw] peer-focus:-translate-y-[120%] peer-valid:text-[0.6vw] peer-valid:top-[0.3vw] peer-valid:-translate-y-[120%]">
                  Last Name
                </label>
              </div>

              {/* Email Input Field */}
              <div className="relative border-b-[0.1vw] border-black mb-[1.5vw]">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={loading}
                  className="w-full h-[1.5vw] bg-transparent border-none outline-none text-[0.8vw] text-black peer placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute top-1/2 left-0 -translate-y-1/2 text-black text-[0.9vw] pointer-events-none transition-all duration-150 ease-in-out peer-focus:text-[0.6vw] peer-focus:top-[0.3vw] peer-focus:-translate-y-[120%] peer-valid:text-[0.6vw] peer-valid:top-[0.3vw] peer-valid:-translate-y-[120%]">
                  Email
                </label>
              </div>

              {/* Password Input Field */}
              <div className="relative border-b-[0.1vw] border-black mb-[1.5vw]">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  disabled={loading}
                  className="w-full h-[1.5vw] bg-transparent border-none outline-none text-[0.8vw] text-black peer placeholder-transparent"
                  placeholder=" "
                />
                <label className="absolute top-1/2 left-0 -translate-y-1/2 text-black text-[0.9vw] pointer-events-none transition-all duration-150 ease-in-out peer-focus:text-[0.6vw] peer-focus:top-[0.3vw] peer-focus:-translate-y-[120%] peer-valid:text-[0.6vw] peer-valid:top-[0.3vw] peer-valid:-translate-y-[120%]">
                  Password
                </label>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

            <div className="flex justify-center items-center flex-col w-[100%]">
              {/* Register Button */}
              <button 
                type="submit" 
                className="bg-white text-black font-semibold border-none py-[0.6vw] px-[1vw] cursor-pointer rounded-[0.1vw] text-[0.9vw] transition-all duration-300 w-[20vw] hover:text-black hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Next'}
              </button>
              
              {/* Login Link */}
              <div className="text-center mt-[30px] text-black">
                <p className="inline">Already have an account? </p>
                <a href="/login" className="hover:text-white transition-all duration-300 ml-1">
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