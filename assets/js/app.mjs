// for simulating the fake response from the server, remove this line or comment it out to see the real response
import './fake-response.mjs';
// normal choices.js
import './normal.mjs';

const onInit = function (choicesRemoteDataInstance, choicesInstance) {
  choicesInstance.containerOuter.element.parentElement.querySelector('pre').innerText = JSON.stringify(options, null, 2);
  window[choicesInstance.passedElement.element.id] = choicesRemoteDataInstance;
};

let options = {
  fetchUrl: '/home/pets',
  itemsPerPage: 10,
  minSearchLength: 1,
  loadDataOnStart: true,
  onInit: onInit
}
new ChoicesRemoteData('#select-pet1', options);
new ChoicesRemoteData('#select-pet6', options);

options.itemsPerPage = 5;
new ChoicesRemoteData('#select-pet2', options);

options.itemsPerPage = 10;
options.minSearchLength = 2;
options.loadDataOnStart = false;
new ChoicesRemoteData('#select-pet3', options);

options.itemsPerPage = 10;
options.minSearchLength = 3;
new ChoicesRemoteData('#select-pet4', options);


options = {
  fetchUrl: '/home/pet-hobbies',
  disabled: true,
  onInit: onInit
}
const selectHoppy = new ChoicesRemoteData('#select-hobby', options);

options = {
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
  onInit: onInit
}
new ChoicesRemoteData('#select-pet5', options);
