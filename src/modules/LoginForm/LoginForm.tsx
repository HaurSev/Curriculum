import { useTranslation } from 'react-i18next';
import './LoginForm.css';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../graphql/queries/login';
import { useNavigate } from 'react-router-dom';
import useErrorStore from '../../store/errorStore';
import type { GraphQLError } from 'graphql';
import type { ApolloError } from 'apollo-server-errors';

type LoginFormData = {
  email: string;
  password: string;
};

interface ErrorExtensions {
  response?: {
    statusCode?: number;
    message?: string | string[];
  };
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { t } = useTranslation(['authorisation', 'common']);
  const navigate = useNavigate();
  const [login, { loading, error }] = useLogin();
  const { message, setError } = useErrorStore();

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    if (!data.email || !data.password) {
      setError('email or password no valide');
    }
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

      const res = response.data;

      const { email, id } = response.data?.login.user || {};

      sessionStorage.setItem(
        'access_token',
        JSON.stringify(res?.login.access_token),
      );

      sessionStorage.setItem(
        'refresh_token',
        JSON.stringify(res?.login.refresh_token),
      );

      sessionStorage.setItem('user', JSON.stringify({ id, email }));

      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <form
      className="authForm"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register('email')} type="text" placeholder={t('email')} />
      <input
        {...register('password')}
        type="password"
        placeholder={t('password')}
      />
      <div className="error">
        {message ? (
          <p>{message}</p>
        ) : error ? (
          (error as ApolloError).errors.map((err: GraphQLError, i: number) => {
            const errorExtensions = err.extensions as ErrorExtensions;
            const serverMessage = errorExtensions.response?.message;

            const finalMessage = Array.isArray(serverMessage)
              ? serverMessage.join(', ')
              : serverMessage || err.message;

            return <p key={i}>{finalMessage}</p>;
          })
        ) : null}
      </div>
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
