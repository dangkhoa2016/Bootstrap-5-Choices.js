import httpRequestMock from 'http-request-mock';
const mock = httpRequestMock.setupForFetch();
// console.log('Fake response loaded', mock);

const pets = [
  {
    id: 'cat',
    name: 'Cat',
  },
  {
    id: 'dog',
    name: 'Dog',
  },
  {
    id: 'parrot',
    name: 'Parrot',
  },
  {
    id: 'goldfish',
    name: 'Goldfish',
  },
  {
    id: 'snake',
    name: 'Snake',
  },
  {
    id: 'lizard',
    name: 'Lizard',
  },
  {
    id: 'chicken',
    name: 'Chicken',
  },
  {
    id: 'duck',
    name: 'Duck',
  },
  {
    id: 'pig',
    name: 'Pig',
  },
  {
    id: 'horse',
    name: 'Horse',
  },
  {
    id: 'sheep',
    name: 'Sheep',
  },
  {
    id: 'goat',
    name: 'Goat',
  },
  {
    id: 'donkey',
    name: 'Donkey',
  },
  {
    id: 'alpaca',
    name: 'Alpaca',
  },
  {
    id: 'llama',
    name: 'Llama',
  },
  {
    id: 'guinea-pig',
    name: 'Guinea Pig',
  },
  {
    id: 'ferret',
    name: 'Ferret',
  },
  {
    id: 'hedgehog',
    name: 'Hedgehog',
  },
  {
    id: 'chinchilla',
    name: 'Chinchilla',
  },
  {
    id: 'rat',
    name: 'Rat',
  },
  {
    id: 'mouse',
    name: 'Mouse',
  },
  {
    id: 'gerbil',
    name: 'Gerbil',
  },
  {
    id: 'goose',
    name: 'Goose',
  },
  {
    id: 'cow',
    name: 'Cow',
  },
  {
    id: 'hamster',
    name: 'Hamster',
  },
  {
    id: 'rabbit',
    name: 'Rabbit',
  },
  {
    id: 'turtle',
    name: 'Turtle',
  },
  {
    id: 'honeybee',
    name: 'Honeybee',
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
  },
  {
    id: 'dragonfly',
    name: 'Dragonfly',
  },
  {
    id: 'ladybug',
    name: 'Ladybug',
  },
  {
    id: 'grasshopper',
    name: 'Grasshopper',
  },
  {
    id: 'ant',
    name: 'Ant',
  },
  {
    id: 'beetle',
    name: 'Beetle',
  },
  {
    id: 'caterpillar',
    name: 'Caterpillar',
  },
  {
    id: 'cricket',
    name: 'Cricket',
  },
  {
    id: 'cockroach',
    name: 'Cockroach',
  },
  {
    id: 'scorpion',
    name: 'Scorpion',
  },
  {
    id: 'spider',
    name: 'Spider',
  },
  {
    id: 'centipede',
    name: 'Centipede',
  },
  {
    id: 'millipede',
    name: 'Millipede',
  },
  {
    id: 'earthworm',
    name: 'Earthworm',
  },
  {
    id: 'slug',
    name: 'Slug',
  },
  {
    id: 'snail',
    name: 'Snail',
  },
  {
    id: 'octopus',
    name: 'Octopus',
  },
  {
    id: 'squid',
    name: 'Squid',
  },
  {
    id: 'jellyfish',
    name: 'Jellyfish',
  },
  {
    id: 'starfish',
    name: 'Starfish',
  },
  {
    id: 'seahorse',
    name: 'Seahorse',
  },
  {
    id: 'crab',
    name: 'Crab',
  },
  {
    id: 'lobster',
    name: 'Lobster',
  },
  {
    id: 'shrimp',
    name: 'Shrimp',
  },
  {
    id: 'clam',
    name: 'Clam',
  },
  {
    id: 'oyster',
    name: 'Oyster',
  }
];

const generatePetHobbies = (petId) => {
  const hobbies = [
    'Playing with toys',
    'Running around',
    'Chasing things',
    'Eating',
    'Sleeping',
    'Cuddling',
    'Barking',
    'Meowing',
    'Singing',
    'Swimming',
    'Flying',
    'Digging',
    'Jumping',
    'Hiding',
    'Exploring',
    'Grooming',
    'Sunbathing',
    'Climbing',
    'Hunting',
    'Socializing',
    'Training',
    'Watching TV',
    'Playing games',
    'Learning tricks',
    'Talking',
    'Dancing',
    'Rolling',
    'Purring',
    'Squeaking',
    'Hopping',
    'Napping',
    'Roaming',
    'Sniffing',
    'Chewing',
    'Licking',
    'Preening',
    'Pouncing',
    'Squealing',
    'Wheeking',
    'Grazing',
    'Kicking',
  ];

  if (['cat', 'hamster', 'parrot', 'goldfish', 'rabbit', 'turtle', 'snake', 'lizard'].includes(petId)) {
    return hobbies.slice(0, 5);
  } else if (['dog', 'chicken', 'duck', 'goose', 'cow', 'pig', 'horse', 'sheep', 'goat'].includes(petId)) {
    return hobbies.slice(6, 10);
  } else if (['donkey', 'alpaca', 'llama', 'guinea-pig', 'ferret', 'hedgehog', 'chinchilla', 'rat', 'mouse', 'gerbil'].includes(petId)) {
    return hobbies.slice(11, 15);
  } else if (['bee', 'butterfly', 'dragonfly', 'ladybug', 'grasshopper', 'ant', 'beetle'].includes(petId)) {
    return hobbies.slice(16, 20);
  } else if (['caterpillar', 'cricket', 'cockroach', 'scorpion', 'spider', 'centipede', 'millipede', 'earthworm', 'slug', 'snail'].includes(petId)) {
    return hobbies.slice(21, 25);
  } else if (['octopus', 'squid', 'jellyfish', 'starfish', 'seahorse', 'crab', 'lobster', 'shrimp', 'clam', 'oyster'].includes(petId)) {
    return hobbies.slice(26, 30);
  } else {
    return hobbies.slice(31, -1);
  }
};

mock
  .get('/home/pets', (config) => {
    let { page, per_page, keyword } = config.query;
    per_page = parseInt(per_page, 10);

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = pets.filter((pet) => pet.name.toLowerCase().includes(keyword.toLowerCase()));
        const from = (parseInt(page, 10) - 1) * per_page;
        const to = from + per_page;

        const data = result.slice(from, to);
        // console.log('Data fetched:', data);
        resolve(data.map((item) => ({
          value: item.id,
          label: item.name,
        })));
      }, 3000);
    });
  })
  .get('/home/pet-hobbies', (config) => {
    const { pet } = config.query;

    return new Promise((resolve) => {
      setTimeout(() => {
        const data = generatePetHobbies(pet);
        // console.log('Data fetched:', data);
        resolve(data.map((item) => ({
          value: item.toLowerCase().replace(/\s+/g, '-'),
          label: item,
        })));
      }, 1000);
    });
  });

export default mock;
