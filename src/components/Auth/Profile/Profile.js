import React from 'react';
import './Profile.css';
import {REG_PATTERNS} from '../../../utils/constants';
import Preloader from '../../Preloader/Preloader';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../../utils/customHooks';

function Profile({mediaNum, onOutClick, onEditClick, message, isWait, onClick}) {
  const base           = 'profile';
  const baseClass      = `${base} ${base}_pos${mediaNum}`;
  const titleClass     = `${base}-title ${base}-title_pos${mediaNum}`;
  const dataClass      = `${base}-data ${base}-data_pos${mediaNum}`;
  const setClass       = `${base}-data-set`;
  const itemClass      = `${base}-data-set-item`;
  const lblClass       = `${base}-data-set-item__lbl`;
  const inputClass     = `${base}-data-set-item__input`;
  const errClass       = `${base}-data-set-item-err ${base}-data-set-item-err_pos${mediaNum}`;
  const alertClass     = `${base}-err ${base}-err_pos${mediaNum}`;
  const crlClass       = `${base}-control ${base}-control_pos${mediaNum}`;
  const crlItemClass   = `${base}-control__item ${base}-control__item_pos${mediaNum}`;

  const currentUser = React.useContext(CurrentUserContext);
  const {values, setValues, handleChange, errors, isValid} = useFormAndValidation();

  function handleSubmit(e) {
    // e.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    onEditClick({
      name: values.name,
      email: values.email,
    });
  }

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser]);

  return (
    <main className={baseClass}>
      <h1 className={titleClass}>
        {`Привет, ${currentUser.name}!`}
      </h1>
      <form className={dataClass}>
        <div className={setClass}>
          <div className={itemClass}>
            <label className={lblClass}>Имя</label>
            <input
              className={inputClass}
              onChange={handleChange}
              onClick={onClick}
              type="text"
              name="name"
              value={values.name || ''}
              minLength="2"
              maxLength="40"
              pattern={REG_PATTERNS.USERNAME}
              placeholder='ваше имя'
              autoComplete="off"
              required
            />
          </div>
          <span className={errClass}>{ errors.name || ' ' }</span>
        </div>
        <div className={setClass}>
          <div className={itemClass}>
            <label className={lblClass}>E-mail</label>
            <input
              className={inputClass}
              onChange={handleChange}
              onClick={onClick}
              type="email"
              name="email"
              value={values.email || ''}
              minLength="5"
              maxLength="40"
              pattern={REG_PATTERNS.EMAIL}
              placeholder='актуальный адрес'
              autoComplete="off"
              required
            />
          </div>
          <span className={errClass}>{ errors.email || ' ' }</span>
        </div>
      </form>
      <div className={alertClass}>
        {isWait ? <Preloader />: (message || ' ')}
      </div>
      <section className={crlClass}>
        <button
          onClick={isValid ? handleSubmit : undefined}
          className={crlItemClass + (!isValid ? ` ${base}-control__item_disabled` : '')}>
          Редактировать
        </button>
        <button
          onClick={onOutClick}
          type="button"
          className={crlItemClass + ` ${base}-control__item_att`}>
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Profile;
