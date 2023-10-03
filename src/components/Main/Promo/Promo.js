import './Promo.css';

function Promo({num}) {
  const base       = 'promo';
  const promoClass = `${base} ${base}_pos_${num}`;
  const titleClass = `${base}__title ${base}__title_pos_${num}`;
  return (
    <article className={promoClass}>
      <h1 className={titleClass}>
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </article>
  );
}

export default Promo;
