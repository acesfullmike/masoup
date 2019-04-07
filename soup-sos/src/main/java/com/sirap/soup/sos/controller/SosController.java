package com.sirap.soup.sos.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sirap.soup.sos.helper.SosHelper;

@RestController
@RequestMapping(value = "/sos")
public class SosController {

	@ResponseBody
	@GetMapping(value = "/calc/{expression}")
	public Map<String, Object> calculate(@PathVariable String expression, HttpServletRequest request) {
		Map<String, Object> result = SosHelper.calculate(expression, request);
		
		return result;
	}
}
