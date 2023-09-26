import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import '../Login/Login.css';
import './Register.css';

function Register({mediaNum, onSubmit, linkMain, linkSignIn}) {
  const base        = 'login';
  const mode        = 'register';
  const baseClass   = `${base} ${base}_pos_${mediaNum}`;
  const headerClass = `${base}__header ${base}__header_pos_${mediaNum}`;
  const imgClass    = `${base}__header-img ${base}__header-img_pos_${mediaNum}`;
  const titleClass  = `${base}__header-title ${base}__header-title_pos_${mediaNum}`;
  const formClass   = `${base}__form ${mode}__form_height`;
  const lblClass    = `${base}__form-input-lbl ${base}__form-input-lbl_pos_${mediaNum}`;
  const inputClass  = `${base}__form-input-txt ${base}__form-input-txt_pos_${mediaNum}`;
  const ctlClass    = `${base}__control ${base}__control_pos_${mediaNum} ${mode}__control_pos_${mediaNum}`;
  const btnClass    = `${base}__control-btn ${base}__control-btn_pos_${mediaNum} ${mode}__control-btn_pos_${mediaNum}`;
  const blockClass  = `${base}__control-block ${base}__control-block_pos_${mediaNum}`;
  const infoClass   = `${base}__control-block-info ${base}__control-block-info_pos_${mediaNum}`;
  const actClass    = `${base}__control-block-action ${base}__control-block-action_pos_${mediaNum}`;
  return (
    <div className={baseClass}>
      <section className={headerClass}>
        <NavLink className={imgClass} to={linkMain}>
          <img src={logo} alt="logo" />
        </NavLink>
        {/* <img className={imgClass} src={logo} alt="logo" /> */}
        <h1 className={titleClass}>Добро пожаловать!</h1>
      </section>
      <form className={formClass}>
      <h2 className={lblClass}>
          Имя
        </h2>
        <input
          className={inputClass}
          type="text"
          minLength="2"
          maxLength="40"
          autoComplete="off"
          required
        />
        <h2 className={lblClass}>
          E-mail
        </h2>
        <input
          className={inputClass}
          type="email"
          minLength="5"
          maxLength="40"
          autoComplete="off"
          required
        />
        <h2 className={lblClass}>
          пароль
        </h2>
        <input
          className={inputClass}
          type="password"
          minLength="8"
          maxLength="12"
          autoComplete="off"
          required
        />
      </form>
      <div className={ctlClass}>
        <button className={btnClass} onClick={onSubmit}>
          Зарегистрироваться
        </button>
        <div className={blockClass}>
          <div className={infoClass}>Уже зарегистрированы?</div>
          <NavLink className={actClass} to={linkSignIn}>
            Войти
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Register;
