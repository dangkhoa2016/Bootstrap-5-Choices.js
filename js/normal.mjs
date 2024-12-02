const selects = document.querySelectorAll('#select-pet-normal1, #select-pet-normal2, #select-pet-normal3');
selects.forEach((select) => {
  new Choices(select, {
    classNames: {
      containerOuter: ['choices', 'mt-2'],
      placeholder: ['choices__placeholder', 'text-secondary'],
    },
    removeItemButton: true,
  });
});
