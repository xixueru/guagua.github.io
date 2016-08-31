import './less/index.less';
import generateText from './sub';
let app  = document.createElement('div');
const myPromise = Promise.resolve(42);
app.innerHTML = '<h1>Hello World it</h1>';
document.body.appendChild(app);
app.appendChild(generateText());