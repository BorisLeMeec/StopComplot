chrome.runtime.onInstalled.addListener(function(o){
  var sheetID = "https://docs.google.com/spreadsheets/d/1FWp879VjaBzrcZXYKTMpxKba1KXNNXlBI2hSSAigx4s/pub?output=csv";
  var sites = [];
  $.get(sheetID, function(data){
    Papa.parse(sheetID, {
	     download: true,
       step: function(row){
         var site = {lvl: row.data[0][0], domain: row.data[0][1]};
         sites.push(site);
       },
	     complete: function() {
         chrome.storage.sync.set({"listDomains":sites}, function(){
         });
         chrome.storage.sync.get("listDomains", function(datas){
         });
	     }
    });
  })
  // chrome.runtime.openOptionsPage();
  // chrome.tabs.create({url: "http://yoursite.com/"}, function (tab) {
  //       console.log("New tab launched with http://yoursite.com/");
  //   });
});

chrome.tabs.onActivated.addListener(function(activeInfos){
  var url;

  chrome.tabs.query({"active": true}, function(tabs){
    var url = "";
    if (tabs[0].url)
      url = new URL(tabs[0].url).hostname;
    updateUrl(url);
  });
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
    if (activeInfos.tabId == tabId){
      if (changeInfo.url)
        chrome.tabs.query({"active":true}, function (tabs){
          updateUrl(new URL(tabs[0].url).hostname);
        })
    }
  });
});

function updateUrl(url){
  chrome.storage.sync.get("listDomains", function(datas){
    var found = false;
    var title = chrome.i18n.getMessage("msgInfo_unknown");
    chrome.browserAction.setIcon({path: "icons/unknown.png"});
    for (i = 0; i < datas.listDomains.length; ++i) {
      var e = datas.listDomains[i];
      if (url.search(e.domain) != -1){
        found = true;
        title = chrome.i18n.getMessage("msgInfo_"+e.lvl);
        chrome.browserAction.setIcon({path: 'icons/'+e.lvl+'.png'});
      }
    }
    chrome.browserAction.setTitle({title :title});
  });
};
