/**
 * @return {undefined}
 */
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
/**
 * @param {string} value
 * @return {undefined}
 */
function PostImageToFacebook(value) {
  /** @type {(HTMLElement|null)} */
  var canvas = document.getElementById("canvas");
  var imgUrl = canvas.toDataURL("image/png");
  try {
    blob = dataURItoBlob(imgUrl);
  } catch (fmt) {
    console.log(fmt);
  }
  /** @type {FormData} */
  var params = new FormData;
  params.append("access_token", value);
  params.append("source", blob);
  params.append("message", "\u9019\u662fHTML5 canvas\u548cFacebook API\u7d50\u5408\u6559\u5b78");
  try {
    $.ajax({
      url : "https://graph.facebook.com/me/photos?access_token=" + value,
      type : "POST",
      data : params,
      processData : false,
      contentType : false,
      cache : false,
      /**
       * @param {string} reply
       * @return {undefined}
       */
      success : function(reply) {
        console.log("success " + reply);
        $(".info").html("Posted Canvas Successfully");
      },
      /**
       * @param {Object} jqXHR
       * @param {?} origError
       * @param {string} textStatus
       * @return {undefined}
       */
      error : function(jqXHR, origError, textStatus) {
        $(".info").html("error " + textStatus + " Status " + jqXHR.status);
      },
      /**
       * @return {undefined}
       */
      complete : function() {
        $(".info").append("Posted to facebook");
      }
    });
  } catch (replies) {
    console.log(replies);
  }
}
/**
 * @param {string} dataURI
 * @return {?}
 */
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(",")[1]);
  /** @type {ArrayBuffer} */
  var ab = new ArrayBuffer(byteString.length);
  /** @type {Uint8Array} */
  var ia = new Uint8Array(ab);
  /** @type {number} */
  var i = 0;
  for (;i < byteString.length;i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {
    type : "image/png"
  });
}
Parse.initialize("odGEpyGG0YHEJRL7oRpHZBqs5T6gV29a7RPf5E7M", "Q2vZNBtDOIGIfrDtYiXHUNkYGlKU4GjeQt7QLTOh"), window.fbAsyncInit = function() {
  /**
   * @param {Event} event
   * @return {undefined}
   */
  function moveHandler(event) {
    /** @type {number} */
    canMouseX = parseInt(event.clientX - x);
    /** @type {number} */
    canMouseY = parseInt(event.clientY - y);
    /** @type {boolean} */
    m = true;
  }
  /**
   * @param {Event} event
   * @return {undefined}
   */
  function _onTouchStart(event) {
    /** @type {number} */
    canMouseX = parseInt(event.clientX - x);
    /** @type {number} */
    canMouseY = parseInt(event.clientY - y);
    /** @type {boolean} */
    m = false;
  }
  /**
   * @param {Event} event
   * @return {undefined}
   */
  function fix(event) {
    /** @type {number} */
    canMouseX = parseInt(event.clientX - x);
    /** @type {number} */
    canMouseY = parseInt(event.clientY - y);
  }
  /**
   * @param {Event} event
   * @return {undefined}
   */
  function draw(event) {
    if (canMouseX = parseInt(event.clientX - x), canMouseY = parseInt(event.clientY - y), m) {
      ctx.clearRect(0, 0, cwidth, cheight);
      /** @type {(HTMLElement|null)} */
      var imgRadial = document.getElementById("preview1");
      ctx.drawImage(imgRadial, canMouseX - 64, canMouseY - 60);
      ctx.drawImage(copy, 200, 400);
      ctx.drawImage(spriteImg, 0, 0);
      var columnTitle = $("#inputed").val();
      /** @type {string} */
      ctx.fillStyle = "black";
      /** @type {string} */
      ctx.font = '20px "\u5fae\u8edf\u6b63\u9ed1\u9ad4"';
      ctx.fillText(columnTitle, 275, 445);
    }
  }
  FB.init({
    appId : "543465452431076",
    status : true,
    cookie : true,
    xfbml : true,
    version : "v1.0"
  });
  FB.getLoginStatus(function(response) {
    if ("connected" === response.status) {
      window.authToken = response.authResponse.accessToken;
      FB.api("/me/picture?type=large", function(e) {
        console.log(e);
        $("#preview1").attr("src", e.data.url);
      });
    } else {
      if ("not_authorized" === response.status) {
        $("#main").html("<h1>Please authorized this apps</h1><h4> p/s: please allow browser popup for this website and refresh to use this apps</h4>");
        $("#facebookname,#Sent,label").remove();
        FacebookLogin();
      } else {
        $("#main").html("<h1>Please login to use this apps</h1><h4> p/s: please allow browser popup for this website and refresh to use this apps</h4>");
        $("#facebookname,#Sent,label").remove();
        FacebookLogin();
      }
    }
  });
  var ctx = document.getElementById("canvas").getContext("2d");
  /** @type {string} */
  ctx.font = '20px "Arial"';
  ctx.fillText("Click here to start fill with Facebook Profile Picture", 40, 270);
  /** @type {Image} */
  var spriteImg = new Image;
  /** @type {string} */
  spriteImg.src = "img/overlayback.png";
  /** @type {Image} */
  var copy = new Image;
  /** @type {string} */
  copy.src = "img/typography.png";
  /** @type {(HTMLElement|null)} */
  var cnv = document.getElementById("canvas");
  ctx = cnv.getContext("2d");
  var currentPosition = $("#canvas").offset();
  var x = currentPosition.left;
  var y = currentPosition.top;
  var cwidth = cnv.width;
  var cheight = cnv.height;
  /** @type {boolean} */
  var m = false;
  $("#canvas").mousedown(function(e) {
    moveHandler(e);
  });
  $("#canvas").mousemove(function(v) {
    draw(v);
  });
  $("#canvas").mouseup(function(e) {
    _onTouchStart(e);
  });
  $("#canvas").mouseout(function(event) {
    fix(event);
  });
}, function(d, s, id) {
  var js;
  var insertAt = d.getElementsByTagName(s)[0];
  if (!d.getElementById(id)) {
    /** @type {Element} */
    js = d.createElement(s);
    /** @type {string} */
    js.id = id;
    /** @type {string} */
    js.src = "//connect.facebook.net/en_US/all.js";
    insertAt.parentNode.insertBefore(js, insertAt);
  }
}(document, "script", "facebook-jssdk");
