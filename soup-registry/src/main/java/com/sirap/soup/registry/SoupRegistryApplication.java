package com.sirap.soup.registry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

import com.sirap.basic.tool.D;
import com.sirap.basic.util.RandomUtil;

/**
 * Hello world!
 *
 */

@SpringBootApplication
@EnableEurekaServer
public class SoupRegistryApplication {
    public static void main( String[] args ) {
    	String appname = "app registry";
    	String baby = RandomUtil.name();
    	D.msg("{0} {1} is crying", appname, baby);
    	SpringApplication.run(SoupRegistryApplication.class, args);
    	D.msg("{0} {1} is smiling", appname, baby);
    }
}
