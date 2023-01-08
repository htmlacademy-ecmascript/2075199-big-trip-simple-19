import { getRandomArrayElement, getRandomInt } from '../utils.js';


const data = [{
  destination: {
    'id': 1,
    'description': 'Chamonix, is a beautiful city, a true pearl, with crowded streets.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInt()}`,
        'description': 'Chamonix parliament building'
      }
    ]
  },
  offer: [
    {
      'id': 1,
      'title': 'Buy an entire room',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast',
      'price': 10
    },
    {
      'id': 3,
      'title': 'Go to spa',
      'price': 10
    },
  ],
  offersByType: {
    'type': 'bus',
    'offers': 'offer'
  },
  offersType: 'bus',
  point: {
    'basePrice': 1100,
    'dateFrom': '2019-07-10T20:55:56.845Z',
    'dateTo': '2019-07-11T11:20:13.375Z',
    'destination': 'Chamonix',
    'id': '0',
    'offers': 'offers',
    'type': 'bus'
  },
  pointType: 'bus',
  localPoint: {
    'basePrice': 222,
    'dateFrom': '2019-07-10T23:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'Chamonix',
    'offers': 'offers',
    'type': 'bus'
  },
  authorizationError:
  {
    'error': 401,
    'message': 'Header Authorization is not correct'
  },
  notFoundError:
  {
    'error': 404,
    'message': 'Not found'
  }
},

{
  destination: {
    'id': 2,
    'description': 'Amsterdam, is a city with crowded streets.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInt()}`,
        'description': 'Amsterdam parliament building'
      }
    ]
  },
  offer: [
    {
      'id': 1,
      'title': 'Buy an entire room',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast',
      'price': 10
    },
    {
      'id': 3,
      'title': 'Go to spa',
      'price': 10
    },
  ],
  offersByType: {
    'type': 'flight',
    'offers': 'offer'
  },
  offersType:
    'flight',
  point: {
    'basePrice': 4310,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 'Amsterdam',
    'id': '0',
    'offers': 'offers',
    'type':  'flight'
  },
  pointType: 'flight',
  localPoint: {
    'basePrice': 252,
    'dateFrom': '2019-06-10T22:55:56.845Z',
    'dateTo': '2019-06-11T11:22:13.375Z',
    'destination': 'Amsterdam',
    'offers': 'offers',
    'type': 'flight'
  },
  authorizationError:
    {
      'error': 401,
      'message': 'Header Authorization is not correct'
    },
  notFoundError:
    {
      'error': 404,
      'message': 'Not found'
    }
},

{
  destination: {
    'id': 3,
    'description': 'New-York, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'New-York',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInt()}`,
        'description': 'New-York parliament building'
      }
    ]
  },
  offer: [
    {
      'id': 1,
      'title': 'Buy an entire room',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast',
      'price': 10
    },
    {
      'id': 3,
      'title': 'Go to spa',
      'price': 10
    },
  ],
  offersByType: {
    'type': 'plane',
    'offers': 'offer'
  },
  offersType: 'plane',
  point: {
    'basePrice': 190,
    'dateFrom': '2017-07-10T22:55:56.845Z',
    'dateTo': '2018-07-11T11:22:13.375Z',
    'destination': 'New-York',
    'id': '0',
    'offers': 'flight',
    'type': 'bus'
  },
  pointType: 'flight',
  localPoint: {
    'basePrice': 452,
    'dateFrom': '2020-08-10T22:55:56.845Z',
    'dateTo': '2020-09-11T11:22:13.375Z',
    'destination': 'New-York',
    'offers': 'offers',
    'type': 'flight'
  },
  authorizationError:
    {
      'error': 401,
      'message': 'Header Authorization is not correct'
    },
  notFoundError:
    {
      'error': 404,
      'message': 'Not found'
    }
}];

// const destinations = [
//   {
//     id: 1,
//     description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
//     name: 'Chamonix',
//     pictures: [
//       {
//         src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
//         description: 'Chamonix parliament building'
//       },
//       {
//         src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
//         description: 'Chamonix parliament building'
//       },
//       {
//         src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
//         description: 'Chamonix parliament building'
//       }
//     ]
//   },
//   {
//     id: 2,
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     name: 'Amsterdam',
//     pictures: [
//       {
//         src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
//         description: 'Chamonix parliament building'
//       },
//       {
//         src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
//         description: 'Chamonix parliament building'
//       },
//       {
//         src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
//         description: 'Chamonix parliament building'
//       },
//       {
//         src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
//         description: 'Chamonix parliament building'
//       }
//     ]
//   },
//   {
//     id: 3,
//     description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
//     name: 'Geneva',
//     pictures: [
//       {
//         src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
//         description: 'Chamonix parliament building'
//       },
//       {
//         src: `https://loremflickr.com/248/152?random=${getRandomInt()}`,
//         description: 'Chamonix parliament building'
//       }
//     ]
//   }
// ];

function getRandomDestination () {
  return getRandomArrayElement(data);
}


export {getRandomDestination};
