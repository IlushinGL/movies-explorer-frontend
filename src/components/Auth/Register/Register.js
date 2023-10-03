import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import '../Login/Login.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../../utils/customHooks';

function Register({mediaNum, onSubmit, linkMain, linkSignIn}) {
  const base        = 'login';
  const baseClass   = `${base}`;
  const headerClass = `${base}-header ${base}-header_pos_${mediaNum}`;
  const imgClass    = `${base}-header__img ${base}-header__img_pos_${mediaNum}`;
  const titleClass  = `${base}-header__title ${base}-header__title_pos_${mediaNum}`;
  const formClass   = `${base}-form`;
  const lblClass    = `${base}-form__lbl ${base}-form__lbl_pos_${mediaNum}`;
  const inputClass  = `${base}-form__input ${base}-form__input_pos_${mediaNum}`;
  const errClass    = `${base}-form__err ${base}-form__err_pos_${mediaNum}`;
  const ctlClass    = `${base}-control ${base}-control_pos_${mediaNum}`;
  const btnClass    = `${base}-control__btn ${base}-control__btn_pos_${mediaNum}`;
  const blockClass  = `${base}-control__block ${base}-control__block_pos_${mediaNum}`;
  const infoClass   = `${base}-control-block__info ${base}-control-block__info_pos_${mediaNum}`;
  const actClass    = `${base}-control-block__action ${base}-control-block__action_pos_${mediaNum}`;

  const currentUser = React.useContext(CurrentUserContext);
  const {values, setValues, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [resetForm, setValues, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    resetForm();
  }

  return (
    <main className={baseClass}>
      <section className={headerClass}>
        <NavLink className={imgClass} to={linkMain}>
          <img src={logo} alt="logo" />
        </NavLink>
        <h1 className={titleClass}>Добро пожаловать!</h1>
      </section>
      <form className={formClass}>
        <label className={lblClass}>
          Имя
        </label>
        <input
          className={inputClass}
          onChange={handleChange}
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          required
        />
        <span className={errClass}>{ errors.name || ' ' }</span>
        <label className={lblClass}>
          E-mail
        </label>
        <input
          className={inputClass}
          onChange={handleChange}
          type="email"
          name="email"
          minLength="5"
          maxLength="40"
          autoComplete="off"
          required
        />
        <span className={errClass}>{ errors.email || ' ' }</span>
        <label className={lblClass}>
          пароль
        </label>
        <input
          className={inputClass}
          onChange={handleChange}
          type="password"
          name="password"
          minLength="8"
          maxLength="12"
          autoComplete="off"
          required
        />
        <span className={errClass}>{ errors.password || ' ' }</span>
      </form>
      <div className={ctlClass}>
        <button
          className={btnClass + (!isValid ? ` ${base}-control__btn_disabled` : '')}
          onClick={handleSubmit}
          disabled={!isValid}>
          Зарегистрироваться
        </button>
        <div className={blockClass}>
          <div className={infoClass}>Уже зарегистрированы?</div>
          <NavLink className={actClass} to={linkSignIn}>
            Войти
          </NavLink>
        </div>
      </div>
    </main>
  );
}

export default Register;
