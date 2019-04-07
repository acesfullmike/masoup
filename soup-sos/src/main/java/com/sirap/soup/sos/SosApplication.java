package com.sirap.soup.sos;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sirap.basic.tool.D;
import com.sirap.basic.util.RandomUtil;
import com.sirap.basic.util.StrUtil;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableEurekaClient
@RestController
public class SosApplication {
    public static void main( String[] args ) {
    	String appname = "app sos";
    	String baby = RandomUtil.name();
    	D.msg("{0} {1} is crying", appname, baby);
    	SpringApplication.run(SosApplication.class, args);
    	
    	SosKonfig.init();
    	
    	D.msg("{0} {1} is smiling", appname, baby);
    }
    
    @Value("${server.port}")
    private String port;
    
    @RequestMapping("/")
    public String sayHi(@RequestParam(defaultValue = "xilin") String name) {
    	return StrUtil.occupy("{0} says hi to {1} via port {2}", name, RandomUtil.name(), port);
    }
}