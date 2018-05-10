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

function getCarFilterOptions(cars) {
  return {
    makes: getCarTypes(cars, 'make'),
    models: getCarTypes(cars, 'model'),
    years: getCarTypes(cars, 'year'),
    prices: getCarTypes(cars, 'price'),
  }
}

function getCarFilterOptionsHtml(carFilterOptions) {
  return {
    makes: filterOptionsTemplate({ options: carFilterOptions.makes }),
    models: filterOptionsTemplate({ options: carFilterOptions.models }),
    years: filterOptionsTemplate({ options: carFilterOptions.years }),
    prices: filterOptionsTemplate({ options: carFilterOptions.prices }),
  }
}

function getFilteredCars(cars, filterParams) {
  var make = filterParams.find(param => param.name === 'make').value;
  var model = filterParams.find(param => param.name === 'model').value;
  var year = filterParams.find(param => param.name === 'year').value;
  var price = filterParams.find(param => param.name === 'price').value;

  return filterCarsBy(cars, make, model, year, price);
}

function filterCarsBy(cars, make, model, year, price) {
  var filteredCars = cars;

  if (make !== 'All') filteredCars = filteredCars.filter(car => car.make === make);
  if (model !== 'All') filteredCars = filteredCars.filter(car => car.model === model);
  if (year !== 'All') filteredCars = filteredCars.filter(car => car.year === Number(year));
  if (price !== 'All') filteredCars = filteredCars.filter(car => car.price === Number(price));

  return filteredCars;
}

function renderCarFilterOptions(carFilterOptionsHtml) {
  $('select[name="make"]').html(carFilterOptionsHtml.makes);
  $('select[name="model"]').html(carFilterOptionsHtml.models);
  $('select[name="year"]').html(carFilterOptionsHtml.years);
  $('select[name="price"]').html(carFilterOptionsHtml.prices);
}

function renderCarFilterResults(carsInfoHtml) {
  $('#results ul').html(carsInfoHtml);
}

function displayFilters(cars) {
  var carFilterOptions = getCarFilterOptions(cars);
  var carFilterOptionsHtml = getCarFilterOptionsHtml(carFilterOptions);

  renderCarFilterOptions(carFilterOptionsHtml);
}

function displayCars(cars) {
  var carsInfoHtml = carInfoTemplate({ cars: cars });

  renderCarFilterResults(carsInfoHtml);
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

var filterOptionsScript = $('script[data-id="filter-options"]').html();
var carInfoScript = $('script[data-id="car-info"]').html();

var filterOptionsTemplate = Handlebars.compile(filterOptionsScript);
var carInfoTemplate = Handlebars.compile(carInfoScript);

displayFilters(cars);
displayCars(cars);

$('form').on('change', 'select', function(e) {
  e.preventDefault();
  var $form = $('form');
  var filterParams = $form.serializeArray();
  var filteredCars = getFilteredCars(cars, filterParams);

  displayFilters(filteredCars);
  displayCars(filteredCars);
});

$('form').on('submit', function(e) {
  e.preventDefault();

  displayFilters(cars);
  displayCars(cars);
});
