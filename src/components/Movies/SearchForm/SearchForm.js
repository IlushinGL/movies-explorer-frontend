import switchY from '../../../images/switch_yes.svg';
import switchN from '../../../images/switch_no.svg';
import './SearchForm.css';

function SearchForm({mediaNum, optionSelected}) {
  const base        = 'search';
  const baseClass   = `${base} ${base}_pos_${mediaNum}`;
  const formClass   = `${base}__form ${base}__form_pos_${mediaNum}`;
  const inputClass  = `${base}__input ${base}__input_pos_${mediaNum}`;
  const txtClass    = `${base}__input-txt ${base}__input-txt_pos_${mediaNum}`;
  const btnClass    = `${base}__btn`;
  const optClass    = `${base}__option`;
  const itemClass   = `${base}__option-item ${base}__option-item_pos_${mediaNum}`;
  return (
    <section className={baseClass}>
      <form className={formClass}>
        <div className={inputClass}>
          <input
            type="text"
            className={txtClass}
            placeholder="Фильм"
            // minLength="2"
            // maxLength="40"
            // autoComplete="off"
            // required
          />
          <button className={btnClass}></button>
        </div>
        <div className={optClass}>
          <img className={itemClass} src={optionSelected ? switchY : switchN} alt="yes" />
          <div className={itemClass}>Короткометражки</div>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
