import './Promo.css';

function Promo({num}) {
  const promoClass = `promo promo_pos_${num}`;
  const titleClass = `promo__title promo__title_pos_${num}`;
  return (
    <section className={promoClass}>
      <h1 className={titleClass}>
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
}

export default Promo;
