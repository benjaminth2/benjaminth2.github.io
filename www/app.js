/*! jQuery v3.1.1 | (c) jQuery Foundation | jquery.org/license */
jQuery.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
};
//Version number
var ver = 2.3;
document.title += " v" + ver;
//main js
function configBarSetting() {
    this.sidebar = function() {
        // $('.setting-button').on('click', function(e) {
        //     e.preventDefault();
        //     var target = $(this).attr('href');
        //     $(target).addClass('active');
        //     setColIconsAndPresets("tOptoColour");
        //     setColIconsAndPresets("tBgColour");
        //     $('body').append('<div class="modal-setting"></div>')
        // });
        // $('.close').on('click', function(e) {
        //     e.preventDefault();
        //     $('.setting-bar').removeClass('active');
        //     $('.guide-section').removeClass('active');
        //     $('.mask').removeClass('active');
        //     $('.modal-setting').remove();
        // });
        $('.questions-btn').on('click', function(e) {
            e.preventDefault();
            $('.guide-section').addClass('active');
            $('.mask').addClass('active');
        });
        $('.close-guide').on('click', function(e) {
            e.preventDefault();
            $('.guide-section').removeClass('active');
            $('.mask').removeClass('active');
        });
        $('body').on('click', function(e) {

        });
        $(document).on('click', '.modal-setting', function() {
            // $('.setting-bar').removeClass('active');
            $('.guide-section').removeClass('active');
            $('.mask').removeClass('active');
            $('.modal-setting').remove();
        });
        //allow colour preset buttons to update colour field and icon
        $('.col-preset-opto').on('click', function(e) {
            e.preventDefault();
            $('.col-preset-opto').removeClass('disabled-btn');
            $(this).addClass('disabled-btn');
            $('#tOptoColour').val(e.target.value);
            $('#tOptoColour ~ i').css('background', e.target.value);
        });
        $('.col-preset-bg').on('click', function(e) {
            e.preventDefault();
            $('.col-preset-bg').removeClass('disabled-btn');
            $(this).addClass('disabled-btn');
            $('#tBgColour').val(e.target.value);
            $('#tBgColour ~ i').css('background', e.target.value);
        });
        //set the icon colours, enable/disable preset buttons
        function setColIconsAndPresets(id) {
            var box = $('#' + id);
            box.next('i').css('background', box.val());
            var presets = (id.includes("Opto")) ? ".col-preset-opto" : ".col-preset-bg";
            $(presets).each(function(idx, el) {
                $(el).removeClass('disabled-btn');
                if (el.value == box.val()) {
                    $(el).addClass('disabled-btn');
                }
            });
        }
        //on updating colour fields, update icon and preset buttons
        $('.col-setting input').on('change', function(e) {
            e.preventDefault();
            var colInput = $(this).attr('id');
            setColIconsAndPresets(colInput);

        });
        //let filter colour sliders update the slider background
        $('.slider').on('input', function(e) {
                e.preventDefault;
                var slider = $(this);
                slider.css('background', 'hsl(' + slider.val() + ',80%,60%)');

            })
            //disable background colour fg when Vanishing Sloan is selected
        $('#sOptotype').on('change', function(e) {
            if (this.value == 5) {
                $('#fgBgColour').removeClass('disabled-fg').addClass('disabled-fg');
                $('#fgPresetsBg').removeClass('disabled-fg').addClass('disabled-fg');
            } else {
                $('#fgBgColour').removeClass('disabled-fg');
                $('#fgPresetsBg').removeClass('disabled-fg');
            }
        });

    };
    this.accordion = function() {
        // panel title click
        $('.panel-heading').on('click', function(e) {
            e.preventDefault();
            var target = $(this).next();
            if (!$(target).is(":visible")) {
                $('.panel-heading').removeClass('active');
                $(this).toggleClass('active');
                $('.panel-collapse').slideUp();
                $(target).slideDown();
            }
        });
        // question icon click
        $('.questions-btn').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            var content = $(target).next();
            if (!$(content).is(":visible")) {
                $('.panel-heading').removeClass('active');
                $('.panel-collapse').slideUp();
                $(target).addClass('active');
                $(content).slideDown();
            }
        });
    };
    this.init = function() {
        this.sidebar();
        this.accordion();
    }
};

