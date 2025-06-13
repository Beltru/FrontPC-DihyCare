import Link from "next/link"

const Landing = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 to-blue-400">
      <div className="flex flex-col items-center gap-6">
        <img src="/CorazonClaro.png" alt="" className="h-[30vh]" />
        
        <div className="flex gap-6">
          <Link
            href="/register"
            className="bg-[#d3dddf] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer hover:bg-[#909697]"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="bg-[#0db9cf] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer hover:bg-[#067787]"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
