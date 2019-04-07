package com.sirap.soup.front;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sirap.basic.tool.D;
import com.sirap.basic.util.RandomUtil;
import com.sirap.basic.util.StrUtil;
import com.sirap.basic.util.ThreadUtil;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@EnableCircuitBreaker
@RestController
public class FrontApplication {
    public static void main( String[] args ) {
    	String appname = "app web front";
    	String baby = RandomUtil.name();
    	D.msg("{0} {1} is crying", appname, baby);
    	SpringApplication.run(FrontApplication.class, args);
    	
    	D.msg("{0} {1} is smiling", appname, baby);
    }
    
    @Value("${server.port}")
    private String port;
    
    @RequestMapping("/hi")
    public String sayHi() {
    	ThreadUtil.sleepInSeconds(9);
    	return StrUtil.occupy("{0} says hi to {1} via port {2}", "FrontApplication", RandomUtil.name(), port);
    }
}