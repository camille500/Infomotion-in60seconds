var userData = [[localStorage.getItem('energie_stellingen').split(',')],
               [localStorage.getItem('transport_stellingen').split(',')],
               [localStorage.getItem('natuur_stellingen').split(',')],
               ['1','2','3']];

var partijenLijst = ['50Plus', 'CDA', 'CU', 'D66', 'DENK', 'GeenPeil', 'Groenlinks', 'Piratenpartij', 'PvdA', 'PvDD', 'PVV', 'SGP', 'SP', 'VNL', 'VVD'];
var partijenData = [vijftigplus, cda, cu, d66, denk, geenpeil, groenlinks, piratenpartij, pvda, pvdd, pvv, sgp, sp, vnl, vvd];
var partijenScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function getScore() {
  partijenData.forEach(function(d,i) {
    if(JSON.stringify(partijenData[i][0]) == JSON.stringify(userData[0][0])) {
      partijenScore[i] += 120;
    } else {
      if(JSON.stringify(partijenData[i][0][0]) == JSON.stringify(userData[0][0][0])) {
        partijenScore[i] += 40;
      }
      if(JSON.stringify(partijenData[i][0][1]) == JSON.stringify(userData[0][0][1])) {
        partijenScore[i] += 30;
      }
      if(JSON.stringify(partijenData[i][0][2]) == JSON.stringify(userData[0][0][2])) {
        partijenScore[i] += 20;
      }
      if(JSON.stringify(partijenData[i][0][3]) == JSON.stringify(userData[0][0][3])) {
        partijenScore[i] += 10;
      }
    }
    if(JSON.stringify(partijenData[i][1]) == JSON.stringify(userData[1][0])) {
      partijenScore[i] += 120;
    } else {
      if(JSON.stringify(partijenData[i][1][0]) == JSON.stringify(userData[1][0][0])) {
        partijenScore[i] += 40;
      }
      if(JSON.stringify(partijenData[i][1][1]) == JSON.stringify(userData[1][0][1])) {
        partijenScore[i] += 30;
      }
      if(JSON.stringify(partijenData[i][1][2]) == JSON.stringify(userData[1][0][2])) {
        partijenScore[i] += 20;
      }
      if(JSON.stringify(partijenData[i][1][3]) == JSON.stringify(userData[1][0][3])) {
        partijenScore[i] += 10;
      }
    }
    if(JSON.stringify(partijenData[i][2]) == JSON.stringify(userData[2][0])) {
      partijenScore[i] += 120;
    } else {
      if(JSON.stringify(partijenData[i][2][0]) == JSON.stringify(userData[2][0][0])) {
        partijenScore[i] += 40;
      }
      if(JSON.stringify(partijenData[i][2][1]) == JSON.stringify(userData[2][0][1])) {
        partijenScore[i] += 30;
      }
      if(JSON.stringify(partijenData[i][2][2]) == JSON.stringify(userData[2][0][2])) {
        partijenScore[i] += 20;
      }
      if(JSON.stringify(partijenData[i][2][3]) == JSON.stringify(userData[2][0][3])) {
        partijenScore[i] += 10;
      }
    }
    if(JSON.stringify(partijenData[i][3]) == JSON.stringify(userData[3][0])) {
      partijenScore[i] += 120;
    } else {
      if(JSON.stringify(partijenData[i][3][0]) == JSON.stringify(userData[3][0][0])) {
        partijenScore[i] += 60;
      }
      if(JSON.stringify(partijenData[i][3][1]) == JSON.stringify(userData[3][0][1])) {
        partijenScore[i] += 50;
      }
      if(JSON.stringify(partijenData[i][3][2]) == JSON.stringify(userData[3][0][2])) {
        partijenScore[i] += 30;
      }
    }
  });
  var numberOne = indexOfMax(partijenScore);
   function indexOfMax(partijenScore) {
    if (partijenScore.length === 0) {
        return -1;
    }

    var max = partijenScore[0];
    var maxIndex = 0;

    for (var i = 1; i < partijenScore.length; i++) {
        if (partijenScore[i] > max) {
            maxIndex = i;
            max = partijenScore[i];
        }
    }

    return maxIndex;
}

console.log(partijenLijst[numberOne]);
localStorage.setItem('partijenLijst', partijenLijst);
localStorage.setItem('partijenScore', partijenScore);
localStorage.setItem('partij1', partijenLijst[numberOne]);
window.location = ('/result/');
}

var voorkeurText = document.getElementById('voorkeurText');
var partij1Text = document.getElementById('partij1Text');
var scoreElement = document.getElementById('scoreElement');

if(voorkeurText && partij1Text) {
  var localPartijenLijst = localStorage.getItem('partijenLijst').split(',');
  var localPartijenScore = localStorage.getItem('partijenScore').split(',');
  console.log(localPartijenScore);
  voorkeurText.innerHTML = localStorage.getItem('voorkeursPartij');
  partij1Text.innerHTML = localStorage.getItem('partij1');
  partijenScore.forEach(function(partij,i) {
    console.log(i);
    var scoreText = localPartijenLijst[i] + ": " + localPartijenScore[i];
    var breakElement = document.createElement("br");
    var scoreTextNode = document.createTextNode(scoreText);
    scoreElement.appendChild(scoreTextNode);
    scoreElement.appendChild(breakElement);
  });
}

//getScore();
