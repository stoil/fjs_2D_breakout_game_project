'use strict';
let settings = (function() {
    // Initial Settings Data Object
    let settingsData = {
        paddleColor:     '#000000',
        ballColor:       '#000000',
        difficultyLevel: 'easy',
        canvasSize:      'fullscreen'
    };

    // Caching the Dom
    const $wrapper          = $('#wrapper'),
          $settingsForm     = $wrapper.find('#settingsForm'),
          $paddleColor      = $settingsForm.find('#paddleColor'),
          $ballColor        = $settingsForm.find('#ballColor'),
          $canvasSize       = $settingsForm.find('#canvasSize'),
          $difficultyLevel  = $settingsForm.find('#difficultyLevel');

    let localStorageBreakOutSettings = JSON.parse(localStorage.getItem('breakOutSettings'));

    // BIND EVENTS
    function initializeEvents() {
        bindEventToEl('submit', $settingsForm, submitSettings, $wrapper);
    };

    /**
     * This function binds a specified event to a
     * provided html element and invokes a specific function
     *
     * @param {String} eventName Holds event name
     * @param {Object} elObject Holds the html element object
     * @param {Function} eventHandler Holds the eventHandler function
     * @param {Object} $wrapperName Holds the html element object to which the event will be attached. This is used when we want to delegate events
     */
    function bindEventToEl(eventName, elOject, eventHandler, wrapperName = '') {
        if (wrapperName == '') {
            elOject.off(eventName, eventHandler);
            elOject.on(eventName, eventHandler);
        } else {
            wrapperName.off(eventName, elOject, eventHandler);
            wrapperName.on(eventName, elOject, eventHandler);
        }
    };

    /**
     * On Settings form submit generate the Settings object, save it to localStorage and
     * go to Game play page
     *
     * @param {Object} event Holds event object
     */
    function submitSettings(event) {
        event.preventDefault();
        localStorageBreakOutSettings = settingsData = {
            paddleColor:     $paddleColor.val(),
            ballColor:       $ballColor.val(),
            difficultyLevel: $difficultyLevel.val(),
            canvasSize:      $canvasSize.val()
        };
        localStorage.setItem('breakOutSettings', JSON.stringify(settingsData)); // Save generated breakOutSettings object in localStorage
        pageActions.getPage('gameplay.html');
    }

    /**
     * This function axcepts any number of string id's parameters.
     * The function than builds a colorpicker config object for each id
     * and initializes the spectrum colorpicker
     *
     * @param {String} id Any number of string Id's
     * @returns void
     */
    function initSpectrumColorpicker() {
        let args = $.isEmptyObject(arguments);
        if (!args) {
            for (let i of arguments) {
                if (typeof i === 'string') {
                    $('#' + i).spectrum({
                        color: localStorageBreakOutSettings ? localStorageBreakOutSettings[i] : getSettingsData().i,
                        flat: false,
                        showInput: true,
                        showInitial: true,
                        allowEmpty: false,
                        showAlpha: true,
                        preferredFormat: 'hex',
                        localStorageKey: 'spectrum.' + i,
                        showPalette: true,
                        showSelectionPalette: true,
                        clickoutFiresChange: true,
                        hideAfterPaletteSelect: true,
                        replacerClassName: i + '-replacer',
                        maxSelectionSize: 10,
                        palette: [
                            ['#FCFCFC', '#FC7460', '#3CBCFC', '#80D010', '#D82800', '#0070EC', '#FC74B4', '#FC9838', '#BCBCBC', '#F0BC3C'],
                            ['#FFF7A5', '#FFA5E0', '#A5B3FF', '#BFFFA5', '#FFCBA5'],
                            ['#EFD279', '#95CBE9', '#024769', '#AFD775', '#2C5700', '#DE9D7F', '#7F9DDE', '#00572C', '#75D7AF', '#694702', '#E9CB95'],
                            ['#62C4E7', '#00A5DE', '#969699', '#7B797E'],
                            ['#111111', '#EEEEEE', '#EC7150', '#B33A2F', '#D80000', '#706800', '#F8AB00', '#F83800', '#FFFFFF', '#FFE0A8']
                        ]
                    });
                }
            }
        }
    }

    /**
     * Pulls up previously selected element from local storage
     * and set the select element to this value.
     *
     * @param {Object} selectEl Html select element on which you want to set the value
     * @returns void
     */
    function setSelectVal(selectEl) {
        let selectElId = selectEl.attr('id');
        if (localStorageBreakOutSettings !== null) {
            selectEl.val(localStorageBreakOutSettings[selectElId]);
        }
    }

    /**
     * Get settings Data from localStorage if the settingsData object is present
     * or if the localStorage is empty get the initial static data
     *
     * @returns {Object} settingsData Return Settings Data Object
     */
    function getSettingsData() {
        if (localStorageBreakOutSettings !== null) {
            return localStorageBreakOutSettings;
        }
        return settingsData;
    }

    /**
     * This function initializes the colorpickers,
     * sets the value of the select elements an rebinds the events
     */
    function settingsInit() {
        initSpectrumColorpicker('paddleColor', 'ballColor');
        setSelectVal($difficultyLevel);
        setSelectVal($canvasSize);
        initializeEvents();
    }

    return {
        init: settingsInit,
        getSettingsData: getSettingsData,
    };
})();

let pageActions = (function() {
    // Caching the DOM
    let $wrapper          = $('#wrapper'),
        $contentContainer = $wrapper.find('#contentContainer'),
        $spContainer      = $wrapper.find('.sp-container');

    // BIND EVENTS
    $(window).on('popstate', function(event) {
        if (location.pathname == '/') {
            getPage('/');
        }
    });

    /**
     * This functions makes an Ajax Request to get the content of the specified page.
     * Before sending the request the function removes the current content container.
     * If the request is successfull, content container is filled with the new content.
     * If the request fail an error message is shown.
     * Function also updates the browser url using the histiry API
     *
     * @param {String} url string for the requested page
     */
    function getPage(url) {
        $.ajax({
            type: 'GET',     // GET or POST
            url: url,
            beforeSend: function() {
                removeElementContent($contentContainer);
                removeElementContent($spContainer);
            },
            success: function(data) { // Show content if request is successfull
                $wrapper.html($(data).find('#contentContainer')).hide().fadeIn(400);
            },
            error: function() { // Show error msg if request has failed
                $wrapper.html('<div id="contentContainer">An error occured! Please try again soon.</div>');
            },
            complete: function() { // When ajax request is done update the browser url
                if (this.url == '/') {
                    settings.init();
                }
                updateBrowserUrl(this.url);
            }
        });
    }

    /**
     * Function removes provided element object from the DOM
     *
     * @param {Object} element jQuery object which needs to be removed
     */
    function removeElementContent(element) {
        element.remove();
    }

    /**
     * This function takes care of updating the borwser url by pushing
     * current state to browser history via the hystory API
     * @param {String} url Url string to be populated in the browser url
     * @param {String} title Title of the page in history API
     * @param {Object} State object related to the page which needs to be pushed in the history API
     */
    function updateBrowserUrl(url, title = '', state = {}) {
        history.pushState(state, title, url);
    }

    return {
        getPage: getPage
    };
})();
