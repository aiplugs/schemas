var fs = require('fs');

var today = (function(){
  var d = new Date();
  var yyyy = d.getUTCFullYear();
  var MM = d.getUTCMonth() + 1;
  var dd = d.getUTCDate();
  return `${yyyy}-${MM}-${dd}`;
}());

const load = (path) => JSON.parse(fs.readFileSync(path));
const save = (path, body) => fs.writeFileSync(`./dist/${path}`, JSON.stringify(body, null, 4));

const CMS_ROOT = 'cms/root.json';
const CMS_SETTINGS = 'cms/settings.json';

if (!fs.existsSync('./dist'))
  fs.mkdirSync('./dist');

if (!fs.existsSync('./dist/cms'))
  fs.mkdirSync('./dist/cms');

(function padding_today_to_root_json(path){
  const schema = load(path);
  schema.id = `http://schemas.aiplugs.com/cms/${today}/root.json#`;
  save(path, schema);
}(CMS_ROOT));

(function set_today_root_json_to_settings_json(path){
  const schema = load(path);
  schema['$schema'] = `http://schemas.aiplugs.com/cms/${today}/root.json#`;
  schema.id = `http://schemas.aiplugs.com/cms/${today}/settings.json#`;  
  save(path, schema);
}(CMS_SETTINGS));

