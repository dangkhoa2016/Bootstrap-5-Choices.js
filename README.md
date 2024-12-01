ChoicesRemoteData
=================

`ChoicesRemoteData` is a custom class that integrates with the `Choices.js` library to enhance `<select>` elements with dynamic remote data fetching, search, and pagination. It allows you to populate a select dropdown with options retrieved from a remote URL, supporting features like searching, lazy-loading, and pagination.

Features
--------

* Fetch data from a remote API (`fetchUrl`).
* Supports pagination and dynamic loading of data as the user scrolls.
* Provides search functionality with a minimum character limit (`minSearchLength`).
* Configurable options to control data loading behavior on startup (`loadDataOnStart`).
* Support for custom events like `onChange` and `onInit`.
* Methods to enable/disable the select dropdown, clear selections, and update the fetch URL.
* Using Bootstrap 5 for styling and responsiveness.

Installation
------------

1.  **Install Dependencies**: You need to install `Choices.js` and ensure that your environment supports ES6+, or using CDN

2.  **Import the Library**: Import `Choices.js` and your custom `ChoicesRemoteData` class into your project.
    
        import { ChoicesRemoteData } from './path/to/ChoicesRemoteData';
        
    
3.  **Use the Class**: Create an instance of `ChoicesRemoteData` and initialize it on your `<select>` element.
    

Usage
-----

### Example 1: Basic Usage with Remote Data Fetching

    import './fake-response.mjs';  // (optional) For simulating fake response
    
    // Initialize the select element with remote data fetching and configuration
    const selectWithSearch1 = new ChoicesRemoteData('#select-pet1', {
      fetchUrl: '/home/pets',  // API URL to fetch data
      itemsPerPage: 10,        // Number of items per page for pagination
      minSearchLength: 1,      // Minimum characters required for search
      loadDataOnStart: true,   // Load data when initializing
    });
    
    

### Example 2: Multiple Selects with Different Configurations

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
      loadDataOnStart: false,  // Data is loaded manually via search
    });
    
    const selectWithSearch4 = new ChoicesRemoteData('#select-pet4', {
      fetchUrl: '/home/pets',
      itemsPerPage: 10,
      minSearchLength: 3,      // Only trigger search when 3 or more characters are entered
      loadDataOnStart: false,  // Data is loaded manually via search
    });
    
    const selectHoppy = new ChoicesRemoteData('#select-hobby', {
      fetchUrl: '/home/pet-hobbies',
      disabled: true,  // Initially disabled
      onInit: function (choicesRemoteDataInstance, choicesInstance) {
        // Optional callback when Choices is initialized
      },
    });
    
    const selectWithSearch5 = new ChoicesRemoteData('#select-pet5', {
      fetchUrl: '/home/pets',
      onChange: function (item) {
        selectHoppy.clearSelection(true);  // Clear previous selection in hobby select
    
        if (!item) {
          selectHoppy.disableSelect();
          return;
        }
    
        selectHoppy.updateFetchUrl(`/home/pet-hobbies?pet=${item.value}`);
        selectHoppy.enableSelect();
      },
    });
    
    

Configuration Options
---------------------

When initializing a `ChoicesRemoteData` instance, you can pass a configuration object with the following options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `fetchUrl` | string | null | The URL endpoint from which the data will be fetched. |
| `itemsPerPage` | number | 10  | The number of items to load per page. |
| `minSearchLength` | number | 1   | The minimum number of characters required to start searching. |
| `loadDataOnStart` | boolean | true | Whether to load data when the Choices dropdown is initialized. |
| `disabled` | boolean | false | Whether to disable the select element initially. |
| `onChange` | function | null | A callback function that is triggered when a selection is made. |
| `onInit` | function | null | A callback function that is triggered when Choices.js is initialized. |

Methods
-------

### `fetchDataFromServer()`

Fetches data from the configured `fetchUrl` and returns it in the format `{ value, label }`.

### `updateFetchUrl(url)`

Updates the `fetchUrl` and resets the state for loading data.

### `enableSelect()`

Enables the select dropdown.

### `disableSelect()`

Disables the select dropdown.

### `clearAllOptions()`

Clears all options in the select dropdown.

### `clearSelection(clearOptions = false)`

Clears the selected choices. Optionally, clear all options as well.

### `loadOptionItemsWithSearchHint(displaySearchHint = false)`

Loads option items with a search hint (e.g., “Searching…”).

### `toggleSelectableItemsVisibility(displayStyle)`

Toggles the visibility of selectable items based on the provided display style (e.g., `block`, `none`).

### `handleSearchInput(event)`

Handles the search input event and triggers data loading accordingly.

### `initializeChoicesCallback(choicesInstance)`

Sets up event listeners for the `Choices` instance, including scroll, change, and keyup events.

Contributing
------------

We welcome contributions to improve this project. If you want to contribute, please fork the repository and submit a pull request with your proposed changes.

License
-------

This project is licensed under the MIT License - see the [LICENSE]() file for details.
