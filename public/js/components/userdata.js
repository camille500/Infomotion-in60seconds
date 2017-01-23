var userData = [
	[localStorage.getItem('energie_stellingen').split(',')],
	[localStorage.getItem('transport_stellingen').split(',')],
	[localStorage.getItem('natuur_stellingen').split(',')],
	['1', '2', '3']
];

var checkIfEmpty = localStorage.getItem('natuur_stellingen');

var partijenLijst = ['50PLUS', 'CDA', 'CU', 'D66', 'DENK', 'GEENPEIL', 'GROENLINKS', 'PIRATENPARTIJ', 'PVDA', 'PVDD', 'PVV', 'SGP', 'SP', 'VNL', 'VVD'];
var partijenData = [vijftigplus, cda, cu, d66, denk, geenpeil, groenlinks, piratenpartij, pvda, pvdd, pvv, sgp, sp, vnl, vvd];
var partijenScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var partijenScore2 = partijenScore;

function getScore() {
	if (!checkIfEmpty) {
		location.reload();
	} else {
		partijenData.forEach(function(d, i) {
			if (JSON.stringify(partijenData[i][0]) == JSON.stringify(userData[0][0])) {
				partijenScore[i] += 120;
			} else {
				if (JSON.stringify(partijenData[i][0][0]) == JSON.stringify(userData[0][0][0])) {
					partijenScore[i] += 40;
				}
				if (JSON.stringify(partijenData[i][0][1]) == JSON.stringify(userData[0][0][1])) {
					partijenScore[i] += 30;
				}
				if (JSON.stringify(partijenData[i][0][2]) == JSON.stringify(userData[0][0][2])) {
					partijenScore[i] += 20;
				}
				if (JSON.stringify(partijenData[i][0][3]) == JSON.stringify(userData[0][0][3])) {
					partijenScore[i] += 10;
				}
			}
			if (JSON.stringify(partijenData[i][1]) == JSON.stringify(userData[1][0])) {
				partijenScore[i] += 120;
			} else {
				if (JSON.stringify(partijenData[i][1][0]) == JSON.stringify(userData[1][0][0])) {
					partijenScore[i] += 40;
				}
				if (JSON.stringify(partijenData[i][1][1]) == JSON.stringify(userData[1][0][1])) {
					partijenScore[i] += 30;
				}
				if (JSON.stringify(partijenData[i][1][2]) == JSON.stringify(userData[1][0][2])) {
					partijenScore[i] += 20;
				}
				if (JSON.stringify(partijenData[i][1][3]) == JSON.stringify(userData[1][0][3])) {
					partijenScore[i] += 10;
				}
			}
			if (JSON.stringify(partijenData[i][2]) == JSON.stringify(userData[2][0])) {
				partijenScore[i] += 120;
			} else {
				if (JSON.stringify(partijenData[i][2][0]) == JSON.stringify(userData[2][0][0])) {
					partijenScore[i] += 40;
				}
				if (JSON.stringify(partijenData[i][2][1]) == JSON.stringify(userData[2][0][1])) {
					partijenScore[i] += 30;
				}
				if (JSON.stringify(partijenData[i][2][2]) == JSON.stringify(userData[2][0][2])) {
					partijenScore[i] += 20;
				}
				if (JSON.stringify(partijenData[i][2][3]) == JSON.stringify(userData[2][0][3])) {
					partijenScore[i] += 10;
				}
			}
			if (JSON.stringify(partijenData[i][3]) == JSON.stringify(userData[3][0])) {
				partijenScore[i] += 120;
			} else {
				if (JSON.stringify(partijenData[i][3][0]) == JSON.stringify(userData[3][0][0])) {
					partijenScore[i] += 60;
				}
				if (JSON.stringify(partijenData[i][3][1]) == JSON.stringify(userData[3][0][1])) {
					partijenScore[i] += 50;
				}
				if (JSON.stringify(partijenData[i][3][2]) == JSON.stringify(userData[3][0][2])) {
					partijenScore[i] += 30;
				}
			}
		});
		localStorage.setItem('partijenScore', partijenScore);
		var numberOne = indexOfMax(partijenScore2);
		var numberTwo = indexOfMax(partijenScore2);
		var numberThree = indexOfMax(partijenScore2);
    var voorkeurIndex = partijenLijst.indexOf(localStorage.getItem('voorkeursPartij'));
    console.log(voorkeurIndex);

		function indexOfMax(partijenScore2) {
			if (partijenScore2.length === 0) {
				return -1;
			}

			var max = partijenScore2[0];
			var maxIndex = 0;

			for (var i = 1; i < partijenScore2.length; i++) {
				if (partijenScore2[i] > max) {
					maxIndex = i;
					max = partijenScore2[i];
					delete partijenScore2[i];
				}
			}

			return maxIndex;
		}

		localStorage.setItem('partijenLijst', partijenLijst);
		localStorage.setItem('partijenScore2', partijenScore2);
		var localPartijenScore = localStorage.getItem('partijenScore').split(',');
		var percentageOne = Math.floor(localPartijenScore[numberOne] / 360 * 100) + "%";
		var percentageTwo = Math.floor(localPartijenScore[numberTwo] / 360 * 100) + "%";
		var percentageThree = Math.floor(localPartijenScore[numberThree] / 360 * 100) + "%";
    var percentageVoorkeur = Math.floor(localPartijenScore[voorkeurIndex] / 360 * 100) + "%";
		localStorage.setItem('partij1Score', percentageOne);
		localStorage.setItem('partij2Score', percentageTwo);
		localStorage.setItem('partij3Score', percentageThree);
    localStorage.setItem('voorkeurScore', percentageVoorkeur);
		localStorage.setItem('partij1', partijenLijst[numberOne]);
		localStorage.setItem('partij2', partijenLijst[numberTwo]);
		localStorage.setItem('partij3', partijenLijst[numberThree]);
    localStorage.setItem('partijVoorkeur', voorkeursPartij);
		window.location = ('/result/');
	}
}

