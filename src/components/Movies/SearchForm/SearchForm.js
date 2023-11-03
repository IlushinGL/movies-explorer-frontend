import React from 'react';
import switchY from '../../../images/switch_yes.svg';
import switchN from '../../../images/switch_no.svg';
import './SearchForm.css';

function SearchForm({mediaNum, onSubmit, movieQuery}) {
  const base        = 'search';
  const baseClass   = `${base} ${base}_pos${mediaNum}`;
  const formClass   = `${base}-form ${base}-form_pos${mediaNum}`;
  const inputClass  = `${base}-form__input ${base}-form__input_pos${mediaNum}`;
  const txtClass    = `${base}-form-input-txt ${base}-form-input-txt_pos${mediaNum}`;
  const btnClass    = `${base}-form-input-btn`;
  const optClass    = `${base}-form-option ${base}-form-option_pos${mediaNum}`;
  const itemClass   = `${base}-form-option__item ${base}-form-option__item_pos${mediaNum}`;

  const isShortFilmsSelected = movieQuery? movieQuery.short : false;

  function handleShortFilmsSelected() {
    // Передать значения управляемых компонентов во внешний обработчик
    // console.log('SearchForm', movieQuery, isShortFilmsSelected, name);
    onSubmit({
      search: document.querySelector('input').value,
      short: !isShortFilmsSelected
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    onSubmit({
      search: e.target.query.value,
      short: isShortFilmsSelected
    });
  }

  return (
    <section className={baseClass}>
      <form className={formClass} onSubmit={handleSubmit}>
        <div className={inputClass}>
          <input
            name="query"
            type="text"
            defaultValue={movieQuery? movieQuery.search : ''}
            className={txtClass}
            autoComplete="off"
            required
            placeholder="Фильм"
          />
          <button
            className={btnClass}
            type='submit'>
          </button>
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
