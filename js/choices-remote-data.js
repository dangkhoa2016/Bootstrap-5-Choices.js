class ChoicesRemoteData {
  constructor(selectElement, options) {
    options = options || {};
    let {
      fetchUrl,
      itemsPerPage = 10,
      minSearchLength = 1,
      loadDataOnStart = true,
      disabled,
      onChange,
      onInit,
    } = options;
    
    minSearchLength = parseInt(minSearchLength, 10) || 1;
    itemsPerPage = parseInt(itemsPerPage, 10) || 10;

    const defaults = {
      fetchUrl: null,
      itemsPerPage: 10,
      minSearchLength: 1,
      loadDataOnStart: true,
      disabled: false,
      onChange: null,
      onInit: null,
    }
    this.options = Object.assign({}, defaults, {
      fetchUrl,
      itemsPerPage,
      minSearchLength,
      loadDataOnStart,
      disabled,
      onChange,
      onInit,
    });

    if (!selectElement || !this.options.fetchUrl) {
      throw new Error('selectElement and fetchUrl are required');
    }

    let element;
    
    if (typeof selectElement === 'string')
      element = document.querySelector(selectElement);
    else
      element = selectElement;

    if (!element)
      throw new Error('Select element not found');

    this.currentPage = 1;
    this.isLoading = false;
    this.hasMoreData = true;
    this.triggerSearch = false;
    this.keyword = '';
    this.choices = null;

    this.initialize(element);
  }

  // Fetch data from the server
  fetchDataFromServer() {
    const query = `page=${this.currentPage}&per_page=${this.options.itemsPerPage}&keyword=${this.keyword || ''}`;
    const fetchUrlHasQuery = this.options.fetchUrl.includes('?');
    const url = `${this.options.fetchUrl}${fetchUrlHasQuery ? '&' : '?'}${query}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length < this.options.itemsPerPage)
          this.hasMoreData = false;

        return data.map(item => ({
          value: item.value,
          label: item.label,
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return [];
      });
  }

  updateFetchUrl(url) {
    this.options.fetchUrl = url;
    this.currentPage = 1;
    this.hasMoreData = true;
    this.triggerSearch = true;
    this.keyword = '';
  }

  enableSelect() {
    if (this.choices)
      this.choices.enable();
  }

  disableSelect() {
    if (this.choices) {
      this.choices.disable();
      this.choices.containerOuter.removeFocusState();
    }
  }

  clearAllOptions() {
    if (this.choices)
      this.choices.clearChoices();
  }

  clearSelection(clearOptions = false) {
    if (this.choices) {
      const values = [].concat(this.choices.getValue(true));
      values.forEach(value => {
        this.choices.removeChoice(value);
      });
      if (clearOptions)
        this.clearAllOptions();
    }
  }

  // Check if the dropdown is scrolled to the bottom
  checkIfDropdownScrolledToBottom() {
    if (!this.hasMoreData) {
      return;
    }

    const scrollableElement = this.choices.choiceList.element;
    const bottomOfDropdown = scrollableElement.scrollHeight - scrollableElement.scrollTop === scrollableElement.clientHeight;

    if (bottomOfDropdown && !this.isLoading) {
      this.isLoading = true;
      this.currentPage++;

      this.choices.setChoices(this.fetchDataFromServer, 'value', 'label', false);

      this.isLoading = false;
    }
  }

  // Show the search hint message
  displaySearchHint(message) {
    let hintElement = this.choices.choiceList.element.querySelector('[data-label-class="search-hint"]');
    if (!hintElement) {
      this.choices.choiceList.element.children[0].style.display = 'none';
      this.choices.choiceList.element.appendChild(this.cacheSearchHintElement);
      hintElement = this.choices.choiceList.element.querySelector('[data-label-class="search-hint"]');
    }

    const hintText = hintElement.querySelector('.search-hint');
    hintElement.style.display = 'block';
    hintText.innerText = message;
  }

  // Hide the search hint message
  hideSearchHintMessage() {
    const hintElement = this.choices.choiceList.element.querySelector('[data-label-class="search-hint"]');
    if (hintElement)
      hintElement.style.display = 'none';
  }

  // Toggle the visibility of selectable items
  toggleSelectableItemsVisibility(displayStyle) {
    const items = this.choices.choiceList.element.querySelectorAll('[data-choice-selectable]');
    if (!items)
      return;

    items.forEach(item => {
      item.style.display = displayStyle;
    });
  }

  // Load option items in the dropdown
  loadOptionItemsWithSearchHint(displaySearchHint = false) {
    this.choices._store._state.choices = this.choices._store._state.choices.filter(item => item.labelClass?.includes('search-hint'));
    this.choices.passedElement.element.querySelectorAll(':not([data-label-class="search-hint"],[selected])').forEach(item => item.remove());
    this.toggleSelectableItemsVisibility('none');
    this.displaySearchHint(displaySearchHint ? `Searching for "${this.keyword}"...` : 'Loading...');

    this.choices.setChoices(this.fetchDataFromServer, 'value', 'label', false).then(() => {
      this.hideSearchHintMessage();
    });
  }

  // Handle the search functionality
  handleSearchInput(event) {
    this.keyword = event.target.value;
    if (this.keyword.length === 0) {
      this.hideSearchHintMessage();

      if (this.triggerSearch) {
        this.currentPage = 1;
        this.hasMoreData = true;
        this.triggerSearch = false;
        this.loadOptionItemsWithSearchHint();
      } else
        this.toggleSelectableItemsVisibility('block');
      return;
    }

    if (this.keyword.length <= this.options.minSearchLength) {
      this.toggleSelectableItemsVisibility('none');
      this.displaySearchHint(`Enter more than ${this.options.minSearchLength} characters`);
      return;
    }

    this.currentPage = 1;
    this.hasMoreData = true;
    this.triggerSearch = true;
    this.loadOptionItemsWithSearchHint(true);
  }

  handleKeyUpInput = (event) => {
    if (this.handleKeyUpInput.timeout)
      clearTimeout(this.handleKeyUpInput.timeout);

    this.handleKeyUpInput.timeout = setTimeout(() => {
      this.handleSearchInput(event);
    }, 300);
  };

  initializeChoicesCallback(choicesInstance) {
    choicesInstance.choiceList.element.addEventListener('scroll', this.checkIfDropdownScrolledToBottom.bind(this));

    choicesInstance.passedElement.element.addEventListener('hideDropdown', () => {
      choicesInstance.choiceList.scrollToTop();
    });

    choicesInstance.passedElement.element.addEventListener('change', () => {
      if (this.keyword) {
        this.currentPage = 1;
        this.keyword = null;
        this.triggerSearch = true;
        this.hasMoreData = true;
      }

      if (this.options.onChange)
        this.options.onChange(choicesInstance.getValue());
    });

    choicesInstance.passedElement.element.addEventListener('showDropdown', () => {
      if (this.triggerSearch) {
        this.triggerSearch = false;
        this.loadOptionItemsWithSearchHint();
      }
    });

    choicesInstance.input.element.addEventListener('keyup', this.handleKeyUpInput);

    this.choices = choicesInstance;
    this.cacheSearchHintElement = choicesInstance._store.state.choices[0].choiceEl;
  }

  addSearchHintOptionToElement(element) {
    if (!element)
      return;

    const searchHintOption = document.createElement('option');
    searchHintOption.classList.add('search-hint');
    searchHintOption.innerText = `Enter more than ${this.options.minSearchLength} character(s)`;
    searchHintOption.setAttribute('data-label-class', 'search-hint');
    searchHintOption.setAttribute('disabled', 'disabled');
    element.appendChild(searchHintOption);
  }

  // Initialize the Choices.js select element and bind event listeners
  initialize(element) {
    if (!element || this.choices)
      return;
    
    const t = this;
    t.fetchDataFromServer = t.fetchDataFromServer.bind(t);

    t.addSearchHintOptionToElement(element);

    new Choices(element, {
      resetScrollPosition: false,
      searchChoices: false,
      searchFloor: t.options.minSearchLength,
      shouldSort: false,
      classNames: {
        containerOuter: ['choices', 'mt-2'],
        placeholder: ['choices__placeholder', 'text-secondary'],
      },
      removeItemButton: true,
      callbackOnInit: function () {
        t.initializeChoicesCallback(this);
        if (t.options.onInit)
          t.options.onInit(t, this);
        if (t.options.disabled) {
          this.disable();
          return;
        }

        if (t.options.loadDataOnStart)
          this.setChoices(t.fetchDataFromServer, 'value', 'label', false);
        else
          t.triggerSearch = true;
      },
    });
  }
}