var partij1Text = document.getElementById('partij1Text');
var partij2Text = document.getElementById('partij2Text');
var partij3Text = document.getElementById('partij3Text');
var partijVoorkeurText = document.getElementById('partijVoorkeurText');
var partij1Percentage = document.getElementById('partij1Percentage');
var partij2Percentage = document.getElementById('partij2Percentage');
var partij3Percentage = document.getElementById('partij3Percentage');
var partijVoorkeurPercentage = document.getElementById('partijVoorkeurPercentage');
var scoreElement = document.getElementById('scoreElement');

if (partijVoorkeurText && partij1Text) {
	var localPartijenLijst = localStorage.getItem('partijenLijst').split(',');
	var localPartijenScore = localStorage.getItem('partijenScore').split(',');
	partij1Text.innerHTML = '<img width="100" src="../dist/images/partijen/' + localStorage.getItem('partij1').toLowerCase() + '.png" />';
	partij2Text.innerHTML = '<img width="100" src="../dist/images/partijen/' + localStorage.getItem('partij2').toLowerCase() + '.png" />';
	partij3Text.innerHTML = '<img width="100" src="../dist/images/partijen/' + localStorage.getItem('partij3').toLowerCase() + '.png" />';
  partijVoorkeurText.innerHTML = '<img width="100" src="../dist/images/partijen/' + localStorage.getItem('voorkeursPartij').toLowerCase() + '.png" />';
	partij1Percentage.innerHTML = localStorage.getItem('partij1Score');
	partij2Percentage.innerHTML = localStorage.getItem('partij2Score');
	partij3Percentage.innerHTML = localStorage.getItem('partij3Score');
  partijVoorkeurPercentage.innerHTML = localStorage.getItem('voorkeurScore');
}



// partijenScore.forEach(function(partij,i) {
//   console.log(i);
//   var scoreText = localPartijenLijst[i] + ": " + localPartijenScore[i];
//   var breakElement = document.createElement("br");
//   var scoreTextNode = document.createTextNode(scoreText);
//   scoreElement.appendChild(scoreTextNode);
//   scoreElement.appendChild(breakElement);
// });
