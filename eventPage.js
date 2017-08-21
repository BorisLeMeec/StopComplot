chrome.runtime.onInstalled.addListener(function(o){
  console.log("Install StopComplot");
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
           console.log("Synced.");
         });
         console.log("Done.");
         chrome.storage.sync.get("listDomains", function(datas){
           console.log(datas);
         });
	     }
    });
  })
  // chrome.runtime.openOptionsPage();
});

chrome.tabs.onActivated.addListener(function(activeInfos){
  var url;

  chrome.tabs.query({"active": true}, function(tabs){
    if (tabs[0].url){
      url = new URL(tabs[0].url).hostname;
      updateUrl(url);
    }
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
    for (i = 0; i < datas.listDomains.length; ++i) {
      var e = datas.listDomains[i];
      if (url == e.domain){
        var path;
        switch (e.lvl) {
          case "ok":
            path = "IconGood.png";
            break;
          case "complot":
            path = "IconBad.png";
            break;
          case "usersInput":
            path = "IconUserInput.png";
            break;
          case "nonObj":
            path = "IconNoObj.png";
            break;
        }
        chrome.browserAction.setIcon({path: path});
      }
    };
  })
};
