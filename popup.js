// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}
document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.getBackgroundPage(function (w) {
  });
  document.getElementById('link_options').onclick = openOptionsPage;
});


function openOptionsPage(){
  chrome.runtime.openOptionsPage();
}
