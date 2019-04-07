package com.sirap.soup.front.service.album;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value="soup-album")
public interface AlbumCatClient {
	
	@GetMapping("/albumcat/page/{base64url}")
	Map<String, Object> getAlbumsByPageUrl(@PathVariable String base64url);
	
	@GetMapping("/albumcat/show/{base64url}")
	Map<String, Object> getAlbumDetail(@PathVariable String base64url);

	@GetMapping("/albumcat/count/{base64url}")
	Map<String, Object> countOfImages(@PathVariable String base64url);
	
	@GetMapping("/albumcat/help")
	String help();
}
