import useLoginForm from "../../hooks/useLoginForm";
import FormFooter from "../layout/formFooter";
import Button from "../ui/Button";
import Input from "../ui/Input";

import { Mail, Lock } from "lucide-react";

function LoginForm() {
  const { email, setEmail, password, setPassword, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="E-mail"
        type="email"
        placeholder="admin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail />}
      />

      <div className="relative">
        <Input
          label="Senha"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock />}
        />
      </div>

      <FormFooter />

      <Button type="submit">Entrar</Button>
    </form>
  );
}

export default LoginForm;