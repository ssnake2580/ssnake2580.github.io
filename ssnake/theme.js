/* Decap 3.17.3 uses Emotion-generated rules without a public theme API.
 * Override its color declarations, preserving layout, media rules and states.
 * A palette map also covers controls mounted later (menus and media dialogs).
 */
(() => {
  'use strict';
  const palette = {
    '#fff': '#191e1c', '#ffffff': '#191e1c',
    '#eff0f4': '#101214', '#798291': '#afbcaf', '#313d3e': '#e8eee5',
    '#3a69c7': '#a6ef73', '#e8f5fe': '#263a22', '#005614': '#c2f3a5',
    '#caef6f': '#2a4023', '#754e00': '#f1d18e', '#ffee9c': '#3b3320',
    '#ff003b': '#ff8b9e', '#d60032': '#ff8b9e', '#fcefea': '#3a242a',
    '#70399f': '#d1b0f2', '#f6d8ff': '#33273e', '#17a2b8': '#a6ef73',
    '#117888': '#c2f3a5', '#ddf5f9': '#263a22', '#dfdfe3': '#384438',
    '#5d626f': '#afbcaf', '#f2f2f2': '#202720', '#e6e6e6': '#2b352a',
    '#aae31f': '#a6ef73', '#555a65': '#384b32', '#eaebf1': '#384438',
    '#fbe0d7': '#3a242a', '#1195aa': '#a6ef73', '#c4c6d2': '#879789',
  };
  const properties = /^(color|background-color|border(?:-(?:top|right|bottom|left))?(?:-color)?|outline(?:-color)?|fill|stroke)$/;
  function recolor(value, property) {
    // White foregrounds must remain readable on the new dark surfaces.
    return value.replace(/#[\da-f]{3,8}\b|rgba?\([^)]*\)|\bwhite\b/gi, token => {
      let key = token.toLowerCase();
      if (key === 'white') key = '#ffffff';
      if (key.startsWith('rgb')) {
        const channels = key.match(/[\d.]+/g);
        if (!channels || channels.length !== 3) return token;
        key = '#' + channels.map(n => Number(n).toString(16).padStart(2, '0')).join('');
      }
      if ((key === '#fff' || key === '#ffffff') && /^(color|fill|stroke)$/.test(property)) return '#e8eee5';
      if (property === 'background-color' && ['#313d3e', '#3a69c7', '#17a2b8', '#aae31f'].includes(key)) return '#304b27';
      return palette[key] || token;
    });
  }
  const overrides = document.createElement('style');
  overrides.id = 'knights-cms-palette';
  document.head.appendChild(overrides);
  let signature = '';
  let queued = false;
  function rulesToCSS(rules) {
    return Array.from(rules, rule => {
      if (rule.type === CSSRule.STYLE_RULE) {
        const declarations = Array.from(rule.style).filter(p => properties.test(p)).map(p => {
          const original = rule.style.getPropertyValue(p);
          const changed = recolor(original, p);
          return changed === original ? '' : `${p}:${changed} !important;`;
        }).join('');
        return declarations ? `${rule.selectorText}{${declarations}}` : '';
      }
      if (rule.cssRules && rule.conditionText) {
        const content = rulesToCSS(rule.cssRules);
        const prefix = rule.cssText.slice(0, rule.cssText.indexOf('{'));
        return content ? `${prefix}{${content}}` : '';
      }
      return '';
    }).join('\n');
  }
  function refresh() {
    queued = false;
    const sheets = Array.from(document.querySelectorAll('style[data-emotion]')).map(el => el.sheet).filter(Boolean);
    const next = sheets.map(sheet => sheet.cssRules.length).join(',');
    if (next === signature) return;
    signature = next;
    overrides.textContent = sheets.map(sheet => rulesToCSS(sheet.cssRules)).join('\n');
  }
  new MutationObserver(() => {
    if (!queued) { queued = true; requestAnimationFrame(refresh); }
  }).observe(document.documentElement, { childList: true, subtree: true });
  refresh();
})();
