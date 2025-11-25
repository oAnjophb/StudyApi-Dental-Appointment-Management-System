import { LoginForm } from "@/components/LoginForm";
import dentalHero from "@/assets/dental-hero.jpg";
import dentalLogo from "@/assets/dental-logo.png";

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Presentation */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--purple-700)) 0%, hsl(var(--purple-500)) 100%)',
        }}
      >
        {/* Hero Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={dentalHero}
            alt="Modern Dental Clinic"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-purple-500/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3">
              <img
                src={dentalLogo}
                alt="Dental Clinic Logo"
                className="h-20 w-25 filter brightness-0 invert"
              />
              <div>
                <h2 className="text-2xl font-bold">DentalCare</h2>
                <p className="text-sm text-white/80">Sistema de Gestão</p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight">
                Transformando<br />
                sorrisos,<br />
                otimizando sua<br />
                gestão
              </h1>
              <p className="text-lg text-white/90 max-w-md">
                Gerencie sua clínica odontológica com eficiência, 
                controle de pacientes, agendamentos e muito mais em um só lugar.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse-glow" />
                <span className="text-white/90">Gestão completa de pacientes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse-glow" style={{ animationDelay: '0.2s' }} />
                <span className="text-white/90">Agendamento inteligente</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse-glow" style={{ animationDelay: '0.4s' }} />
                <span className="text-white/90">Controle financeiro integrado</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-white/60 animate-fade-in">
            © 2024 DentalCare. Todos os direitos reservados.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center space-x-3">
              <img
                src={dentalLogo}
                alt="Dental Clinic Logo"
                className="h-10 w-10"
              />
              <div>
                <h2 className="text-xl font-bold text-foreground">DentalCare</h2>
                <p className="text-xs text-muted-foreground">Sistema de Gestão</p>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="space-y-2 text-center lg:text-left animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground">
              Faça login para acessar seu painel de gerenciamento
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground animate-fade-in">
            <p>
              Não tem uma conta?{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-purple-700 transition-colors hover:underline"
              >
                Entre em contato com o administrador
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
