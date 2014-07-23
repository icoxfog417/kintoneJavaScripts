/*
 * changeFieldColorInList
 * Licensed under the MIT License
 */
(function() {
    "use strict";
    
    //リスト一覧表示時(pc)
    kintone.events.on("app.record.index.show", function(event){
        //一覧上のステータスフィールドの列を取得
        var rowsOfStatus = kintone.app.getFieldElements("Status");
        
        //一覧の行数分ループ
        for(var i = 0; i < event.records.length;i++){
            var record = event.records[i];
            if(record["Status"].value == "緊急"){
                rowsOfStatus[i].style.color = "red";
                rowsOfStatus[i].style.fontWeight = "bold";
            }
        }
    });
        
})();