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
        //https://cybozudev.zendesk.com/hc/ja/articles/202166270-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E7%B7%A8%E9%9B%86%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88
        var record = kintone.app.record.get();
        record["record"]["フィールド名"]["value"] = "書き換えた値";
        kintone.app.record.set(record);
        */
        alert("now edit record!");
    });

    //レコード編集保存前(pc)
    kintone.events.on("app.record.edit.submit", function(event){
        /*
        //編集前の値の書き換え
        var record = event.record;
        record['文字列_0']['value'] = 'この文字列で上書き';
        record['Table']['value'][0]['value']['文字列_1']['value'] = 'テーブルの1レコード目を上書き';
     
        //サブテーブルの末尾に行を追加する
        var newRow = {
            value: {
                文字列_1: {
                    type: 'SINGLE_LINE_TEXT',
                    value: 'サブテーブルに追加する行'
                }
            }
        };
        record['Table']['value'].push(newRow);
        
        return event;
        */
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