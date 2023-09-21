import './Portfolio.css';

function Portfolio({num}) {
  const base       = 'portfolio';
  const baseClass  = `${base} ${base}_pos_${num}`;
  const titleClass = `${base}__title ${base}__title_pos_${num}`;
  const itemClass  = `${base}__item ${base}__item_pos_${num}`;
  const linkClass  = `${base}__item-link ${base}__item-link_pos_${num}`;
  return (
    <section className={baseClass}>
      <h2 className={titleClass}>
        Портфолио
      </h2>
      <div className={itemClass}>
        Статичный сайт
        <div className={linkClass}></div>
      </div>
      <div className={itemClass}>
        Адаптивный сайт
        <div className={linkClass}></div>
      </div>
      <div className={itemClass}>
        Одностраничное приложение
        <div className={linkClass}></div>
      </div>
    </section>
  );
}

export default Portfolio;
