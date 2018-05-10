function getCarTypes(cars, type) {
  var carSpecReducer = function(result, car) {
    result[car[type]] = undefined;
    return result;
  };
  var types = Object.keys(cars.reduce(carSpecReducer, {}));

  return types.map(function(t) {
    return { option: t };
  });
}

function filterCarsBy(cars, make, model, year, price) {
  var filteredCars = cars;

  if (make !== 'All') filteredCars = cars.filter(car => car.make === make);
  if (model !== 'All') filteredCars = cars.filter(car => car.model === model);
  if (year !== 'All') filteredCars = cars.filter(car => car.year === year);
  if (price !== 'All') filteredCars = cars.filter(car => car.price === price);

  return filteredCars;
}

var cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000},
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corrolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

var makes = getCarTypes(cars, 'make');
var models = getCarTypes(cars, 'model');
var years = getCarTypes(cars, 'year');
var prices = getCarTypes(cars, 'price');

var filterOptionsScript = $('script[data-id="filter-options"]').html();
var filterOptionsTemplate = Handlebars.compile(filterOptionsScript);
var makeFilterOptionsHtml = filterOptionsTemplate({ options: makes });
var modelsFilterOptionsHtml = filterOptionsTemplate({ options: models });
var yearsFilterOptionsHtml = filterOptionsTemplate({ options: years });
var pricesFilterOptionsHtml = filterOptionsTemplate({ options: prices });

var carInfoScript = $('script[data-id="car-info"]').html();
var carInfoTemplate = Handlebars.compile(carInfoScript);
var carsInfoHtml = carInfoTemplate({ cars: cars });

$('select[name="make"]').html(makeFilterOptionsHtml);
$('select[name="model"]').html(modelsFilterOptionsHtml);
$('select[name="year"]').html(yearsFilterOptionsHtml);
$('select[name="price"]').html(pricesFilterOptionsHtml);
$('#results ul').html(carsInfoHtml);

$('form').on('submit', function(e) {
  e.preventDefault();
  var $form = $('form');
  var filterParams = $form.serializeArray();
  var make = filterParams.find(param => param.name === 'make').value;
  var model = filterParams.find(param => param.name === 'model').value;
  var year = filterParams.find(param => param.name === 'year').value;
  var price = filterParams.find(param => param.name === 'price').value;
  var filteredCars = filterCarsBy(cars, make, model, year, price);
  var filteredCarsHtml = carInfoTemplate({ cars: filteredCars });

  $('#results ul').html(filteredCarsHtml);
});
