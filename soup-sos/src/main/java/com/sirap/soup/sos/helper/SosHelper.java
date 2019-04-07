package com.sirap.soup.sos.helper;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.google.common.collect.Lists;
import com.sirap.basic.component.Konstants;
import com.sirap.basic.thirdparty.ServletHelper;
import com.sirap.basic.tool.D;
import com.sirap.basic.util.Amaps;
import com.sirap.basic.util.EmptyUtil;
import com.sirap.basic.util.NetworkUtil;
import com.sirap.basic.util.StrUtil;
import com.sirap.common.framework.Janitor;
import com.sirap.common.framework.Stash;

public class SosHelper {

	public static final String KEY_MY_IP = "myip";
	
	public static List handleByCommands(String input) {
		boolean hasBeenHandled = Janitor.g().process(input);
		List result = Lists.newArrayList();
		if(hasBeenHandled) {
			result.addAll(Stash.g().getLastQuery().getResult());
		}
		
		return result;
	}

	public static List processBeforeCommands(String input, HttpServletRequest request) {

		if (StrUtil.equals(input, KEY_MY_IP)) {
			List<String> items = Lists.newArrayList();
			String ip = ServletHelper.getOriginIp(request);
			items.add("Your IP:   " + ip);
			if(NetworkUtil.isLegalIP(ip)) {
				List<String> detail = NetworkUtil.ipDetail(ip, false);
				items.addAll(detail);
			}
			Stash.g().saveLastQuery(input, "", items);
			
			return items;
		}

		return null;
	}
	
	public static Map<String, Object> calculate(String expression, HttpServletRequest request) {
		Map<String, Object> map = Amaps.newLinkHashMap();
		map.put("exp", expression);
		map.put("status", "green");
		
		long start = System.currentTimeMillis();
		if(expression == null) {
			map.put("msg", "invalid expression: null");
			map.put("status", "red");
		}

		String command = expression.trim();
		if(!StrUtil.equals(command, expression)) {
			map.put("msg", StrUtil.occupy("expression [{0}]contains leading or tailing spaces", expression));
			map.put("status", "yellow");
		}
		
		map.put("command", command);
		List lines = SosHelper.processBeforeCommands(command, request);
		if(lines == null) {
			lines = SosHelper.handleByCommands(command);
		}
		
		if(EmptyUtil.isNullOrEmpty(lines)) {
			lines = Lists.newArrayList(Konstants.FAKED_EMPTY);
		}
		
		D.list(lines);
		
		D.pjsp(map);
		
		long end = System.currentTimeMillis();
		map.put("msecs", end - start);
		map.put("result", lines);
		map.put("result.count", lines.size());
		
		return map;
	}
}
