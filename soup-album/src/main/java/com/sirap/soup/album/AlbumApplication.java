package com.sirap.soup.album;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.RequestMapping;
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
@EnableDiscoveryClient
@RestController
public class AlbumApplication {
    public static void main( String[] args ) {
    	String appname = "app album";
    	String baby = RandomUtil.name();
    	D.msg("{0} {1} is crying", appname, baby);
    	SpringApplication.run(AlbumApplication.class, args);
    	D.msg("{0} {1} is smiling", appname, baby);
    }
    
    @Value("${server.port}")
    private String port;
    
    @RequestMapping("/hi")
    public String sayHi() {
    	return StrUtil.occupy("{0} says hi to {1} via port {2}", "Alex", RandomUtil.name(), port);
    }
}