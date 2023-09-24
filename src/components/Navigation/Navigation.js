import React from 'react';
import './Navigation.css';

function Navigation({mediaNum, isOpened}) {
  const [isMenuOpened, setMenuOpened] = React.useState(isOpened);
  // console.log('Navigation: ', isMenuOpened, isOpened);
  function handleClose() {
    setMenuOpened(!isMenuOpened);
  }

  return (
    <div className={`navigation-popup navigation-popup_${isOpened ? 'opened' : 'closed'}`}>
      <div className='navigation__conteiner'>
        <div
          className='navigation__close redborder'
          onClick={handleClose}>
        </div>
        привет!
      </div>

    </div>

  );
}

export default Navigation;
