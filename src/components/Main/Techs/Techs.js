import './Techs.css';

function Techs({num}) {
  const techsClass = `techs techs_pos_${num}`;
  // const titleClass = `promo__title promo__title_pos_${num}`;
  return (
    <section id="techs-project" className={techsClass}>
      <dir>7 технологий</dir>

      {/* <div className={titleClass}>
        Учебный проект студента факультета Веб-разработки.
      </div> */}
    </section>
  );
}

export default Techs;
