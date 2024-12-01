// for simulating the fake response from the server, remove this line or comment it out to see the real response
import './fake-response.mjs';

const selectWithSearch1 = new ChoicesRemoteData('#select-pet1', {
  fetchUrl: '/home/pets',
  itemsPerPage: 10,
  minSearchLength: 1,
  loadDataOnStart: true,
});

const selectWithSearch2 = new ChoicesRemoteData('#select-pet2', {
  fetchUrl: '/home/pets',
  itemsPerPage: 5,
  minSearchLength: 1,
  loadDataOnStart: true,
});

const selectWithSearch3 = new ChoicesRemoteData('#select-pet3', {
  fetchUrl: '/home/pets',
  itemsPerPage: 10,
  minSearchLength: 1,
  loadDataOnStart: false,
});

const selectWithSearch4 = new ChoicesRemoteData('#select-pet4', {
  fetchUrl: '/home/pets',
  itemsPerPage: 10,
  minSearchLength: 3,
  loadDataOnStart: false,
});

const selectHoppy = new ChoicesRemoteData('#select-hobby', {
  fetchUrl: '/home/pet-hobbies',
  disabled: true,
  onInit: function (choicesRemoteDataInstance, choicesInstance) {
    // console.log('Select hobby initialized', choicesRemoteDataInstance, choicesInstance);
  },
});

const selectWithSearch5 = new ChoicesRemoteData('#select-pet5', {
  fetchUrl: '/home/pets',
  onChange: function (item) {
    selectHoppy.clearSelection(true);

    if (!item) {
      selectHoppy.disableSelect();
      return;
    }

    selectHoppy.updateFetchUrl(`/home/pet-hobbies?pet=${item.value}`);
    selectHoppy.enableSelect();
  },
});
