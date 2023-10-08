import './NavTab.css';

function NavTab({num}) {
  const base  = 'nav-tab';
  const navClass  = `${base} ${base}_pos${num}`;
  const linkClass = `${base}__link ${base}__link_pos${num}`;
  return (
    <nav className={navClass}>
      <a className={linkClass} href="#about-project">О проекте</a>
      <a className={linkClass} href="#techs-project">Технологии</a>
      <a className={linkClass} href="#about-me-project">Студент</a>
    </nav>
  );
}

export default NavTab;
