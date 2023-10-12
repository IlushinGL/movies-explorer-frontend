import { Link } from 'react-router-dom';
import './Footer.css';

function Footer({num}) {
  const base         = 'footer';
  const  footerClass = `${base} ${base}_pos${num}`;
  const titleClass   = `${base}-title ${base}-title_pos${num}`;
  const infoClass    = `${base}-info ${base}-info_pos${num}`;
  const cprClass     = `${base}-info-copyright ${base}-info-copyright_pos${num}`;
  const linksClass   = `${base}-info-links ${base}-info-links_pos${num}`;
  const itemClass    = `${base}-info-links__item ${base}-info-links__item_pos${num}`;
  return (
    <footer className={footerClass}>
      <h2 className={titleClass}>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className={infoClass}>
        <h3 className={cprClass}>2020</h3>
        <nav className={linksClass}>
          <Link
            className={itemClass}
            to={'https://practicum.yandex.ru'}
            target="_blank"
            rel="noopener noreferrer">
            Яндекс.Практикум
          </Link>
          <Link
            className={itemClass}
            to={'https://github.com'}
            target="_blank"
            rel="noopener noreferrer">
            Github
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
