import React from 'react';
// import { NavLink } from 'react-router-dom';
import switchY from '../../../images/switch_yes.svg';
import switchN from '../../../images/switch_no.svg';
import './SearchForm.css';

function SearchForm({mediaNum, onSubmit}) {
  const base        = 'search';
  const baseClass   = `${base}`;
  const formClass   = `${base}-form ${base}-form_pos${mediaNum}`;
  const inputClass  = `${base}-form__input ${base}-form__input_pos${mediaNum}`;
  const txtClass    = `${base}-form-input__txt ${base}-form-input__txt_pos${mediaNum}`;
  const btnClass    = `${base}-form-input__btn`;
  const optClass    = `${base}-form-option ${base}-form-option_pos${mediaNum}`;
  const itemClass   = `${base}-form-option__item ${base}-form-option__item_pos${mediaNum}`;
  const [isShortFilmsSelected, setShortFilmsSelected] = React.useState(false);

  function handleShortFilmsSelected() {
    setShortFilmsSelected(!isShortFilmsSelected);
  }

  return (
    <section className={baseClass}>
      <form className={formClass}>
        <div className={inputClass}>
          <input
            name="query"
            type="text"
            className={txtClass}
            required
            placeholder="Фильм"
          />
          <button className={btnClass} onClick={onSubmit} type='button'></button>
          {/* <div className={btnClass} onClick={onSubmit}></div> */}
        </div>
        <div className={optClass}>
          <img
            className={itemClass}
            onClick={handleShortFilmsSelected}
            src={isShortFilmsSelected ? switchY : switchN} alt="переключатель" />
          <div
            className={itemClass}
            onClick={handleShortFilmsSelected}>
            Короткометражки
          </div>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
