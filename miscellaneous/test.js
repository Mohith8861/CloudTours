const fs = require('fs');
let places = [
  'andaman',
  'assam',
  'bali',
  'bhutan',
  'cambodia',
  'darjeeling',
  'dubai',
  'egypt',
  'gangtok',
  'goa',
  'greece',
  'gujarat',
  'gulmarg',
  'himachal-pradesh',
  'italy',
  'jammu and kashmir',
  'japan',
  'karnataka',
  'maldives',
];
let A = [];
for (let i of places) {
  console.log(i);
  const S = JSON.parse(fs.readFileSync(`tours data/${i}.json`));
  for (let o of S) {
    A.push(o.meta);
  }
}
fs.writeFileSync('all.json', JSON.stringify(A));
