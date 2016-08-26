$(document).ready(function() {

    initSpectrum();                         // Initialize Spectrum Color Pickers on Home page load
    setSelectVal($('#difficultyLevel'));    // Set DifficultyLevel
    setSelectVal($('#gameSize'));           // Set Game Size

    let $wrapper          = $('#wrapper'),
        $contentContainer = $('#contentContainer');

    /**
     * On Settings form submit generate the Settings object and save it in localStorage as a stringify.
     * Go to Game play page
     */
    $(document).on('submit', 'form#settingsForm', function(e) {
        e.preventDefault();

        let settingsObject = {
            paddleColor:     $('#paddleColor').val(),
            ballColor:       $('#ballColor').val(),
            difficultyLevel: $('#difficultyLevel').val(),
            gameSize:        $('#gameSize').val()
        };

        localStorage.setItem('breakOutSettings', JSON.stringify(settingsObject)); // Save generated breakOutSettings object in localStorage
        getPage('gameplay.html'); // Get gameplay page via Ajax call
    });

    /**
     * On Window Popstate (when pressing back and forward browser buttons),
     * get home page via Ajax
     */
    $(window).on('popstate', function(e) {
        getPage('/');
    });

    /**
     * This functions makes an Ajax Request to get the content of teh specified page.
     * Before sending the request the function removes the current content container.
     * If the request is successfull, content container is filled with the new content.
     * If the request fail an error message is shown.
     * Function also updates the browser url using the histiry API
     *
     * @ url String url string for the requested page
     */
    function getPage(url) {
        $.ajax({
            type: 'GET',     // GET or POST
            url: url,
            beforeSend: function() {
                removeElementContent($contentContainer);
                removeElementContent($('.sp-container'));
            },
            success: function(data) { // Show content if request is successfull
                $wrapper.html($(data).find('#contentContainer')).hide().fadeIn(400);
            },
            error: function() { // Show error msg if request has failed
                $wrapper.html('<div id="contentContainer">An error occured! Please try again soon.</div>');
            },
            complete: function() { // When ajax request is done update the browser url
                updateBrowserUrl(this.url);
                if (this.url == '/') {
                    initSpectrum();
                    setSelectVal($('#difficultyLevel'));
                    setSelectVal($('#gameSize'));
                }
            }
        });
    }

    /**
     * This function checks if the breakOutSettings object exist in localStorage
     * and if it exist, sets the value of the Select Element to be equal to the
     * respective value in the breakOutSettings object
     *
     * @ selectEl object jQuery select obejct
     */
    function setSelectVal(selectEl) {
        let localStorageBreakOutSettings = JSON.parse(localStorage.getItem('breakOutSettings')),
            selectElId = selectEl.attr('id');
        if (localStorageBreakOutSettings !== null) {
            selectEl.val(localStorageBreakOutSettings[selectElId]);
        }
    }

    /**
     * Function removes provided element object
     *
     * @element object jQuery object which needs to be removed
     */
    function removeElementContent(element) {
        element.remove();
    }

    /**
     * This function takes care of updating the borwser url by pushing
     * current state to history API
     * @url string Url string to be populated in the browser url
     * @title string Title of the page in history API
     * @state object State object related to the page which needs to be pushed in the history API
     */
    function updateBrowserUrl(url, title = '', state = {}) {
        history.pushState(state, title, url);
    }

    /**
     * Initialize Spectrum Colorpickers
     */
    function initSpectrum() {
        $('#paddleColor').spectrum({
            color: localStorage.getItem('breakOutSettings') ? JSON.parse(localStorage.getItem('breakOutSettings')).paddleColor : '#000000',
            flat: false,
            showInput: true,
            showInitial: true,
            allowEmpty: false,
            showAlpha: true,
            preferredFormat: 'hex',
            localStorageKey: 'spectrum.paddlecolor',
            showPalette: true,
            showSelectionPalette: true,
            clickoutFiresChange: true,
            hideAfterPaletteSelect: true,
            replacerClassName: 'paddle-color-replacer',
            maxSelectionSize: 10,
            palette: [
                ['#FCFCFC', '#FC7460', '#3CBCFC', '#80D010', '#D82800', '#0070EC', '#FC74B4', '#FC9838', '#BCBCBC', '#F0BC3C'],
                ['#FFF7A5', '#FFA5E0', '#A5B3FF', '#BFFFA5', '#FFCBA5'],
                ['#EFD279', '#95CBE9', '#024769', '#AFD775', '#2C5700', '#DE9D7F', '#7F9DDE', '#00572C', '#75D7AF', '#694702', '#E9CB95'],
                ['#62C4E7', '#00A5DE', '#969699', '#7B797E'],
                ['#111111', '#EEEEEE', '#EC7150', '#B33A2F', '#D80000', '#706800', '#F8AB00', '#F83800', '#FFFFFF', '#FFE0A8']
            ]
        });
        $('#ballColor').spectrum({
            color: localStorage.getItem('breakOutSettings') ? JSON.parse(localStorage.getItem('breakOutSettings')).ballColor : '#000000',
            flat: false,
            showInput: true,
            showInitial: true,
            allowEmpty: false,
            showAlpha: true,
            preferredFormat: 'hex',
            localStorageKey: 'spectrum.ballcolor',
            showPalette: true,
            showSelectionPalette: true,
            clickoutFiresChange: true,
            hideAfterPaletteSelect: true,
            replacerClassName: 'ball-color-replacer',
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
});
