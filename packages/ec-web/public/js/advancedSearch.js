
window.onload = function() {
  if(document.getElementById("yearInput"))
    updateYearInput()
}

// Filter general 
function updateYearInput(val) {
    document.getElementById('yearInput').innerHTML="Year: " + val; 
}

function updatePriceInput(val) {
  var list = ['4M', '5M', '6M', '7M', '8M', '9M'];
  var priceRange = document.getElementById("priceRange");
  priceInput = document.getElementById('priceInput');
  for (let i = 0; i <= priceRange.max; i++) {
    if (i == priceRange.value)
      priceInput.innerHTML="Price: " + list[i]; 
  } 
}
 
// =============================

// Filter Body
function updateHeightInput(val) {
  var list = [90, 100, 110, 120, 130, 140, 150, 160, 170, 180];
  var heightRange = document.getElementById("heightRange");
  heightInput = document.getElementById('heightInput');
  for (let i = 0; i <= heightRange.max; i++) {
    if (i == heightRange.value)
      heightInput.innerHTML="Height: " + list[i] + 'mm'; 
  } 
}

function updateWidthInput(val) {
  var list = [40, 45, 50, 60, 65, 70, 75, 80];
  var widthRange = document.getElementById("widthRange");
  widthInput = document.getElementById('widthInput');
  for (let i = 0; i <= widthRange.max; i++) {
    if (i == widthRange.value)
      widthInput.innerHTML="Width: " + list[i] + 'mm'; 
  } 
}

function updateThicknessInput(val) {
  var list = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  var thicknessRange = document.getElementById("thicknessRange");
  thicknessInput = document.getElementById('thicknessInput');
  for (let i = 0; i <= thicknessRange.max; i++) {
    if (i == thicknessRange.value)
      thicknessInput.innerHTML="Thickness: " + list[i] + 'mm'; 
  } 
}

function updateWeightInput(val) {
  var list = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  var weightRange = document.getElementById("weightRange");
  weightInput = document.getElementById('weightInput');
  for (let i = 0; i <= weightRange.max; i++) {
    if (i == weightRange.value)
      weightInput.innerHTML="Weight: " + list[i] + 'mm'; 
  } 
}

// =============================

// Filter Platform
function updateFreqInput(val) {
  var list = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var freqRange = document.getElementById("freqRange");
  freqInput = document.getElementById('freqInput');
  for (let i = 0; i <= freqRange.max; i++) {
    if (i == freqRange.value)
      freqInput.innerHTML="CPU freq: " + list[i] + '00MHz'; 
  } 
}

function updateCoreInput(val) {
  var list = [1, 2, 4, 6, 8];
  var coreRange = document.getElementById("coreRange");
  coreInput = document.getElementById('coreInput');
  for (let i = 0; i <= coreRange.max; i++) {
    if (i == coreRange.value)
      coreInput.innerHTML="CPU cores: " + list[i]; 
  } 
}

// =============================

// Filter Memory
function updateRamInput(val) {
  var list = [2, 3, 4, 6, 8, 10, 12, 16];
  var ramRange = document.getElementById("ramRange");
  ramInput = document.getElementById('ramInput');
  for (let i = 0; i <= ramRange.max; i++) {
    if (i == ramRange.value)
      ramInput.innerHTML="Ram: " + list[i] + 'GB'; 
  } 
}

function updateStorageInput(val) {
  var list = ['64MB', '128MB', '256MB', '512MB', '1GB', '2GB', '4GB', '8GB', '16GB', '32GB', '64GB', '128GB', '256GB', '512GB'];
  var storageRange = document.getElementById("storageRange");
  storageInput = document.getElementById('storageInput');
  for (let i = 0; i <= storageRange.max; i++) {
    if (i == storageRange.value)
      storageInput.innerHTML="Storage: " + list[i]; 
  } 
}

// =============================

