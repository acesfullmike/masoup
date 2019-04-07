function checkLnglat(lngCommaLat) {
	try {
		var arr = lngCommaLat.split(",");
		var king = new AMap.LngLat(arr[0],arr[1]);
		return true;
	} catch (ex) {
		return false;
	}
}

var markerList;
var toSearchTimer;

function fish() {
	$(document.body).mousedown(function() {
			checkCtrl(event);
	});
	
	createMap();
	createUserElements();
	createMarkerList();
    $("#category").change(categoryChange);
    initCategory();
}

//加载数据
function loadData(criteria, fullMatched) {
	var newData = filter(criteria, fullMatched);
    markerList.render(newData);
    $("#kount").text(newData.length);
    map.setFitView();
}

function initCategory() {
	var selObj = $("#category");
	selObj.append("<option>" + "全部" + "</option>");
	
	var names = [];
	for (var i = 0; i < xitems.length; i += 1) {
		var item = xitems[i];
		var name = item.category;
		var optionId = "category-" + hashCode(name);
		if($.inArray(name,names) == -1) {
			names.push(name);
			var myOption = $("<option></option>");
			myOption.attr("id", optionId);
			myOption.attr("origin", name);
			myOption.text(name);
			myOption.attr("value", 1);
			selObj.append(myOption);
		} else {
			var myOption = $("#" + optionId);
			var myCount = myOption.attr("value");
			var newCount = parseInt(myCount) + 1;
			myOption.attr("value", newCount);
			myOption.text(name + "(" + newCount + ")");
		}
	}
}

function searchByCategory(cat) {
	var targetId = "category-" + hashCode(cat);
	$("#category option").each(function() {  
        var currentId = $(this).attr("id");
        if(targetId == currentId) {
        	$(this).attr("selected","selected");
        }
    });
	loadData(cat, true);
}

function categoryChange() {
	var text = $(this).children('option:selected').attr("origin");
	var index = $(this).children('option:selected').index();
	if(index == 0) {
		loadData();
	} else {
		var myCriteria = text;
		loadData(myCriteria, true);
	}
}

function filter(criteria, byCategory) {
	if (criteria == undefined) {
		console.log("criteria: " + criteria);
		return xitems;
	}
	var godaddy = [];
	console.log("criteria:" + criteria)
	for (var i = 0; i < xitems.length; i++) {
		var item = xitems[i];
		if(byCategory) {
			if(item.category == criteria) {
				godaddy.push(item);
			}
			continue;
		}
	    if (contains(item.name, criteria)||contains(item.address, criteria)||contains(item.category, criteria)) {
	        godaddy.push(item);
	    }
	}
		
	return godaddy;
}
	    
function contains(str, criteria) {
	if(str == null || criteria == null) {
		return false;
	}
	
	return str.toLowerCase().indexOf(criteria.toLowerCase()) != -1;
}

function createUserElements() {
	var category = '<select id="category" class="form-control input-sm"></select>';
	var criteria = '<input id="criteria" type="text" class="form-control input-sm" style="width:245px;display:inline">';
	var kount = '<label id="kount" class="label label-success" style="width:100%;display:inline">0</label>';
	var myListName = $("<input></input>").addClass("btn-primary form-control").attr("type", "button").val(listName);
	myListName.click(function() {
		var href = "/poi/lists";
		window.location.href = href;
	});
	var listNameSpan = $("<span></span").append(myListName);
	$("#myList").append(myListName);
	$("#myList").append(criteria + '&nbsp;' + kount);
	$("#criteria")[0].focus();
	$("#criteria").attr("placeholder", "输入关键字，停止后自动搜索");
    var arrAce = [
      	["myAdd","primary","+新增","新增兴趣点"],
    	["pick","success","查坐标","进入查询坐标页面"],
    	["clear","danger","清除","清除信息提示"],
    	["switch","primary",">>>","显示/隐藏右边的面板"],
    	["capture","success","截屏","截取当前屏幕，同时按Ctrl将隐藏当前窗口"]
    ];

	$("<li></li>").append(category).appendTo("#btnList");
	for(var k = 0; k < arrAce.length; k++) {
		var item = arrAce[k];
		var flag = isWindows();
		if(item[0] == "capture") {
			if(!flag) {
				continue;
			}
		}
		//<input id="listName" class="btn btn-primary btn-sm" style="width:100%" type="button" onclick="showMap();" value="xxx" />
		var myBtn = $("<input></input>").addClass("btn btn-" + item[1] + " btn-sm");
		myBtn.attr("title", item[3]);
		myBtn.attr("id", item[0]);
		myBtn.val(item[2]);
		myBtn.attr("style", "width:30px");
		
		var mySpan = $("<span></span>").addClass("btn btn-" + item[1] + " btn-sm");
		mySpan.attr("title", item[3]);
		mySpan.attr("id", item[0]);
		mySpan.text(item[2]);
		mySpan.attr("style", "height:25px");
		
		var line = '<span style="cursor:default" id="' + item[0] + '" class="label label-' + item[1] + '" title="' + item[3] + '">' + item[2] + '</span>';   	
	//	$("<li></li>").append(myBtn).appendTo("#btnList"); 
		$("<li></li>").append("<br>").append(mySpan).appendTo("#btnList"); 
	}
		
	$("#clear").click(function(){
			markist.clearSelected();
	});
	$("#myAdd").click(function(){
		var url;
		if(listId != null) {
			url = "/poi/list/" + listId + "/add";
		} else {
			url = "/poi/item/create";
		}
		window.location.href = url;
	});
	$("#pick").click(function(){
		window.open("/sirap/picker")
	});
	$("#load").click(function(){
		loadDirectory();
	});
	$("#capture").click(function(){
		StartCapture();
	});
	$("#pick").click(function(){
		window.open("/sirap/picker")
	});
	
	$("#switch").click(function(){    		
		  $("#panel").toggle();
		  var isHidden = $("#panel").is(":hidden");
		  var panelWidth = isHidden ? 0 : 300;
		  var switchTxt = isHidden ? "<<<" : ">>>";
		  $("#outer-box").css("padding-right", panelWidth);
		  $("#btnList").css("right", panelWidth);
		  $("#switch").text(switchTxt);
		  if(isHidden) {
		  		map.zoomIn();
		  } else {
		  		map.zoomOut();
		  }
		  setTimeout(function () { map.setFitView(); }, 500); 
    });
	$("#criteria").bind("input", function(){
			if(toSearchTimer) {
					clearTimeout(toSearchTimer);
			}
			toSearchTimer = setTimeout(function(){
					var myCriteria = $.trim($("#criteria").val());
					loadData(myCriteria);
			}, 1000);
	});
	
	$("#criteria").keyup(queryViaEnter);
}

