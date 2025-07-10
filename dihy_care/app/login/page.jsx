"use client";

import "./login.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/landing");
    } else {
      setErrorMsg(data.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#0b1781] via-[#1a235e] to-black overflow-hidden">
      <section className="h-[100vh] w-[100vw] flex justify-between items-center gap-20">
        <div className="h-[100vh] w-[60vw] flex justify-end items-center pr-[17%]">
          <a href="/landing" className="cursor-pointer">
            <Image src={"/CorazonClaro.png"} alt="" width={280} height={280} />
          </a>
        </div>

        <div className="flex justify-center items-center w-[50vw] h-[100vh] bg-black hover:w-[85vw] transition-all duration-500">
          <form onSubmit={handleSubmit} className="w-[50%] flex h-[50vh] justify-around flex-col">
            <h2>Login</h2>
            <div>
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
              <div className="forget">
                <label htmlFor="remember">
                  <input type="checkbox" id="remember" />
                  <p>Remember me</p>
                </label>
                <a href="/forgot">Forgot password?</a>
              </div>
            </div>

            {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}

            <div className="flex justify-center items-center flex-col w-[100%]">
              <button type="submit" className="w-[100%]">
                Next
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
};

export default Login;
