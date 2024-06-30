import Link from "next/link";

const notfound = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] ">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-teal-400 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <p className="relative inline-block text-sm font-medium text-teal-400 group active:text-teal-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-teal-400 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link href="/">Go Home</Link>
          </span>
        </p>
      </button>
    </section>
  );
};

export default notfound;