function queryViaEnter() {
	var e = window.event;
	if (e.keyCode == "13") {		
			var myCriteria = $.trim($("#criteria").val());
			loadData(myCriteria);
	}
}

function createMap() {
	//创建地图
	map = new AMap.Map('container', {
        zoom: 7
    });
	
	map.plugin(["AMap.ToolBar"],function(){
        //加载工具条
        tool = new AMap.ToolBar();
        map.addControl(tool);
    });
}

function goToPicker(location, address) {
    var query = "location=" + encodeURI(location);
    query += "&address=" + encodeURI(address);
    query += "&zoom=" + map.getZoom();
    
    var url = "/sirap/picker?" + query;
    window.open(url);
}

function createMarkerList() {
	AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
	        function(MarkerList, SimpleMarker, SimpleInfoWindow) {

	            //即jQuery/Zepto
	            var $ = MarkerList.utils.$;

	            var defaultIconStyle = 'blue', //默认的图标样式
	                hoverIconStyle = 'green', //鼠标hover时的样式
	                selectedIconStyle = 'purple' //选中时的图标样式
	            ;

	            markerList = new MarkerList({
	                map: map,
	                //ListElement对应的父节点或者ID
	                listContainer: "myList", //document.getElementById("myList"),
	                //选中后显示

	                //从数据中读取位置, 返回lngLat
	                getPosition: function(item) {
	                    //return [item.longitude, item.latitude];
	                    return item.location.split(',');
	                },
	                //数据ID，如果不提供，默认使用数组索引，即index
	                getDataId: function(item, index) {
	                    return item.name;
	                },
	                getInfoWindow: function(data, context, recycledInfoWindow) {
	                    var paramAddress = encodeURI(data.address.trim());
	                    var viewUrl = "https://ditu.amap.com/search?query=" + paramAddress;
	                    if(data.id == 0) {
	                    	var word = encodeURI(data.category + " " + data.address.trim());
	                        viewUrl = "https://www.baidu.com/s?wd=" + word;
	                    }
	                	var link = '<a target="_blank" href="' + viewUrl + '\">' + data.name + '</a>';
	                	var infoBody = "<font color='green'>" + data.category +  "</font> " + data.address;
	                    if (recycledInfoWindow) {
	                        recycledInfoWindow.setInfoTitle(link);
	                        recycledInfoWindow.setInfoBody(infoBody);

	                        return recycledInfoWindow;
	                    }

	                    return new SimpleInfoWindow({
	                        infoTitle: link,
	                        infoBody: infoBody,
	                        offset: new AMap.Pixel(0, -37)
	                    });
	                },
	                //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
	                getMarker: function(data, context, recycledMarker) {

	                    var label = "<font color='red'>&nbsp;" + (context.index + 1) + data.name + "</font>";
	                    if (recycledMarker) {
	                        recycledMarker.setIconLabel(label);
	                        return;
	                    }

	                    return new SimpleMarker({
	                        containerClassNames: 'my-marker',
	                        iconStyle: defaultIconStyle,
	                        iconLabel: label
	                    });
	                },
	                //构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
	                getListElement: function(data, context, recycledListElement) {

	                    //var label = String.fromCharCode('A'.charCodeAt(0) + context.index);
	                	var label = context.index + 1;
	                    var lines = [];
	                    var span = "";
	                    if(data.id > 0) {
	                        var txtClick = 'window.location.href = "/poi/item/<%- data.id %>/edit";';
	                        span = "<span style='font-size:16px' class='middleright glyphicon glyphicon-edit edit' onClick='" + txtClick + "'></span>";
	                    }
	                    var aPicker = $("<a></a>").append(data.name);
	                    aPicker.attr("target", "_blank");
	                    aPicker.attr("href", "javascript:goToPicker('" + data.location.trim() + "', '" + data.address.trim() + "')");
	                    
	                    var font2 = $("<font color='green'></font>").attr("color", "green").text(data.category);
	                    var a2 = $("<a></a>").append(font2);
	                    a2.attr("href", "javascript:searchByCategory('" + data.category + "', true)");
	                    lines.push('<div class="poi-info-left">');
	                    lines.push('    <div class="poi-info">' + span);
	                    lines.push('        <font color="green"><%- label %>. ' + aPicker.get(0).outerHTML + '</font>');
	                    lines.push('    </div>');
	                    lines.push('    <h3 class="poi-title">');
	                    lines.push('        <p class="poi-addr">' + a2.get(0).outerHTML + ' <%- data.address %></p>');
	                    lines.push('    </h3>');
	                    lines.push('</div>');
	                    //lines.push('<div class="clear"></div>');
	                    var divs = lines.join('');
	                    var innerHTML = MarkerList.utils.template(divs, {
	                            data: data,
	                            label: label
	                        });

	                    if (recycledListElement) {
	                        recycledListElement.innerHTML = innerHTML;
	                        return recycledListElement;
	                    }

	                    return '<li class="poibox">' + innerHTML + '</li>';
	                },
	                //列表节点上监听的事件 listElementEvents: ['click', 'mouseenter', 'mouseleave'],
	                listElementEvents: ['click', 'mouseleave'],
	                //marker上监听的事件 markerEvents: ['click', 'mouseover', 'mouseout'],
	                markerEvents: ['click', 'mouseover', 'mouseout'],
	                //makeSelectedEvents:false,
	                selectedClassNames: 'selected',
	                autoSetFitView: true
	            });

	            window.markist = markerList;

	            markerList.on('selectedChanged', function(event, info) {

	                checkBtnStats();

	                if (info.selected) {

	                    if (info.selected.marker) {
	                        //更新为选中样式
	                        info.selected.marker.setIconStyle(selectedIconStyle);
	                    }

	                    //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
	                    if (!info.sourceEventInfo.isListElementEvent) {

	                        if (info.selected.listElement) {
	                            scrollListElementIntoView($(info.selected.listElement));
	                        }
	                    }
	                }

	                if (info.unSelected && info.unSelected.marker) {
	                    //更新为默认样式
	                    info.unSelected.marker.setIconStyle(defaultIconStyle);
	                }
	            });

	            markerList.on('listElementMouseenter markerMouseover', function(event, record) {

	                if (record && record.marker) {

	                    forcusMarker(record.marker);

	                    //this.openInfoWindowOnRecord(record);

	                    //非选中的id
	                    if (!this.isSelectedDataId(record.id)) {
	                        //设置为hover样式
	                        record.marker.setIconStyle(hoverIconStyle);
	                        //this.closeInfoWindow();
	                    }
	                }
	            });

	            markerList.on('listElementMouseleave markerMouseout', function(event, record) {

	                if (record && record.marker) {

	                    if (!this.isSelectedDataId(record.id)) {
	                        //恢复默认样式
	                        record.marker.setIconStyle(defaultIconStyle);
	                    }
	                }
	            });

	            //数据输出完成
	            markerList.on('renderComplete', function(event, records) {
	                checkBtnStats();
	            });
	            
	            loadData();

	            var $btns = $('#btnList input[data-path]');

	            /**
	             * 检测各个button的状态
	             */
	            function checkBtnStats() {
	                $('#btnList input[data-enable]').each(function() {

	                    var $input = $(this),
	                        codeEval = $input.attr('data-enable');

	                    $input.prop({
	                        disabled: !eval(codeEval)
	                    });
	                });
	            }

	            $('#btnList').on('click', 'input', function() {

	                var $input = $(this),
	                    dataPath = $input.attr('data-path'),
	                    codeEval = $input.attr('data-eval');

	                if (codeEval) {
	                    eval(codeEval);
	                }

	                checkBtnStats();
	            });

	            function forcusMarker(marker) {
	                marker.setTop(true);

	                //不在地图视野内
	                if (!(map.getBounds().contains(marker.getPosition()))) {

	                    //移动到中心
	                    map.setCenter(marker.getPosition());
	                }
	            }

	            function isElementInViewport(el) {
	                var rect = el.getBoundingClientRect();

	                return (
	                    rect.top >= 0 &&
	                    rect.left >= 0 &&
	                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
	                    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	                );
	            }

	            function scrollListElementIntoView($listEle) {

	                if (!isElementInViewport($listEle.get(0))) {
	                    $('#panel').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
	                }

	                //闪动一下
	                $listEle.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
	                    function(e) {
	                        $(this).removeClass('flash animated');
	                    }).addClass('flash animated');
	            }
	        });
}