import { Link } from 'react-router-dom';
import './Portfolio.css';
import { PORTFOLIO_DATA } from '../../../utils/constants';

function Portfolio({num}) {
  const base       = 'portfolio';
  const baseClass  = `${base} ${base}_pos${num}`;
  const titleClass = `${base}-title ${base}-title_pos${num}`;
  const itemClass  = `${base}-item ${base}-item_pos${num}`;
  const linkClass  = `${base}-item__link ${base}-item__link_pos${num}`;

  return (
    <section className={baseClass}>
      <h2 className={titleClass}>
        Портфолио
      </h2>
      {PORTFOLIO_DATA.map((item, id) => (
        <Link
          key={'pft' + id}
          className={itemClass}
          to={item[1]}
          target="_blank"
          rel="noopener noreferrer">
          {item[0]}
          <div className={linkClass} ></div>
        </Link>
      ))}
    </section>
  );
}

export default Portfolio;
