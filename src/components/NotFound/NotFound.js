import './NotFound.css';

function NotFound({mediaNum}) {
  const base        = 'notfound';
  const baseClass   = `${base}`;
  const titleClass  = `${base}__title ${base}__title_pos_${mediaNum}`;
  const subtltClass = `${base}__subtitle ${base}__subtitle_pos_${mediaNum}`;
  const actClass    = `${base}__action ${base}__action_pos_${mediaNum}`;

  function handleBack() {
    window.history.go(-1);
    return false;
  }

  return (
    <section className={baseClass}>
      <h1 className={titleClass}>404</h1>
      <h2 className={subtltClass}>Страница не найдена</h2>
      <input
        className={actClass}
        action="action"
        onClick={handleBack}
        type="submit"
        value="Назад"
      />
    </section>
  );
}

export default NotFound;
