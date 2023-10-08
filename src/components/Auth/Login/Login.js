import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import './Login.css';
import { useFormAndValidation } from '../../../utils/customHooks';

function Login({mediaNum, onSubmit, linkMain, linkSignUp}) {
  const base        = 'login';
  const baseClass   = `${base} ${base}_pos${mediaNum}`;
  const headerClass = `${base}-header ${base}-header_pos${mediaNum}`;
  const imgClass    = `${base}-header__img`;
  const titleClass  = `${base}-header__title ${base}-header__title_pos${mediaNum}`;
  const formClass   = `${base}-form ${base}-form_pos${mediaNum}`;
  const lblClass    = `${base}-form__lbl`;
  const inputClass  = `${base}-form__input`;
  const errClass    = `${base}-form__err`;
  const ctlClass    = `${base}-control ${base}-control_pos${mediaNum}`;
  const btnClass    = `${base}-control__btn ${base}-control__btn_pos${mediaNum}`;
  const blockClass  = `${base}-control__block ${base}-control__block_pos${mediaNum}`;
  const infoClass   = `${base}-control-block__info ${base}-control-block__info_pos${mediaNum}`;
  const actClass    = `${base}-control-block__action ${base}-control-block__action_pos${mediaNum}`;

  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    onSubmit({
      email: values.email,
      password: values.password,
    });
    resetForm();
  }

  return (
    <main className={baseClass}>
      <section className={headerClass}>
        <NavLink className={imgClass} to={linkMain}>
          <img src={logo} alt="логотип" />
        </NavLink>
        <h1 className={titleClass}>Привет! Проходите😎</h1>
      </section>
      <form className={formClass}>
        <label className={lblClass}>
          E-mail
        </label>
        <input
          className={inputClass}
          name="email"
          type="email"
          value={values.email || ''}
          onChange={handleChange}
          minLength="5"
          maxLength="40"
          placeholder='укажите почтовый адрес'
          autoComplete="off"
          required
        />
        <span className={errClass}>{ errors.email || ' ' }</span>
        <label className={lblClass}>
          пароль
        </label>
        <input
          className={inputClass}
          name="password"
          type="password"
          value={values.password || ''}
          onChange={handleChange}
          minLength="8"
          maxLength="12"
          placeholder='укажите пароль'
          autoComplete="off"
          required
        />
        <span className={errClass}>{ errors.password || ' ' }</span>
      </form>
      <div className={ctlClass}>
        <button
          className={btnClass + (!isValid ? ` ${base}-control__btn_disabled` : '')}
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}>
          Войти
        </button>
        <div className={blockClass}>
          <div className={infoClass}>Ещё не зарегистрированы?</div>
          <NavLink className={actClass} to={linkSignUp}>
            Регистрация
          </NavLink>
        </div>
      </div>
    </main>
  );
}

export default Login;
