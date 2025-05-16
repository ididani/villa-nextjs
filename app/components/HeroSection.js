export default function HeroSection() {
  return (
    <section
      className="relative w-full h-screen flex flex-col justify-center items-center bg-cover bg-center text-center px-4"
      style={{ backgroundImage: "url('../main-img.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="relative z-10">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
          Welcome to Villa Didani
        </h1>
        <p className="text-white text-lg md:text-2xl mt-4">
          Where hidden coastlines and chill mornings meet
        </p>
      </div>
    </section>
  );
}
