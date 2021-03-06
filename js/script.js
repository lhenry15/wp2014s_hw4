
window.fbAsyncInit = function () {

    FB.init({
        appId: '543465452431076',
        status : true,
    	cookie : true, 
        xfbml: true,
        version: 'v2.0'
    });
    FB.getLoginStatus(function(response) {
  		if (response.status === 'connected') {
    		window.authToken = response.authResponse.accessToken;
    		FB.api("/me/picture?type=large", function(e) {
        		console.log(e);
        		$("#preview1").attr("src", e.data.url);
     	 	});     	 
  		}else if(response.status === 'not_authorized'){
  			$("#main").html("<h1>Please authorized this apps</h1><h4> p/s: please allow browser popup for this website and refresh to use this apps</h4>");
        	$("#facebookname,#Sent,label").remove();
        	FacebookLogin();
  		}else{
  			$("#main").html("<h1>Please login to use this apps</h1><h4> p/s: please allow browser popup for this website and refresh to use this apps</h4>");
        	$("#facebookname,#Sent,label").remove();
        	FacebookLogin();
  		}  		
 	});
};
 	
 	var ctx = document.getElementById('canvas').getContext('2d'); //宣告變數找到頁面的canvas標籤的2d內容
	ctx.font='20px "Arial"'; //設定字體與大小
	ctx.fillText("Click here to start fill with Facebook Profile Picture", 40, 270); //設定預設的開始畫面
    var img = new Image(); // 新增圖像1
    img.src = "img/overlay.png"; //圖像路徑（路徑自己設，且自己加入想要的圖層）
	var img2 = new Image(); //新增圖像2
	img2.src = "img/bg.png" //圖像路徑
	var img3 = new Image();//新增圖像3
	img3.src = "img/typography.png"//圖像路徑
	
	

	//宣告基本變數
    var canvas=document.getElementById("canvas"); //宣告變數找到canvas標籤
    var ctx=canvas.getContext("2d"); //找到2d內容
    var canvasOffset=$("#canvas").offset();//找到offset
    var offsetX=canvasOffset.left;//左方
    var offsetY=canvasOffset.top;//上方
    var canvasWidth=canvas.width;//大小
    var canvasHeight=canvas.height;//高度
    var isDragging=false;//拖拉

    function handleMouseDown(e){//滑鼠按下的函數
      canMouseX=parseInt(e.clientX-offsetX);//抓滑鼠游標X
      canMouseY=parseInt(e.clientY);//抓滑鼠游標y
     
      // set the drag flag
      isDragging=true;//宣告拖拉變數
    }

    function handleMouseUp(e){//滑鼠放掉的函數
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY);
      // clear the drag flag
      isDragging=false;
    }

    function handleMouseOut(e){//滑鼠移開的函數
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY);
      // user has left the canvas, so clear the drag flag
      //isDragging=false;
    }

    function handleMouseMove(e){//滑鼠移動的event
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY);
      // if the drag flag is set, clear the canvas and draw the image
      if(isDragging){ //當拖拉為True時
          	ctx.clearRect(0,0,canvasWidth,canvasHeight); //移除canvas起始的內容
			var profileIMG = document.getElementById("preview1");//抓html裡預載入的照片
			profileIMG.crossOrigin = "Anonymous"; // 這務必要做，為了讓Facebook的照片能夠crossdomain傳入到你的頁面，CORS Policy請參考https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 
			//canvas.width = profileIMG.width;//設定canvas的大小需符合profileimg的大小
			//canvas.height = profileIMG.height;	
			ctx.drawImage(img2,0,0); //劃入img2
			ctx.drawImage(profileIMG,offsetX/2,offsetY/2);				
			ctx.drawImage(img3,canMouseX-128/2,canMouseY-120/2); //根據你的滑鼠游標移動，你可以自行更換想要移動的圖層，數值會因XY軸向有所不同
									
			var inputedText = $('#inputed').val();//抓取頁面inputed ID的內容
			ctx.fillStyle = "black"; //字體顏色
			ctx.font='20px "微軟正黑體"'; //字體大小和字形			
			ctx.fillText(inputedText, canMouseX-1/2,canMouseY-30/2); //字體也可以依據滑鼠游標移動，所輸入的值可自行調整，若不想移動輸入的字體，可以把它改成（inputedText,0,0)X Y軸 0，0的位置
      }
    }

	//抓取滑鼠移動的event
    $("#canvas").mousedown(function(e){handleMouseDown(e);});
    $("#canvas").mousemove(function(e){handleMouseMove(e);});
    $("#canvas").mouseup(function(e){handleMouseUp(e);});
    $("#canvas").mouseout(function(e){handleMouseOut(e);});
	
 

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js"; 
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

 
function PostImageToFacebook(authToken) {
	$('.info').append('<img src="img/loading.gif"/>')//載入loading的img
	 authToken = window.authToken;
    var canvas = document.getElementById("canvas");//找canvas
    var imageData = canvas.toDataURL("image/png");//把canvas轉換PNG
    try {
        blob = dataURItoBlob(imageData);//把影像載入轉換函數
    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
    var fd = new FormData();
    
    console.log('Access Token = '+ authToken);
    fd.append("access_token", authToken);//請思考accesstoken要怎麼傳到這function內
    fd.append("source", blob);//輸入的照片
    fd.append("message", "這是HTML5 canvas和Facebook API結合教學");//輸入的訊息
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + authToken,//GraphAPI Call
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);//成功log + photoID
                  $(".info").html("Posted Canvas Successfully. [<a href='http://www.facebook.com/" + data.id + " '>Go to Profile Picture</a>] "); //成功訊息並顯示連接
            },
            error: function (shr, status, data) {
                $(".info").html("error " + data + " Status " + shr.status);//如果錯誤把訊息傳到class info內
            },
            complete: function () {
                $(".info").append("Posted to facebook");//完成後把訊息傳到HTML的div內
            }
        });

    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
}
 
 
 function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}

function FacebookLogin() {
  FB.login(function(response) {
    if (response.authResponse) {
      FB.api("/me", function(elem) {
        var options = elem.name;
        var id = elem.id;
        var Project = Parse.Object.extend("FacebookID");
        var query = new Parse.Query(Project);
        query.equalTo("userID", id);
        query.find({
          /**
           * @param {Array} resp
           * @return {undefined}
           */
          success : function(resp) {
            if (console.log(resp.length), 0 === resp.length) {
              var model = new Project;
              model.set("username", options);
              model.set("userID", id);
              model.save();
            }
          },
          /**
           * @param {Error} err
           * @return {undefined}
           */
          error : function(err) {
            alert("Error: " + err.code + " " + err.message);
          }
        });
      });
      $(".info").html("Wait we'll sent you back....");
      setTimeout(function() {
        window.location.reload();
      }, 2E3);
    }
  }, {
    scope : "user_likes,user_photos,publish_actions"
  });
}
