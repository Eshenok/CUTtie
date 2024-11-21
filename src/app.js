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

const parent = document.getElementById('cuttie-parent');
const resultElement = document.getElementById('cuttie-result');

let cuttie;

const handleUploadImage = (e) => {
  e.preventDefault();
  console.log(e.dataTransfer);
  const url = e.dataTransfer ? URL.createObjectURL(Array.from(e.dataTransfer.files)[0]) : URL.createObjectURL(e.target.files[0]);
  if (!url) return;

  cuttie = new Cuttie();
  const ar = viewportAr.value ? viewportAr.value.split('/') : null;
  const options = {
    bounds: {
      width: isAuto.checked && boundsWidth.value,
      height: isAuto.checked && boundsHeight.value
    },
    viewport: {
      width: viewportWidth.value,
      height: viewportHeight.value,
      isChanged: viewportChanged.checked,
      'aspect-ratio': ar ? Number(ar[0])/Number(ar[1]) : undefined
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

  saveBtnFile.addEventListener('click', () => {
    const imaga = cuttie.getCrop();
    const a = document.createElement('a');
    a.href = imaga;
    a.download = 'cuttie.png';
    parent.appendChild(a);
    a.click();
    parent.removeChild(a);
  })
}

uploadImgContainer.addEventListener("dragenter", function(e) {
  e.preventDefault();
  uploadImgContainer.style.cursor = 'move';
})

uploadImgContainer.addEventListener("dragover", function(e) {
  e.preventDefault();
  uploadImgContainer.style.cursor = 'move';
});

uploadImgContainer.addEventListener("dragleave", function(e) {
  e.preventDefault();
  uploadImgContainer.style.cursor = 'auto';
});

uploadImgContainer.addEventListener("drop", handleUploadImage);

uploadImg.addEventListener('change', handleUploadImage);