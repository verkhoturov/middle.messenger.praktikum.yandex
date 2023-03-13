import { sum } from './modules/sum';

const root = document.querySelector('#root');
if(root) root.textContent = sum(6, -1, 2).toString(); 