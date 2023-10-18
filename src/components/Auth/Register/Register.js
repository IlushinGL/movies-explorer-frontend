import React from 'react';
import { NavLink } from 'react-router-dom';
import {REG_PATTERNS} from '../../../utils/constants';
import Preloader from '../../Preloader/Preloader';
import logo from '../../../images/logo.svg';
import '../Login/Login.css';
import { useFormAndValidation } from '../../../utils/customHooks';

function Register({mediaNum, onSubmit, linkMain, onSignIn, message, isWait, onClick}) {
  const base        = 'login';
  const baseClass   = `${base} ${base}_pos${mediaNum}`;
  const headerClass = `${base}-header ${base}-header_pos${mediaNum}`;
  const imgClass    = `${base}-header__img ${base}-header__img_pos${mediaNum}`;
  const titleClass  = `${base}-header__title ${base}-header__title_pos${mediaNum}`;
  const formClass   = `${base}-form ${base}-form_pos${mediaNum}`;
  const lblClass    = `${base}-form__lbl ${base}-form__lbl_pos${mediaNum}`;
  const inputClass  = `${base}-form__input ${base}-form__input_pos${mediaNum}`;
  const errClass    = `${base}-form__err ${base}-form__err_pos${mediaNum}`;
  const ctlClass    = `${base}-control ${base}-control_pos${mediaNum}`;
  const msgClass    = `${base}-control__msg ${base}-control__msg_pos${mediaNum}  ${base}-control__msg_pos${mediaNum}reg`;
  const btnClass    = `${base}-control__btn ${base}-control__btn_pos${mediaNum}`;
  const blockClass  = `${base}-control-block ${base}-control-block_pos${mediaNum}`;
  const infoClass   = `${base}-control-block__info ${base}-control-block__info_pos${mediaNum}`;
  const actClass    = `${base}-control-block__action ${base}-control-block__action_pos${mediaNum}`;

  const {values, handleChange, errors, isValid} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <main className={baseClass}>
      <section className={headerClass}>
        <NavLink className={imgClass} to={linkMain}>
          <img src={logo} alt="логотип" />
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
          onClick={onClick}
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          pattern={REG_PATTERNS.USERNAME}
          placeholder='укажите своё имя'
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
          onClick={onClick}
          type="email"
          name="email"
          minLength="5"
          maxLength="40"
          pattern={REG_PATTERNS.EMAIL}
          placeholder='актуальный почтовый адрес'
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
          onClick={onClick}
          type="password"
          name="password"
          minLength="8"
          maxLength="12"
          placeholder='придумайте пароль'
          autoComplete="off"
          required
        />
        <span className={errClass}>{ errors.password || ' ' }</span>
      </form>
      <section className={ctlClass}>
        <div className={msgClass}>
          {isWait ? <Preloader />: (message || ' ')}
        </div>
        <button
          className={btnClass + (!isValid ? ` ${base}-control__btn_disabled` : '')}
          onClick={handleSubmit}
          disabled={!isValid}>
          Зарегистрироваться
        </button>
        <div className={blockClass}>
          <p className={infoClass}>Уже зарегистрированы?</p>
          <button
            className={actClass}
            type="button"
            onClick={onSignIn}>
            Войти
          </button>
        </div>
      </section>
    </main>
  );
}

export default Register;
