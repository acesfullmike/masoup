package com.sirap.soup.album.controller;

import java.util.Map;

import com.sirap.basic.tool.D;
import com.sirap.basic.util.Amaps;
import com.sirap.basic.util.ObjectUtil;
import com.sirap.basic.util.XCodeUtil;
import com.sirap.common.domain.Album;
import com.sirap.soup.album.AlbumCache;
import com.sirap.soup.common.BaseController;

public abstract class TopAlbumController extends BaseController {

	public Album readAlbumFromCacheOrFetcher(String albumurl, Class<?> clazz) {
		D.at();
		D.pla(albumurl, clazz);
		
    	Album photos = AlbumCache.get(albumurl);
    	if(photos != null) {
    		D.pl("cache hit");
    	} else {
    		if(clazz == null) {
    			return null;
    		}
    		D.pl("cache miss");
    		Class<?>[] arr = {String.class};
    		photos = (Album)ObjectUtil.execute(clazz, "getAlbum", arr, albumurl);
    		D.pla(albumurl, photos.getLinks().size());
    		AlbumCache.put(albumurl, photos);
    	}

    	return photos;
	}
	
	public Map<String, Object> getAlbumDetail(String base64url, Class<?> clazz) {
		D.at();
    	String niceurl = XCodeUtil.fromBase64(base64url);
    	D.pla(base64url, niceurl);
		
    	Map<String, Object> map = Amaps.newTreeMap();
    	Album bum = readAlbumFromCacheOrFetcher(niceurl, clazz);
		map.put("title", bum.getName());
		map.put("list", bum.getListObj());
		map.put("niceurl", bum.getUrl());
		map.put("when", bum.getWhen());
		map.put("timeago", bum.getTimeAgo());
    	D.pjsp(map);
	
		return map;
	}
}
