package com.sirap.soup.common;

import com.sirap.basic.util.XXXUtil;

public abstract class BaseController {

	public String redirect(String target) {
    	return "redirect:" + target;
	}

	public void mustBeOverriden() {
		XXXUtil.alert("This method must be overriden.");
	}
}
