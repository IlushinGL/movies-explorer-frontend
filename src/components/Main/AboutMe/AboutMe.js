import me_img from '../../../images/me.jpg';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

function AboutMe({num}) {
  const base             = 'about-me';
  const aboutClass       = `${base} ${base}_pos_${num}`;
  const titleClass       = `${base}__title ${base}__title_pos_${num}`;
  const blockClass       = `${base}__brief-block ${base}__brief-block_pos_${num}`;
  const briefClass       = `${base}__brief ${base}__brief_pos_${num}`;
  const briefTltClass    = `${base}__brief-title ${base}__brief-title_pos_${num}`;
  const briefSubTltClass = `${base}__brief-subtitle ${base}__brief-subtitle_pos_${num}`;
  const briefInfoClass   = `${base}__brief-info ${base}__brief-info_pos_${num}`;
  const briefImgClass    = `${base}__brief-img ${base}__brief-img_pos_${num}`;
  return (
    <section id="about-me-project" className={aboutClass}>
      <div className={titleClass}>Студент</div>
      <div className={blockClass}>
        <div className={briefClass}>
          <div className={briefTltClass}>Львович</div>
          <div className={briefSubTltClass}>
            Агностик, 40 лет минимум
          </div>
          <div className={briefInfoClass}>
            Я родился и живу в Мордатове, закончил факультет вероведения МорГУ.
            С начала работал в «НИИ ЧАВО». У меня есть то что есть.
            Я люблю то что люблю, а ещё увлекаюсь умклайдетами.
            Недавно начал шкодить. До того, как пройду курс по веб-разработке,
            фриланс-заказами не занимаюсь и иду сам по себе.
          </div>
          <div className="about-me__brief-other">Github</div>

        </div>
        <img className={briefImgClass} src={me_img} alt="Львович" />
      </div>
      <Portfolio num={num} />
    </section>
  );
}

export default AboutMe;
