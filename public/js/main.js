var voorkeursPartij;

function setExample() {
  var exampleText = ['Per onderwerp krijgt u drie stellingen te zien. Per stelling kunt u vervolgens aangeven hoe belangrijk u die stelling vindt.',
                     'U kunt de volgorde van de stellingen achteraf nog aanpassen door ze te verschuiven in de lijst die verschijnt.'];
  var exampleImage = ['dist/images/scherm_example_2.svg', 'dist/images/scherm_example_3.svg'];
  var placeholderText = document.getElementById('uitleg_text');
  var placeholderImage = document.getElementById('uitleg_image');

  if(placeholderImage.src === 'https://in60seconds.herokuapp.com/dist/images/scherm_example_1.svg') {
    placeholderText.innerHTML = exampleText[0];
    placeholderImage.src = exampleImage[0];
  } else {
    placeholderText.innerHTML = exampleText[1];
    placeholderImage.src = exampleImage[1];
    document.getElementById('example_btn').style.display = 'none';
    document.getElementById('example_btn_start').style.display = 'initial';
  }
}

function stapOneScreen() {
  document.getElementById('stap-1a').style.display = 'none';
  document.getElementById('stap-1b').style.display = 'block';
}

function stapTwo2Screen() {
  document.getElementById('stap-2a').style.display = 'none';
  document.getElementById('stap-2a2').style.display = 'block';
}


function stapTwoScreen() {
  document.getElementById('stap-2a2').style.display = 'none';
  document.getElementById('stap-2b').style.display = 'block';
}

function stapThree2Screen() {
  document.getElementById('stap-3a2').style.display = 'none';
  document.getElementById('stap-3b').style.display = 'block';
}


function stapThree3Screen() {
  document.getElementById('stap-3b').style.display = 'none';
  document.getElementById('list_two').style.display = 'block';
}

function stapThreeScreen() {
  document.getElementById('transport_introductie').style.display = 'none';
  document.getElementById('stap-3a2').style.display = 'block';
}

function stapFour2Screen() {
  document.getElementById('stap-4a2').style.display = 'none';
  document.getElementById('stap-4b').style.display = 'block';
}


function stapFour3Screen() {
  document.getElementById('stap-4b').style.display = 'none';
  document.getElementById('list_three').style.display = 'block';
}

function stapFourScreen() {
  document.getElementById('natuur_introductie').style.display = 'none';
  document.getElementById('stap-4a2').style.display = 'block';
}

function setVoorkeurPartij(partij) {
  voorkeursPartij = partij;
  localStorage.setItem('voorkeursPartij', partij);
  window.location = "/start/stap-2";
}
