package com.sirap.soup.album.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sirap.basic.tool.D;
import com.sirap.basic.util.Amaps;
import com.sirap.basic.util.RandomUtil;
import com.sirap.basic.util.StrUtil;
import com.sirap.basic.util.ThreadUtil;
import com.sirap.basic.util.XCodeUtil;
import com.sirap.soup.album.fetcher.CatImageFetcher;

@RestController
@RequestMapping(value = "/albumcat")
public class AlbumCatController extends TopAlbumController {
	
    @RequestMapping(value = "/page/{base64url}")
	public Map<String, Object> getAlbumsByPageUrl(@PathVariable String base64url) {
		D.at();
    	String niceurl = XCodeUtil.fromBase64(base64url);
    	if(StrUtil.equals("base", niceurl)) {
    		niceurl = "https://www.cct58.com/xiezhen/";
    	}
    	D.pla(base64url, niceurl);
		Map<String, Object> map = CatImageFetcher.getAlbumsByPageUrl(niceurl);
		
		D.pjsp(map);
	
		return map;
	}
	
	@RequestMapping(value = "/show/{base64url}")
	public Map<String, Object> showAlbum(@PathVariable String base64url) {
		D.at();
		D.pla(base64url);
		
		Map<String, Object> map = getAlbumDetail(base64url, CatImageFetcher.class);
	
		return map;
	}

	@RequestMapping(value = "/count/{base64url}")
	public Map<String, Object> countOfImages(@PathVariable String base64url) {
		D.at();
		
    	String niceurl = XCodeUtil.fromBase64(base64url);
    	D.pla(base64url, niceurl);
    	
		return Amaps.createMap("count", CatImageFetcher.countOfImages(niceurl));
	}
	
	@RequestMapping(value = "/help")
	public String helpPeople() {
		String name = RandomUtil.name();
		int seconds = 4;
		D.msg("Helping {0} for {1} seconds", name, seconds);
		ThreadUtil.sleepInSeconds(seconds);
		
		return name;
	}
}
