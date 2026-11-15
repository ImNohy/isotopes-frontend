import './style.scss';

import { Form } from 'react-router';

import { useAppSelector } from '@/shared/redux/hooks';
import Field from '@/shared/ui/Field/Field';

export default function SignInPage() {
    const error = useAppSelector(s => s.user.error);
    const isLoading = useAppSelector(s => s.user.isLoading);

    return (<>
        <Form
            method='post'
            className="auth-form"
        >
            <h2 className="auth-form__header">Вход Isotopes</h2>

            <div className='auth-form__content'>
                <div className="auth-form__fields">
                    <Field
                        className="auth-form__field"
                        label="Введите логин"
                        name="login"
                        id="login"
                        disabled={isLoading}
                    />
                    <Field
                        className="auth-form__field"
                        label="Введите пароль"
                        name="password"
                        id="password"
                        type="password"
                        disabled={isLoading}
                    />
                </div>

                {error && (
                    <p className='auth-form__error'>{error}</p>
                )}
            </div>

            <button
                className="auth-form__submit"
                disabled={isLoading}
            >
                {isLoading ? 'Вход…' : 'Войти'}
            </button>
        </Form>
    </>);
}
