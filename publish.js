var fs = require('fs');

var today = (function(){
  var d = new Date();
  var yyyy = d.getUTCFullYear();
  var MM = d.getUTCMonth() + 1;
  var dd = d.getUTCDate();
  return `${yyyy}-${MM}-${dd}`;
}());

const load = (path) => JSON.parse(fs.readFileSync(path));
const save = (path, body) => fs.writeFileSync(path, JSON.stringify(body, null, 4));

if (!fs.existsSync('./dist'))
  fs.mkdirSync('./dist');

if (!fs.existsSync('./dist/cms'))
  fs.mkdirSync('./dist/cms');

if (!fs.existsSync(`./dist/cms/${today}`))
  fs.mkdirSync(`./dist/cms/${today}`);

(function padding_today_to_root_json(){
  const schema = load('cms/root.json');
  schema.id = `http://schemas.aiplugs.com/cms/${today}/root.json#`;
  save(`dist/cms/${today}/root.json`, schema);
}());

(function set_today_root_json_to_settings_json(){
  const schema = load('cms/settings.json');
  schema['$schema'] = `http://schemas.aiplugs.com/cms/${today}/root.json#`;
  schema.id = `http://schemas.aiplugs.com/cms/${today}/settings.json#`;  
  save(`dist/cms/${today}/settings.json`, schema);
}());

