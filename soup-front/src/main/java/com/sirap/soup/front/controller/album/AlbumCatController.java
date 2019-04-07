package com.sirap.soup.front.controller.album;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirap.basic.tool.D;
import com.sirap.basic.util.StrUtil;
import com.sirap.soup.front.service.album.AlbumCatClient;

@Controller
@RequestMapping(value = "/albumcat")
public class AlbumCatController extends BaseAlbumController {
	
	@Resource
	private AlbumCatClient catClient;
	
	@Override
	@RequestMapping(value = "/list")
	public String listAlbums(HttpServletRequest request, HashMap<String, Object> map) {
		D.at();
		
		return StrUtil.occupy("album/album{0}List", type());
	}
	
	@GetMapping("/page/{base64url}")
	@ResponseBody
	public Map<String, Object> getAlbumsByPageUrl(@PathVariable String base64url) {
		D.at();
		Map<String, Object> map = catClient.getAlbumsByPageUrl(base64url);
		D.pjsp(map);
		
		return map;
	}

	@Override
	@RequestMapping(value = "/show/{base64url}")
	public String showAlbum(HttpServletRequest request, @PathVariable String base64url, HashMap<String, Object> map) {
		D.at();
		Map<String, Object> tmap = catClient.getAlbumDetail(base64url);
		map.putAll(tmap);
		D.pjsp(map);
	
		return StrUtil.occupy("album/album{0}Detail", type());
	}

	@ResponseBody
	@RequestMapping(value = "/count/{base64url}")
	public Map<String, Object> countOfImages(HttpServletRequest request, @PathVariable String base64url) {
		D.at();
		Map<String, Object> map = catClient.countOfImages(base64url);
		D.pjsp(map);
    	
		return map;
	}


	@ResponseBody
	@RequestMapping(value = "/help")
	public String helpPeople(HttpServletRequest request) {
		D.at();
		String map = catClient.help();
		D.pjsp(map);
    	
		return map;
	}
}
