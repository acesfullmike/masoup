package com.sirap.soup.front.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  
public class FrontMvcConfig implements WebMvcConfigurer {

    @Override  
    public void addCorsMappings(CorsRegistry registry) {  
        registry.addMapping("/**")  
                .allowedOrigins("*")  
                .allowCredentials(true)  
                .allowedMethods("GET", "POST", "DELETE", "PUT")  
                .maxAge(3600);  
    }  
    
	@Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/sirap/calc").setViewName("sirapResult");
        registry.addViewController("/pure").setViewName("pure");
        registry.addViewController("/solution").setViewName("solution");
        registry.addViewController("/product").setViewName("product");
        registry.addViewController("/xius").setViewName("xius");
        registry.addViewController("/picker").setViewName("picker");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/signup").setViewName("signup");
        registry.addViewController("/status").setViewName("status");
        registry.addViewController("/albums").setViewName("albums");
        registry.addViewController("/techs").setViewName("mechanism/techs");
        registry.addViewController("/xactuator").setViewName("mechanism/xactuator");
        registry.addViewController("/result").setViewName("file_up_result");
    }
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		WebMvcConfigurer.super.addResourceHandlers(registry);
		registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
//		String storage = FishKonfig.storage();
//		if(!storage.endsWith("/")) {
//			storage += "/";
//		}
//		D.pl(storage);
//		registry.addResourceHandler("/storage/**").addResourceLocations("file:" + storage);
	}

}