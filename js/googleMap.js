(function() {
	var cache = {
		googleMapModels: new GoogleMapModels(true),
		googleMapScriptElement: document.getElementById("googleMap"),
		googleMapWrapperElement: document.getElementById("map"),
		markerInfoContentTemplate: utils.template(utils.getTemplateHTML("markerInfo"))
	};
	function initCache() {
		cache.allFilters = cache.googleMapModels.getAttributesValues("available", "country", "type", "owners", "years");
		cache.collection = cache.googleMapModels.getCollection();
	}
	function initDOM() {
		var refinementPanelTemplate = utils.template(utils.getTemplateHTML("refinementPanel"), cache.allFilters);
		utils.insertElement(refinementPanelTemplate(cache.googleMapModels), "refinement");
		cache.selectElems = document.querySelectorAll(".refinement-wrapper select");
	}
	function initEvents() {
		utils.eventOn("load", cache.googleMapScriptElement, initGoogleMap);
		utils.eventOn("click", ".js-clear", function() {
			var selectedOptions = this.parentElement.querySelector("select").selectedOptions;
			while (selectedOptions.length) {
				selectedOptions[0].selected = false;
			}
		});
		utils.eventOn("click", ".js-filter", function() {
			var request = {};
			cache.selectElems.forEach(function(selectElem) {
				if (selectElem.value) {
					var options = selectElem.selectedOptions,
						values = [];
					for (var i = 0, len = options.length; i<len; i++) {
						values.push(options[i].value);
					}
					request[selectElem.name] = values;
				}
				
			});
			setMarkersVisible(cache.collection, false);
			setMarkersVisible(cache.googleMapModels.getCollection(request), true);
		});
	}
	function initGoogleMap() {
		var map = new google.maps.Map(cache.googleMapWrapperElement, {
				center: {lat: 49.232863, lng: 28.485632},
				zoom: 9
			}),
			typeColors = ['blue', 'yellow', 'maroon'],
			typeColorAccordance = cache.allFilters["type"].reduce(function(memo, elem, index) {
				memo[elem] = typeColors[index];
				return memo;
			}, {});
		markers = cache.collection.map(function(el) {
			var marker = new google.maps.Marker({
					position: {
						lat: el.lat,
						lng: el.lng
					},
					title: el.name,
					icon: {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 10,
						fillOpacity: 1,
						strokeOpacity: 0.8,
						fillColor: el.available ? 'green' : 'red',
						strokeColor: typeColorAccordance[el.type]
					},
					map: map}),
				infowindow = new google.maps.InfoWindow({
				  content: cache.markerInfoContentTemplate(el)
				});
			marker.addListener("click", function() {
				infowindow.open(map, this);
			});
			el.marker = marker;
			return marker;
		});
	}
	function setMarkersVisible(markers, value) {
		markers.forEach(function(marker) {
			marker.marker.setVisible(!!value);
		});
	}
	if (cache.googleMapScriptElement && cache.googleMapWrapperElement) {
		initCache();
		initDOM();
		initEvents();
	}
})();
