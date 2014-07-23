/*
 * kintone javaScriptカスタマイズのテンプレート
 * 
 * Licensed under the MIT License
 */
(function() {
    "use strict";
    
    //リスト一覧表示時(pc)
    kintone.events.on("app.record.index.show", function(event){
        //アプリIDの取得
        var appId = kintone.app.getId();
        
        //ユーザー情報の取得
        var user = kintone.getLoginUser();
        
        alert("Hellow " + user.name + ". now show records! appId is " + appId);
    });
    
    //レコード表示時(pc)
    kintone.events.on("app.record.detail.show", function(event){
        var recordId = kintone.app.record.getId();
        alert("now show record " + recordId + "!");
    });

    //レコード編集時(pc)
    kintone.events.on("app.record.edit.show", function(event){
        /*
        //レコードの値の取得とセット
        var record = kintone.app.record.get();
        record["record"]["フィールド名"]["value"] = "書き換えた値";
        kintone.app.record.set(record);
        */
        alert("now edit record!");
    });

    //レコード編集保存前(pc)
    kintone.events.on("app.record.edit.submit", function(event){
        alert("now save edit!");
    });

    //レコード追加時(pc)
    kintone.events.on("app.record.create.show", function(event){
        alert("now record create!");
    });

    //レコード追加保存前(pc only)
    kintone.events.on("app.record.create.submit", function(event){
        alert("now save create!");
    });

    //レコード削除前イベント(pc)
    kintone.events.on("app.record.detail.delete.submit", function(event){
        alert("now delete record!");
    });
    
})();