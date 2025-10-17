import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignup } from '../../graphql/mutations/signup';
import '../LoginForm/LoginForm.css';
import { ApolloError } from 'apollo-server-errors';
import type { GraphQLError } from 'graphql';
import useErrorStore from '../../store/errorStore';

type SignupFormData = {
  email: string;
  password: string;
};

interface ErrorExtensions {
  response?: {
    statusCode?: number;
    message?: string | string[];
  };
}

const SignupForm = () => {
  const { register, handleSubmit } = useForm<SignupFormData>();
  const { t } = useTranslation(['authorisation', 'common']);
  const navigate = useNavigate();
  const { message, setError } = useErrorStore();
  const [signup, { loading, error }] = useSignup();

  const onSubmit = async (data: SignupFormData) => {
    setError('');
    if (!data.email || !data.password) {
      setError('email or password no valide');
    }
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

  const handleNavigate = () => {
    navigate(AppRoutes.LOGIN);
  };

  return (
    <form
      className="authForm signupForm"
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
          {loading ? t('common:loading') : t('create_account')}
        </button>
        <button type="button" onClick={handleNavigate}>
          {t('have_account')}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
