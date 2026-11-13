import './style.scss';

import Field from '@/shared/ui/Field/Field';

export default function AuthPage() {
    return (<>
        <div className="form form--login">
            <h2 className="form__header">Вход Isotopes</h2>
            <div className="form__fields">
                <Field
                    className="form__field"
                    label="Введите логин"
                    name="login"
                    id="login"
                />
                <Field
                    className="form__field"
                    label="Введите пароль"
                    name="password"
                    id="password"
                    type="password"
                />
            </div>
            <button className="form__submit">Войти</button>
        </div>
    </>);
}
