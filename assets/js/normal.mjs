const selects = document.querySelectorAll('#select-pet-normal1, #select-pet-normal2, #select-pet-normal3');
selects.forEach((select) => {
  window[select.getAttribute('id')] = new Choices(select, {
    classNames: {
      containerOuter: ['choices', 'mt-2'],
      placeholder: ['choices__placeholder', 'text-secondary'],
    },
    removeItemButton: true,
    itemSelectText: select.getAttribute('data-item-select-text'),
  });
});
