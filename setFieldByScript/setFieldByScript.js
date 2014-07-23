/*
 * setFieldByScript
 * Licensed under the MIT License
 */
(function() {
    "use strict";
    
    var showEvents = ["app.record.edit.show","app.record.create.show"];    
    var saveEvents = ["app.record.edit.submit","app.record.create.submit"];

    //レコード編集/追加画面表示時のイベント。ここで、通知フィールドを編集不可にする
    kintone.events.on(showEvents, function(event){
        var record = event.record;
        record["NOTIFICATION"]["disabled"] = true; //編集不可にする
        return event;
    });

    //レコード編集/追加実行時のイベント。ここで、通知フィールドに値を設定する
    kintone.events.on(saveEvents, function(event){
        var record = event.record;
        //件名と納期を結合して、通知件名のフィールドを設定
        record["NOTIFICATION"].value = record["TITLE"].value + "_" + record["DELIVERY_DATE"].value.replace(/-/g,"/");
        return event;
    });
    
})();