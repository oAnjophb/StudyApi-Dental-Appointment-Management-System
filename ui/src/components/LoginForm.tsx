import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "O e-mail é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "Digite um e-mail válido";
    }
    
    if (!password) {
      newErrors.password = "A senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Handle login logic here
      console.log("Login attempt:", { email, password, rememberMe });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          E-mail
        </Label>
        <div className="relative">
          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-foreground pointer-events-none z-10" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              h-12 pl-14 pr-6 rounded-full bg-secondary text-secondary-foreground
              placeholder:text-secondary-foreground/90 border-0
              focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
              transition-all duration-200
              ${errors.email ? "ring-2 ring-destructive" : ""}
            `}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive animate-slide-in-left">{errors.email}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-foreground">
          Senha
        </Label>
        <div className="relative">
          <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-foreground pointer-events-none z-10" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`
              h-12 pl-14 pr-14 rounded-full bg-secondary text-secondary-foreground
              placeholder:text-secondary-foreground border-0
              focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
              transition-all duration-200
              ${errors.password ? "ring-2 ring-destructive" : ""}
            `}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary-foreground hover:text-accent-foreground transition-colors z-10"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive animate-slide-in-left">{errors.password}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="remember"
            className="text-sm text-muted-foreground cursor-pointer select-none"
          >
            Lembrar de mim
          </Label>
        </div>
        <a
          href="#"
          className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
        >
          Esqueceu sua senha?
        </a>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-primary hover:bg-purple-700 text-primary-foreground font-bold rounded-md shadow-button hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
      >
        Entrar
      </Button>
    </form>
  );
};
