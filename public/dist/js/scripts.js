var vijftigplus = [['1.2', '1.3', '1.4', '1.1'],
                  ['2.1','2.3','2.2','2.4'],
                  ['3.3','3.4','3.1','3.2'],
                  ['1','2','3']];

var cda = [['1.3', '1.1', '1.4', '1.2'],
          ['2.3','2.2','2.1','2.4'],
          ['3.3','3.4','3.2','3.1'],
          ['1','2','3']];

var cu = [['1.4', '1.3', '1.2', '1.1'],
         ['2.3','2.2','2.1','2.4'],
         ['3.3','3.4','3.1','3.2'],
         ['2','3','1']];

var d66 = [['1.3', '1.2', '1.4', '1.1'],
          ['2.3','2.2','2.1','2.4'],
          ['3.3','3.4','3.2','3.1'],
          ['1','2','3']];

var denk = [['1.3', '1.2', '1.4', '1.1'],
           ['2.4','2.3','2.1','2.2'],
           ['3.1','3.3','3.2','3.4'],
           ['1','2','3']];

var geenpeil = [['1.1', '1.2', '1.3', '1.4'],
               ['2.1','2.2','2.3','2.4'],
               ['3.1','3.2','3.3','3.4'],
               ['3','2','1']];

var groenlinks = [['1.4', '1.2', '1.3', '1.1'],
                 ['2.3','2.2','2.1','2.4'],
                 ['3.2','3.4','3.3','3.1'],
                 ['1','2','3']];

var piratenpartij = [['1.4', '1.3', '1.2', '1.1'],
                    ['2.4','2.3','2.1','2.2'],
                    ['3.2','3.4','3.1','3.3'],
                    ['1','2','3']];

var pvda = [['1.4', '1.1', '1.3', '1.2'],
           ['2.3','2.4','2.1','2.2'],
           ['3.3','3.4','3.2','3.1'],
           ['2','3','1']];

var pvdd = [['1.1', '1.3', '1.4', '1.2'],
           ['2.4','2.3','2.1','2.2'],
           ['3.2','3.4','3.1','3.3'],
           ['3','1','2']];

var pvv = [['1.4', '1.3', '1.2', '1.1'],
          ['2.2','2.1','2.4','2.3'],
          ['3.1','3.4','3.3','3.2'],
          ['3','1','2']];

var sgp = [['1.2', '1.4', '1.3', '1.1'],
          ['2.3','2.4','2.2','2.1'],
          ['3.4','3.3','3.1','3.2'],
          ['1','3','2']];

var sp = [['1.3', '1.1', '1.4', '1.2'],
         ['2.4','2.1','2.2','2.3'],
         ['3.4','3.3','3.1','3.2'],
         ['1','3','2']];

var vnl = [['1.2', '1.3', '1.4', '1.1'],
          ['2.2','2.1','2.4','2.3'],
          ['3.4','3.1','3.3','3.2'],
          ['2','3','1']];

var vvd = [['1.4', '1.2', '1.3', '1.1'],
          ['2.1','2.3','2.2','2.4'],
          ['3.3','3.1','3.2','3.4'],
          ['1','2','3']];

