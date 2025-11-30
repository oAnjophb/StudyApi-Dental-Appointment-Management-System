function FormFooter() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
        />
        <label
          htmlFor="remember"
          className="ml-2 block text-sm text-gray-900"
        >
          Lembrar de mim
        </label>
      </div>
      <a
        href="#"
        className="text-sm text-purple-700 hover:text-purple-600 font-medium"
      >
        Esqueceu sua senha?
      </a>
    </div>
  );
}

export default FormFooter