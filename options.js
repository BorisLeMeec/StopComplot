document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get("listDomains", function(datas){
    var ul = document.getElementById("listDomains");
    for (i = 0; i < datas.listDomains.length; ++i) {
      var e = datas.listDomains[i];
      var html = $('<li><span class=\"domain '+e.lvl+'\">'+e.domain+'</span></li>');
      $("#listDomains").append(html)
    };
  });
});

function addDomain()
{
  console.log("COUCOU");
}
