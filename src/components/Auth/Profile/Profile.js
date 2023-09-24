import './Profile.css';

function Profile({mediaNum}) {
  const base           = 'profile';
  const baseClass      = `${base} ${base}_pos_${mediaNum}`;
  const titleClass     = `${base}__title ${base}__title_pos_${mediaNum}`;
  const dataClass      = `${base}__data ${base}__data_pos_${mediaNum}`;
  const setClass       = `${base}__data-set`;
  const itemClass      = `${base}__data-item`;
  const lblClass       = `${base}__data-lbl`;
  const inputClass     = `${base}__data-input`;
  const errClass       = `${base}__data-err ${base}__data-err_pos_${mediaNum}`;
  const crlClass       = `${base}__control ${base}__control_pos_${mediaNum}`;
  const crlItemClass   = `${base}__control-item ${base}__control-item_pos_${mediaNum}`;
  return (
    <div className={baseClass}>
      <div className={titleClass}>
        Привет, Виталий!
      </div>
      <div className={dataClass}>
        <div className={setClass}>
          <div className={itemClass}>
            <div className={lblClass}>Имя</div>
            <div className={inputClass}>Виталий</div>
          </div>
          <div className={errClass}>тут будет ошибка валидации имени любой длинны</div>
        </div>
        <div className={setClass}>
          <div className={itemClass}>
            <div className={lblClass}>E-mail</div>
            <div className={inputClass}>pochta@yandex.ru</div>
          </div>
          <div className={errClass}>тут будет ошибка валидации почты любой длинны</div>
        </div>
      </div>
      <div className={crlClass}>
        <div className={crlItemClass}>Редактировать</div>
        <div className={crlItemClass + ` ${base}__control-item_att`}>Выйти из аккаунта</div>
      </div>
    </div>
  );
}

export default Profile;
