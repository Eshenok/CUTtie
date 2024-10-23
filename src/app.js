import Cuttie from "./index.js";
import './styles.css';

const resultSelf = document.getElementById('resultSelf');
const demoSelf = document.getElementById('demoSelf')
const saveBtnSelf = document.getElementById('saveSelf');
const saveBtnSelfPC = document.getElementById('saveSelfPC');
const uploadSelf = document.getElementById('uploadSelf');

let cuttie;
uploadSelf.addEventListener('change', (e) => {
  const url = URL.createObjectURL(e.target.files[0]);
  cuttie = new Cuttie()
  cuttie.initCanvas(
    demoSelf, 
    {
      bounds: {
        width: 650,
        height: 365
      },
      viewport: {
        type: 'square',
        width: 200,
        height: 200,
        isChanged: true,
        // 'aspect-ratio': 16/9, 
      }
    },
    url
  )
});

saveBtnSelf.addEventListener('click', () => {
  const imaga = cuttie.getCrop();
  resultSelf.src = imaga;
})