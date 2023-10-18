// Функция для тестирования интерфейса
// УДАЛИТЬ после разработки API
const movieLink = [
  'https://unsplash.com/photos/2Q-0jpg18Lo/download?ixid=M3wxMjA3fDB8MXx0b3BpY3x8NnNNVmpUTFNrZVF8fHx8fDJ8fDE2OTUzMjA0Mjh8&force=true',
  'https://unsplash.com/photos/VwmwHFvNjOY/download?ixid=M3wxMjA3fDB8MXx0b3BpY3x8NnNNVmpUTFNrZVF8fHx8fDJ8fDE2OTUzMjA0Mjh8&force=true',
  'https://unsplash.com/photos/XkFj1DHPx1o/download?ixid=M3wxMjA3fDB8MXx0b3BpY3x8NnNNVmpUTFNrZVF8fHx8fDJ8fDE2OTUzMjMwOTJ8&force=true',
  'https://unsplash.com/photos/N20xTKBuKoM/download?ixid=M3wxMjA3fDB8MXx0b3BpY3x8NnNNVmpUTFNrZVF8fHx8fDJ8fDE2OTUzMjM4MDR8&force=true',
  'https://unsplash.com/photos/3h-mPFqlS70/download?ixid=M3wxMjA3fDB8MXx0b3BpY3x8eEh4WVRNSExnT2N8fHx8fDJ8fDE2OTUzMjQwMzh8&force=true',
  'https://unsplash.com/photos/04CjpSDvy3A/download?ixid=M3wxMjA3fDB8MXx0b3BpY3x8eEh4WVRNSExnT2N8fHx8fDJ8fDE2OTUzMjQwNTl8&force=true',
];
const dir = [
  'Михалков',
  'Лукас',
  'Меньшов',
  'Камерон',
  'Тарантино',
];
const about = [
  'про любовь',
  'о героях',
  'с нереальным сюжетом',
  'о жизни человека в целом',
];

function getMovie(id) {
  const res = {
    drector: dir[Math.floor(Math.random() * 5)],
    duration: 15 + Math.floor(Math.random() * 165),
    image: movieLink[Math.floor(Math.random() * 6)],
    id: id,
    nameRU: (1 + Math.floor(Math.random() * 99)) + '\'й фильм ' + about[Math.floor(Math.random() * 4)],
  }
  return res;
}

export default function getMoveSet(num) {
  const res = [];
  for (let i = 0; i < num; i++) {
    res.push(getMovie(i));
  }
  return res;
}
