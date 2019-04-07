package com.sirap.soup.front.service.sos;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value="soup-sos")
public interface SosClient {
	
	@GetMapping("/sos/calc/{expression}")
	Map<String, Object> calculate(@PathVariable String expression);
}
