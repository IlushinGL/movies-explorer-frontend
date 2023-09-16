import './AboutProject.css';

function AboutProject({num}) {
  // НУЖНО на досуге перетрясти на предмет рефакторинга
  const aboutClass = `about-project about-project_pos_${num}`;
  const titleClass = `about-project__title about-project__title_pos_${num}`;
  const sectionClass = `about-project__section-brief about-project__section-brief_pos_${num}`;
  const briefClass = `about-project__brief about-project__brief_pos_${num}`;
  const briefTitleClass = `about-project__brief-title about-project__brief-title_pos_${num}`;
  const briefSubTitleClass = `about-project__brief-subtitle about-project__brief-subtitle_pos_${num}`;
  const tblClass = `about-project__section-tbl about-project__section-tbl_pos_${num}`;
  const tblHAClass = `about-project__tbl-headerA about-project__tbl-headerA_pos_${num}`;
  const tblHBClass = `about-project__tbl-headerB about-project__tbl-headerB_pos_${num}`;
  const tblDAClass = `about-project__tbl-dataA about-project__tbl-dataA_pos_${num}`;
  const tblDBClass = `about-project__tbl-dataB about-project__tbl-dataB_pos_${num}`;
  return (
    <section id="about-project" className={aboutClass}>
      <h2 className={titleClass}>О проекте</h2>
      <dir className={sectionClass}>
        <dir className={briefClass}>
          <h3 className={briefTitleClass}>
            Дипломный проект включал 5 этапов
          </h3>
          <p className={briefSubTitleClass}>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </dir>
        <dir className={briefClass}>
          <h3 className={briefTitleClass}>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className={briefSubTitleClass}>
            У каждого этапа был мягкий и жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </dir>
      </dir>
      <dir className={tblClass}>
        <dir className={tblHAClass}>
          1 неделя
        </dir>
        <dir className={tblHBClass}>
          4 недели
        </dir>
        <dir className={tblDAClass}>
          Back-end
        </dir>
        <dir className={tblDBClass}>
          Front-end
        </dir>
      </dir>
    </section>
  );
}

export default AboutProject;
