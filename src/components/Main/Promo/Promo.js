import './Promo.css';

function Promo({num}) {
  const base       = 'promo';
  const promoClass = `${base} ${base}_pos${num}`;
  const titleClass = `${base}-title ${base}-title_pos${num}`;
  return (
    <section className={promoClass}>
      <h1 className={titleClass}>
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
}

export default Promo;
