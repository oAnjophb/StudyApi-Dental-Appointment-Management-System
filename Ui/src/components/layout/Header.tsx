function Header() {
  return (
    <header className=" flex justify-center items-center gap-3 py-8 w-full mt-47">
      <img
        src="/dental-logo.png"
        alt="logo Dental Care"
        className=" w-35 h-auto object-contain"
      />
      <div className=" flex flex-col items-start">
        <h1 className=" text-gray-700 text-xl font-bold leading-none">
          Dental Care
        </h1>
        <h5 className=" text-gray-500 text-sm font-normal">
          Sistema de Gestão
        </h5>
      </div>
    </header>
  );
}

export default Header;
