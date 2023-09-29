import './Footer.css';

function Footer({num}) {
  const base         = 'footer';
  const  footerClass = `${base} ${base}_pos_${num}`;
  const titleClass   = `${base}__title ${base}__title_pos_${num}`;
  const infoClass    = `${base}__info ${base}__info_pos_${num}`;
  const cprClass     = `${base}__copyright ${base}__copyright_pos_${num}`;
  const linksClass   = `${base}__links-set ${base}__links-set_pos_${num}`;
  const itemClass    = `${base}__link-item ${base}__link-item_pos_${num}`;
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
