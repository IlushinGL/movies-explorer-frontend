import './NotFound.css';

function NotFound({mediaNum}) {
  const base        = 'notfound';
  const baseClass   = `${base}`;
  const titleClass  = `${base}-title ${base}-title_pos${mediaNum}`;
  const subtltClass = `${base}-subtitle ${base}-subtitle_pos${mediaNum}`;
  const actClass    = `${base}-action ${base}-action_pos${mediaNum}`;

  function handleBack() {
    window.history.go(-1);
    return false;
  }

  return (
    <main className={baseClass}>
      <h1 className={titleClass}>404</h1>
      <h2 className={subtltClass}>Страница не найдена</h2>
      <input
        className={actClass}
        action="action"
        onClick={handleBack}
        type="submit"
        value="Назад"
      />
    </main>
  );
}

export default NotFound;
