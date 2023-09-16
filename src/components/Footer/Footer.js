import './Footer.css';

function Footer({num}) {
  const  footerClass = `footer footer_pos_${num}`;
  // const titleClass = `promo__title promo__title_pos_${num}`;
  return (
    <section className={ footerClass}>
      <dir>Подвал</dir>

      {/* <div className={titleClass}>
        Учебный проект студента факультета Веб-разработки.
      </div> */}
    </section>
  );
}

export default Footer;
