import './styles.css';
import Cuttie from 'cuttie';

const isAuto = document.getElementById('b-check');
const boundsWidth = document.getElementById('b-w');
const boundsHeight = document.getElementById('b-h');

const viewportWidth = document.getElementById('v-w');
const viewportHeight = document.getElementById('v-h');
const viewportChanged = document.getElementById('v-check');
const viewportAr = document.getElementById('v-ar');

const uploadImgContainer = document.getElementById('dnd');
const uploadImg = document.getElementById('dnd__ch');

const saveBtnSelf = document.getElementById('savefirst');
const saveBtnFile = document.getElementById('savefile');
const saveBtnFIleResult = document.getElementById('savefileResult');
const loadFileBtn = document.getElementById('loadfile');

const parent = document.getElementById('cuttie-parent');
const resultElement = document.getElementById('cuttie-result');

//layout
const harrow = document.getElementById('h_arr');
const resultContainer = document.getElementById('result');
const closeBtn = document.getElementById('close-result');
const overlayResult = document.getElementById('overlay-result');

let cuttie;
cuttie = new Cuttie();

function arToNumber(stringAr) {
  const ar = stringAr.split('/');
  if (ar.length !== 2) return null;
  const r = Number(ar[0])/Number(ar[1]);
  return Boolean(r) ? r : null;
}

const handleUploadImage = (e) => {
  e.preventDefault();
  const url = e.dataTransfer ? URL.createObjectURL(Array.from(e.dataTransfer.files)[0]) : URL.createObjectURL(e.target.files[0]);
  if (!url) return;

  
  const ar = viewportAr.value ? arToNumber(viewportAr.value) : null;
  const options = {
    bounds: {
      width: isAuto.checked ? undefined : boundsWidth.value,
      height: isAuto.checked ? undefined : boundsHeight.value
    },
    viewport: {
      width: Number(viewportWidth.value),
      height: Number(viewportHeight.value),
      isChanged: viewportChanged.checked,
      'aspect-ratio': ar ? ar : undefined
    },
    background: {
      parentImage: true
    }
  };

  cuttie.initCanvas(
    parent, 
    options,
    url
  );

  const bounds = cuttie.getCurrentBounds();
  boundsWidth.value = bounds.width;
  boundsHeight.value = bounds.height; 

  setTimeout(() => {
    const viewportPos = cuttie.getPosition();
    viewportWidth.value = viewportPos.width;
    viewportHeight.value = viewportPos.height;
  }, 100)


  saveBtnSelf.addEventListener('click', () => {
    resultContainer.classList.add('crop-window_open');
    const imaga = cuttie.getCrop();
    resultElement.src = imaga;
    resultElement.style.backgroundColor = '#fff';
  })

  saveBtnFile.addEventListener('click', () => {
    const imaga = cuttie.getCrop();
    const a = document.createElement('a');
    a.href = imaga;
    a.download = 'cuttie.png';
    parent.appendChild(a);
    a.click();
    parent.removeChild(a);
  })

  saveBtnFIleResult.addEventListener('click', () => {
    const imaga = cuttie.getCrop();
    const a = document.createElement('a');
    a.href = imaga;
    a.download = 'cuttie.png';
    parent.appendChild(a);
    a.click();
    parent.removeChild(a);
  })

  viewportWidth.addEventListener('change', (e) => {
    cuttie.updatePosition(0,0,e.target.value,0)
  })

  viewportHeight.addEventListener('change', (e) => {
    cuttie.updatePosition(0,0,0,e.target.value);
  })

  viewportAr.addEventListener('change', (e) => {
    console.log(arToNumber(e.target.value));
    cuttie.updateAr(arToNumber(e.target.value))
  })
}

uploadImgContainer.addEventListener("dragenter", function(e) {
  e.preventDefault();
  uploadImgContainer.style.cursor = 'pointer';
})

uploadImgContainer.addEventListener("dragover", function(e) {
  e.preventDefault();
  uploadImgContainer.style.cursor = 'pointer';
});

uploadImgContainer.addEventListener("dragleave", function(e) {
  e.preventDefault();
  uploadImgContainer.style.cursor = 'pointer';
});

uploadImgContainer.addEventListener("drop", handleUploadImage);

uploadImgContainer.addEventListener("click", () => {
  dnd__ch.click();
})

uploadImg.addEventListener('change', handleUploadImage);

loadFileBtn.addEventListener('click', () => {
  dnd__ch.click();
});

harrow.addEventListener('click', () => {
  harrow.classList.toggle('header__burger_open');
})

closeBtn.addEventListener('click', () => {
  resultContainer.classList.remove('crop-window_open');
})

overlayResult.addEventListener('click', () => {
  resultContainer.classList.remove('crop-window_open');
})