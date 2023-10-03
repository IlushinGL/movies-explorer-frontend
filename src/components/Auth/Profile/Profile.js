import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../../utils/customHooks';

function Profile({mediaNum, onOutClick, onEditClick}) {
  const base           = 'profile';
  const baseClass      = `${base} ${base}_pos_${mediaNum}`;
  const titleClass     = `${base}-title ${base}-title_pos_${mediaNum}`;
  const dataClass      = `${base}-data ${base}-data_pos_${mediaNum}`;
  const setClass       = `${base}-data__set`;
  const itemClass      = `${base}-data-set__item`;
  const lblClass       = `${base}-data-set-item__lbl`;
  const inputClass     = `${base}-data-set-item__input`;
  const errClass       = `${base}-data-set-item__err ${base}-data-set-item__err_pos_${mediaNum}`;
  const crlClass       = `${base}-control ${base}-control_pos_${mediaNum}`;
  const crlItemClass   = `${base}-control__item ${base}-control__item_pos_${mediaNum}`;

  const currentUser = React.useContext(CurrentUserContext);
  const {values, setValues, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    onEditClick({
      name: values.name,
      email: values.email,
    });
    resetForm();
  }

  React.useEffect(() => {
    resetForm();
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [resetForm, setValues, currentUser]);

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
              type="text"
              name="name"
              value={values.name || ''}
              minLength="2"
              maxLength="40"
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
              type="email"
              name="email"
              value={values.email || ''}
              minLength="5"
              maxLength="40"
              autoComplete="off"
              required
            />
          </div>
          <span className={errClass}>{ errors.email || ' ' }</span>
        </div>
      </form>
      <div className={crlClass}>
        <div
          onClick={isValid ? handleSubmit : undefined}
          className={crlItemClass + (!isValid ? ` ${base}-control__item_disabled` : '')}>
          Редактировать
        </div>
        <div
          onClick={onOutClick}
          className={crlItemClass + ` ${base}-control__item_att`}>
          Выйти из аккаунта
        </div>
      </div>
    </main>
  );
}

export default Profile;
