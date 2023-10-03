import './AboutProject.css';

function AboutProject({num}) {
  const base               = 'about-project';
  const aboutClass         = `${base}`;
  const titleClass         = `${base}-title ${base}-title_pos_${num}`;
  const sectionClass       = `${base}-brief ${base}-brief_pos_${num}`;
  const briefClass         = `${base}-brief__text ${base}-brief__text_pos_${num}`;
  const briefTitleClass    = `${base}-brief-text__title ${base}-brief-text__title_pos_${num}`;
  const briefSubTitleClass = `${base}-brief-text__subtitle ${base}-brief-text__subtitle_pos_${num}`;
  const tblClass           = `${base}-tbl ${base}-tbl_pos_${num}`;
  const tblHAClass         = `${base}-tbl__headerA`;
  const tblHBClass         = `${base}-tbl__headerB`;
  const tblDAClass         = `${base}-tbl__dataA`;
  const tblDBClass         = `${base}-tbl__dataB`;
  return (
    <article id="about-project" className={aboutClass}>
      <h1 className={titleClass}>О проекте</h1>
      <div className={sectionClass}>
        <div className={briefClass}>
          <h2 className={briefTitleClass}>
            Дипломный проект состоит из 5 этапов
          </h2>
          <p className={briefSubTitleClass}>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className={briefClass}>
          <h2 className={briefTitleClass}>
            На выполнение диплома разрешено 5 недель
          </h2>
          <p className={briefSubTitleClass}>
            У каждого этапа будет мягкий и жёсткий дедлайн, которые
            нужно соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <section className={tblClass}>
        <div className={tblHAClass}>10.09-12.09</div>
        <div className={tblHBClass}>Осталось 4.5 недели</div>
        <div className={tblDAClass}>Back-end</div>
        <div className={tblDBClass}>Front-end</div>
      </section>
    </article>
  );
}

export default AboutProject;