(function($) {
	var defaultOptions = {
		makeClone: false, // Drag a clone of the source, and not the actual source element
		sourceClass: null, // Class to apply to source element when dragging a clone of the source element
		sourceHide: false, // Specify with true that the source element should hade visibility:hidden while dragging a clone
		dragClass: null, // Class to apply to the element that is dragged
		canDropClass: null, // Class to apply to the dragged element when dropping is possible
		dropClass: null,
		isActive: true,
		container: null, // if set, dragging is limited to this container

		// Default is to allow all elements to be dragged
		canDrag: function($src, event) {
			return $src;
		},

		// Default is to allow dropping inside elements with css stylesheet "drop"
		canDrop: function($dst) {
			return $dst.hasClass("drop") || $dst.parents(".drop").size() > 0;
		},

		// Default is to move the element in the DOM and insert it into the element where it is dropped
		didDrop: function($src, $dst) {
			$src.appendTo($dst);
		}
	};

	// Status during a drag-and-drop operation. Only one such operation can be in progress at any given time.
	var $sourceElement = null; // Element that user wanted to drag
	var $activeElement = null; // Element that is shown moving around during drag operation
	var $destElement = null; // Element currently highlighted as possible drop destination
	var dragOffsetX, dragOffsetY; // Position difference from drag-point to active elements left top corner
	var limits;

	// Private helper methods

	function cancelDestElement(options) {
		if ($destElement != null) {
			if (options.dropClass)
				$destElement.removeClass(options.dropClass);
			$destElement = null;
		}
		if ($activeElement != null) {
			if (options.canDropClass) {
				$activeElement.removeClass(options.canDropClass);
			}
		}
	}

	// Public methods

	var methods = {
		init: function(options) {
			options = $.extend({}, defaultOptions, options);
			this.data("options", options);
			this.bind("mousedown.dragdrop touchstart.dragdrop", methods.onStart);

			return this;
		},

		destroy: function() {
			this.unbind("mousedown.dragdrop touchstart.dragdrop");
			return this;
		},
		on: function() {
			this.data("options").isActive = true;
		},
		off: function() {
			this.data("options").isActive = false;
		},

		onStart: function(event) {
			var $me = $(this);
			var options = $me.data("options");
			if (!options.isActive)
				return;

			var $element = options.canDrag($me, event);
			if ($element) {
				$sourceElement = $element;
				var offset = $sourceElement.offset();
				var width = $sourceElement.width();
				var height = $sourceElement.height();
				if (event.type == "touchstart") {
					dragOffsetX = event.originalEvent.touches[0].clientX - offset.left;
					dragOffsetY = event.originalEvent.touches[0].clientY - offset.top;
				} else {
					dragOffsetX = event.pageX - offset.left;
					dragOffsetY = event.pageY - offset.top;
				}

				if (options.makeClone) {
					$activeElement = $sourceElement.clone(false);

					// Elements that are cloned and dragged around are added to the parent in order
					// to get any cascading styles applied.
					$activeElement.appendTo($element.parent());
					if (options.sourceClass)
						$sourceElement.addClass(options.sourceClass);
					else if (options.sourceHide)
						$sourceElement.css("visibility", "hidden");
				} else {
					$activeElement = $sourceElement;
				}

				$activeElement.css({
					position: "absolute",
					left: offset.left,
					top: offset.top,
					width: width,
					height: height
				});
				if (options.dragClass)
					$activeElement.addClass(options.dragClass);

				var $c = options.container;
				if ($c) {
					var offset = $c.offset();
					limits = {
						minX: offset.left,
						minY: offset.top,
						maxX: offset.left + $c.outerWidth() - $element.outerWidth(),
						maxY: offset.top + $c.outerHeight() - $element.outerHeight()
					};
				}

				$(window)
					.bind("mousemove.dragdrop touchmove.dragdrop", {
						source: $me
					}, methods.onMove)
					.bind("mouseup.dragdrop touchend.dragdrop", {
						source: $me
					}, methods.onEnd);

				event.stopPropagation();
				return false;
			}
		},

		onMove: function(event) {
			if (!$activeElement)
				return;

			var $me = event.data.source;
			var options = $me.data("options");
			var posX, posY;
			if (event.type == "touchmove") {
				posX = event.originalEvent.touches[0].clientX;
				posY = event.originalEvent.touches[0].clientY;
			} else {
				posX = event.pageX;
				posY = event.pageY;
			}
			$activeElement.css("display", "none");
			var destElement = document.elementFromPoint(
				posX - document.documentElement.scrollLeft - document.body.scrollLeft,
				posY - document.documentElement.scrollTop - document.body.scrollTop
			);
			$activeElement.css("display", "");
			posX -= dragOffsetX;
			posY -= dragOffsetY;
			if (limits) {
				posX = Math.min(Math.max(posX, limits.minX), limits.maxX);
				posY = Math.min(Math.max(posY, limits.minY), limits.maxY);
			}
			$activeElement.css({
				left: posX,
				top: posY
			});

			if (destElement) {
				if ($destElement == null || $destElement.get(0) != destElement) {
					var $possibleDestElement = $(destElement);
					if (options.canDrop($possibleDestElement)) {
						if (options.dropClass) {
							if ($destElement != null)
								$destElement.removeClass(options.dropClass);
							$possibleDestElement.addClass(options.dropClass);
						}
						if (options.canDropClass) {
							$activeElement.addClass(options.canDropClass);
						}
						$destElement = $possibleDestElement;
					} else if ($destElement != null) {
						cancelDestElement(options);
					}
				}
			} else if ($destElement != null) {
				cancelDestElement(options);
			}

			event.stopPropagation();
			return false;
		},

		onEnd: function(event) {
			if (!$activeElement)
				return;

			var $me = event.data.source;
			var options = $me.data("options");
			if ($destElement) {
				options.didDrop($sourceElement, $destElement);
			}
			cancelDestElement(options);

			if (options.makeClone) {
				$activeElement.remove();
				if (options.sourceClass)
					$sourceElement.removeClass(options.sourceClass);
				else if (options.sourceHide)
					$sourceElement.css("visibility", "visible");
			} else {
				$activeElement.css("position", "static");
				$activeElement.css("width", "");
				$activeElement.css("height", "");
				if (options.dragClass)
					$activeElement.removeClass(options.dragClass);
			}

			$(window).unbind("mousemove.dragdrop touchmove.dragdrop");
			$(window).unbind("mouseup.dragdrop touchend.dragdrop");
			$sourceElement = $activeElement = limits = null;
		}
	};

	$.fn.dragdrop = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.dragdrop');
		}
	};
})(jQuery);

var currentOrder_energy = ['1.1', '1.2', '1.3', '1.4'];

