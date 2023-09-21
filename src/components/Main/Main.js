import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main({mediaNum}) {
  return (
    <>
      <Promo num={mediaNum} />
      <NavTab num={mediaNum} />
      <AboutProject num={mediaNum} />
      <Techs num={mediaNum} />
      <AboutMe num={mediaNum} />
      <Footer num={mediaNum} />
    </>

  );
}

export default Main;