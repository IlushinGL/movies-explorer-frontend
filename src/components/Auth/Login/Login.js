import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import './Login.css';
import { useFormAndValidation } from '../../../utils/customHooks';

function Login({mediaNum, onSubmit, linkMain, linkSignUp}) {
  const base        = 'login';
  const baseClass   = `${base} ${base}_pos_${mediaNum}`;
  const headerClass = `${base}-header ${base}-header_pos_${mediaNum}`;
  const imgClass    = `${base}-header-img ${base}-header-img_pos_${mediaNum}`;
  const titleClass  = `${base}-header-title ${base}-header-title_pos_${mediaNum}`;
  const formClass   = `${base}-form`;
  const lblClass    = `${base}-form-input-lbl ${base}-form-input-lbl_pos_${mediaNum}`;
  const inputClass  = `${base}-form-input-txt ${base}-form-input-txt_pos_${mediaNum}`;
  const errClass    = `${base}-form-input-err ${base}-form-input-err_pos_${mediaNum}`;
  const ctlClass    = `${base}-control ${base}-control_pos_${mediaNum}`;
  const btnClass    = `${base}-control-btn ${base}-control-btn_pos_${mediaNum}`;
  const blockClass  = `${base}-control-block ${base}-control-block_pos_${mediaNum}`;
  const infoClass   = `${base}-control-block-info ${base}-control-block-info_pos_${mediaNum}`;
  const actClass    = `${base}-control-block-action ${base}-control-block-action_pos_${mediaNum}`;

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
          <img src={logo} alt="logo" />
        </NavLink>
        {/* <img className={imgClass} src={logo} alt="logo" /> */}
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
          autoComplete="off"
          required
        />
        <span className={errClass}>{ errors.password || ' ' }</span>
      </form>
      <div className={ctlClass}>
        <button
          className={btnClass + (!isValid ? ` ${base}-control-btn_disabled` : '')}
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
