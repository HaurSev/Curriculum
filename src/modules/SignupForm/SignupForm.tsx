import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignup } from '../../graphql/mutations/signup';
import '../LoginForm/LoginForm.css';

type SignupFormData = {
  email: string;
  password: string;
};

const SignupForm = () => {
  const { register, handleSubmit } = useForm<SignupFormData>();
  const { t } = useTranslation(['authorisation', 'common']);
  const navigate = useNavigate();

  const [signup, { loading }] = useSignup();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signup({
        variables: {
          auth: {
            email: data.email,
            password: data.password,
          },
        },
      });

      console.log('Signup result:', response.data);

      navigate(AppRoutes.LOGIN);
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="text" placeholder={t('email')} />
      <input
        {...register('password')}
        type="password"
        placeholder={t('password')}
      />
      <div>
        <button type="submit" disabled={loading}>
          {loading ? t('common:loading') : t('create_account')}
        </button>
        <button type="button" onClick={() => navigate(AppRoutes.LOGIN)}>
          {t('have_account')}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
