import 'core-js/actual';
import 'regenerator-runtime/runtime';

// Automatically import all JS files in controllers
const controllers = import.meta.glob('./controllers/*.js');
Object.values(controllers).forEach(importController => importController());

// Automatically import all JS files in models
const models = import.meta.glob('./models/*.js');
Object.values(models).forEach(importModel => importModel());

// Automatically import all JS files in views
const views = import.meta.glob('./views/*.js');
Object.values(views).forEach(importView => importView());

// Automatically import all JS files in helper
const helpers = import.meta.glob('./helper/*.js');
Object.values(helpers).forEach(importHelper => importHelper());

// Automatically import all JS files in config
const configs = import.meta.glob('./config/*.js');
Object.values(configs).forEach(importConfig => importConfig());

// This will dynamically import and include all the files within these directories
