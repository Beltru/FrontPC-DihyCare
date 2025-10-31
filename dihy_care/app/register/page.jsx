"use client";

import "./login.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../src/api"; 


const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
const [loading, setLoading] = useState(false);
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");
  setLoading(true);
  try {
    const response = await api.post("/register", { name, lastname, email, password });

    const token = response?.data?.token;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    router.push("/form");
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || "Error al registrar el usuario";
    setErrorMsg(message);
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
          <form onSubmit={handleSubmit} className="w-[50%] flex h-[50vh] justify-around flex-col">
            <h2>Register</h2>
            <div>
              <div className="input-field mb-[2vw]">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Name</label>
              </div>
              <div className="input-field mb-[2vw]">
                <input
                  type="text"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <label>Last Name</label>
              </div>
              <div className="input-field mb-[2vw]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
              </div>
              <div className="input-field mb-[2vw]">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>
              </div>
            </div>

            {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

            <div className="flex justify-center items-center flex-col w-[100%]">
              <button type="submit" className="w-[100%]" disabled={loading}>
                {loading ? 'Registrando...' : 'Next'}
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
};

export default Register;
