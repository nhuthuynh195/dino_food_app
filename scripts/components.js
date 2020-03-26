const fs = require('fs');

const imageFileNames = () => {
  const array = fs
    .readdirSync('src/components')
    .filter(file => {
      return file !== 'index.js' && file !== 'package.json';
    })
    .map(file => {
      return file.replace('.js', '');
    });
  return Array.from(new Set(array));
};
const generate = () => {
  console.log('imageFileNames()', imageFileNames());
  let properties = imageFileNames()
    .map(name => {
      return `import ${name} from './${name}';`;
    })
    .join('\n');
  let properties2 = imageFileNames()
    .map(name => {
      return `${name}`;
    })
    .join(',\n\t');
  fs.writeFileSync(
    'src/components/index.js',
    properties + `\n\nmodule.exports = { \n\t${properties2} \n}`,
    'utf8',
  );
};

generate();
