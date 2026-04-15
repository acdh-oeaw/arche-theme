jQuery(function ($) {

    "use strict";

    $(document).ready(function () {
        const ICON_TOP_COLLECTION = `
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" xml:space="preserve">
                <g id="topCollection">
                    <g>
                        <path fill="#FFFFFF" d="M121.4,849.5c-21.8,0-39.5-16.5-39.5-36.9V294.2c0-20.3,17.7-36.9,39.5-36.9h545.7 c21.8,0,39.5,16.5,39.5,36.9v518.4c0,20.3-17.7,36.9-39.5,36.9H121.4z"/>
                        <path fill="#8CD3D8" d="M667.1,269.9c14.9,0,27,10.9,27,24.4v518.4c0,13.4-12.1,24.4-27,24.4H121.4c-14.9,0-27-10.9-27-24.4V294.2 c0-13.4,12.1-24.4,27-24.4H667.1 M667.1,244.9H121.4c-28.7,0-52,22.1-52,49.4v518.4c0,27.3,23.3,49.4,52,49.4h545.7 c28.7,0,52-22.1,52-49.4V294.2C719.1,267,695.8,244.9,667.1,244.9L667.1,244.9z"/>
                    </g>
                    <g>
                        <path fill="#FFFFFF" d="M111.4,256.4c-9.7,0-15.4-2.6-16.6-5c-1.1-2.2,0.3-7.5,5.6-14.3L232.9,69.2c14.9-18.8,48.5-34.7,73.3-34.7 H813c9.2,0,16,2.4,18.2,6.5c2,3.7,0.7,10-3.7,16.9L725.4,219.7c-12.6,19.9-43.8,36.7-68.3,36.7H111.4z"/>
                        <path fill="#8CD3D8" d="M813,47c2.6,0,4.5,0.3,5.9,0.6c-0.4,1-1,2.2-1.9,3.6L714.8,213c-10.2,16.2-37.7,30.9-57.7,30.9H111.4 c-0.1,0-0.3,0-0.4,0L242.8,77c5.9-7.5,16.3-15.1,28.4-20.8c12.2-5.8,25.1-9.2,35.2-9.2H813 M813,22H306.3 c-28.7,0-65.9,17.7-83.2,39.5L90.6,229.4c-17.2,21.8-7.9,39.5,20.8,39.5h545.7c28.7,0,64-19,78.8-42.5L838.1,64.5 C853,41,841.7,22,813,22L813,22z"/>
                    </g>
                    <g>
                        <path fill="#FFFFFF" d="M709.2,838.3c-0.8-2.4-1.7-6.5-1.7-12.7V317.2c0-26.8,12.3-82.3,24.9-102.2L834.7,53.2 c0.4-0.6,0.7-1.1,1.1-1.6c1.4,3.8,2.7,10.1,2.7,18.8v518.4c0,24.8-11.4,63.8-24.9,85.2L713.4,832.8 C711.7,835.4,710.3,837.2,709.2,838.3z"/>
                        <path fill="#8CD3D8" d="M826,90.4v498.4c0,22.4-10.7,59.2-23,78.6l-82.9,131.4V317.2 c0-24.7,11.6-77.5,23-95.5L826,90.4 M836.8,36.2c-3.8,0-8.1,3.1-12.7,10.4L721.9,208.3c-14.8,23.5-26.9,81.6-26.9,108.9v508.4 c0,16.7,5.3,27,12.8,27c4.7,0,10.3-4.1,16.1-13.1l100.2-158.8C839,657.2,851,616,851,588.8V70.4C851,51.5,845.3,36.2,836.8,36.2z"/>
                    </g>
                    <polygon fill="#8CD3D8" points="394.4,315.7 340.7,343.3 545.4,448.7 394.4,526.4 243.4,448.7 291.3,424 394.4,477 448,449.4 291.3,368.7 146,447.8 394.4,581.7 591.2,480.3 591.2,634.5 394.4,735.8 197.6,634.5 197.6,585 394.4,686.4 540,611.4 540,556.1 394.4,631.1 146.3,500.8 146.3,663.3 394.4,791.1 642.4,663.3 642.4,443.5"/>
                </g>
            </svg>
        `;

        const ICON_RESOURCE = `
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" xml:space="preserve">
                <g id="resource">
                    <g>
                        <path fill="#FFFFFF" d="M173.6,865.6c-16.5,0-30-13.4-30-30V71.5c0-16.5,13.4-30,30-30h297.2c20.2,0,49.4,12.1,63.6,26.4 l194.7,194.7c14.3,14.3,26.4,43.4,26.4,63.6v509.5c0,16.5-13.4,30-30,30H173.6z"/>
                        <path fill="#8CD3D8" d="M470.8,54c16.8,0,42.9,10.8,54.8,22.7l194.7,194.7c11.9,11.9,22.7,38,22.7,54.8v509.5c0,9.6-7.8,17.5-17.5,17.5H173.6c-9.6,0-17.5-7.8-17.5-17.5V71.5c0-9.6,7.8-17.5,17.5-17.5H470.8 M470.8,29H173.6c-23.4,0-42.5,19-42.5,42.5v764.2c0,23.4,19,42.5,42.5,42.5h551.9c23.4,0,42.5-19,42.5-42.5V326.2c0-23.4-13.4-55.9-30-72.5L543.3,59C526.7,42.4,494.3,29,470.8,29z"/>
                    </g>
                    <path fill="#8CD3D8" d="M513.3,71.5v169.8c0,23.4,19,42.5,42.5,42.5h169.8c23.4,0,29-13.4,12.4-30L543.3,59C526.7,42.4,513.3,48,513.3,71.5z"/>
                </g>
            </svg>
        `;

        const ICON_SIZE = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Database icon">
                <title>Database icon</title>
                <g fill="none" stroke="#8CD3D8" stroke-width="28" stroke-linecap="round" stroke-linejoin="round">
                    <ellipse cx="256" cy="96" rx="176" ry="56"/>
                    <path d="M80 96v320c0 31 79 56 176 56s176-25 176-56V96"/>
                    <path d="M80 202c0 31 79 56 176 56s176-25 176-56"/>
                    <path d="M80 308c0 31 79 56 176 56s176-25 176-56"/>
                </g>
            </svg>
        `;

        const statsConfig = [
            {key: "topCollection", valueId: "s2-topCollection", label: "Top Collections", decimals: 0, suffix: "", duration: 1500, icon: ICON_TOP_COLLECTION},
            {key: "resources", valueId: "s2-resources", label: "Resources", decimals: 0, suffix: "", duration: 2000, icon: ICON_RESOURCE},
            {key: "size", valueId: "s2-size", label: "Total Size (GB)", decimals: 2, suffix: " GB", duration: 2000, icon: ICON_SIZE}
        ];

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function formatValue(value, decimals, suffix) {
            if (decimals > 0) {
                return value.toFixed(decimals) + suffix;
            }
            return Math.floor(value).toLocaleString() + suffix;
        }

        function animateCounter($el, target, duration, decimals, suffix) {
            const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) {
                $el.text(formatValue(target, decimals, suffix));
                return;
            }

            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = target * easeOutQuart(progress);
                $el.text(formatValue(current, decimals, suffix));

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    $el.text(decimals > 0 ? target.toFixed(decimals) + suffix : target.toLocaleString() + suffix);
                }
            }

            requestAnimationFrame(update);
        }

        function createCard(cfg) {
            const $card = $('<div class="card"></div>');
            const $iconWrap = $('<div class="icon-wrap"></div>').append(cfg.icon);
            const $text = $('<div class="text"></div>');
            const initial = cfg.decimals > 0 ? (0).toFixed(cfg.decimals) + cfg.suffix : "0";
            const $value = $('<div class="value"></div>').attr("id", cfg.valueId).text(initial);
            const $label = $('<div class="label"></div>').text(cfg.label);

            $text.append($value, $label);
            $card.append($iconWrap, $text);

            return {$card: $card, $value: $value};
        }

        function renderStats(data) {
            const $section = $('<div class="section" id="stats-2"></div>');
            const $row = $('<div class="stats-row s2"></div>');

            statsConfig.forEach(function (cfg) {
                const value = parseFloat(data[cfg.key]) || 0;
                const parts = createCard(cfg);
                $row.append(parts.$card);
                animateCounter(parts.$value, value, cfg.duration, cfg.decimals, cfg.suffix);
            });

            $section.append($row);
            $("#stats-container").empty().append($section);
        }

        function loadStats() {
            const lang = drupalSettings.arche_core_gui.gui_lang;
            const url = "/browser/api/frontendStat/" + lang;

            $.getJSON(url)
                .done(function (data) {
                    $("#stats-container-loader").hide();
                    renderStats(data || {});
                })
                .fail(function () {
                    $("#stats-container-loader").hide();
                    renderStats({});
                });
        }

        if ($("#stats-container").length) {
            loadStats();
        }
    });
});
