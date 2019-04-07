package com.sirap.soup.front.controller.album;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.sirap.basic.util.StrUtil;
import com.sirap.basic.util.XXXUtil;
import com.sirap.soup.common.BaseController;

public abstract class BaseAlbumController extends BaseController {
	
	public abstract String listAlbums(HttpServletRequest request, HashMap<String, Object> map);

	public Map<String, Object> getAlbumsByPage(int page, HttpServletRequest request) {
		mustBeOverriden();
		return null;
	}

	public Map<String, Object> getAlbumsByPageUrl(String pageUrl, HttpServletRequest request) {
		mustBeOverriden();
		return null;
	}

	public String showAlbum(HttpServletRequest request, String base64url, HashMap<String, Object> map) {
		mustBeOverriden();
		return null;
	}

	public Map<String, Object> countOfImages(HttpServletRequest request, String base64url) {
		mustBeOverriden();
		return null;
	}
	
	public String type() {
		String regex = "Album(.*)Controller";
		String sname = getClass().getSimpleName();
		String name = StrUtil.findFirstMatchedItem(regex, sname);
		if(name == null) {
			XXXUtil.alert("Expect something like {0} but {1}", regex, sname);
		}
		
		return name;
	}
	
}
