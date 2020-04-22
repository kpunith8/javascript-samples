const albums = [
  {
    year: 1992,
    title: 'Holy Mountain'
  },
  {
    year: 1999,
    title: 'Jerusalem'
  },
  {
    year: 2014,
    title: 'The Clarity'
  },
  {
    year: 2018,
    title: 'The Sciences'
  },
];

export default function service() {
  return Promise.resolve(albums)
}