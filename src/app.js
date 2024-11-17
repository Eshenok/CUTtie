import './styles.css';
import Cuttie from './index';

const form = document.getElementById('form');
const isAuto = document.getElementById('b-check');
const boundsWidth = document.getElementById('b-w');
const boundsHeight = document.getElementById('b-h');

const viewportWidth = document.getElementById('v-w');
const viewportHeight = document.getElementById('v-h');
const viewportChanged = document.getElementById('v-check');
const viewportAr = document.getElementById('v-ar');

const uploadImgContainer = document.getElementById('dnd__label-ch');
const uploadImg = document.getElementById('dnd__ch');

const saveBtnSelf = document.getElementById('savefirst');
const saveBtnFile = document.getElementById('savefile');

const parent = document.getElementById('cuttie-parent');
const resultElement = document.getElementById('cuttie-result');

let cuttie;

const handleUploadImage = (e) => {
  const url = URL.createObjectURL(e.target.files[0]);
  if (!url) return;

  cuttie = new Cuttie();
  const options = {
    bounds: {
      width: isAuto && boundsWidth.value,
      height: isAuto && boundsHeight.value
    },
    viewport: {
      width: viewportWidth.value,
      height: viewportHeight.value,
      isChanged: viewportChanged.value,
      'aspect-ratio': viewportAr.value
    },
    background: {
      parentImage: true
    }
  };

  cuttie.initCanvas(
    parent, 
    options,
    url
  )

  saveBtnSelf.addEventListener('click', () => {
    const imaga = cuttie.getCrop();
    resultElement.src = imaga;
    resultElement.style.backgroundColor = '#fff';
  })
}


uploadImg.addEventListener('change', handleUploadImage);