kintoneJavaScripts
==================

kintoneのJavaScriptカスタマイズテンプレート集です。  
各サンプルにはアプリテンプレート(zip)ファイルが付属しているので、お使いのkintone環境に追加することですぐに試してみることができます。

## サンプル一覧

 * [一覧リストで、フィールドの値に応じてスタイルを変更する](https://github.com/icoxfog417/kintoneJavaScripts/tree/master/changeFieldColorInList)


## [kineont APIドキュメント](https://cybozudev.zendesk.com/hc/ja/categories/200147600)

### [レコード一覧表示イベントの際使える処理](https://cybozudev.zendesk.com/hc/ja/articles/201942004-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7%E6%83%85%E5%A0%B1%E5%8F%96%E5%BE%97)

* kintone.app.getQueryCondition：一覧表示のクエリ引数を取得する
* kintone.app.getQuery：一覧表示のクエリ引数を取得する
* kintone.app.getFieldElements：一覧のフィールド要素(列)を取得する。行ごとに処理するには、ループで回す必要あり。

列単位でなく、行を取得したい場合は`event.records`で取得する。行を取得しての処理は[こちら](https://cybozudev.zendesk.com/hc/ja/articles/202640970-%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%8C%E6%8B%85%E5%BD%93%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AB%E8%83%8C%E6%99%AF%E8%89%B2%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B)が参考になります。

### [レコード詳細情報取得](https://cybozudev.zendesk.com/hc/ja/articles/201942014-%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89%E8%A9%B3%E7%B4%B0%E6%83%85%E5%A0%B1%E5%8F%96%E5%BE%97)

* kintone.app.record.getId：レコードIDを取得する
* kintone.app.record.getFieldElement：フィールドの要素を取得する
* kintone.app.record.set：レコードへの値のセット
* kintone.app.record.getSpaceElement：スペース要素の取得

### [kintone REST API リクエスト](https://cybozudev.zendesk.com/hc/ja/articles/202166310-kintone-REST-API-%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88)
他のアプリ、また自分のアプリのデータをJavaScriptから取得したい場合は、REST APIを利用します。
※ゲストユーザーは使えないので注意してください(2014/7現在)。

自分のアプリ内のレコード(レコード番号=5)の取得
```
var appId = kintone.app.getId();
kintone.api('/k/v1/record', 'GET', {app: appId, id: 5}, function(resp) {
    alert(resp['record']['record_no']['value']); 
});
```

### [PCとスマートフォンで使える関数の対応表](https://cybozudev.zendesk.com/hc/ja/articles/202738940-PC-%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%B3-%E6%97%A9%E8%A6%8B%E8%A1%A8)

## JavaScriptテンプレート

```js
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
```

