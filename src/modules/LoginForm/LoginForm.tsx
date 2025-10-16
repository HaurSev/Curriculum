import { useTranslation } from 'react-i18next';
import './LoginForm.css';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../graphql/queries/login';
import { useNavigate } from 'react-router-dom';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { t } = useTranslation(['authorisation', 'common']);
  const navigate = useNavigate();
  const [login, { loading }] = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login({
        variables: {
          auth: {
            email: data.email,
            password: data.password,
          },
        },
      });

      console.log('Signup result:', response.data);

      navigate('/');
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
          {loading ? t('common:loading') : t('authorisation:login')}
        </button>
        <button>{t('forgot_password')}</button>
      </div>
    </form>
  );
};

export default LoginForm;
