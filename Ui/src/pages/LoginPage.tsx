import AuthLayout from "../components/layout/AuthLayout";
import Header from "../components/layout/Header";
import LoginTitle from "../components/layout/LoginTitle";
import LoginForms from "../components/forms/LoginForms";
import LoginFooter from "../components/layout/LoginFooter";

function LoginPage() {
  return (
    <AuthLayout>
      <Header />
      <LoginTitle />
      <LoginForms />
      <LoginFooter/>
    </AuthLayout>
  );
}

export default LoginPage;
