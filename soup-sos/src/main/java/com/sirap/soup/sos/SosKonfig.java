package com.sirap.soup.sos;

import com.sirap.basic.component.Konstants;
import com.sirap.basic.component.map.AlinkMap;
import com.sirap.basic.tool.D;
import com.sirap.basic.util.Amaps;
import com.sirap.basic.util.IOUtil;
import com.sirap.common.framework.SimpleKonfig;

public class SosKonfig {

	public static final String KEY_CONFIG= "config.sosweb";
	public static final String KEY_PARAMS = "sos.params";

	public static void init() {
		String params = props().get(KEY_PARAMS);
		
		SimpleKonfig.init(params);
		
		SimpleKonfig.g().setFromWeb(true);
	}
	
	public static AlinkMap<String, String> props() {
		String config = System.getProperty(KEY_CONFIG);
		D.pla("noggin", KEY_CONFIG, KEY_PARAMS, config);
		AlinkMap<String, String> props = Amaps.ofProperties(IOUtil.readLines(config, Konstants.CODE_UTF8));
		D.pjsp(props);
		
		return props;
	}
}