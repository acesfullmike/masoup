function base64(str) {
	var kid = new Base64();
//	alert("[" + str + "]");
	if(str) {
		return kid.encode(str);
	} else {
		console.log("bad for base64: " + str);
	}
}

function has(str, criteria) {
	if(str == null || criteria == null) {
		return false;
	}
	
	return str.toLowerCase().indexOf(criteria.toLowerCase()) != -1;
}

function refresh() {
	var href = window.location.href;
	var regex = new RegExp("#.+$");
	var real = href.replace(regex, "");
	console.log(href, real);
	window.location.href = real;
}

function htmlTitle(htmlTitle) {
	$(document).attr("title", htmlTitle);
}

function isNOE(source) {
		if(source == null) {
			return true;
		}

		var temp = source.trim();
		if(temp.length == 0) {
			return true;
		}

		return false;
	}

function flog() {
	var len = arguments.length;
	for (i =0 ; i < len; i++) {
		console.log("DEBUG: ", arguments[i]);
	}
}
function isWindows() {
	var flag = /windows|win32/i.test(navigator.userAgent);
	return flag;
}

function isFromMobile() {
	var agent = navigator.userAgent;
	var type = "PC";
	var ipad = agent.match(/(iPad).*OS\s([\d_]+)/);
	var isMobile = false;
	if(ipad) {
		type = "iPad";
	} else {
		var isIphone = agent.match(/(iPhone\sOS)\s([\d_]+)/);
		if(isIphone) {
			type = "iPhone";
			isMobile = true;
		} else {
			var isAndroid = agent.match(/(Android)\s+([\d.]+)/)
			if(isAndroid) {
				type = "Android";
				isMobile = true;
			}
		}
	}
	
	return isMobile;
}

function isFromIOS() {
	var agent = navigator.userAgent;
	var ipad = agent.match(/(iPad).*OS\s([\d_]+)/);
	if(ipad) {
		return true;
	}
	var isIphone = agent.match(/(iPhone\sOS)\s([\d_]+)/);
	if(isIphone) {
		return true;
	}
	
	return false;
}

function isMobileAndNotWifi() {
	var isMobile = isFromMobile();
	
	if(isMobile) {
		var connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:'unknown'};
		var network = connection.type;
		var notWifi = network != "wifi";
		
		if(notWifi) {
			return true;
		}
	}
	
	return false;
}

function hashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash) + char;
        hash = hash & hash;
    }
    return hash;
}
		
function knbsp(count) {
	var temp = "";
	for(var m = 0; m < count; m++) {
		temp += "&nbsp;";
	}
	return temp;
}

function repeat(str, count) {
	var temp = "";
	for(var m = 0; m < count; m++) {
		temp += str;
	}
	return temp;
}

function trOfDonation() {
	var boxMoney = $("<input></input>").attr("type", "checkbox");
	boxMoney.css("vertical-align", "middle");
	boxMoney.addClass("cold");
	boxMoney.click(function() {
		var div = $(this).parent().find(".warm");
		if ($(this).prop("checked")) {
			div.show();
		} else {
			div.hide();
		}
	});

	var infoMoney = $("<input></input>").attr("type", "button").val("光明正大打赏，心安理得笑纳").addClass("btn btn-warning");
	infoMoney.click(function() {
		$(this).parent().find(".cold").click();
	});

	var image = $("<img></img>").attr("alt", "<打赏二维码，点击加载>");
	image.attr("src", "/storage/donation.weixin.foxi.png");
	image.css("max-width", "100%");
	
	var divBrImage = $("<div></div>");
	divBrImage.addClass("warm");
	divBrImage.append(image);
	divBrImage.hide();
	
	var td = $("<td></td>");
	
	td.append(boxMoney).append("&nbsp;").append(infoMoney);
	td.append(divBrImage);
	var tr = $("<tr></tr>").append(td);
	return tr;
}

function loadImage(obj, url, callback) {
    var img = new Image();
    img.src = url;

    // 判断图片是否在缓存中
    if(img.complete){
        callback.call(img, obj);
        return;
    }

    // 图片加载到浏览器的缓存中回调函数
    img.onload = function(){
        callback.call(img, obj);
    }
}

function showImage(obj){
    obj.src = this.src;
    $(obj).parent().attr("href", obj.src);
}

function tdOfBreakword() {
	var td = $("<td></td>");
	td.css("word-wrap", "break-word");
	return td;
}

function labelOf(some) {
	var td = $("<label></label>").text(some).addClass("label");
	return td;
}

function anchorBy(element) {
	var anchor = $("<a></a>").append(element);
	return anchor;
}

function anchorOf(see, href) {
	var anchor = $("<a></a>").text(see).attr("href", href).attr("target", "_blank");
	return anchor;
}

function anchorOfSelf(see, href) {
	var anchor = $("<a></a>").text(see).attr("href", href);
	return anchor;
}

function addAlbumListNavi(sitename) {
	var navi = $("<span></span>");
	navi.append(anchorOfSelf("相册", "/albums"));
	navi.append(" » ").append(sitename);
	navi.append("(");
	navi.append($("<span>0</span>").attr("id", "count"));
	navi.append("个)");
	
	return navi;
}

function addAlbumNavi(sitename, router) {
	var navi = $("<span></span>");
	$("#navy").append(anchorOfSelf("相册", "/albums"));
	$("#navy").append(" » ");
	$("#navy").append(anchorOfSelf(sitename, router + "/list"));
	
	return navi;
}

var bstyles = ["default", "primary", "success", "info", "warning", "danger"];

function styleK(k) {
	var indexA = k % bstyles.length;
	var style = bstyles[indexA];
	return style;
}