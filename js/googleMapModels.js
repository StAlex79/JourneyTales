(function() {
	var displayNames = {
			country: "Страны",
			owners: "Участники",
			type: "Типы мест",
			available: "Доступность",
			years: "Года посещения",
			home: "Места жительства",
			relaxation: "Места отдыха",
			travel: "Места путешествий",
			true: "Доступны",
			false: "Недоступны",
			undefined: "Всегда"
		},
		dataSettings = {
			country: {
				multiple: true
			},
			owners: {
				multiple: true
			},
			type: {
				multiple: true
			},
			years: {
				multiple: true,
				sortDesc: true
			}
		},
		rawDataTitle = ["lat", "lng", "name", "description", "country", "owners", "type", "available", "years"],
		rawData = [
			[49.233728, 28.498905, "Petrov`s House", "Дом Петровых", "Украина", ["Andy Petrov", "Liza Petrova"], "home", true],
			[49.232386, 28.399420, "Voronin`s flat", "Квартира Ворониных", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin"], "home", true],
			[49.231542, 28.394911, "Old Petrov`s Hall", "Квартира Петровых старших", "Украина", ["Igor Petrov", "Valentina Petrova"], "home", true],
			[49.233249, 28.499351, "Old Novikov Hall", "Квартира Новиковых", "Украина", ["Vitaly Novikov", "Nina Novikova"], "home", true],
			[49.017635, 28.680893, "Потуш", "Дача", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin", "Igor Petrov", "Valentina Petrova", "Andy Petrov", "Liza Petrova", "Vitaly Novikov", "Nina Novikova"], "relaxation", true],
			[48.769418, 29.093000, "Степашки", "База отдыха", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin", "Igor Petrov", "Valentina Petrova", "Andy Petrov", "Liza Petrova"], "relaxation", true],
			[48.968191, 28.843511, "Немиров", "Санатори Авангард", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin"], "relaxation", true, [2007]],
			[46.615170, 31.529428, "Очаков", "Черноморский курорт", "Украина", ["Natalia Voronina", "Andy Petrov", "Valentina Petrova"], "relaxation", true, [1983]],
			[48.395115, 27.891782, "Бронницы", "Днестр", "Украина", ["Natalia Voronina", "Igor Petrov", "Valentina Petrova", "Andy Petrov"], "relaxation", true, [1985]],
			[48.764529, 30.227638, "Софиевка", "Дендропарк", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin", "Andy Petrov", "Liza Petrova", "Igor Petrov", "Valentina Petrova"], "travel", true, [2012, 2014]],
			[48.522071, 26.498317, "Хотин", "Неприступная крепость", "Украина", ["Natalia Voronina", "Andy Petrov", "Liza Petrova", "Valentina Petrova"], "travel", true, [2012]],
			[48.296938, 25.924237, "Черновцы", "Буковина", "Украина", ["Natalia Voronina", "Andy Petrov", "Liza Petrova", "Valentina Petrova"], "travel", true, [2012]],
			[48.243925, 25.144123, "Вижница", "Карпаты", "Украина", ["Natalia Voronina", "Andy Petrov", "Liza Petrova", "Valentina Petrova"], "travel", true, [2012]],
			[48.448876, 24.552685, "Яремче", "Столица Карпат", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin", "Andy Petrov", "Liza Petrova", "Igor Petrov", "Valentina Petrova"], "relaxation", true, [1983, 1984, 2004, 2014, 2015, 2016, 2018]],
			[48.358317, 24.407353, "Буковель", "Жемчужина Карпат", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin", "Andy Petrov", "Liza Petrova", "Valentina Petrova"], "relaxation", true, [2014, 2015, 2016, 2018]],
			[50.450308, 30.523768, "Киев", "Столица", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin", "Igor Petrov", "Valentina Petrova", "Andy Petrov", "Liza Petrova"], "travel", true],
			[46.488077, 30.741070, "Одесса", "Жемчужина у моря ", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin", "Valentina Petrova", "Andy Petrov", "Liza Petrova"], "travel", true, [1983, 1988, 2016, 2017]],
			[46.301593, 30.666124, "Черноморск", "Бывший Ильичевск - порт", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin"], "relaxation", true, [2016, 2017]],
			[46.096736, 30.491564, "Затока", "Поселок-курорт", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin"], "relaxation", true, [2013, 2014]],
			[46.626829, 31.191164, "Коблево", "", "Украина", ["Andy Petrov", "Liza Petrova"], "travel", true, [2017]],
			[51.479653, 23.875050, "Шацкие озёра", "Волынь", "Украина", ["Andy Petrov", "Liza Petrova"], "relaxation", true, [2017]],
			[48.431411, 22.687496, "Мукачево", "Замок", "Украина", ["Andy Petrov", "Valentina Petrova"], "travel", true, [1984]],
			[48.618205, 22.265212, "Ужгород", "Сакуры, заккарпатье", "Украина", ["Natalia Voronina"], "travel", true, [2001, 2003]],
			[49.841518, 24.031357, "Львов", "Кофе и архитектура", "Украина", ["Nik Voronin", "Andy Petrov", "Liza Petrova", "Valentina Petrova"], "travel", true, [1984, 2009, 2016, 2018]],
			[49.439627, 32.099106, "Черкасы", "Шевченковские места", "Украина", ["Natalia Voronina"], "travel", true, [2002]],
			[44.961895, 34.082715, "Симферополь", "Столица АРК", "Украина", ["Andy Petrov", "Liza Petrova", "Nina Novikova"], "travel", false, [2005, 2006, 2007, 2008, 2012, 2013]],
			[44.672328, 34.415592, "Алушта", "Южный берег", "Украина", ["Andy Petrov", "Liza Petrova"], "relaxation", false, [2004, 2005, 2006, 2007, 2008]],
			[44.496479, 34.169742, "Ялта", "Столица Южного Берега", "Украина", ["Andy Petrov", "Liza Petrova", "Nina Novikova"], "travel", false, [1988, 2004, 2005, 2006, 2007, 2008, 2012, 2013]],
			[45.032029, 35.380370, "Феодосия", "Айвазовски, Грин", "Украина", ["Natalia Voronina", "Nik Voronin", "Valentina Petrova", "Andy Petrov", "Liza Petrova"], "relaxation", false, [2008, 2013]],
			[44.748909, 33.881647, "Бахчисарай", "Фонтан", "Украина", ["Andy Petrov", "Liza Petrova"], "travel", false, [2005]],
			[44.570926, 34.340641, "Партенит", "", "Украина", ["Andy Petrov", "Liza Petrova", "Nina Novikova"], "travel", false, [2005, 2012]],
			[44.593474, 34.368749, "Утёс", "", "Украина", ["Andy Petrov", "Liza Petrova", "Nina Novikova"], "travel", false, [2007, 2012]],
			[44.541865, 34.281784, "Гурзуф", "Дача Чехова", "Украина", ["Andy Petrov", "Liza Petrova"], "travel", false, [2008]],
			[44.511431, 34.232499, "Никита", "Ботсад", "Украина", ["Andy Petrov", "Liza Petrova", "Nina Novikova"], "travel", false, [2004, 2005, 2006, 2007, 2008, 2012, 2013]],
			[44.517110, 34.202776, "Массандра", "Вино", "Украина", ["Andy Petrov", "Liza Petrova"], "travel", false, [2004]],
			[44.430487, 34.128353, "Ласточкино Гнездо", "", "Украина", ["Andy Petrov", "Liza Petrova"], "travel", false, [2004, 2006]],
			[44.419746, 34.055381, "Алупка", "Воронцовский дворец", "Украина", ["Andy Petrov", "Liza Petrova"], "travel", false, [2004, 2006]],
			[44.616952, 33.522386, "Севастополь", "", "Украина", ["Andy Petrov"], "travel", false, [1988]],
			[44.822940, 34.918412, "Новый Свет", "", "Украина", ["Andy Petrov", "Liza Petrova"], "travel", false, [2007]],
			[44.841855, 34.957937, "Судак", "", "Украина", ["Andy Petrov", "Liza Petrova"], "travel", false, [2007]],
			[44.964396, 35.258643, "Коктебель", "", "Украина", ["Andy Petrov", "Liza Petrova"], "travel", false, [2008]],
			[45.383593, 36.044665, "Новоотрадное", "Казантипский залив", "Украина", ["Sergey Voronin", "Natalia Voronina", "Nik Voronin"], "relaxation", false, [2010]],
			[45.361271, 36.432628, "Керчь", "Озеро Чокрак", "Украина", ["Sergey Voronin"], "travel", false, [2010]],
			[52.083335, 23.658874, "Брест", "Крепость", "Беларусь", ["Andy Petrov", "Valentina Petrova"], "travel", true, [1980, 1987]],
			[53.891944, 27.551477, "Минск", "Беларусь", "Беларусь", ["Natalia Voronina", "Andy Petrov", "Igor Petrov", "Valentina Petrova"], "travel", true, [1977, 1987, 2002]],
			[55.752072, 37.617473, "Москва", "", "Россия", ["Andy Petrov", "Igor Petrov", "Valentina Petrova"], "travel", false, [1978, 1983, 1986, 1988, 1993]],
			[43.566329, 39.742734, "Сочи", "", "Россия", ["Andy Petrov", "Liza Petrova"], "travel", false, [2010]],
			[43.447857, 39.905477, "Адлер", "", "Россия", ["Andy Petrov", "Liza Petrova"], "travel", false, [2010]],
			[43.262754, 40.283740, "Гагра", "", "Грузия", ["Andy Petrov", "Liza Petrova"], "relaxation", false, [2010]],
			[43.155976, 40.349926, "Пицунда", "", "Грузия", ["Andy Petrov", "Liza Petrova"], "travel", false, [2010]],
			[43.090736, 40.809988, "Новый Афон", "", "Грузия", ["Andy Petrov", "Liza Petrova"], "travel", false, [2010]],
			[43.005837, 41.023262, "Сухуми", "", "Грузия", ["Andy Petrov", "Liza Petrova"], "travel", false, [2010]],
			[42.659490, 27.725897, "Несебр", "Остров на полуострове", "Болгария", ["Andy Petrov", "Liza Petrova"], "relaxation", true, [2011]],
			[42.421205, 27.693421, "Созополь", "Полуостров на полуострове", "Болгария", ["Andy Petrov", "Liza Petrova", "Nina Novikova"], "relaxation", true, [2011, 2013]],
			[42.510805, 27.481122, "Бургас", "", "Болгария", ["Andy Petrov", "Liza Petrova", "Nina Novikova"], "travel", true, [2011, 2013]],
			[43.403313, 28.145641, "Балчик", "", "Болгария", ["Andy Petrov", "Liza Petrova"], "travel", true, [2011]],
			[41.045772, 29.034546, "Стамбул", "Между Европой и Азией", "Турция", ["Andy Petrov", "Liza Petrova", "Nina Novikova"], "travel", true, [2013]],
			[56.949056, 24.104752, "Рига", "Рижский дальзам", "Латвия", ["Sergey Voronin", "Natalia Voronina", "Andy Petrov", "Liza Petrova", "Igor Petrov", "Valentina Petrova"], "relaxation", true, [1979, 1980, 1981, 1984, 1986, 1987, 1989, 1990, 2002, 2004, 2005, 2008, 2009]],
			[59.344429, 18.121589, "Стокгольм", "", "Швеция", ["Andy Petrov", "Liza Petrova", "Igor Petrov", "Valentina Petrova"], "travel", true, [2008, 2009]],
			[60.167591, 24.951321, "Хельсинки", "", "Финляндия", ["Andy Petrov", "Liza Petrova"], "travel", true, [2009]],
			[59.437013, 24.745368, "Таллинн", "", "Эстония", ["Andy Petrov", "Liza Petrova"], "travel", true, [2009]],
			[51.113106, 17.039478, "Вроцлав", "", "Польша", ["Nina Novikova"], "travel", true, [2018]]
		];
	this.GoogleMapModels = function(isInit) {
		this.init = function() {
			this._createCollection();
		};
		this._createCollection = function() {
			this.collection = rawData.reduce(function(memo, elem) {
				memo.push(elem.reduce(function(m, el, i) {
					m[rawDataTitle[i]] = el;
					return m;
				}, {}));
				return memo;
			}, []);
		};
		this.getCollection = function(filter) {
			if (filter) {
				return this.collection.filter(typeof filter === "function" ? filter.bind(this) : function(elem) {
					for (var key in filter) {
						var list = filter[key],
							elemValue = elem[key];
						if (elemValue instanceof Array) {
							if (!elemValue.some(function(el) {
								return list.indexOf(String(el)) >= 0;
							})) {
								return false;
							}
						} else if (list.indexOf(String(elemValue)) === -1) {
							return false;
						}
					}
					return true;
				});
			}
			return this.collection;
		};
		this.getAttributesValues = function() {
			function push(arr, el) {
				if (arr.indexOf(el) === -1) {
					arr.push(el);
				}
			}
			var args = Array.prototype.slice.apply(arguments),
				res = this.collection.reduce(function(memo, model) {
					args.forEach(function(attr) {
						var value = model[attr],
							arr =  memo[attr] || [];
						if (value instanceof Array) {
							value.forEach(function(el) {
								push(arr, el);
							});
						} else {
							push(arr, value);
						}
						memo[attr] = arr;
					});
					return memo;
				}, {});
			for (var key in res) {
				res[key].sort();
				if (key in dataSettings && dataSettings[key].sortDesc) {
					res[key].reverse();
				}
			}
			return res;
		};
		this.getDisplayName = function(value) {
			return displayNames[value] || value;
		};
		this.getDataSetting = function(path) {
			var attrs = path.split(/\./);
			return attrs.reduce(function(memo, attr) {
				var level = memo ? memo[attr] : null;
				return level ? level : null;
			}, dataSettings);
		};
		for (key in this) {
			var attribute = this[key];
			if (this.hasOwnProperty(attribute) && typeof attribute === 'function') {
				this[key] = attribute.bind(this);
			}
		}
		if (isInit) {
			this.init();
		}
	};
})();