// Filter Memory
function updateDResolutionInput(val) {
  var list = ['QVGA(240x320)', 'WQVGA(240x400)', 'HVGA(320X480)', 'WVGA(480x800)', 'qHD(540x960)', 'HD(720x1280)', 'FHD(1080x1920)', 'QHD(1440x2560)', '4K(1644x3840)'];
  var dResolutionRange = document.getElementById("dResolutionRange");
  dResolutionInput = document.getElementById('dResolutionInput');
  for (let i = 0; i <= dResolutionRange.max; i++) {
    if (i == dResolutionRange.value)
      dResolutionInput.innerHTML="Resolution: " + list[i]; 
  } 
}

function updateSizeInput(val) {
  var list = [3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.6, 5.7, 5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7.0, 7.1, 7.2];
  var sizeRange = document.getElementById("sizeRange");
  sizeInput = document.getElementById('sizeInput');
  for (let i = 0; i <= sizeRange.max; i++) {
    if (i == sizeRange.value)
      sizeInput.innerHTML="Size: " + list[i] + '"'; 
  } 
}

function updateDensityInput(val) {
  var list = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55];
  var densityRange = document.getElementById("densityRange");
  densityInput = document.getElementById('densityInput');
  for (let i = 0; i <= densityRange.max; i++) {
    if (i == densityRange.value)
      densityInput.innerHTML="Density: " + list[i] + '0ppi'; 
  } 
}

// =============================

// Filter Main Camera
function updateMCamResolutionInput(val) {
  var list = ['No', '1MP', '5MP', '10MP', '12MP', '16MP', '20MP', '30MP', '40MP', '48MP', '60MP', '64MP', '108MP'];
  var mCamResolutionRange = document.getElementById("mCamResolutionRange");
  mCamResolutionInput = document.getElementById('mCamResolutionInput');
  for (let i = 0; i <= mCamResolutionRange.max; i++) {
    if (i == mCamResolutionRange.value)
      mCamResolutionInput.innerHTML="Resolution: " + list[i]; 
  } 
}

function updateFNumInput(val) {
  var list = [1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7];
  var fNumRange = document.getElementById("fNumRange");
  fNumInput = document.getElementById('fNumInput');
  for (let i = 0; i <= fNumRange.max; i++) {
    if (i == fNumRange.value)
      fNumInput.innerHTML="F-Number: " + list[i]; 
  } 
}

function updateVideoInput(val) {
  var list = ['QVGA', 'VGA', '720p', '1080p', '4K', '8K'];
  var videoRange = document.getElementById("videoRange");
  videoInput = document.getElementById('videoInput');
  for (let i = 0; i <= videoRange.max; i++) {
    if (i == videoRange.value)
      videoInput.innerHTML="Video: " + list[i]; 
  } 
}

// =============================

// Filter Selfie Camera
function updateSCamResolutionInput(val) {
  var list = ['No', '1MP', '5MP', '10MP', '12MP', '16MP', '24MP', '32MP', '48MP'];
  var sCamResolutionRange = document.getElementById("sCamResolutionRange");
  sCamResolutionInput = document.getElementById('sCamResolutionInput');
  for (let i = 0; i <= sCamResolutionRange.max; i++) {
    if (i == sCamResolutionRange.value)
      sCamResolutionInput.innerHTML="Resolution: " + list[i]; 
  } 
}

// =============================

// Filter Battery
function updateCapacityInput(val) {
  var list = [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70];
  var capacityRange = document.getElementById("capacityRange");
  capacityInput = document.getElementById('capacityInput');
  for (let i = 0; i <= capacityRange.max; i++) {
    if (i == capacityRange.value)
      capacityInput.innerHTML="Capacity: " + list[i] + '00mAh'; 
  } 
}
 
function updateChargeSpeedInput(val) {
  var list = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  var chargeSpeedRange = document.getElementById("chargeSpeedRange");
  chargeSpeedInput = document.getElementById('chargeSpeedInput');
  for (let i = 0; i <= chargeSpeedRange.max; i++) {
    if (i == chargeSpeedRange.value)
      chargeSpeedInput.innerHTML="Charging speed: " + list[i] + 'W'; 
  } 
}