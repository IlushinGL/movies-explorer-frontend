import './NavTab.css';

function NavTab({num}) {
  const navClass = 'nav-tab';
  const linkClass = `nav-tab__link nav-tab__link_pos_${num}`;
  return (
    <nav className={navClass}>
      <a className={linkClass} href="#about-project">О проекте</a>
      <a className={linkClass} href="#techs-project">Технологии</a>
      <a className={linkClass} href="#about-project">Студент</a>
    </nav>
  );
}

export default NavTab;
