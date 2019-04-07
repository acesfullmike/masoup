package com.sirap.soup.front.controller.sos;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirap.basic.tool.D;
import com.sirap.basic.util.RandomUtil;
import com.sirap.basic.util.StrUtil;
import com.sirap.soup.front.service.sos.SosClient;

@Controller
@RequestMapping(value = "/sos")
public class SosController {
	
	@Resource
	private SosClient client;

	@ResponseBody
	@GetMapping(value = "/calc/{expression}")
	public Map<String, Object> calculate(@PathVariable String expression, HttpServletRequest request) {
		D.at();
		D.pl(expression);
		Map<String, Object> stuff = client.calculate(expression);
		D.pjsp(stuff);
		
		String keyAjax = "ajax";
		boolean isAjax = request.getParameter(keyAjax) != null;
		if(isAjax) {
			stuff.put(keyAjax, true);
		}
		
		List templist = (List)stuff.get("result");
		stuff.put("result", StrUtil.connectWithLineSeparator(templist)); 
		
		stuff.put("random", StrUtil.truncate(RandomUtil.name(), 6));
		stuff.put("buttonWidth", "50");
		
		return stuff;
	}
}