$(function() {
	var $srcElement;
	var srcIndex, dstIndex;

	$("#energy_items>li").dragdrop({
		makeClone: true,
		sourceHide: true,
		dragClass: "active_list-item_energy",
		canDrag: function($src, event) {
			$srcElement = $src;
			srcIndex = $srcElement.index();
			dstIndex = srcIndex;
			return $src;
		},
		canDrop: function($dst) {
			if ($dst.is("li")) {
				dstIndex = $dst.index();
				if (srcIndex < dstIndex)
					$srcElement.insertAfter($dst);
				else
					$srcElement.insertBefore($dst);
			}
			return true;
		},
		didDrop: function($src, $dst) {

			if (srcIndex != dstIndex) {
				var value = currentOrder_energy[srcIndex];
				currentOrder_energy.splice(srcIndex, 1);
				currentOrder_energy.splice(dstIndex, 0, value);
        localStorage.setItem('energie_stellingen', currentOrder_energy);
			}
		}
	});
});

var currentOrder_transport = ['2.1', '2.2', '2.3', '2.4'];

$(function() {
	var $srcElement;
	var srcIndex, dstIndex;

	$("#transport_items>li").dragdrop({
		makeClone: true,
		sourceHide: true,
		dragClass: "active_list-item_transport",
		canDrag: function($src, event) {
			$srcElement = $src;
			srcIndex = $srcElement.index();
			dstIndex = srcIndex;
			return $src;
		},
		canDrop: function($dst) {
			if ($dst.is("li")) {
				dstIndex = $dst.index();
				if (srcIndex < dstIndex)
					$srcElement.insertAfter($dst);
				else
					$srcElement.insertBefore($dst);
			}
			return true;
		},
		didDrop: function($src, $dst) {

			if (srcIndex != dstIndex) {
				var value = currentOrder_transport[srcIndex];
				currentOrder_transport.splice(srcIndex, 1);
				currentOrder_transport.splice(dstIndex, 0, value);
        localStorage.setItem('transport_stellingen', currentOrder_transport);
			}
		}
	});
});

var currentOrder_nature = ['3.1', '3.2', '3.3', '3.4'];

$(function() {
	var $srcElement;
	var srcIndex, dstIndex;

	$("#nature_items>li").dragdrop({
		makeClone: true,
		sourceHide: true,
		dragClass: "active_list-item_nature",
		canDrag: function($src, event) {
			$srcElement = $src;
			srcIndex = $srcElement.index();
			dstIndex = srcIndex;
			return $src;
		},
		canDrop: function($dst) {
			if ($dst.is("li")) {
				dstIndex = $dst.index();
				if (srcIndex < dstIndex)
					$srcElement.insertAfter($dst);
				else
					$srcElement.insertBefore($dst);
			}
			return true;
		},
		didDrop: function($src, $dst) {

			if (srcIndex != dstIndex) {
				var value = currentOrder_nature[srcIndex];
				currentOrder_nature.splice(srcIndex, 1);
				currentOrder_nature.splice(dstIndex, 0, value);
        localStorage.setItem('natuur_stellingen', currentOrder_nature);
			}
		}
	});
});

var currentOrder_categories = ['1', '2', '3'];

$(function() {
	var $srcElement;
	var srcIndex, dstIndex;

	$("#categories_items>li").dragdrop({
		makeClone: true,
		sourceHide: true,
		dragClass: "active_list-item_categories",
		canDrag: function($src, event) {
			$srcElement = $src;
			srcIndex = $srcElement.index();
			dstIndex = srcIndex;
			return $src;
		},
		canDrop: function($dst) {
			if ($dst.is("li")) {
				dstIndex = $dst.index();
				if (srcIndex < dstIndex)
					$srcElement.insertAfter($dst);
				else
					$srcElement.insertBefore($dst);
			}
			return true;
		},
		didDrop: function($src, $dst) {

			if (srcIndex != dstIndex) {
				var value = currentOrder_categories[srcIndex];
				currentOrder_categories.splice(srcIndex, 1);
				currentOrder_categories.splice(dstIndex, 0, value);
        localStorage.setItem('categorie_indeling', currentOrder_categories);
			}
		}
	});
});

var userData = [
	[localStorage.getItem('energie_stellingen').split(',')],
	[localStorage.getItem('transport_stellingen').split(',')],
	[localStorage.getItem('natuur_stellingen').split(',')],
	[localStorage.getItem('categorie_indeling').split(',')]
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

function stapTwoScreen() {
  document.getElementById('stap-2a').style.display = 'none';
  document.getElementById('voorkeursPartij').innerHTML = localStorage.getItem('voorkeursPartij');
  document.getElementById('stap-2b').style.display = 'block';
}

function stapThreeScreen() {
  document.getElementById('transport_introductie').style.display = 'none';
  document.getElementById('list_two').style.display = 'block';
}

function setVoorkeurPartij(partij) {
  voorkeursPartij = partij;
  localStorage.setItem('voorkeursPartij', partij);
  window.location = "/start/stap-2";
}

//# sourceMappingURL=scripts.js.map
