const TYPE_POINTS = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DESCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  ' Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. '
];

const imgPlug = 'https://loremflickr.com/248/152?random=';

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

const OFFERS = {
  taxi: [
    'Extra luggage',
    'Child seat',
    'Premium vehicle',
    'Meet & greet service'
  ],
  bus: [
    'Wi-Fi',
    'Snacks',
    'Extra legroom',
    'Priority boarding'
  ],
  train: [
    'First class',
    'Dining car',
    'Quiet carriage',
    'Window seat'
  ],
  ship: [
    'Cabin upgrade',
    'Excursion',
    'All inclusive',
    'Sun deck access'
  ],
  drive: [
    'GPS',
    'Child seat',
    'Full insurance',
    'Unlimited mileage'
  ],
  flight: [
    'Add luggage',
    'Priority check-in',
    'Extra legroom',
    'In-flight meal'
  ],
  'check-in': [
    'Breakfast included',
    'Late check-out',
    'Room upgrade',
    'Spa access'
  ],
  sightseeing: [
    'Guide',
    'Skip the line',
    'Private tour',
    'Photo session'
  ],
  restaurant: [
    'Wine pairing',
    'Dessert',
    'Chef\'s table',
    'Cooking class'
  ]
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export { TYPE_POINTS, DESCRIPTION, imgPlug, MONTHS, OFFERS, FilterType };
