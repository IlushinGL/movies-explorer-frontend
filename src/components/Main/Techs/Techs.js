import { Link } from 'react-router-dom';
import { TECHS_NAMES } from '../../../utils/constants';
import './Techs.css';

function Techs({num}) {
  const base               = 'techs';
  const techsClass         = `${base} ${base}_pos_${num}`;
  const titleClass         = `${base}-title ${base}-title_pos_${num}`;
  const briefClass         = `${base}-brief ${base}-brief_pos_${num}`;
  const briefTitleClass    = `${base}-brief__title ${base}-brief__title_pos_${num}`;
  const briefSubTitleClass = `${base}-brief__subtitle ${base}-brief__subtitle_pos_${num}`;
  const tblClass           = `${base}-brief-tbl ${base}-brief-tbl_pos_${num}`;
  const tblElement         = `${base}-brief-tbl__element ${base}-brief-tbl__element_pos_${num}`;
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
        {TECHS_NAMES.map((item, id) => (
          <Link
            key={'tch' + id}
            className={tblElement}
            to={item[1]}
            target="_blank"
            rel="noopener noreferrer">
            {item[0]}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Techs;
