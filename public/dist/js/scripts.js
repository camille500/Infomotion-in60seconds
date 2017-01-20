function setExample() {
  var exampleText = ['Per onderwerp krijgt u drie stellingen te zien. Per stelling kunt u vervolgens aangeven hoe belangrijk u die stelling vindt.',
                     'U kunt de volgorde van de stellingen achteraf nog aanpassen door ze te verschuiven in de lijst die verschijnt.'];
  var exampleImage = ['dist/images/scherm_example_2.svg', 'dist/images/scherm_example_3.svg'];
  var placeholderText = document.getElementById('uitleg_text');
  var placeholderImage = document.getElementById('uitleg_image');

  if(placeholderImage.src === 'http://localhost:3000/dist/images/scherm_example_1.svg') {
    placeholderText.innerHTML = exampleText[0];
    placeholderImage.src = exampleImage[0];
  } else {
    placeholderText.innerHTML = exampleText[1];
    placeholderImage.src = exampleImage[1];
    document.getElementById('example_btn').style.display = 'none';
    document.getElementById('example_btn_start').style.display = 'initial';
  }
}

//# sourceMappingURL=scripts.js.map
