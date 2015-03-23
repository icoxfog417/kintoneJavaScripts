/*
 * markdown
 * (It requires to load marked.min.js)
 * Licensed under the MIT License
 */
(function() {
    "use strict";
    
    var showEvents = ["app.record.detail.show"];

    //Show preview to 
    kintone.events.on(showEvents, function(event){
        var record = event.record;
        var doc = kintone.app.record.getFieldElement("document");
        doc.innerHTML = marked(record["document"].value);
    });
    
})();
