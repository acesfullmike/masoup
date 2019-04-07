package com.sirap.soup.album;

import java.util.concurrent.TimeUnit;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.sirap.basic.util.XXXUtil;
import com.sirap.common.domain.Album;

public class AlbumCache {
	private static Cache<String, Album> holder;
	
    static {
    	holder = CacheBuilder.newBuilder().maximumSize(10000)
                .expireAfterAccess(240, TimeUnit.HOURS)
                .initialCapacity(10)
                .build();
    }
    
    public  static Album get(String key){
    	XXXUtil.shouldBeNotnull(key);
    	return holder.getIfPresent(key);
    }
    
    public static void put(String key, Album value){
    	XXXUtil.shouldBeNotnull(key);
    	holder.put(key, value);
    }
}
