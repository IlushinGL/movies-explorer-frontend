import { Link } from 'react-router-dom';
import { TECHS_NAMES } from '../../../utils/constants';
import './Techs.css';

function Techs({num}) {
  const base               = 'techs';
  const techsClass         = `${base} ${base}_pos${num}`;
  const titleClass         = `${base}-title ${base}-title_pos${num}`;
  const briefClass         = `${base}-brief ${base}-brief_pos${num}`;
  const briefTitleClass    = `${base}-brief__title ${base}-brief__title_pos${num}`;
  const briefSubTitleClass = `${base}-brief__subtitle ${base}-brief__subtitle_pos${num}`;
  const tblClass           = `${base}-brief-tbl ${base}-brief-tbl_pos${num}`;
  const tblElement         = `${base}-brief-tbl__element ${base}-brief-tbl__element_pos${num}`;
  return (
    <section id="techs-project" className={techsClass}>
      <h2 className={titleClass}>Технологии</h2>
      <div className={briefClass}>
        <h3 className={briefTitleClass}>
          7 технологий
        </h3>
        <p className={briefSubTitleClass}>
          На курсе веб-разработки мы осваивали технологии, которые
          применяются в дипломном проекте:
        </p>
      </div>
      <section className={tblClass}>
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
      </section>
    </section>
  );
}

export default Techs;
