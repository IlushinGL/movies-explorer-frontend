import './AboutProject.css';

function AboutProject({num}) {
  const base =               'about-project';
  const aboutClass =         `${base} ${base}_pos_${num}`;
  const titleClass =         `${base}__title ${base}__title_pos_${num}`;
  const sectionClass =       `${base}__section-brief ${base}__section-brief_pos_${num}`;
  const briefClass =         `${base}__brief ${base}__brief_pos_${num}`;
  const briefTitleClass =    `${base}__brief-title ${base}__brief-title_pos_${num}`;
  const briefSubTitleClass = `${base}__brief-subtitle ${base}__brief-subtitle_pos_${num}`;
  const tblClass =           `${base}__section-tbl ${base}__section-tbl_pos_${num}`;
  const tblHAClass =         `${base}__tbl-headerA ${base}__tbl-headerA_pos_${num}`;
  const tblHBClass =         `${base}__tbl-headerB ${base}__tbl-headerB_pos_${num}`;
  const tblDAClass =         `${base}__tbl-dataA ${base}__tbl-dataA_pos_${num}`;
  const tblDBClass =         `${base}__tbl-dataB ${base}__tbl-dataB_pos_${num}`;
  return (
    <section id="about-project" className={aboutClass}>
      <h2 className={titleClass}>О проекте</h2>
      <div className={sectionClass}>
        <div className={briefClass}>
          <h3 className={briefTitleClass}>
            Дипломный проект состоит из 5 этапов
          </h3>
          <p className={briefSubTitleClass}>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className={briefClass}>
          <h3 className={briefTitleClass}>
            На выполнение диплома разрешено 5 недель
          </h3>
          <p className={briefSubTitleClass}>
            У каждого этапа будет мягкий и жёсткий дедлайн, которые
            нужно соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className={tblClass}>
        <div className={tblHAClass}>10.09-12.09</div>
        <div className={tblHBClass}>Осталось 4.5 недели</div>
        <div className={tblDAClass}>Back-end</div>
        <div className={tblDBClass}>Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;
