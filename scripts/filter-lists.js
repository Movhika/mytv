const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../src/channels/lists.json');

function main() {
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (e) {
    console.error('Konnte lists.json nicht lesen:', e && e.message ? e.message : e);
    process.exit(1);
  }

  let arr;
  try {
    arr = JSON.parse(raw);
  } catch (e) {
    console.error('lists.json ist kein gültiges JSON:', e && e.message ? e.message : e);
    process.exit(1);
  }

  if (!Array.isArray(arr)) {
    console.error('lists.json ist kein Array.');
    process.exit(1);
  }

  const keep = arr.filter(
    (e) => e && (e.country === 'Germany' || e.country === 'United Kingdom')
  );

  console.log('Vorher:', arr.length, 'Einträge');
  console.log('Nachher:', keep.length, 'Einträge');

  try {
    fs.writeFileSync(file, JSON.stringify(keep, null, 2), 'utf8');
    console.log('Gefilterte Liste geschrieben nach', file);
  } catch (e) {
    console.error('Konnte lists.json nicht schreiben:', e && e.message ? e.message : e);
    process.exit(1);
  }
}

main();

