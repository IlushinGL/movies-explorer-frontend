import './AboutMe.css';

function AboutMe({num}) {
  const  aboutClass = `about-me about-me_pos_${num}`;
  // const titleClass = `promo__title promo__title_pos_${num}`;
  return (
    <section id="about-me-project" className={ aboutClass}>
      <dir>Студент</dir>

      {/* <div className={titleClass}>
        Учебный проект студента факультета Веб-разработки.
      </div> */}
    </section>
  );
}

export default AboutMe;
