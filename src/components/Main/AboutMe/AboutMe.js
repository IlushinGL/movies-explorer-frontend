import { Link } from 'react-router-dom';
import me_img from '../../../images/me.jpg';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

function AboutMe({num}) {
  const base             = 'about-me';
  const aboutClass       = `${base}`;
  const titleClass       = `${base}__title ${base}__title_pos_${num}`;
  const blockClass       = `${base}-brief ${base}-brief_pos_${num}`;
  const briefClass       = `${base}-brief__text ${base}-brief__text_pos_${num}`;
  const briefTltClass    = `${base}-brief-text__title ${base}-brief-text__title_pos_${num}`;
  const briefSubTltClass = `${base}-brief-text__subtitle ${base}-brief-text__subtitle_pos_${num}`;
  const briefInfoClass   = `${base}-brief-text__info ${base}-brief-text__info_pos_${num}`;
  const briefOtherClass  = `${base}-brief-text__other ${base}-brief-text__other_pos_${num}`;
  const briefImgClass    = `${base}-brief__img ${base}-brief__img_pos_${num}`;
  return (
    <article id="about-me-project" className={aboutClass}>
      <h1 className={titleClass}>Студент</h1>
      <div className={blockClass}>
        <div className={briefClass}>
          <h2 className={briefTltClass}>Львович</h2>
          <h3 className={briefSubTltClass}>
            Агностик, 40 лет минимум
          </h3>
          <p className={briefInfoClass}>
            Я родился и живу в Мордатове, закончил факультет вероведения МорГУ.
            С начала работал в «НИИ ЧАВО». У меня есть то что есть.
            Я люблю то что люблю, а ещё увлекаюсь умклайдетами.
            Начинал кодить на МИР-1. После курса по веб-разработке,
            единственным применением себя считаю фриланс.
          </p>
          <Link
            className={briefOtherClass}
            to={'https://github.com/IlushinGL'}
            target="_blank"
            rel="noopener noreferrer">
            Github
          </Link>
          {/* <div className={briefOtherClass}>Github</div> */}

        </div>
        <img className={briefImgClass} src={me_img} alt="Львович" />
      </div>
      <Portfolio num={num} />
    </article>
  );
}

export default AboutMe;
