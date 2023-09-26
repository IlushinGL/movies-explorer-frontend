import { Link } from 'react-router-dom';
import { TECHS_NAMES } from '../../../utils/constants';
import './Techs.css';

function Techs({num}) {
  const base               = 'techs';
  const techsClass         = `${base} techs_pos_${num}`;
  const titleClass         = `${base}__title ${base}__title_pos_${num}`;
  const briefClass         = `${base}__brief ${base}__brief_pos_${num}`;
  const briefTitleClass    = `${base}__brief-title ${base}__brief-title_pos_${num}`;
  const briefSubTitleClass = `${base}__brief-subtitle ${base}__brief-subtitle_pos_${num}`;
  const tblClass           = `${base}-tbl ${base}-tbl_pos_${num}`;
  const tblElement         = `${base}-tbl__element ${base}-tbl__element_pos_${num}`;
  return (
    <section id="techs-project" className={techsClass}>
      <div className={titleClass}>Технологии</div>
      <div className={briefClass}>
        <h2 className={briefTitleClass}>
          7 технологий
        </h2>
        <p className={briefSubTitleClass}>
          На курсе веб-разработки мы осваивали следующие технологии, которые
          нужно применить в дипломном проекте:
        </p>
      </div>
      <div className={tblClass}>
        {TECHS_NAMES.map((item) => (
          <Link
            className={tblElement}
            to={item[1]}
            target="_blank"
            rel="noopener noreferrer">
            {item[0]}
          </Link>
        ))}
        {/* {TECHS_NAMES.map((item) => (
          <div className={tblElement}>
            {item[0]}
          </div>
        ))} */}
      </div>
    </section>
  );
}

export default Techs;
