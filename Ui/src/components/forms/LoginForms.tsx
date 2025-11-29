// src/components/forms/LoginForm.tsx
import { useState, type FormEvent } from "react";
import { Mail, Lock } from "lucide-react"; // Supondo que instalou lucide-react
import Input from "../ui/Input";
import Button from "../ui/Button";

function LoginForm() {
  // O estado fica AQUI, não na Page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login disparado:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="E-mail"
        type="email"
        placeholder="admin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail size={20} />}
      />

      <div className="relative">
        <Input
          label="Senha"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={20} />}
        />
      </div>

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

      <Button type="submit">Entrar</Button>
    </form>
  );
}

export default LoginForm;
