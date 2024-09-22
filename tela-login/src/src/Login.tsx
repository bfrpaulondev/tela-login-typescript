// src/Login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Definindo a interface para os dados do formulário
interface IFormInputs {
  email: string;
  password: string;
}

// Esquema de validação com Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
});

const Login: React.FC = () => {
  // Hook useForm com validação Yup
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  // Função chamada no envio do formulário
  const onSubmit = (data: IFormInputs) => {
    console.log('Dados do formulário:', data);
    // Aqui você faria a lógica de autenticação (chamada à API, etc.)
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email')}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            {...register('password')}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
