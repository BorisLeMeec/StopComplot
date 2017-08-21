document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get("listDomains", function(datas){
    var ul = document.getElementById("listDomains");
    for (i = 0; i < datas.listDomains.length; ++i) {
      var e = datas.listDomains[i];
      var html = $('<li><span class=\"lvl '+e.lvl+'\">['+e.lvl+']</span><span class=\"domain\">'+e.domain+'</span></li>');
      $("#listDomains").append(html)
    };
  });
});
