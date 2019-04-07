
var zoomDefault; 
var map = null;
var marker = null;
var locationTimer = null;

function pick(zoomDefault) {
	if(!zoomDefault) {
		zoomDefault = 15;
	}
	
    map = new AMap.Map("container", {
        resizeEnable: true
    });
    
    map.on("zoomchange",function(event){
    	flog(this.getZoom());
    	$("#cleanLocationAndAddress").val("清" + this.getZoom());
    });
    
    //为地图注册click事件获取鼠标点击出的经纬度坐标
    var clickEventListener = map.on('click', function(e) {
    	console.log(e.lnglat, 1002);
        displayLocation(e.lnglat);
		marker.setPosition(e.lnglat);
		findAddressOfMarker();
    });
    
    var auto = new AMap.Autocomplete({
        input: "address"
    });
    
    AMap.event.addListener(auto, "select", select);
	marker = new AMap.Marker({
	    	draggable: true,
	    	cursor: 'move',
			raiseOnDrag: true
	});

	AMap.event.addListener(marker,'dragend',function(e){
		displayLocation(e.lnglat);
		findAddressOfMarker();
	});
	
	AMap.event.addListener(marker,'dragging',function(e){
		displayLocation(e.lnglat);			
	});
	
	marker.setMap(map);
	
    function select(e) {
        if (e.poi && e.poi.location) {
			var niceAddress = e.poi.name + " " + e.poi.district;
			setTimeout(function(){
				$("#address").val(niceAddress);
			}, 100);
			htmlTitle(niceAddress);
        	var location = e.poi.location;
            map.setCenter(location);
            displayLocation(location);        		
        	marker.setPosition(location);
        }
    }

    map.setZoom(zoomDefault);
    $("#location").keyup(queryViaEnter);
    $("#location").attr("placeholder", "经纬度，如: 123 45，回车或等待");
	$("#location").bind("input", function(){
		if(locationTimer) {
			clearTimeout(locationTimer);
		}
		locationTimer = setTimeout(function(){
			locateTriggeredByHandinput();
		}, 1000);
	});
}

function displayLocation(king) {
	$("#location").val(king.getLng() + ',' + king.getLat());
	copyPosition();
}

function initLocationsSelect(itemsMap) {
	if(itemsMap == null) {
		return;
	}
	
	var mySelect = $("#myLocs");
	mySelect.empty();
	
	for(var key in itemsMap){
		var value = itemsMap[key];
		var myOption = $("<option></option>").val(value).attr("label", key);
		mySelect.append(myOption);
	}
}

function cleanLocationAndAddress() {
	$("#location").val("");
	$("#address").val("");
	$("#address").focus();
}

function copyPosition() {
	document.getElementById("location").select();
	document.execCommand("Copy");
}

function copyAddress() {
	document.getElementById("address").select();
	document.execCommand("Copy");
}

function queryViaEnter() {
	var e = window.event;
	if (e.keyCode == "13") {
		locateTriggeredByEnter();
	}
}

function locateTriggeredByHandinput() {
	var element = $("#location");
	
	var txt = element.val().trim();
	var noSpace = txt.replace(/\s+/, ",");
	var isLegal = checkLnglat(noSpace);
	if(!isLegal) {
		return;
	}
	
	element.val(noSpace);
	setLocation(noSpace);
	findAddressOfMarker();
}

function findAddressOfMarker() {
	var position = marker.getPosition();
	var lngCommaLat = position.getLng() + ',' + position.getLat();
	$("#location").val(lngCommaLat);
	var webData = {location : lngCommaLat};
	var theball = {
		url : "/poi/findAddressByLocation",
		dataType : "json",
		data : webData,
		success: function(meat) {
			console.log("meat", meat);
			$("#address").val(meat.address);
			$("#address").attr("title", meat.longAddress);
			$(document).attr("title", meat.address);
			marker.setTitle(meat.longAddress);
        }
	}
	$.ajax(theball);
}

function checkLnglat(lngCommaLat) {
	if(lngCommaLat == null) {
		return false;
	}

	lngCommaLat = lngCommaLat.trim();
	if(lngCommaLat.length == 0) {
		return false;
	}

	try {
		var arr = lngCommaLat.split(",");
		var king = new AMap.LngLat(arr[0],arr[1]);
		return true;
	} catch (ex) {
		console.log(ex);
		return false;
	}
}

function locateTriggeredByEnter() {
	var element = $("#location");
	var txt = element.val().trim();
	var noSpace = txt.replace(/\s+/, ",");
	
	var isLegal = checkLnglat(noSpace);
	if(!isLegal) {
		alert("不是合法坐标：" + noSpace);
		return;
	}
	
	setLocation(noSpace);
	findAddressOfMarker();
}

function locateTriggeredByValue(lngCommaLat) {
	var isLegal = checkLnglat(lngCommaLat);
	if(!isLegal) {
		alert("不是合法坐标：" + lngCommaLat);
		return;
	}

	setLocation(lngCommaLat.trim());
	findAddressOfMarker();
}

function setLocation(lngCommaLat) {
	var isLegal = checkLnglat(lngCommaLat);
	if(!isLegal) {
		alert("不是合法坐标：" + lngCommaLat);
		return;
	}
	
	var arr = lngCommaLat.split(",");
	var king = new AMap.LngLat(arr[0],arr[1]);
	map.setCenter(king);
//	console.log("setLocation", king, lngCommaLat);
    marker.setPosition(king);
//	console.log("setLocation", marker.getPosition());
}