captureImage
==================

kintone上で、カメラの映像をキャプチャし添付ファイルフィールドに保存するサンプルです。

![Image](https://raw.githubusercontent.com/icoxfog417/kintoneJavaScripts/master/captureImage/image.PNG)

* キャプチャは、カメラ画像をクリックすることで撮ることができます
* kintoneの制約上、現在レコード編集画面でしか使えません。そのため、一旦レコードを作成してからキャプチャを行う必要があります(対応方法検討中)。
 * 添付ファイルのフィールドが、レコード保存イベントで編集できない
 * REST APIであれば更新可能だが、「更新」はレコードが登録済みでないと不可能なため、レコード登録画面では使えない
