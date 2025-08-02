// ==UserScript==
// @name         Pokemon Showdown一键复制rep链接
// @name:en      Pokémon Showdown Replay Link Exporter
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  在pokemon showdown replay添加一个按钮用于一键复制所有回放链接以便复制到replay scouter中
// @description:en  Added a button in pokemon showdown replay page to copy all the replay links to paste in the replay scouter
// @author       AnsonIsTheBest
// @match        https://replay.pokemonshowdown.com/*
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @license      WTFPL
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        .export-replay-button {
            background-color: #4CAF50;
            color: white;
            padding: 8px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin-left: 15px;
            vertical-align: middle;
        }
        .export-replay-button:hover {
            background-color: #45a049;
        }
    `);

    const checkInterval = setInterval(() => {
        const targetElement = document.querySelector('.main h1');
        if (targetElement && !document.querySelector('.export-replay-button')) {
            clearInterval(checkInterval);

            let exportButton = document.createElement('button');
            exportButton.innerHTML = '复制所有回放链接Copy all replay links';
            exportButton.className = 'export-replay-button';

            targetElement.appendChild(exportButton);

            exportButton.addEventListener('click', () => {
                const linkElements = document.querySelectorAll('ul.linklist a.blocklink');
                if (linkElements.length > 0) {
                    const links = Array.from(linkElements).map(a => a.href);
                    const linksText = links.join('\n');

                    GM_setClipboard(linksText, 'text');

                    exportButton.innerHTML = `已复制 ${links.length} 条链接！Copied ${links.length} links!`;
                    setTimeout(() => {
                        exportButton.innerHTML = '复制所有回放链接Copy all replay links';
                    }, 2000);
                } else {
                    exportButton.innerHTML = '未找到链接Did not find any links';
                     setTimeout(() => {
                        exportButton.innerHTML = '复制所有回放链接Copy all replay links';
                    }, 2000);
                }
            });
        }
    }, 500);

})();