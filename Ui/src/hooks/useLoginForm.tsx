import { useState, type FormEvent } from "react";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login disparado:", { email, password });
  };

  return { email, setEmail, password, setPassword, handleSubmit };
};

export default useLoginForm