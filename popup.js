// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  chrome.tabs.getSelected(null, function (tab) {
    console.assert(typeof tab.url == 'string', 'tab.url should be a string');
    callback(tab.url)
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var fullUrl = new URL(url)
    var domain = fullUrl.hostname

    renderStatus('Hoax : ' + domain);
  });
});
