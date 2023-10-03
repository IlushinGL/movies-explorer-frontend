import './Footer.css';

function Footer({num}) {
  const base         = 'footer';
  const  footerClass = `${base} ${base}_pos_${num}`;
  const titleClass   = `${base}__title ${base}__title_pos_${num}`;
  const infoClass    = `${base}-info ${base}-info_pos_${num}`;
  const cprClass     = `${base}-info__copyright ${base}-info__copyright_pos_${num}`;
  const linksClass   = `${base}-info__links ${base}-info__links_pos_${num}`;
  const itemClass    = `${base}-info-links__item ${base}-info-links__item_pos_${num}`;
  return (
    <footer className={footerClass}>
      <h2 className={titleClass}>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className={infoClass}>
        <h3 className={cprClass}>2020</h3>
        <div className={linksClass}>
          <h3 className={itemClass}>Яндекс.Практикум</h3>
          <h3 className={itemClass}>Github</h3>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
