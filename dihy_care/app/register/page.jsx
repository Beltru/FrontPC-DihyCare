"use client"

import "./login.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link"

const Register = () =>{
const [name, setName] = useState("");
const [lastname, setLastname] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

return(

    <main className="min-h-screen bg-gradient-to-r from-[#0b1781] via-[#1a235e] to-black overflow-hidden">
      <section className="h-[100vh] w-[100vw] flex justify-between items-center gap-20">
         <div className="h-[100vh] w-[60vw] flex justify-end items-center pr-[17%]">
            <a href="/landing" className="cursor-pointer">
              <Image src={"/CorazonClaro.png"} alt="" width={280} height={280} />
            </a>
          </div>
   <div className="flex justify-center items-center w-[50vw] h-[100vh] bg-black hover:w-[85vw] transition-all duration-500">
            <form className="w-[50%] flex h-[50vh] justify-around flex-col">
              <h2>Register</h2>
              <div>
                 <div className="input-field mb-[2vw]">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Captura del email
                  />
                  <label>Name</label>
                </div>
                 <div className="input-field mb-[2vw]">
                  <input
                    type="text"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)} // Captura del email
                  />
                  <label>Last Name</label>
                </div>
                <div className="input-field mb-[2vw]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Captura del email
                  />
                  <label>Email</label>
                </div>
                <div className="input-field mb-[2vw]">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Captura de la contraseña
                  />
                  <label>Password</label>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col w-[100%]">
                <Link href="/form"> 
                <button type="submit" className="w-[100%]">
                  Next
                </button>
                </Link>
               
                <div className="register">
                  <p>Already have an account?</p>
                 <Link href="/login">
                    <p className="hover:text-[#ffffff] transition-all duration-300"> Register </p>
                 </Link>  
                </div>
              </div>
            </form>
          </div>
      </section>
    </main>
 
 ) 
}

export default Register