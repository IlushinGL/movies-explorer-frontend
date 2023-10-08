import { Link } from 'react-router-dom';
import me_img from '../../../images/me.jpg';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

function AboutMe({num}) {
  const base             = 'about-me';
  const aboutClass       = `${base} ${base}_pos${num}`;
  const titleClass       = `${base}-title ${base}-title_pos${num}`;
  const blockClass       = `${base}-brief ${base}-brief_pos${num}`;
  const briefClass       = `${base}-brief-text ${base}-brief-text_pos${num}`;
  const briefTltClass    = `${base}-brief-text__title ${base}-brief-text__title_pos${num}`;
  const briefSubTltClass = `${base}-brief-text__subtitle ${base}-brief-text__subtitle_pos${num}`;
  const briefInfoClass   = `${base}-brief-text__info ${base}-brief-text__info_pos${num}`;
  const briefOtherClass  = `${base}-brief-text__other ${base}-brief-text__other_pos${num}`;
  const briefImgClass    = `${base}-brief-img ${base}-brief-img_pos${num}`;
  return (
    <section id="about-me-project" className={aboutClass}>
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
            to={'https://github.com'}
            target="_blank"
            rel="noopener noreferrer">
            Github
          </Link>
        </div>
        <img className={briefImgClass} src={me_img} alt="фото" />
      </div>
      <Portfolio num={num} />
    </section>
  );
}

export default AboutMe;
