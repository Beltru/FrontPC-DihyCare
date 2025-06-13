import Link from "next/link"

const Landing = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-radial from-blue-400 to-blue-700">
      <div className="flex flex-col items-center gap-6">
        <img src="/CorazonOscuro.png" alt="" className="h-[30vh]"/>
        
        <div className="flex gap-6">
          <Link
            href="/register"
            className="bg-[#D9D9D9] text-black px-10 py-2 rounded-full font-bold hover:cursor-pointer hover:bg-[#909697]"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="bg-[#377A95] text-black px-10 py-2 rounded-full font-bold hover:cursor-pointer hover:bg-[#067787]"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
