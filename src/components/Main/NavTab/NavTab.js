import './NavTab.css';

function NavTab({num}) {
  const navClass  = 'nav-tab';
  const linkClass = `${navClass}__link ${navClass}__link_pos_${num}`;
  return (
    <nav className={navClass}>
      <a className={linkClass} href="#about-project">О проекте</a>
      <a className={linkClass} href="#techs-project">Технологии</a>
      <a className={linkClass} href="#about-me-project">Студент</a>
    </nav>
  );
}

export default NavTab;
