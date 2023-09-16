import './AboutProject.css';

function AboutProject({num}) {
  const aboutClass = `about-project about-project_pos_${num}`;
  // const titleClass = `promo__title promo__title_pos_${num}`;
  return (
    <section id="about-project" className={aboutClass}>
      <dir>О проекте</dir>

      {/* <div className={titleClass}>
        Учебный проект студента факультета Веб-разработки.
      </div> */}
    </section>
  );
}

export default AboutProject;
