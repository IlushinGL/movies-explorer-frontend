import { Link } from 'react-router-dom';
import './Portfolio.css';
import { PORTFOLIO_DATA } from '../../../utils/constants';

function Portfolio({num}) {
  const base       = 'portfolio';
  const baseClass  = `${base} ${base}_pos_${num}`;
  const titleClass = `${base}__title ${base}__title_pos_${num}`;
  const itemClass  = `${base}__item ${base}__item_pos_${num}`;
  const linkClass  = `${base}__item-link ${base}__item-link_pos_${num}`;
  return (
    <section className={baseClass}>
      <h2 className={titleClass}>
        Портфолио
      </h2>
      {PORTFOLIO_DATA.map((item, id) => (
        <h3 className={itemClass} key={'pft' + id}>
        {item[0]}
        <Link
          key={'pfi' + id}
          className={linkClass}
          to={item[1]}
          target="_blank"
          rel="noopener noreferrer">
        </Link>
      </h3>
      ))}
    </section>
  );
}

export default Portfolio;