function ConfigWolfChart() {
    var objWolf = {};
    var notation, viewWidth, viewHeight = document.documentElement.clientHeight,
        numeratorType, oldCharacter = [];
    var chartArray = [],
        timeOut;
    var anims = ['slide-out-top', 'slide-out-right', 'slide-out-bottom', 'slide-out-left', 'slide-in-top', 'slide-in-right', 'slide-in-bottom', 'slide-in-left'];
    var colours = {
        optotype: "",
        backgrounds: {
            optotype: "",
            binocular: "",
        },
        fRedHue: "",
        fGreenHue: "",
        themes: {
            R: 'rgb(174,39,96)',
            B: 'rgb(104,154,104)',
            M: 'rgb(214, 116, 10)',
        },
    }
    var shortcuts = ['u', 'n', 'g', 'k', 'q', 'z'];

    this.UpdateObjWolf = function() {
        objWolf = {
            dateCreated: Date.now(),
            useCountTimer: null,
            catsLength: 0,
            catThis: "",
            chartThis: "",
            chartThisId: "",
            //array of charts with spacebar functions, and the function type
            hasSBFunc: [
                ['rJCCDots', 'zoom'],
                ['rBullseye', 'zoom'],
                ['rSeptumChart', 'interspace'],
                ['bFixDisp', 'rotate'],
                ['bWorth4Dot', 'zoom'],
                ['mWhiteDot', 'zoom']
            ],
            pointer: 0,
            animIn: "",
            animOut: "",
            catLeft: function() {
                return (this.catThis > 0) ? this.catThis - 1 : this.catsLength - 1;
            },
            catRight: function() {
                return (this.catThis == this.catsLength - 1) ? 0 : this.catThis + 1;
            },
            chartU: function() {
                return (this.chartThis < this[this.catThis].arCharts.length - 1) ? this.chartThis + 1 : 0;
            },
            chartD: function() {
                return (this.chartThis > 0) ? this.chartThis - 1 : this[this.catThis].arCharts.length - 1;
            },
            setUseCount: function(cat, id) {
                //increment the useCount of the chart up one
                var obj = this[cat].arCharts[id];
                obj.useCount++;
            },
            getLastUsed: function(cat) {
                return this[cat].lastUsed;
            },
            getMostUsed: function(cat) {
                //calculate most browsed in the category
                var max = -1,
                    result = "";
                var ar = this[cat].arCharts;
                ar.forEach(function(el, idx) {
                    if (el.useCount > max) {
                        max = el.useCount;
                        result = idx;
                    }
                });
                return result;
            },
            cycler: function(idx, len) {
                (idx < len - 1) ? idx++ : idx = 0;
                return idx;
            }
        }

    }
    this.Clock = function() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = (m < 10) ? "0" + m : m;
        $('#clock-div').html(h + ":" + m);
        var t = setTimeout(functionConfigWolfChart.Clock, 1000);
    }

    this.DisplayArrows = function() {
        /*Charts are arranged in categories. User navigates left
        and right between categories, and up and down within
        categories.
        Navigation links are built from the array of categories
        and the categories are populated by divs in this page
        (and later from external files also).
        */
        //populate the arrow-button-div with arrows
        $('.arrow-button-prototype').clone().appendTo('#btRight').attr({ class: 'arrow-button' }).on('click', function() { functionConfigWolfChart.navCat(objWolf.catRight(), 'right') });
        $('.arrow-button-prototype').clone().appendTo('#btLeft').css('transform', 'rotate(180deg)').attr({ class: 'arrow-button' }).on('click', function() { functionConfigWolfChart.navCat(objWolf.catLeft(), 'left') });
        $('.arrow-button-prototype').clone().appendTo('#btUp').css('transform', 'rotate(-90deg)').attr({ class: 'arrow-button', id: 'up-arrow' }).on('click', function() { functionConfigWolfChart.scrollChart(objWolf.catThis, objWolf.chartU(), 'top') });
        $('.arrow-button-prototype').clone().appendTo('#btDn').css('transform', 'rotate(90deg)').attr({ class: 'arrow-button', id: 'dn-arrow' }).on('click', function() { functionConfigWolfChart.scrollChart(objWolf.catThis, objWolf.chartD(), 'bottom') });
        //$('.nav-button-prototype').clone().appendTo('#thisBadge').attr({class:''});
        $('.up-arrow-prototype').clone().appendTo('#btUp').attr({ class: 'pic-arrow', id: 'up-pic-arrow' }).css({
            width: '100%',
            left: '0px',
            top: '0px',
        }).on('click', function() { functionConfigWolfChart.scrollChart(objWolf.catThis, objWolf.chartU(), 'top') });
        $('.dn-arrow-prototype').clone().appendTo('#btDn').attr({ class: 'pic-arrow', id: 'dn-pic-arrow' }).css({
            width: '100%',
            left: '0px',
            bottom: '0px',
        }).on('click', function() { functionConfigWolfChart.scrollChart(objWolf.catThis, objWolf.chartD(), 'bottom') });
        //populate the function-button-div with function buttons
        $('.zoom-button-prototype').clone().appendTo('#btSpacebarFunc').attr({ class: 'f-button zoom-button' }).hide();
        $('.rotate-button-prototype').clone().appendTo('#btSpacebarFunc').attr({ class: 'f-button rotate-button' }).hide();
        $('.interspace-button-prototype').clone().appendTo('#btSpacebarFunc').attr({ class: 'f-button interspace-button' }).hide();
        $('.shuffle-button-prototype').clone().appendTo('#btShuffleFunc').attr({ class: 'f-button shuffle-button' }).on('click', function() {
            functionConfigWolfChart.shuffleLetters();
        }).hide();
        $('.bg-button-prototype').clone().appendTo('#btBgFunc').attr({ class: 'f-button bg-button' }).on('click', function() { functionConfigWolfChart.duoBGFunction() }).hide();
        //Hover function for buttons
        $('.arrow-active').hide();
        //mediaMatch here to set hover only for desktopdu
        $('.arrow-button, .pic-arrow, .f-button').hover(function() {
            $(this).find('.arrow-active').show();
        }, function() { $(this).find('.arrow-active').hide(); });

        //animate flyout nav bar - also animated by mousenter below
        $('#nav-button-div').on('click', expand);

        function collapse(e) {
            var el = $(e.currentTarget);
            el.removeClass('expanded');
            el.off('click').on('click', expand);
        }

        function expand(e) {
            var el = $(e.currentTarget);
            el.addClass('expanded');
            el.off('click').on('click', collapse);
            timer(parkFlyout, 3000);
        }

        function parkFlyout() {
            $('#nav-button-div').removeClass('expanded');
            //navDiv.className = '';
        }

        function timer(fn, secs) {
            clearTimeout(timeOut);
            timeOut = setTimeout(fn, secs);
        }
        $('#nav-button-outer-div').on('mouseenter', function() {
            $('#nav-button-div').addClass('expanded');
            timer(parkFlyout, 3000);
        });

    }
    this.DisplayNavigations = function() {
        var callBackFunction = this;
        for (r = 0; r < objWolf.catsLength; r++) {
            var thing = objWolf[r];
            //populate the nav-button-div with category links
            $('#nav-button-div').append("<a class='nav-link' id='bt" + thing.cat + "' title='" + thing.title + "'></a>");
            $('#bt' + thing.cat).on('click', { id: r }, function(event) {
                var data = event.data;
                functionConfigWolfChart.navCat(data.id, 'fav');
            });
            $('.nav-button-prototype').clone().appendTo('#bt' + thing.cat).attr({ class: 'nav-button' }).css({ marginBottom: '10px' });
            $('#bt' + thing.cat + ' .dot').attr({ fill: thing.col });
            $('#bt' + thing.cat + ' svg text').text(thing.cat);
            $('.dot-active').hide();
            $('.nav-button').hover(function() {
                $(this).find('.dot-active').show();
            }, function() { $(this).find('.dot-active').hide(); });

        }
    }
    this.sidebarControls = function(selCat, selChart) {
        var callBackFunction = this;
        var thisLink = $('#bt' + objWolf[selCat].cat);
        var thisCol = objWolf[selCat].col;
        $('#nav-button-div a').css('background-color', 'transparent');
        thisLink.css('background-color', 'rgb(102,102,102)');
        //select and colour the arrows
        if (selCat == 0) {
            $('#up-pic-arrow, #dn-pic-arrow').hide();
            $('#up-arrow, #dn-arrow').show();
        } else {
            $('#up-pic-arrow, #dn-pic-arrow').show();
            $('#up-arrow, #dn-arrow').hide();
        }
        $('#btUp,#btDn').find('.arrow-dot').attr({ fill: thisCol });
        $('#btUp,#btDn').find('.pic-border').attr({ stroke: thisCol });
        $('#thisBadge').find('svg text').text(objWolf[selCat].cat).attr({ fill: thisCol });
        $('#thisBadge').find('.dot').attr({ fill: 'white', opacity: '80%', stroke: thisCol, 'stroke-width': '0.25px' });
        $('#btLeft .arrow-dot').attr({ fill: thisCol });
        $('#btRight .arrow-dot').attr({ fill: thisCol });
        //display the single charts above and below the current in the pic-arrows
        $('.scrollPic').remove();
        var chartUId = objWolf[selCat].cat + objWolf.chartU(),
            chartDId = objWolf[selCat].cat + objWolf.chartD();
        if (selCat != 0) {
            var upArrowInsLayer = $('#up-pic-arrow').find('.up-arrow-g1');
            var upArrowPanel = $('#up-pic-arrow').find('.up-arrow-g0 path');
            var upMiniChart = $('#' + chartUId);
            upMiniChart.find('svg').clone().appendTo(upArrowInsLayer).attr({
                width: '80%',
                x: '10%',
                y: '-10%',
                class: 'scrollPic',
                transform: '',
                height: '80%',
            }).show();
            upArrowPanel.attr('fill', upMiniChart.css('background-color'));
            var dnArrowInsLayer = $('#dn-pic-arrow').find('.dn-arrow-g1');
            var dnArrowPanel = $('#dn-pic-arrow').find('.dn-arrow-g0 path');
            var dnMiniChart = $('#' + chartDId);
            dnMiniChart.find('svg').clone().appendTo(dnArrowInsLayer).attr({
                width: '80%',
                x: '10%',
                y: '30%',
                class: 'scrollPic',
                transform: '',
                height: '80%',
            }).show();
            dnArrowPanel.attr('fill', dnMiniChart.css('background-color'));
        }
        //select ánd configure the buttons for this category
        if (objWolf.catThis == 0) {
            $('.f-button').hide();
            $('.bg-button').show();
            $('.shuffle-button').show();
        } else {
            $('.f-button').hide();
            $('.bg-button').hide();
            $('.shuffle-button').hide();
            // display a space bar function button
            var thisChart = objWolf[selCat].arCharts[selChart],
                thisSVG = $('#' + thisChart.id).find('svg');
            if (thisSVG.length > 0) {
                objWolf.hasSBFunc.forEach(function(el, idx) {
                    if (thisSVG[0].id == el[0]) {
                        var sbfb = $('.' + el[1] + '-button');
                        var buttonLayers = sbfb.find('g');
                        sbfb.show();
                        //set function button state
                        if (thisChart.isToggled) {
                            $(buttonLayers[0]).hide();
                            $(buttonLayers[1]).show();
                        } else {
                            $(buttonLayers[0]).show();
                            $(buttonLayers[1]).hide();
                        }
                        //special case for Worth4Dot, where zoom is in reverse - default is double-size
                        if (thisSVG[0].id == "bWorth4Dot") {
                            $(buttonLayers[0]).hide();
                            $(buttonLayers[1]).show();
                        }
                        sbfb.off('click').on('click', function() { $("#" + objWolf.chartThisId).trigger('click'); })
                    }
                });
            }
        }

    }
    this.navCat = function(selCat, anim) {
        objWolf.catThis = selCat;
        var thisCat = objWolf[selCat].cat;
        if (!anim) { //anim=null is only used on initiating the chart
            var arCharts = objWolf[selCat].arCharts;
            if (displayOrder == 2 || displayOrder == 3) {
                objWolf.chartThis = arCharts.length - 1;
            } else {
                objWolf.chartThis = 0;
            }
        } else if (anim == 'fav') { //nav buttons display most used chart in category
            objWolf.chartThis = objWolf.getMostUsed(selCat);
        } else { //arrow buttons display last used chart in category
            objWolf.chartThis = objWolf.getLastUsed(selCat);
        }
        functionConfigWolfChart.scrollChart(objWolf.catThis, objWolf.chartThis, anim);
    }

    this.scrollChart = function(selCat, selChart, anim) {
        //select charts from the divs in page
        //also here we can pull charts from
        //external files.
        var functionConfigWolfChart = this;
        if (selCat == 0) {
            $('#otherChart').hide();
            $('#letterChart').show();
        } else {
            $('#letterChart').hide();
            $('#otherChart').show();
        }
        var charts = $('.' + objWolf[selCat].cat);
        switch (anim) {
            case "top":
                objWolf.animOut = "slide-out-bottom"
                break;
            case "bottom":
                objWolf.animOut = "slide-out-top"
                break;
            case "left":
                objWolf.animOut = "slide-out-right"
                break;
            case "right":
                objWolf.animOut = "slide-out-left"
                break;

        }

        //When animating charts in and out, start sliding in the new chart
        //shortly after starting to slide out the old chart, rather than waiting til 
        //slide out has finished. Then configure the sidebar controls when new chart
        //has finished sliding in
        if (anim != null) { //after first use
            var outGoingChart = $('#' + objWolf.chartThisId);
            var inComingChart = $('#' + charts[selChart].id);
            $('#otherChart').css({
                'background-color': inComingChart.css('background-color'),
            })
            if (anim != 'fav') { //using arrow buttons
                objWolf.animIn = 'slide-in-' + anim;
                var animPromise = new Promise(function(resolve, reject) {
                    outGoingChart.removeClass(anims.join(' ')).addClass(objWolf.animOut);
                    outGoingChart.on('animationstart', resolve());
                });
                animPromise.then(
                    function() {
                        setTimeout(function() {
                            outGoingChart.removeClass(anims.join(' ')).hide();
                            inComingChart.addClass(objWolf.animIn).show();
                            functionConfigWolfChart.sidebarControls(selCat, selChart);
                        }, 200);
                    },
                    function() {
                        console.log("something went wrong with the animations");
                    }
                );
            } else { //using navigation buttons
                outGoingChart.removeClass(anims.join(' ')).hide();
                inComingChart.show();
                functionConfigWolfChart.sidebarControls(selCat, selChart);
            }

        } else { //first use
            $(charts[selChart]).show();
            functionConfigWolfChart.sidebarControls(selCat, selChart);
        }
        //navigation to and display of chart is now finished
        //update cat and chartThis
        objWolf.chartThis = selChart;
        objWolf.chartThisId = charts[selChart].id;
        objWolf[selCat].lastUsed = selChart;

        //select animation script for any charts that are animated external to their svg
        var thisSVG = $('#' + objWolf.chartThisId).find('svg');
        if (thisSVG.parent().hasClass('animated')) {
            switch (thisSVG.attr('id')) {
                case 'mLetterMorph':
                    functionConfigWolfChart.letterMorph();
                    break;
            }
        }
        //record a use count for this chart after n seconds
        var timer = objWolf.useCountTimer;
        if (timer) { clearTimeout(timer); }
        objWolf.useCountTimer = setTimeout(function() { objWolf.setUseCount(selCat, selChart); }, 3000);
    }


    this.SelectOptotype = function() {
        $('#sOptotype').on('change', function() {
            var optotype = $(this).val();
            $('#sAlphabet').html('');
            switch (optotype) {
                case '1':
                    $('#sAlphabet').append('<option value="2">BS4274.3</option><option value="1">SnellenU</option>')
                    break;
                case '2':
                    $('#sAlphabet').append('<option value="3">ETDRS</option><option value="4">SloanU</option>');
                    break;
                case '3':
                    $('#sAlphabet').append('<option value="5">Landolt_5Chars_01</option>');
                    break;
                case '4':
                    $('#sAlphabet').append('<option value="6">Tumbling_5Chars_01</option>');
                    break;
                case '5':
                    $('#sAlphabet').append('<option value="7">Vanishing_5Chars_01</option>');
                    break;
                case '6':
                    $('#sAlphabet').append('<option value="8">Shapes_5Chars_01</option>');
                    break;
                case '7':
                    $('#sAlphabet').append('<option value="9">Chinese_5Chars_01</option>');
                    break;
                case '8':
                    $('#sAlphabet').append('<option value="10">Arabic_5chars_01</option>');
                    break;
                case '9':
                    $('#sAlphabet').append('<option value="11">Hebrew_5Chars_01</option>');
                    break;
                    /* case '10':
                        $('#sAlphabet').append('<option value="13">Crowded HOTV 3</option><option value="12">Crowded HOTV 1</option>');
                        break; */

            }
        });
    };

    //separating rgb from opacity allows letters to have overlapping elements
    this.SetColorCharacter = function(optoCol) {
        var rgba = optoCol.replace(/[^\d.,]/g, '').split(',');
        var colorRGB = "rgb(" + rgba[0] + "," + rgba[1] + "," + rgba[2] + ")";
        var dotA = (parseInt(rgba[3]) + 1) * 0.5;
        $('#list-character').find('svg.optotype-symbol').css('opacity', rgba[3]);
        //only update fill of black fills, or Vanishing optotypes won't work
        $('#list-character').find('svg.optotype-symbol').find('path').not('.white').css({ fill: colorRGB });
        $('#list-character').find('svg.optotype-symbol').find('polygon').not('.white').css({ fill: colorRGB });
        $('.guide-dot').css({ opacity: dotA, });
    };
    this.SetBgColor = function(bgCol) {
        var rgba = bgCol.replace(/[^\d.,]/g, '').split(',');
        var halftone = colours.optotype.replace(/[\d\.]+\)$/g, '0.5');
        if (alphabetType == 7) { //Vanishing optotype needs background same color and half the opacity of the optotype color
            $(document.body).css('background-color', halftone);
        } else {
            $(document.body).css('background-color', bgCol);
        }
    };
    this.SetHeightCharacter = function(distance) {
        var lolb = $('#iLengOfLine').val(); //get length of line below
        var countArr = -1;
        for (d = 0; d < chartArray.length; d++) {
            countArr++;
            var letterSubtense = chartArray[d][0] * 5; //all letters 5 limbs high
            var degrees = letterSubtense / 60;
            var radians = degrees * (Math.PI / 180);
            var tanNumber = (Math.tan(radians));
            var minCharacter = tanNumber * distance * (50 / lolb); // 50 because calibration line is 50 mm
            chartArray[d].push(minCharacter);
        };
    };
    this.CaculatorCharacterHeight = function(numeratorType) {
        //sets the VA value to be displayed in scoreBox div
        var setHeightFunction = this;
        var dist = $('#iDistance').val();
        switch (notation) {
            case "1": //metres
                var ar = [0.501, 0.631, 0.794, 1, 1.259, 1.585, 2, 2.512, 3.162, 3.981, 5.012, 6.31, 7.943, 10];
                //always input mm
                if (numeratorType == "2") {
                    var scoreDisplay = ['6/3', '6/3.8', '6/4.8', '6/6', '6/7.5', '6/9.5', '6/12', '6/15', '6/19', '6/24', '6/30', '6/38', '6/48', '6/60'];
                    for (a = 0; a < ar.length; a++) {
                        chartArray[a] = [ar[a], scoreDisplay[a]];
                    }
                } else {
                    var numerator = Math.round(dist / 100) / 10;
                    for (a = 0; a < ar.length; a++) {
                        if (a < 6) {
                            var score = Math.round(ar[a] * numerator * 10) / 10;
                        } else {
                            var score = Math.round(ar[a] * numerator);
                        }
                        var str = numerator + "!" + score;
                        chartArray[a] = [ar[a], str];
                    }
                }
                break;
            case "2": //feet
                var ar = [0.501, 0.631, 0.794, 1, 1.259, 1.585, 2, 2.512, 3.162, 3.981, 5.012, 6.31, 7.943, 10];
                if (numeratorType == "2") {
                    var scoreDisplay = ['20/10', '20/12.5', '20/16', '20/20', '20/25', '20/32', '20/40', '20/50', '20/63', '20/80', '20/100', '20/125', '20/160', '20/200'];
                    for (a = 0; a < ar.length; a++) {
                        chartArray[a] = [ar[a], scoreDisplay[a]];
                    }
                } else {
                    var numerator = Math.round(dist * 3.28084 / 500) / 2;
                    for (a = 0; a < ar.length; a++) {
                        var score = Math.round(ar[a] * numerator);
                        var str = numerator + "!" + score;
                        chartArray[a] = [ar[a], str];
                    }
                }
                break;
            case "3": //logMar
                var ar = [0.501, 0.631, 0.794, 1, 1.259, 1.585, 2, 2.512, 3.162, 3.981, 5.012, 6.31, 7.943, 10];
                var scoreDisplay = ['-0.3', '-0.2', '-0.1', '0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'];
                for (a = 0; a < ar.length; a++) {
                    chartArray[a] = [ar[a], scoreDisplay[a]];
                }
                break;
            case "4": //Decimal
                var ar = [0.501, 0.631, 0.794, 1, 1.259, 1.585, 2, 2.512, 3.162, 3.981, 5.012, 6.31, 7.943, 10];
                var scoreDisplay = ['2', '1.6', '1.25', '1', '0.8', '0.63', '0.5', '0.4', '0.32', '0.25', '0.2', '0.16', '0.125', '0.1'];
                for (a = 0; a < ar.length; a++) {
                    chartArray[a] = [ar[a], scoreDisplay[a]];
                }
                break;
        }

        //set height for character
        setHeightFunction.SetHeightCharacter(dist)
    };
    this.GenerateCharacter = function(alphabetType, localOptotype) {
        var arrayCharacter = [],
            convertFunction = this;
        switch (alphabetType) {
            //set alphabet for each optotype
            case '1': //SnellenU
                arrayCharacter = ['Snellen_N,Snellen_L,Snellen_A,Snellen_Y,Snellen_Z', 'Snellen_E,Snellen_F,Snellen_R,Snellen_D,Snellen_U', 'Snellen_T,Snellen_P,Snellen_V,Snellen_H,Snellen_X', 'Snellen_Y,Snellen_E,Snellen_L,Snellen_R,Snellen_T', 'Snellen_F,Snellen_X,Snellen_U,Snellen_D,Snellen_H', 'Snellen_A,Snellen_N,Snellen_P,Snellen_V,Snellen_Z', 'Snellen_H,Snellen_Z,Snellen_T,Snellen_Y,Snellen_D', 'Snellen_V,Snellen_F,Snellen_X,Snellen_N,Snellen_R', 'Snellen_A,Snellen_L,Snellen_P,Snellen_U,Snellen_E', 'Snellen_P,Snellen_U,Snellen_V,Snellen_F,Snellen_Y', 'Snellen_T,Snellen_A,Snellen_H,Snellen_E,Snellen_D', 'Snellen_L,Snellen_R,Snellen_N,Snellen_Z,Snellen_X', 'Snellen_D,Snellen_Y,Snellen_P,Snellen_L,Snellen_N', 'Snellen_Z,Snellen_A,Snellen_T,Snellen_F,Snellen_R']
                break;
            case '2': //BS4274.3
                arrayCharacter = ['Snellen_U,Snellen_R,Snellen_N,Snellen_D,Snellen_V', 'Snellen_N,Snellen_F,Snellen_R,Snellen_Z,Snellen_E', 'Snellen_P,Snellen_H,Snellen_D,Snellen_F,Snellen_V', 'Snellen_R,Snellen_U,Snellen_N,Snellen_E,Snellen_Z', 'Snellen_D,Snellen_V,Snellen_E,Snellen_P,Snellen_R', 'Snellen_U,Snellen_D,Snellen_H,Snellen_V,Snellen_N', 'Snellen_Z,Snellen_U,Snellen_V,Snellen_F,Snellen_P', 'Snellen_E,Snellen_R,Snellen_D,Snellen_H,Snellen_Z', 'Snellen_U,Snellen_D,Snellen_P,Snellen_N,Snellen_F', 'Snellen_V,Snellen_E,Snellen_H,Snellen_U,Snellen_P', 'Snellen_F,Snellen_Z,Snellen_V,Snellen_R,Snellen_N', 'Snellen_H,Snellen_R,Snellen_E,Snellen_Z,Snellen_D', 'Snellen_N,Snellen_F,Snellen_H,Snellen_P,Snellen_Z', 'Snellen_U,Snellen_V,Snellen_F,Snellen_E,Snellen_H']
                break;
            case '3':
                arrayCharacter = ['Sloan_C,Sloan_H,Sloan_N,Sloan_R,Sloan_V', 'Sloan_D,Sloan_K,Sloan_O,Sloan_S,Sloan_V', 'Sloan_V,Sloan_O,Sloan_R,Sloan_D,Sloan_N', 'Sloan_H,Sloan_Z,Sloan_C,Sloan_K,Sloan_X', 'Sloan_O,Sloan_K,Sloan_V,Sloan_H,Sloan_D', 'Sloan_Z,Sloan_R,Sloan_N,Sloan_S,Sloan_C', 'Sloan_K,Sloan_S,Sloan_D,Sloan_C,Sloan_H', 'Sloan_R,Sloan_N,Sloan_O,Sloan_V,Sloan_Z', 'Sloan_D,Sloan_H,Sloan_R,Sloan_O,Sloan_K', 'Sloan_C,Sloan_N,Sloan_Z,Sloan_S,Sloan_V', 'Sloan_H,Sloan_O,Sloan_S,Sloan_D,Sloan_N', 'Sloan_C,Sloan_V,Sloan_K,Sloan_Z,Sloan_R', 'Sloan_D,Sloan_H,Sloan_R,Sloan_N,Sloan_O', 'Sloan_S,Sloan_V,Sloan_C,Sloan_K,Sloan_Z']
                break;
            case '4':
                arrayCharacter = ['Sloan_V,Sloan_N,Sloan_T,Sloan_C,Sloan_E', 'Sloan_P,Sloan_X,Sloan_R,Sloan_Z,Sloan_S', 'Sloan_D,Sloan_H,Sloan_O,Sloan_L,Sloan_K', 'Sloan_E,Sloan_T,Sloan_K,Sloan_O,Sloan_D', 'Sloan_C,Sloan_S,Sloan_N,Sloan_R,Sloan_H', 'Sloan_P,Sloan_L,Sloan_X,Sloan_Z,Sloan_V', 'Sloan_N,Sloan_K,Sloan_Z,Sloan_P,Sloan_O', 'Sloan_E,Sloan_V,Sloan_R,Sloan_X,Sloan_D', 'Sloan_T,Sloan_C,Sloan_S,Sloan_L,Sloan_H', 'Sloan_V,Sloan_H,Sloan_X,Sloan_D,Sloan_S', 'Sloan_R,Sloan_O,Sloan_K,Sloan_L,Sloan_E', 'Sloan_Z,Sloan_P,Sloan_C,Sloan_N,Sloan_T', 'Sloan_T,Sloan_E,Sloan_V,Sloan_C,Sloan_R', 'Sloan_H,Sloan_L,Sloan_D,Sloan_P,Sloan_N']
                break;
            case '5':
                arrayCharacter = ['LandoltC_N,LandoltC_S,LandoltC_E,LandoltC_N,LandoltC_W', 'LandoltC_E,LandoltC_E,LandoltC_N,LandoltC_W,LandoltC_S', 'LandoltC_E,LandoltC_S,LandoltC_S,LandoltC_W,LandoltC_N', 'LandoltC_N,LandoltC_W,LandoltC_N,LandoltC_S,LandoltC_E', 'LandoltC_S,LandoltC_W,LandoltC_N,LandoltC_W,LandoltC_E', 'LandoltC_W,LandoltC_E,LandoltC_S,LandoltC_N,LandoltC_S', 'LandoltC_W,LandoltC_N,LandoltC_E,LandoltC_S,LandoltC_W', 'LandoltC_S,LandoltC_N,LandoltC_N,LandoltC_W,LandoltC_E', 'LandoltC_N,LandoltC_E,LandoltC_S,LandoltC_W,LandoltC_W', 'LandoltC_N,LandoltC_S,LandoltC_E,LandoltC_N,LandoltC_W', 'LandoltC_E,LandoltC_E,LandoltC_N,LandoltC_W,LandoltC_S', 'LandoltC_E,LandoltC_S,LandoltC_S,LandoltC_W,LandoltC_N', 'LandoltC_N,LandoltC_W,LandoltC_N,LandoltC_S,LandoltC_E', 'LandoltC_S,LandoltC_W,LandoltC_N,LandoltC_W,LandoltC_E']
                break;
            case '6':
                arrayCharacter = ['TumblingE_N,TumblingE_S,TumblingE_E,TumblingE_N,TumblingE_W', 'TumblingE_E,TumblingE_E,TumblingE_N,TumblingE_W,TumblingE_S', 'TumblingE_E,TumblingE_S,TumblingE_S,TumblingE_W,TumblingE_N', 'TumblingE_N,TumblingE_W,TumblingE_N,TumblingE_S,TumblingE_E', 'TumblingE_S,TumblingE_W,TumblingE_N,TumblingE_W,TumblingE_E', 'TumblingE_W,TumblingE_E,TumblingE_S,TumblingE_N,TumblingE_S', 'TumblingE_W,TumblingE_N,TumblingE_E,TumblingE_S,TumblingE_W', 'TumblingE_S,TumblingE_N,TumblingE_N,TumblingE_W,TumblingE_E', 'TumblingE_N,TumblingE_E,TumblingE_S,TumblingE_W,TumblingE_W', 'TumblingE_N,TumblingE_S,TumblingE_E,TumblingE_N,TumblingE_W', 'TumblingE_E,TumblingE_E,TumblingE_N,TumblingE_W,TumblingE_S', 'TumblingE_E,TumblingE_S,TumblingE_S,TumblingE_W,TumblingE_N', 'TumblingE_N,TumblingE_W,TumblingE_N,TumblingE_S,TumblingE_E', 'TumblingE_S,TumblingE_W,TumblingE_N,TumblingE_W,TumblingE_E'];
                break;
            case '7':
                arrayCharacter = ['VanSloan_C,VanSloan_H,VanSloan_N,VanSloan_R,VanSloan_V', 'VanSloan_D,VanSloan_K,VanSloan_O,VanSloan_S,VanSloan_V', 'VanSloan_V,VanSloan_O,VanSloan_R,VanSloan_D,VanSloan_N', 'VanSloan_H,VanSloan_Z,VanSloan_C,VanSloan_K,VanSloan_X', 'VanSloan_O,VanSloan_K,VanSloan_V,VanSloan_H,VanSloan_D', 'VanSloan_Z,VanSloan_R,VanSloan_N,VanSloan_S,VanSloan_C', 'VanSloan_K,VanSloan_S,VanSloan_D,VanSloan_C,VanSloan_H', 'VanSloan_R,VanSloan_N,VanSloan_O,VanSloan_V,VanSloan_Z', 'VanSloan_D,VanSloan_H,VanSloan_R,VanSloan_O,VanSloan_K', 'VanSloan_C,VanSloan_N,VanSloan_Z,VanSloan_S,VanSloan_V', 'VanSloan_H,VanSloan_O,VanSloan_S,VanSloan_D,VanSloan_N', 'VanSloan_C,VanSloan_V,VanSloan_K,VanSloan_Z,VanSloan_R', 'VanSloan_D,VanSloan_H,VanSloan_R,VanSloan_N,VanSloan_O', 'VanSloan_S,VanSloan_V,VanSloan_C,VanSloan_K,VanSloan_Z'];
                break;
            case '8':
                arrayCharacter = ['Shape5_0,Shape5_3,Shape5_1,Shape5_4,Shape5_2', 'Shape5_1,Shape5_2,Shape5_0,Shape5_3,Shape5_4', 'Shape5_4,Shape5_0,Shape5_2,Shape5_1,Shape5_3', 'Shape5_2,Shape5_3,Shape5_1,Shape5_4,Shape5_0', 'Shape5_1,Shape5_4,Shape5_3,Shape5_0,Shape5_2', 'Shape5_3,Shape5_0,Shape5_4,Shape5_2,Shape5_1', 'Shape5_2,Shape5_1,Shape5_0,Shape5_4,Shape5_3', 'Shape5_0,Shape5_2,Shape5_1,Shape5_3,Shape5_4', 'Shape5_3,Shape5_1,Shape5_0,Shape5_4,Shape5_2', 'Shape5_4,Shape5_0,Shape5_2,Shape5_3,Shape5_1', 'Shape5_2,Shape5_4,Shape5_3,Shape5_1,Shape5_0', 'Shape5_1,Shape5_3,Shape5_4,Shape5_0,Shape5_2', 'Shape5_0,Shape5_4,Shape5_2,Shape5_1,Shape5_3', 'Shape5_4,Shape5_1,Shape5_3,Shape5_0,Shape5_2'];
                break;
            case '9':
                arrayCharacter = ['Chinese01_0,Chinese01_1,Chinese01_6,Chinese01_3,Chinese01_2', 'Chinese01_3,Chinese01_2,Chinese01_4,Chinese01_8,Chinese01_7', 'Chinese01_6,Chinese01_9,Chinese01_5,Chinese01_0,Chinese01_1', 'Chinese01_4,Chinese01_3,Chinese01_0,Chinese01_7,Chinese01_9', 'Chinese01_8,Chinese01_1,Chinese01_2,Chinese01_5,Chinese01_6', 'Chinese01_9,Chinese01_8,Chinese01_6,Chinese01_4,Chinese01_0', 'Chinese01_1,Chinese01_7,Chinese01_3,Chinese01_9,Chinese01_5', 'Chinese01_5,Chinese01_0,Chinese01_2,Chinese01_7,Chinese01_8', 'Chinese01_6,Chinese01_3,Chinese01_8,Chinese01_4,Chinese01_1', 'Chinese01_2,Chinese01_4,Chinese01_1,Chinese01_7,Chinese01_9', 'Chinese01_8,Chinese01_5,Chinese01_3,Chinese01_0,Chinese01_6', 'Chinese01_4,Chinese01_2,Chinese01_1,Chinese01_8,Chinese01_7', 'Chinese01_9,Chinese01_6,Chinese01_5,Chinese01_3,Chinese01_2', 'Chinese01_7,Chinese01_4,Chinese01_0,Chinese01_9,Chinese01_5'];
                break;
            case '10':
                arrayCharacter = ['Arabic01_0,Arabic01_1,Arabic01_6,Arabic01_3,Arabic01_2', 'Arabic01_3,Arabic01_2,Arabic01_4,Arabic01_8,Arabic01_7', 'Arabic01_6,Arabic01_9,Arabic01_5,Arabic01_0,Arabic01_1', 'Arabic01_4,Arabic01_3,Arabic01_0,Arabic01_7,Arabic01_9', 'Arabic01_8,Arabic01_1,Arabic01_2,Arabic01_5,Arabic01_6', 'Arabic01_9,Arabic01_8,Arabic01_6,Arabic01_4,Arabic01_0', 'Arabic01_1,Arabic01_7,Arabic01_3,Arabic01_9,Arabic01_5', 'Arabic01_5,Arabic01_0,Arabic01_2,Arabic01_7,Arabic01_8', 'Arabic01_6,Arabic01_3,Arabic01_8,Arabic01_4,Arabic01_1', 'Arabic01_2,Arabic01_4,Arabic01_1,Arabic01_7,Arabic01_9', 'Arabic01_8,Arabic01_5,Arabic01_3,Arabic01_0,Arabic01_6', 'Arabic01_4,Arabic01_2,Arabic01_1,Arabic01_8,Arabic01_7', 'Arabic01_9,Arabic01_6,Arabic01_5,Arabic01_3,Arabic01_2', 'Arabic01_7,Arabic01_4,Arabic01_0,Arabic01_9,Arabic01_5'];
                break;
            case '11':
                arrayCharacter = ['Hebrew01_2,Hebrew01_8,Hebrew01_0,Hebrew01_6,Hebrew01_4', 'Hebrew01_7,Hebrew01_1,Hebrew01_5,Hebrew01_9,Hebrew01_3', 'Hebrew01_8,Hebrew01_0,Hebrew01_2,Hebrew01_4,Hebrew01_6', 'Hebrew01_9,Hebrew01_5,Hebrew01_7,Hebrew01_3,Hebrew01_1', 'Hebrew01_6,Hebrew01_4,Hebrew01_8,Hebrew01_0,Hebrew01_2', 'Hebrew01_1,Hebrew01_3,Hebrew01_9,Hebrew01_5,Hebrew01_7', 'Hebrew01_0,Hebrew01_6,Hebrew01_4,Hebrew01_2,Hebrew01_8', 'Hebrew01_5,Hebrew01_7,Hebrew01_3,Hebrew01_1,Hebrew01_9', 'Hebrew01_4,Hebrew01_2,Hebrew01_8,Hebrew01_6,Hebrew01_0', 'Hebrew01_3,Hebrew01_9,Hebrew01_1,Hebrew01_7,Hebrew01_5', 'Hebrew01_2,Hebrew01_6,Hebrew01_0,Hebrew01_8,Hebrew01_4', 'Hebrew01_7,Hebrew01_5,Hebrew01_9,Hebrew01_1,Hebrew01_3', 'Hebrew01_8,Hebrew01_4,Hebrew01_2,Hebrew01_0,Hebrew01_6', 'Hebrew01_1,Hebrew01_5,Hebrew01_7,Hebrew01_3,Hebrew01_9'];
                break;
                /* case '12':
                    arrayCharacter = ['CrowdedHOTV01_0','CrowdedHOTV01_2','CrowdedHOTV01_3','CrowdedHOTV01_1','CrowdedHOTV01_2','CrowdedHOTV01_0','CrowdedHOTV01_1','CrowdedHOTV01_3','CrowdedHOTV01_1','CrowdedHOTV01_0','CrowdedHOTV01_2','CrowdedHOTV01_3','CrowdedHOTV01_0','CrowdedHOTV01_2'];
                    break;
                case '13':
                    arrayCharacter = ['CrowdedHOTV01_0,CrowdedHOTV01_2','CrowdedHOTV01_2,CrowdedHOTV01_3','CrowdedHOTV01_3,CrowdedHOTV01_1','CrowdedHOTV01_1,CrowdedHOTV01_0,CrowdedHOTV01_2','CrowdedHOTV01_2,CrowdedHOTV01_3,CrowdedHOTV01_1','CrowdedHOTV01_0,CrowdedHOTV01_1,CrowdedHOTV01_3','CrowdedHOTV01_1,CrowdedHOTV01_2,CrowdedHOTV01_0','CrowdedHOTV01_3,CrowdedHOTV01_0,CrowdedHOTV01_2','CrowdedHOTV01_1,CrowdedHOTV01_2,CrowdedHOTV01_3','CrowdedHOTV01_0,CrowdedHOTV01_3,CrowdedHOTV01_1','CrowdedHOTV01_2,CrowdedHOTV01_1,CrowdedHOTV01_0','CrowdedHOTV01_3,CrowdedHOTV01_0,CrowdedHOTV01_2','CrowdedHOTV01_0,CrowdedHOTV01_3,CrowdedHOTV01_1','CrowdedHOTV01_2,CrowdedHOTV01_1,CrowdedHOTV01_3'];
                    break; */
        }
        //reverse the order of each line if config set to Mirrored
        if (localsMirrored == 2) {
            for (p = 0; p < arrayCharacter.length; p++) {
                var arSplit = arrayCharacter[p].split(',');
                arSplit.reverse();
                var arJoined = arSplit.join(',');
                arrayCharacter[p] = arJoined;
            }

        }
        //add indicator dots to lines 3 (6/6 or equiv) and 6 (6/12 or equiv)
        arrayCharacter[3] = "red_rect," + arrayCharacter[3] + ",red_rect";
        arrayCharacter[6] = "green_dot," + arrayCharacter[6] + ",green_dot";
        var arrayHeight = -1,
            counter = 0;
        for (var i = 0; i < arrayCharacter.length; i++) {
            arrayHeight++;
            var scoreText = chartArray[arrayHeight][1]; //get score text
            var heightText = (localOptotype == 10) ? chartArray[arrayHeight][2] * 9 / 5 : chartArray[arrayHeight][2]; //get height for character
            var marginText = (localOptotype == 10) ? heightText : heightText / 2; //get height for character
            var splitArr = arrayCharacter[i].split(',');
            for (var x = 0; x < splitArr.length; x++) {
                var alphabet = splitArr[x];
                //set style and append svg
                $('#list-character #' + alphabet).clone().css({
                    height: heightText + 'mm',
                    margin: heightText + 'mm ' + marginText + 'mm',
                }).attr({
                    id: alphabet + '_' + counter,
                }).appendTo('#line-' + (i + 1));
                counter++;
            };
            var attrWidth = 0;
            $('#line-' + (i + 1)).find('svg').each(function() {
                if ($(this).find('>:first-child').is('polygon')) {
                    attrWidth = $(this).find('>:first-child').width();
                }
            });
            if (attrWidth != 0) {
                $('#line-' + (i + 1)).find('svg').attr('width', attrWidth);
            }
            //set height for parent line
            $('#line-' + (i + 1)).css('height', heightText + 'mm');
            $('#line-' + (i + 1)).css('line-height', heightText + 'mm');
            $('#line-' + (i + 1)).css('margin', heightText / 2 + 'mm');
            var parentHeight = convertFunction.ConvertPixelToMM($('#line-' + (i + 1)).parent().height() / 2 - 12.5);
            var scoreBoxCol = colours.optotype.replace(/[\d\.]+\)$/g, '1');
            $('<div class="scoreBox" >' + scoreText + '</div>').insertAfter('#line-' + (i + 1)).css({ color: scoreBoxCol });
            //calculator viewport width - here we check if 5 letters plus 2 margins will fit on screen and if not,
            //chop off end letters and try again. If even one letter won't fit, don't display the line at all
            var svgBox = $('#line-' + (i + 1)).find('svg:first-child').width(), //get widht of line
                svgMargin = parseFloat($('#line-' + (i + 1)).find('svg:first-child').css('margin-left')) * 2;
            var svgWidth = svgBox + svgMargin; //get width for each character
            var firstChartRemove = $('#line-' + (i + 1)).find('svg:nth-child(1)'),
                secondChartRemove = $('#line-' + (i + 1)).find('svg:nth-child(2)'),
                thirdChartRemove = $('#line-' + (i + 1)).find('svg:nth-child(3)'),
                fourthChartRemove = $('#line-' + (i + 1)).find('svg:nth-child(4)'),
                fifthChartRemove = $('#line-' + (i + 1)).find('svg:nth-child(5)');
            //allow for the scoreBox when fitting letters on lines
            var lineWidth = viewWidth - 60; //60 is the width of scoreBox set in style header
            if (lineWidth >= svgWidth * 7) {
                //console.log('show all');
                $('#line-' + (i + 1)).find('svg').show();
            } else if (lineWidth >= svgWidth * 5) {
                //console.log('5');
                //remove dots
                $('#line-' + (i + 1)).find('svg.guide-dot').remove();
                $('#line-' + (i + 1)).find('svg').show();
            } else if (lineWidth >= svgWidth * 4) {
                //console.log('4');
                //remove dots
                $('#line-' + (i + 1)).find('svg.guide-dot').remove();
                $('#line-' + (i + 1)).find('svg').show();
                thirdChartRemove.hide();
            } else if (lineWidth >= svgWidth * 3) {
                //console.log('3');
                $('#line-' + (i + 1)).find('svg.guide-dot').remove();
                $('#line-' + (i + 1)).find('svg').show();
                secondChartRemove.hide();
                thirdChartRemove.hide();
            } else if (lineWidth >= svgWidth * 2) {
                //console.log('2');
                $('#line-' + (i + 1)).find('svg.guide-dot').remove();
                $('#line-' + (i + 1)).find('svg').show();
                secondChartRemove.hide();
                thirdChartRemove.hide();
                fourthChartRemove.hide();
            } else if (lineWidth >= svgWidth) {
                //console.log('1');
                $('#line-' + (i + 1)).find('svg.guide-dot').remove();
                $('#line-' + (i + 1)).find('svg').show();
                secondChartRemove.hide();
                thirdChartRemove.hide();
                fourthChartRemove.hide();
                fifthChartRemove.hide();
            } else {
                //console.log('0');						
                $('#line-' + (i + 1)).find('svg').hide();
                $('#line-' + (i + 1)).parent().find('.scoreBox').hide();
                $('#line-' + (i + 1)).parent().addClass('display-none');
            }
        };

    };

    this.GenerateSingleCharts = function() {
        var callBackFunction = this;
        //make all charts not class V 100% height
        var otherChart = $('#otherChart');
        otherChart.css({
            'height': viewHeight,
            'width': viewWidth,
        });
        //select svg of all the charts that aren't class V
        var charts = $('.chart:not(.V)')
        var chartsSVG = charts.find('svg');
        //all single charts except animations are based on minimum element subtense equivalent to a 6/12 letter
        //get subtense of 2 arcmin calculated already for the letter charts, converted to pixels
        var elSubtense = callBackFunction.ConvertMMToPixel(chartArray[6][2] / 5);
        for (var s = 0; s < chartsSVG.length; s++) {
            var svg = chartsSVG[s];
            //svg is centred with css text-align on the chart
            var svgW = svg.viewBox.baseVal.width * elSubtense,
                svgH = svg.viewBox.baseVal.height * elSubtense,
                svgX = viewWidth / 2 - svgW / 2,
                svgY = viewHeight / 2 - svgH / 2;
            var strTrans = 'translate(0,' + svgY + 'px)';
            if (localsMirrored == 2) {
                strTrans += 'scale(-1,1)';
            }
            var thisChart = $('#' + chartsSVG[s].id);
            if (!thisChart.parent().hasClass('animated')) { //exclude animated charts which will be fullscreen
                thisChart.attr({
                    'width': svgW,
                }).css({
                    'transform': strTrans, //svg 1.0 doesn't allow transform on SVG, so only some browsers allow it
                });
            } else {
                thisChart.attr({
                    'width': viewWidth,
                    'height': viewHeight * 0.8,
                }).css({
                    'transform': 'translate(0,' + viewHeight * 0.1 + 'px)', //but does allow css transform                           
                });
            }
        }
        //update filter hues
        $('.filterGreen').attr('fill', 'hsl(' + colours.fGreenHue + ',80%,60%)');
        $('.filterRed').attr('fill', 'hsl(' + colours.fRedHue + ',80%,60%)');
        //put a function on each single chart that can be mapped to spacebar
        var singleCharts = $('.chart:not(.V)');
        singleCharts.each(function(idx, el) {
            var elem = $(el).find('svg');
            if (elem.length > 0) {
                $(el).off();
                $(el).on('click', callBackFunction.spaceBarFunc);
            }
        });
    };

    this.spaceBarFunc = function(e) {
        var callBackFunction = this;
        var el = $(e.currentTarget).children('svg')[0];
        var thisChart = objWolf[objWolf.catThis].arCharts[objWolf.chartThis];
        switch (el.id) {
            case 'rSeptumChart':
                spaceSeptumChart(el);
                break;
            case 'bFixDisp':
                rotate90(el);
                swapSVGLayers($('.rotate-button'));
                thisChart.isToggled = !thisChart.isToggled;
                break;
            case 'rJCCDots':
            case 'rBullseye':
            case 'bWorth4Dot':
            case 'mWhiteDot':
                swapSVGLayers(el);
                swapSVGLayers($('.zoom-button'));
                thisChart.isToggled = !thisChart.isToggled;
                break;
            default:
                break;
        }

        function swapSVGLayers(el) {
            var layers = $(el).children('g');
            layers.each(function(idx, el) {
                $(el).toggle();
            });
        }

        function rotate90(el) {
            var angle = 90,
                trans = $(el).css('transform');
            if (!thisChart.isToggled) {
                trans += ' rotate(-' + angle + 'deg)';
            } else {
                trans += ' rotate(' + angle + 'deg)';
            }
            $(el).css('transform', trans);
        }

        function spaceSeptumChart() {
            thisChart.isToggled = true;
            var buttonLayers = $('.interspace-button').find('g');
            $(buttonLayers[0]).hide();
            $(buttonLayers[1]).show();
            var scLGroup = $('#scLGroup'),
                scRGroup = $('#scRGroup');
            var trans = [scRGroup.attr('transform'), scLGroup.attr('transform')],
                transX = [];
            trans.forEach(function(el, idx) {
                transX[idx] = getXTrans(el);
            });
            if (transX[0] == 22) {
                transX = [15, -3];
                thisChart.isToggled = false;
                swapSVGLayers($('.interspace-button'));
            }
            scRGroup.attr('transform', 'translate(' + (transX[0] + 1) + ',0)');
            scLGroup.attr('transform', 'translate(' + (transX[1] - 1) + ',0)');

            function getXTrans(str) {
                var temp = str.substring(
                    str.lastIndexOf("(") + 1,
                    str.lastIndexOf(",")
                );
                return parseInt(temp);
            }

        }
    }
    this.YatesShuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * i); // no +1 here!
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    this.shuffleLetters = function() {
        if (objWolf.catThis == 0) {
            //check if letters are displayed in a column or singled
            var colCheck = $('.in-a-column, .disable');
            //if not, shuffle, else do nothing
            if (colCheck.length == 0) {
                var callBack = this;
                callBack.swapSVGLayers($('.shuffle-button'));
                if (!objWolf.isShuffled) {
                    $('.char-line').each(function(index) {
                        var parent = $(this);
                        var arVisible = parent.find('svg:not([style*="display: none"])'),
                            arDots = parent.find('svg.guide-dot');
                        //count how many letters are visible
                        var lineLength = arVisible.length;
                        //hide all the letters
                        arAlphabet = parent.find('svg.optotype-symbol').hide(),
                            //shuffle them
                            arAlphabet = callBack.YatesShuffle(arAlphabet);
                        //append shuffled letters to the number in the pre-shuffled line
                        for (i = 0; i < lineLength; i++) {
                            $(arAlphabet[i]).appendTo(parent).show();

                        }
                        if (arDots.length != 0) {
                            parent.prepend(arDots[0]).append(arDots[1]);
                        }
                        $('#sUnshuffled').attr('display', 'block');
                        $('#sShuffled').attr('display', 'none');
                    });
                } else {
                    callBack.UnShuffleFunction(oldCharacter);
                    $('#sUnshuffled').attr('display', 'none');
                    $('#sShuffled').attr('display', 'block');
                }
                objWolf.isShuffled = !objWolf.isShuffled;
            }
        }
    }

    this.UnShuffleFunction = function(oldCharacter) {
        for (i = 0; i < oldCharacter.length; i++) {
            var id = oldCharacter[i][0],
                svg = oldCharacter[i][1];
            var dataLine = $('.chart.V').find('>div[data-line=' + id + ']').html(svg);
            if (objWolf.isDuo) {
                $('.guide-dot').hide();
            }
        }
    };

    this.duoBGFunction = function() {
        var callBack = this;
        //check if letters are displayed in a column, or singled
        var colCheck = $('.in-a-column, .disable');
        //only duochrome if not a column
        if (colCheck.length == 0) {
            if (objWolf.catThis == 0) {
                $('#letterChart').toggleClass('duo');
                $('.guide-dot').toggle();
                objWolf.isDuo = !objWolf.isDuo;
                callBack.swapSVGLayers($('.bg-button'));
            }
        }
    };
    this.swapSVGLayers = function(el) {
        var layers = $(el).children('g');
        layers.each(function(idx, el) {
            $(el).toggle();
        });
    }

    this.letterMorph = function() {
        var callBack = this;
        var arPolygons = $('#list-character .optotype-symbol[id^=Snellen_] polygon'),
            maxLen = 0,
            counter = 0;
        var interval = arPolygons.length * 1350;
        var hue = 0;
        //find the max length the polygon points array
        for (var a = 0; a < arPolygons.length; a++) {
            var len = arPolygons[a].points.length
            if (len > maxLen) {
                maxLen = len;
            }
        }
        //make all the polygon points arrays the same length
        for (var b = 0; b < arPolygons.length; b++) {
            var len = maxLen - arPolygons[b].points.length,
                ar = [];
            if (arPolygons[b].points.length < 12) {
                for (var d = 0; d < len; d++) {
                    var dummyPt = document.getElementById("mLetterMorph").createSVGPoint({
                        x: 0,
                        y: 0,
                    })
                    arPolygons[b].points.appendItem(dummyPt);
                }
            }
        }
        //make animations between each polygon
        var starter = setTimeout(() => {
            newLetterMorph();
        }, 1000);
        var timer = setInterval(() => {
            newLetterMorph();
        }, (interval + 1000));
        var timer2 = setInterval(() => {
            hue = Math.random() * 360;
            $('#SVGLetter').attr({
                fill: 'hsl(' + hue + ',50%,50%)',
            })

        }, 450);

        function newLetterMorph() {
            arPolygons = YatesShuffle(arPolygons);
            var newTarget = $('#mLetterMorph').clone();
            newTarget.find('#SVGLetter :not(:first-child)').remove();
            makeAnimations(newTarget.find('#SVGLetter'));
            $('#mLetterMorph').replaceWith(newTarget);

        }

        function makeAnimations(targetPolygon) {
            targetPolygon.find('#morph0').attr({
                from: $(arPolygons[0]).attr('points'),
                to: $(arPolygons[1]).attr('points'),
            });
            for (var e = 1; e < arPolygons.length; e++) {
                var animId = "morph" + (e - 1);
                targetPolygon.find('#morph0').clone().attr({
                    id: "morph" + e,
                    begin: animId + ".end +1s",
                    from: $(arPolygons[e]).attr('points'),
                    to: $(arPolygons[e + 1]).attr('points'),
                }).appendTo(targetPolygon);
            }
            var lastAnim = $(targetPolygon).find(':last-child');
            lastAnim.attr({
                    to: $(arPolygons[0]).attr('points'),
                })
                //console.log(targetPolygon);
        }


        function YatesShuffle(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * i); // no +1 here!.attr('points')
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }


    }

    this.ShortCutKey = function(pageUp, pageDown, pageLeft, pageRight, shuffle, duoBG) {
        var callBack = this;
        document.body.onkeyup = function(e) {
            //disable shortcuts if setting bar is active
            if (!$('#setting-bar').hasClass('active')) {
                //exclude the ctrl key wherever a letter is the keycode, but not the arrows
                if (pageUp != "") {
                    if (e.keyCode == pageUp && e.ctrlKey == false) {
                        callBack.scrollChart(objWolf.catThis, objWolf.chartU(), 'top');
                    };
                };
                if (pageDown != "") {
                    if (e.keyCode == pageDown && e.ctrlKey == false) {
                        callBack.scrollChart(objWolf.catThis, objWolf.chartD(), 'bottom');
                    };
                };
                if (pageLeft != "") {
                    if (e.keyCode == pageLeft && e.ctrlKey == false) {
                        callBack.navCat(objWolf.catLeft(), 'left');
                    };
                };
                if (pageRight != "") {
                    if (e.keyCode == pageRight && e.ctrlKey == false) {
                        callBack.navCat(objWolf.catRight(), 'right');
                    };
                };
                if (e.keyCode == 38) {
                    e.preventDefault();
                    callBack.scrollChart(objWolf.catThis, objWolf.chartU(), 'top');
                };
                if (e.keyCode == 40) {
                    e.preventDefault();
                    callBack.scrollChart(objWolf.catThis, objWolf.chartD(), 'bottom');
                };
                if (e.keyCode == 37) {
                    e.preventDefault();
                    callBack.navCat(objWolf.catLeft(), 'left');
                };
                if (e.keyCode == 39) {
                    e.preventDefault();
                    callBack.navCat(objWolf.catRight(), 'right');
                };
                if (e.keyCode == 86 && e.ctrlKey == false) {
                    e.preventDefault();
                    callBack.navCat(0, 'fav');
                };
                if (e.keyCode == 82 && e.ctrlKey == false) {
                    e.preventDefault();
                    callBack.navCat(1, 'fav');
                };
                if (e.keyCode == 66 && e.ctrlKey == false) {
                    e.preventDefault();
                    callBack.navCat(2, 'fav');
                };
                if (e.keyCode == 77 && e.ctrlKey == false) {
                    e.preventDefault();
                    callBack.navCat(3, 'fav');
                };
                if (e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    $("#" + objWolf.chartThisId).trigger('click');
                }
                if (shuffle != "") {
                    if (e.keyCode == shuffle && e.ctrlKey == false) {
                        e.preventDefault();
                        callBack.shuffleLetters();
                    }

                };
                if (duoBG != "") {
                    if (e.keyCode == duoBG && e.ctrlKey == false) {
                        e.preventDefault();
                        callBack.duoBGFunction();
                    };
                };
            }
        }; //end of onkeyup
    };
    this.ValidateFunction = function() {
        var result = false,
            resultDistance, resultLength;
        var validateFunction = this;
        $('#iDistance').on('change', function() {
            resultDistance = validateFunction.ValidateDistance();
        });
        $('#iLengOfLine').on('change', function() {
            resultLength = validateFunction.ValidateLengOfLine();
        });
        if (resultDistance || resultLength) {
            result = true;
        }
        return result;
    };
    this.ValidateDistance = function() {
        var result = false,
            message = "",
            distance = $('#iDistance').val();
        $('.errorDistance').remove();
        if (distance == "") {
            result = true;
            message = "Distance is required.";
        } else if (distance != parseInt(distance, 10)) {
            result = true;
            message = "Distance must be integer.";
        } else // if (distance < 3000) {
        //    result = true;
        //    message = "Distance must be greater than or equal to 3000.";
        //}
        if (result) {
            $('#iDistance').parent().append('<span class="errorMsg errorDistance">' + message + '</span>');
            $('#updateSetting').removeClass('disabled-btn').addClass('disabled-btn');
        }
        return result;
    };
    this.ValidateLengOfLine = function() {
        var result = false,
            message = "",
            lengOfLine = $('#iLengOfLine').val();
        $('.errorLenghtLine').remove();
        if (lengOfLine == "") {
            result = true;
            message = "Length of line below is required.";
        } else if (isNaN(lengOfLine)) {
            result = true;
            message = "Length of line below must be numbered.";
        } else if (parseFloat(lengOfLine) < 25 || parseFloat(lengOfLine) > 250) {
            result = true;
            message = "The length of line must be between 25 and 250.";
        }
        if (result) {
            $('#iLengOfLine').parent().append('<span class="errorMsg errorLenghtLine">' + message + '</span>');
            $('#updateSetting').removeClass('disabled-btn').addClass('disabled-btn');
        }
        return result;
    };
    this.ValidateDuplicateKey = function(element) {
        $('.errorShortKey').remove();
        var arr = $('.js-shortkey').map(function() {
            return this.value; // $(this).val()
        }).get();
        //reserve the shortcut keys for chart categories
        arr = [...arr, 'v', 'r', 'b', 'm'];

        function countInArray(array, what) {
            return array.filter(item => item == what).length;
        }
        var result = false;
        var currentVal = $(element).val();
        if (currentVal.trim() != "") {
            if (countInArray(arr, currentVal) > 1) {
                result = true;
            }
        }
        if (result) {
            $(element).parent().append('<span class="errorMsg errorShortKey">ShortKey ' + currentVal + ' is duplicate, or is reserved for another function. Please try again.</span>');
            $(element).val("");
        } else {
            $(element).parent().find('.errorShortKey').remove();
        }
        return result;
    };
    this.SetLocalStorage = function() {
        localStorage.setItem("Ver", ver);
        localStorage.setItem("Optotype", localOptotype);
        localStorage.setItem("Alphabet", alphabetType);
        localStorage.setItem("Notation", notation);
        localStorage.setItem("Numerator", numeratorType);
        localStorage.setItem("Distance", localDistance);
        localStorage.setItem("LengthOfLine", lenghOfline);
        localStorage.setItem("DisplayOptions", displayOrder);
        localStorage.setItem("DisplayWidth", viewWidth);
        localStorage.setItem("Mirrored", localsMirrored);
        localStorage.setItem("Colours", JSON.stringify(colours));
        localStorage.setItem("ObjWolf", JSON.stringify(objWolf));
        localStorage.setItem("Shortcuts", JSON.stringify(shortcuts));
    };
    this.SetScoreBoxFont = function() {
            //reduce font size of scoreBox from that set in css
            //if Notation is Feet, or is Metres and Numerator is Actual
            //other Notations have no numerator so are max 4 chars
            if (notation == 2 || (notation == 1 && numeratorType == 1)) {
                $('.scoreBox').css({
                    'font-size': '4mm',
                });
            }
        }
        //reverse the characters for mirrored display. The order of characters is also reversed at the point where
        //the lines are built from the arrayCharacter variable above
    this.SetDirectCharacter = function(localsMirrored) {
        if (localsMirrored == "2") {
            $('#letterChart svg').css('transform', 'rotateY(180deg)');
        } else {
            $('#letterChart svg').css('transform', 'rotateY(0deg)');
        }
    };
    this.ResetValueToDefault = function() {
        var setConfigDefault = this;
        $('#reset').on('click', function() {
            setConfigDefault.SetConfigDefault();
            //set variable for local storage
            notation = $('#sNotation').val(),
                localOptotype = $('#type').val(),
                localsMirrored = $('#sMirrored').val(),
                localDistance = $('#iDistance').val().trim(),
                numeratorType = $('#sNumerator').val(),
                alphabetType = $('#sAlphabet').val(),
                shortcuts[0] = $('#pageUp').val().trim(),
                shortcuts[1] = $('#pageDown').val().trim(),
                shortcuts[2] = $('#pageLeft').val().trim(),
                shortcuts[3] = $('#pageRight').val().trim(),
                shortcuts[4] = $('#shuffle').val().trim(),
                shortcuts[5] = $('#duoBG').val().trim(),
                lenghOfline = $('#iLengOfLine').val().trim(),
                displayOrder = $('#display').val(),
                setConfigDefault.SetLocalStorage();
            $('#letterChart > div').find('.char-line').html('');
            $('#letterChart > div').find('.scoreBox').remove();
            $('#updateSetting').removeClass('disabled-btn').addClass('disabled-btn');
            setConfigDefault.removeLetterChartPage();
            $('.char-line').removeAttr('style');
            configBar.init();
        });
    };
    this.GetConfigByValue = function() {
        var gOptotype = localStorage.getItem("Optotype"),
            gAlphabet = localStorage.getItem("Alphabet"),
            gNotation = localStorage.getItem("Notation"),
            gNumerator = localStorage.getItem("Numerator"),
            gDistance = localStorage.getItem("Distance"),
            gLengthOfLine = localStorage.getItem("LengthOfLine"),
            gDisplayOptions = localStorage.getItem("DisplayOptions"),
            gDisplayWidth = localStorage.getItem("DisplayWidth"),
            gDisplayHeight = localStorage.getItem("DisplayHeight"),
            gMirrored = localStorage.getItem("Mirrored");
        gColours = JSON.parse(localStorage.getItem("Colours")),
            objWolf = JSON.parse(localStorage.getItem("ObjWolf")),
            gShortcuts = JSON.parse(localStorage.getItem("Shortcuts"));
        //set value for input
        $('#sOptotype').val(gOptotype).change();
        $('#sAlphabet').val(gAlphabet);
        $('#sNotation').val(gNotation);
        $('#sNumerator').val(gNumerator);
        $('#iDistance').val(gDistance);
        $('#iLengOfLine').val(gLengthOfLine);
        $('#display').val(gDisplayOptions);
        $('#sMirrored').val(gMirrored);
        $('#tOptoColour').val(gColours.optotype);
        $('#tBgColour').val(gColours.backgrounds.optotype);
        $('#sliderRed').val(gColours.fRedHue);
        $('#sliderGreen').val(gColours.fGreenHue);
        $('#pageUp').val(gShortcuts[0]);
        $('#pageDown').val(gShortcuts[1]);
        $('#pageLeft').val(gShortcuts[2]);
        $('#pageRight').val(gShortcuts[3]);
        $('#shuffle').val(gShortcuts[4]);
        $('#duoBG').val(gShortcuts[5]);
    };
    this.SetConfigDefault = function() {
        //set value for input
        $('#sOptotype').val("1").change();
        $('#sAlphabet').val("2");
        $('#sNotation').val("1");
        $('#sNumerator').val("2");
        $('#display').val('1');
        $('#sMirrored').val('1');
        colours = {
            optotype: 'rgba(0,0,0,1)',
            backgrounds: {
                optotype: 'rgba(255,255,255,1)',
                binocular: 'hsl(0,0%,60%)',
            },
            fRedHue: '360',
            fGreenHue: '160',
            themes: {
                R: 'rgb(174,39,96)',
                B: 'rgb(154,204,154)',
                M: 'rgb(214, 116, 10)',
            },
        }
        $('#tOptoColour').val(colours.optotype).siblings('i').css('background-color', colours.optotype);
        $('#tBgColour').val(colours.backgrounds.optotype).siblings('i').css('background-color', colours.backgrounds.optotype);
        $('#sliderRed').val(colours.fRedHue).css('background', 'hsl(' + colours.fRedHue + ',80%,60%)');
        $('#sliderGreen').val(colours.fGreenHue).css('background', 'hsl(' + colours.fGreenHue + ',80%,60%)');
        $('#iDistance').val('');
        $('#iLengOfLine').val('');
        shortcuts = ['u', 'n', 'g', 'k', 'q', 'z'];
        $('#pageUp').val(shortcuts[0]);
        $('#pageDown').val(shortcuts[1]);
        $('#pageLeft').val(shortcuts[2]);
        $('#pageRight').val(shortcuts[3]);
        $('#shuffle').val(shortcuts[4]);
        $('#duoBG').val(shortcuts[5]);
    };
    this.UpdateVersion = function(version) {
        //console.log(version+", "+colours+", "+shortcuts);
        var majVer = Math.floor(version),
            minVer = (version - majVer) * 10;
        //create new storage items
        localStorage.setItem("Ver", JSON.stringify(version));
        //convert old storage items
        var reserved = ['v', 'r', 'b', 'm'],
            oldShortcuts = [],
            banned = "",
            errMess = "";
        oldShortcuts[0] = localStorage.getItem("PageUp");
        oldShortcuts[1] = localStorage.getItem("PageDown");
        oldShortcuts[4] = localStorage.getItem("Shuffle");
        oldShortcuts[5] = localStorage.getItem("duoBG");
        oldShortcuts.forEach(function(val, idx) {
            if (reserved.includes(val)) {
                shortcuts[idx] = "";
                errMess = "Warning:\nOne or more of your keyboard shortcuts will no longer work, as it is now reserved for something else. Please assign new shortcut(s) at the bottom of the config menu";
            } else {
                shortcuts[idx] = val;
            }
        });
        colours.optotype = localStorage.getItem("TextColor");
        colours.backgrounds.optotype = localStorage.getItem("BgColor");
        localStorage.setItem("Colours", JSON.stringify(colours));
        localStorage.setItem("Shortcuts", JSON.stringify(shortcuts));
        //destroy no longer needed items
        localStorage.removeItem("PageUp");
        localStorage.removeItem("PageDown");
        localStorage.removeItem("Shuffle");
        localStorage.removeItem("Unshuffle");
        localStorage.removeItem("duoBG");
        localStorage.removeItem("TextColor");
        localStorage.removeItem("BgColor");
        //alert
        var alertMess = "You have updated to WolfChart " + majVer + ". Please take a moment to review your settings."
        if (errMess != "") {
            alert(alertMess + "\n" + errMess);
        } else {
            alert(alertMess);
        }

    }

    this.ConvertPixelToMM = function(pixel) {
        var dpi = document.getElementById("dpi").offsetHeight;
        return (pixel * 25.4) / dpi
    };
    this.ConvertMMToPixel = function(mm) {
        var dpi = document.getElementById("dpi").offsetHeight;
        return (mm * dpi) / 25.4
    };
    this.removeLetterChartPage = function() {
        var $scrollDiv = $('#letterChart').find('.V');
        if ($scrollDiv.length > 0) {
            $scrollDiv.each(function() {
                $(this).find('>div').detach().appendTo('#letterChart');
            });
        };
        $('.V').remove();
    };
    this.PageLetterChart = function() {
        //#letterChart has been filled with lines of letters from smallest to largest but they are not in pages
        //maintain this order
        if (objWolf.chartThis) { objWolf.chartThis = null };
        var firstLine = parseInt($('#letterChart > div:nth-child(1)').attr('data-line')),
            secondLine = parseInt($('#letterChart > div:nth-child(2)').attr('data-line'));
        if (firstLine > secondLine) {
            $('#letterChart > div').each(function() {
                $(this).detach().prependTo($('#letterChart'))
            });
        }
        //most efficient to page the letter chart now, then rearrange for Option Sort
        var quotalHeight = 0,
            pageCounter = 0;
        $('#letterChart >div').each(function() {
            if ($(this).find('.char-line').height() > 0) {
                if ($(this).height() + quotalHeight <= viewHeight) {
                    quotalHeight = quotalHeight + $(this).height();
                } else {
                    quotalHeight = $(this).height();
                    $('<div class="chart V" id="V' + pageCounter + '"></div>').css('display', 'none').appendTo('#letterChart');
                    $(this).prevAll().each(function() {
                        $(this).detach().prependTo($('#letterChart').find('.V:last'));
                    });
                    pageCounter++;
                }
            }
        });
        if ($('#letterChart >div').not(".V").length > 0) {
            $('<div class="chart V"></div>').attr('id', "V" + pageCounter).css('display', 'none').appendTo('#letterChart');
            $('#letterChart >div').not(".V").each(function() {
                if ($(this).find('.char-line svg').length > 0) {
                    $(this).detach().prependTo($('#letterChart').find('.V:last'));
                } else {
                    $(this).detach().appendTo('#letterChart');
                }
            })
        }
        $('.V').each(function() {
            if ($(this).find('>div').hasClass('display-none')) {
                $(this).remove();
            }
        });
        //---Display Order-----
        //Largest at top of each page. First page is handled when scrollChart() is called
        if (displayOrder == "1" || displayOrder == "2") {
            if (($('.V').length) != 1) {
                //just need to reverse order of lines on each page
                $('.V').each(function() {
                    var chart = $(this),
                        children = chart.children();
                    chart.append(children.get().reverse());
                });
            }
        } else { //Monoyer means smallest at top of each page, and page of smallest lines is highest numbered page
            $('#letterChart').each(function() {
                //just need to reverse order of pages
                var letterCharts = $(this),
                    children = letterCharts.children();
                letterCharts.append(children.get().reverse());
            });
        }

    }
    this.loadCharts = function() {
        functionConfigWolfChart = this;
        var allCharts = $('.chart'),
            arTemp = [],
            counter = 0;
        //quick and dirty way to make unique categories
        allCharts.each(function(idx, el) {
            var category = el.id.substr(0, 1);
            arTemp[category] = 0;
        });
        //populate objWolf with numbered chart categories
        //each with all the charts of that class, 
        //each chart with initial use count of 0
        //and some other useful properties
        for (var key in arTemp) {
            if (arTemp.hasOwnProperty(key)) {
                objWolf[counter] = { cat: key, title: "", col: "", lastUsed: 0, mostUsed: 0, arCharts: [] };
                counter++;
                objWolf.catsLength++;
            }
        }
        //add properties for each category
        var themeColours = colours.themes;
        //console.log(objWolf);

        for (q = 0; q < objWolf.catsLength; q++) {
            var thing = objWolf[q];
            //console.log(thing);
            thing.col = "rgb(127,127,127)";
            if (thing.cat == "V") {
                thing.title = "VA";
                thing.col = "rgb(0,0,0)";
            }
            switch (thing.cat) {
                case 'R':
                    thing.title = "Refraction";
                    thing.col = themeColours.R;
                    break;
                case 'B':
                    thing.title = "Binocular";
                    thing.col = themeColours.B;
                    break;
                case 'M':
                    thing.title = "Misc.";
                    thing.col = themeColours.M;
            }
            //add charts to each category in objWolf
            var catCharts = $('.' + thing.cat);
            catCharts.each(function(idx, el) {
                thing.arCharts[idx] = { id: el.id, useCount: 0, isToggled: false };
            })

        }
    }
    this.characterClick = function() {
        $(document).on('click', '.optotype-symbol', function() {
            var characterSVG = $('.char-line .optotype-symbol'),
                el = $(this),
                guideDotSVG = $('svg.guide-dot');
            if (el.hasClass('in-a-column')) {
                //show all letters
                characterSVG.attr('class', 'optotype-symbol');
                if (!objWolf.isDuo) {
                    guideDotSVG.show();
                }
            } else if (el.hasClass('active')) {
                //show a column of letters containing this one
                el.removeClass('active');
                guideDotSVG.hide();
                var lines = $('.char-line').each(function(idx, elem) {
                    var b = objWolf.pointer;
                    $(elem).find('.optotype-symbol').each(function(idx, elem) {
                        if (idx == b) {
                            $(elem).addClass('in-a-column');
                            $(elem).removeClass('disable');

                        }
                    });

                });
            } else {
                //show only the letter clicked
                el.addClass('active');
                characterSVG.addClass('disable');
                el.removeClass('disable');
                guideDotSVG.hide();
                //find the position of the clicked letter along the line
                var parent = this.parentNode,
                    callBack = this,
                    pos = "";
                $('#' + parent.id).find('.optotype-symbol').each(function(idx, elem) {
                    if (elem.id == callBack.id) {
                        objWolf.pointer = idx;
                    }
                });

            }
        });
    };
    this.scoreBoxClick = function() {
        $(document).on('click', '.scoreBox, .guide-dot', function() {
            var clicked = $(this),
                lineSVG = "",
                characterLine = $('.character-line .char-line'),
                characterSVG = $('.char-line .optotype-symbol');
            if (clicked[0].getAttribute('class') == "scoreBox") {
                lineSVG = $(this).prev();
            } else {
                lineSVG = clicked.parent();
            }
            var activeElems = lineSVG.parent().find('.guide-dot, .scoreBox')
            if (clicked.hasClass('active')) {
                activeElems.removeClass('active');
                characterLine.css('visibility', 'visible')
                characterSVG.removeClass('disable active');

            } else {
                $('.character-line .scoreBox, .guide-dot').removeClass('active');
                activeElems.addClass('active');
                characterLine.css('visibility', 'hidden')
                lineSVG.css('visibility', 'visible');
                characterSVG.removeClass('disable active')
            }
        });
    };
    this.hideIdleMouse = function() {
        var idleMouseTimer;
        var forceMouseHide = false;
        $("body").css('cursor', 'none');
        $("#letterChart, #otherChart").mousemove(function(ev) {
            if (!forceMouseHide) {
                $("body").css('cursor', '');
                clearTimeout(idleMouseTimer);
                idleMouseTimer = setTimeout(function() {
                    $("body").css('cursor', 'none');
                    forceMouseHide = true;
                    setTimeout(function() {
                        forceMouseHide = false;
                    }, 200);
                }, 5000);
            }
        });
    };

    this.swipeDetect = function(el, callback) {
        var touchsurface = el,
            swipedir,
            startX,
            startY,
            distX,
            distY,
            threshold = 150, //required min distance traveled to be considered swipe
            restraint = 100, // maximum distance allowed at the same time in perpendicular direction
            allowedTime = 300, // maximum time allowed to travel that distance
            elapsedTime,
            startTime,
            handleswipe = callback || function(swipedir) {}

        touchsurface.addEventListener('touchstart', function(e) {
            var touchobj = e.changedTouches[0]
            swipedir = 'none'
            dist = 0
            startX = touchobj.pageX
            startY = touchobj.pageY
            startTime = new Date().getTime() // record time when finger first makes contact with surface
            e.preventDefault()
        }, false)

        touchsurface.addEventListener('touchmove', function(e) {
            e.preventDefault() // prevent scrolling when inside DIV
        }, false)

        touchsurface.addEventListener('touchend', function(e) {
            var touchobj = e.changedTouches[0]
            distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
            elapsedTime = new Date().getTime() - startTime // get time elapsed
            if (elapsedTime <= allowedTime) { // first condition for awipe met
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                    swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                    swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                }
            }
            handleswipe(swipedir)
            e.preventDefault()
        }, false)
    }
    this.UpdateSetting = function() {
        var callBackFunction = this,
            sideBarWidth = parseFloat($('#side-bar').css('width'));
        $('#updateSetting').on('click', function() {
            //set var from user input
            notation = $('#sNotation').val(),
                localOptotype = $('#sOptotype').val(),
                localsMirrored = $('#sMirrored').val(),
                localDistance = $('#iDistance').val().trim(),
                viewWidth = window.innerWidth - sideBarWidth,
                numeratorType = $('#sNumerator').val(),
                colours.optotype = $('#tOptoColour').val().trim(),
                colours.backgrounds.optotype = $('#tBgColour').val().trim(),
                colours.fRedHue = $('#sliderRed').val(),
                colours.fGreenHue = $('#sliderGreen').val(),
                alphabetType = $('#sAlphabet').val(),
                shortcuts[0] = $('#pageUp').val().trim(),
                shortcuts[1] = $('#pageDown').val().trim(),
                shortcuts[2] = $('#pageLeft').val().trim(),
                shortcuts[3] = $('#pageRight').val().trim(),
                shortcuts[4] = $('#shuffle').val().trim(),
                shortcuts[5] = $('#duoBG').val().trim();
            lenghOfline = $('#iLengOfLine').val().trim(),
                displayOrder = $('#display').val(),
                //reset div
                $('#letterChart').html('<div data-line="1" class="character-line"><div class="char-line" id="line-1"></div></div><div data-line="2" class="character-line"><div class="char-line" id="line-2"></div></div>' +
                    '<div data-line="3" class="character-line"><div class="char-line" id="line-3"></div></div><div data-line="4" class="character-line"><div class="char-line" id="line-4"></div></div>' +
                    '<div data-line="5" class="character-line"><div class="char-line" id="line-5"></div></div><div data-line="6" class="character-line"><div class="char-line" id="line-6"></div></div>' +
                    '<div data-line="7" class="character-line"><div class="char-line" id="line-7"></div></div><div data-line="8" class="character-line"><div class="char-line" id="line-8"></div></div>' +
                    '<div data-line="9" class="character-line"><div class="char-line" id="line-9"></div></div><div data-line="10" class="character-line"><div class="char-line" id="line-10"></div></div>' +
                    '<div data-line="11" class="character-line"><div class="char-line" id="line-11"></div></div><div data-line="12" class="character-line"><div class="char-line" id="line-12"></div></div>' +
                    '<div data-line="13" class="character-line"><div class="char-line" id="line-13"></div></div><div data-line="14" class="character-line"><div class="char-line" id="line-14"></div></div>');

            callBackFunction.removeLetterChartPage();
            //validate required field
            var validate = callBackFunction.ValidateFunction();
            if (validate) {
                $('#updateSetting').removeClass('disabled-btn').addClass('disabled-btn');
                return;
            } else {
                //reset body div
                $('body,#letterChart').removeAttr('style');
                //reset letter chart
                $('#letterChart > div >div').html('');
                $('#letterChart .scoreBox').remove();
                //hide all charts
                $('.chart').hide();
                //empty nav div
                $('.nav-link').remove();
                //create objWolf live operating object
                callBackFunction.UpdateObjWolf();
                //set text color
                callBackFunction.SetColorCharacter(colours.optotype);
                callBackFunction.SetBgColor(colours.backgrounds.optotype);
                callBackFunction.CaculatorCharacterHeight(numeratorType);
                //generate letter charts
                callBackFunction.GenerateCharacter(alphabetType, localOptotype);
                //generate single charts
                callBackFunction.GenerateSingleCharts();
                //set shortcut
                callBackFunction.ShortCutKey(shortcuts[0].toUpperCase().charCodeAt(0), shortcuts[1].toUpperCase().charCodeAt(0), shortcuts[2].toUpperCase().charCodeAt(0), shortcuts[3].toUpperCase().charCodeAt(0), shortcuts[4].toUpperCase().charCodeAt(0), shortcuts[5].toUpperCase().charCodeAt(0));
                //close setting bar
                // $('.setting-bar').removeClass('active');
                $('.guide-section').removeClass('active');
                $('.mask').removeClass('active');
                var $Element, maxEleWidht = 0
                $('#letterChart').css({ 'width': viewWidth, 'height': viewHeight });
                //set direct for character
                callBackFunction.SetDirectCharacter(localsMirrored);
                //set smaller font for long scoreBox strings
                callBackFunction.SetScoreBoxFont();
                //divide letter chart into pages
                callBackFunction.PageLetterChart();
                //load all charts into objWolf
                callBackFunction.loadCharts();
                //local storage
                callBackFunction.SetLocalStorage();
                //display a chart in the V category
                callBackFunction.navCat(0, null);
                //display nav bar
                callBackFunction.DisplayNavigations();
                callBackFunction.Clock();
                //set old character array for the unshuffle function
                $('.character-line').each(function() {
                    var lineArray = [];
                    lineArray.push($(this).attr('data-line'), $(this).html());
                    oldCharacter.push(lineArray);
                });
                $('.modal-setting').remove();
            }
        });
    };
    this.Init = function() {
        var validateElement = this;
        var validate = false,
            VresultDistance, VresultLength;
        $('#iDistance').on('blur', function() {
            VresultDistance = validateElement.ValidateDistance();
            if (VresultDistance || VresultLength) {
                validate = true;
            } else {
                validate = false;
            };
            if (validate) {
                $('#updateSetting').removeClass('disabled-btn').addClass('disabled-btn');
                $('.setting-button').trigger('click');
                return;
            } else {
                $('#updateSetting').removeClass('disabled-btn');
            }
        });
        $('#iLengOfLine').on('blur', function() {
            VresultLength = validateElement.ValidateLengOfLine();
            if (VresultDistance || VresultLength) {
                validate = true;
            } else {
                validate = false;
            };
            if (validate) {
                $('#updateSetting').removeClass('disabled-btn').addClass('disabled-btn');
                $('.setting-button').trigger('click');
                return;
            } else {
                $('#updateSetting').removeClass('disabled-btn');
            }
        });
        $('.js-shortkey').on('blur', function() {
            validateElement.ValidateDuplicateKey(this);
        });
        this.SelectOptotype();
        this.DisplayArrows();
        this.UpdateSetting();
        if (localStorage.getItem("Optotype") != null) {
            //following if deals with upgrade from v1 to v2.
            //From ver 2.x, can use localStorage "Ver" string for this
            if (localStorage.getItem("Ver") === null) {
                this.UpdateVersion(ver);
                this.GetConfigByValue();
                $('.setting-button').trigger('click');
                $('#updateSetting').removeClass('disabled-btn');
            } else if (localStorage.getItem("Distance") != "" && localStorage.getItem("LengthOfLine") != "") {
                this.GetConfigByValue();
                $('#updateSetting').trigger('click');
                $('#updateSetting').removeClass('disabled-btn');
            } else {
                $('.setting-button').trigger('click');
            }
        } else if ($('#iDistance').val().trim() == "" || $('#iLengOfLine').val().trim() == "") {
            $('.setting-button').trigger('click');
        };
        this.ResetValueToDefault();
        this.characterClick();
        this.scoreBoxClick();
        this.hideIdleMouse();
        /* this.swipeDetect(document.getElementById('letterChart'),function(swipedir) {
            console.log("Swiped "+swipedir);
        }); */
    };
};
var configBar = new configBarSetting();
var configWolf = new ConfigWolfChart();
$(document).ready(function() {
    configBar.init();
    configWolf.Init();
});