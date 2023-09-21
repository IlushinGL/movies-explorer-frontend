import logo from '../../../images/logo.svg';
import './Login.css';

function Login({num}) {
  const base        = 'login';
  const baseClass   = `${base} ${base}_pos_${num}`;
  const headerClass = `${base}__header ${base}__header_pos_${num}`;
  const imgClass    = `${base}__header-img ${base}__header-img_pos_${num}`;
  const titleClass  = `${base}__header-title ${base}__header-title_pos_${num}`;
  const formClass   = `${base}__form`;
  const lblClass    = `${base}__form-input-lbl ${base}__form-input-lbl_pos_${num}`;
  const inputClass  = `${base}__form-input-txt ${base}__form-input-txt_pos_${num}`;
  const ctlClass    = `${base}__control ${base}__control_pos_${num}`;
  const btnClass    = `${base}__control-btn ${base}__control-btn_pos_${num}`;
  const blockClass  = `${base}__control-block ${base}__control-block_pos_${num}`;
  const infoClass   = `${base}__control-block-info ${base}__control-block-info_pos_${num}`;
  const actClass    = `${base}__control-block-action ${base}__control-block-action_pos_${num}`;
  return (
    <div className={baseClass}>
      <section className={headerClass}>
        <img className={imgClass} src={logo} alt="logo" />
        <h1 className={titleClass}>Добро пожаловать😎</h1>
      </section>
      <form className={formClass}>
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
        <button className={btnClass}>
          Войти
        </button>
        <div className={blockClass}>
          <div className={infoClass}>Ещё не зарегистрированы?</div>
          <div className={actClass}>Регистрация</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
