import './Promo.css';

function Promo({num}) {
  const promoClass = `promo promo_pos_${num}`;
  const titleClass = `promo__title promo__title_pos_${num}`;
  return (
    <section className={promoClass}>
      <div className={titleClass}>
        Учебный проект студента факультета Веб-разработки.
      </div>
    </section>
  );
}

export default Promo;
