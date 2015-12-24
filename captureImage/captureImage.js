/*
 * フォーム編集画面でカメラ画像を表示し、シャッターボタンで写真を撮り添付ファイルフィールドに添付する
 * 
 * Variables:
 *   CAMERA_EL_ID: kintone上でカメラを表示するスペース要素のID
 *   IMAGES_EL_ID: 撮影した写真を保存する添付ファイルフィールド
 *   HEIGHT: カメラ映像の高さ(※幅については、フォーム編集画面の幅に準拠。初期値の場合、4:3で設定)
 * 
 * Licensed under the MIT License
 */
(function(global) {
    "use strict";
		
	navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
	global.G_CAMERA = null;
	
	var Camera = (function(){
		function Camera(cameraElId, height){
			this.CAMERA_ID = "captureCamera";
			this.CANVAS_ID = "captureCameraCanvas";
			this.IMAGE_TYPE = "image/png"
			this.images = [];
			
			//create camera
			var $camera = $("#user-js-" + cameraElId);
			var w = $camera.width();
			var h = Math.round((height > 0) ? height :w / 4 * 3);
			$camera.append('<video id="' + this.CAMERA_ID + '" width="' + w + '" height="' + h + '"></video>');
			$camera.append('<canvas id="' + this.CANVAS_ID + '" style="display:none"></canvas>');
			
			this.width = w;
			this.height = h;
			
			//set variables
			this.camera = document.querySelector("#" + this.CAMERA_ID);
			this.capture = document.querySelector("#" + this.CANVAS_ID);
		}
		
		Camera.prototype.start = function(){
			navigator.getUserMedia({video: true}, function(stream) {
				//$message.text("Push capture button to take snapshot.");
				//$message.addClass("enabled");
			
				G_CAMERA.camera.src = window.URL.createObjectURL(stream);
				G_CAMERA.camera.play();
				G_CAMERA.localMediaStream = stream;
			}, function(){
				//$message.text("failed. please access option page.");
				//$message.addClass("disabled");
			});
			
			this.camera.addEventListener("click", function(){
				if(this.paused){
					this.play();    
				}else{
					this.pause();
					G_CAMERA.takeSnapshot();
				}
			}, false);	
		}
		
		Camera.prototype.takeSnapshot = function(){
			if(this.localMediaStream) {
				var canvas = this.capture;
				canvas.width = this.camera.clientWidth;
				canvas.height = this.camera.clientHeight;
				var context = canvas.getContext("2d");
				context.drawImage(this.camera, 0, 0, canvas.width, canvas.height);
				var imageUrl = canvas.toDataURL(this.IMAGE_TYPE);
				this.images.push(imageUrl);
			}
		}
		
		Camera.prototype.uploadImages = function(){
            if(this.images.length == 0){
                var noImage = new $.Deferred();
                noImage.fail(false);
                return noImage;
            }
            
            var makeRequest = function(fd){
                return {
                    url: "/k/v1/file.json",
                    header: {
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    method: "POST",
                    data: fd,
                    processData: false,
                    contentType: false
                }                
            }
            
            var self = this;
            var token = kintone.getRequestToken();            
            var requests = this.images.map(function(im, i){
                var fd = new FormData();
                var b = self.toBlob(im);
                fd.append("file", b, "snap" + i + "." + self.IMAGE_TYPE.split("/")[1]);
                fd.append("__REQUEST_TOKEN__", token);
                var r = makeRequest(fd);
                var d = $.ajax(r)
                return d;
            });
            
            var uploadImages = new $.Deferred();
			$.when.apply(null, requests).then(function(){
                var results = Array.prototype.slice.call(arguments);
                if(!Array.isArray(results[0])){
                    results = [results];
                }
                
                var fileKeys = [];
                results.forEach(function(r){
                    if("fileKey" in r[0]){
                        fileKeys.push(r[0]["fileKey"]);
                    }
                });
                uploadImages.resolve(fileKeys);
            },function(){
                var results = Array.prototype.slice.call(arguments);
                console.log(results);
                uploadImages.fail(results);
            });
            
            return uploadImages;
			
		}
		
        Camera.prototype.toBlob = function(base64){
            //HTMLCanvasElement.toBlob()
            //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob

            var binStr = atob(base64.split(",")[1]); //remove prefix part
            var len = binStr.length;
            var arr = new Uint8Array(len);
            
            for(var i = 0; i < len; i++){
                arr[i] = binStr.charCodeAt(i);
            }
            
            return new Blob([arr], {type: this.IMAGE_TYPE});
            
        }
        
		return Camera;		
	})();

		
    kintone.events.on(["app.record.create.show", "app.record.edit.show"], function(event){
		var CAMERA_EL_ID = "camera";
		var HEIGHT = 0;

		G_CAMERA = new Camera(CAMERA_EL_ID, HEIGHT);
		G_CAMERA.start();		
    });
    
    kintone.events.on(["app.record.edit.submit"], function(event){
        var IMAGE_EL_ID = "images";

        var update = new kintone.Promise(function(resolve, reject) {
            G_CAMERA.uploadImages().then(function(results){
                var images = []; //record[IMAGE_EL_ID]["value"];
                results.forEach(function(fk){
                    images.push({
                        "fileKey": fk
                    });
                });
                
                var data = {
                    "app": kintone.app.getId(),
                    "id": kintone.app.record.getId(),
                    "record": {}
                }
                data["record"][IMAGE_EL_ID] = {
                    "value": images
                }
                
                kintone.api("/k/v1/record", "PUT", data).then(resolve, reject);
            }, reject);
        })
        
        update.then(function(result){
            console.log(result);
            return event;
        }, function(err){
            console.log(err);
        });
        
    });
	
})(this);
