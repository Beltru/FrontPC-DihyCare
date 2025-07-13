"use client"

import "./login.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link"

const Form = () =>{
     
const [weight, setWeight] = useState("");
const [sex, setSex] = useState("");
const [age, setAge] = useState("");
const [height, setHeigth] = useState("");

return(

    <main className="min-h-screen bg-gradient-to-r from-[#2c6d8d]  to-[#1a235e] overflow-hidden">
      <section className="h-[100vh] w-[100vw] flex justify-between items-center gap-20">
         <div className="h-[100vh] w-[60vw] flex justify-end items-center pr-[17%]">
            <a href="/register" className="cursor-pointer">
              <Image src={"/CorazonClaro.png"} alt="" width={280} height={280} />
            </a>
          </div>
   <div className="flex justify-center items-center w-[50vw] h-[100vh] bg-[#89bccb] hover:w-[85vw] transition-all duration-500">
            <form className="w-[50%] flex h-[50vh] justify-around flex-col">
              <h2>Get Started</h2>
              <div>
                <div className="input-field mb-[2vw]">
                  <input
                    type="text"
                    required
                    value={sex}
                    onChange={(e) => setSex(e.target.value)} // Captura del email
                  />
                  <label>Sex</label>
                </div>
                <div className="input-field mb-[2vw]">
                  <input
                    type="text"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)} // Captura de la contraseña
                  />
                  <label>Age</label>
                </div>
                <div className="input-field mb-[2vw]">
                  <input
                    type="text"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)} // Captura de la contraseña
                  />
                  <label>Weight</label>
                </div>
                <div className="input-field mb-[2vw]">
                  <input
                    type="text"
                    required
                    value={height}
                    onChange={(e) => setHeigth(e.target.value)} // Captura de la contraseña
                  />
                  <label>Height</label>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col w-[100%]">
               <Link href="/"> 
                <button type="submit" className="w-[100%]">
                  Next
                </button>
                </Link>
              </div>
            </form>
          </div>
      </section>
    </main>
 
 ) 
}

export default Form