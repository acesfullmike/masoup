package com.sirap.soup.album.fetcher;

import java.util.Map;
import java.util.regex.Matcher;

import com.sirap.basic.component.Extractor;
import com.sirap.basic.tool.C;
import com.sirap.basic.tool.D;
import com.sirap.basic.util.Amaps;
import com.sirap.basic.util.MathUtil;
import com.sirap.basic.util.StrUtil;
import com.sirap.common.domain.Album;
import com.sirap.extractor.images.CatFetcher;

public class CatImageFetcher {

	public static void main(String[] args) {
		Object va = null;
		String vb = null;
//		va = getAlbums(3);
//		D.pl(countOfAlbum("https://www.fenun.cn/Item/Details/20912"));
//		va = getAlbumsByPage(1);
		va = getAlbumsByPageUrl("https://www.cct58.com/xiezhen/");
//		va = getAlbumsByPageUrl("http://www.699mm.com/search-0-429.html");
		va = getAlbum("https://www.cct58.com/xiezhen/17092/");
//		vb = "http://www.699mm.com/zhubo/86290_15.html";
//		vb = "http://www.699mm.com/zhubo/86290.html";
//		vb = "http://www.699mm.com/search-0-1343.html";
//		va = getAlbumsByPageUrl(vb);
//		va = imagesInPage(vb);
//		va = tagsFromList(IOUtil.readLinesWithUTF8("C:/mastorage/may/all.words.txt"));
		D.pjsp(va, Album.class);
	}
	
	public static Map<String, Object> getAlbumsByPageUrl(String aurl) {
		Extractor<Map<String, Object>> frank = new Extractor<Map<String, Object>>() {
    		
			@Override
			public String getUrl() {
				showFetching();
				return aurl;
			}
			
			@Override
			protected void parse() {
				item = Amaps.newConcurrentHashMap();
				
				String r1 = "<a class=\"a1\">\\s*(\\d+)\\s*条\\s*</a>";
				String acount = StrUtil.findFirstMatchedItem(r1, source);
				
				int maxpage = MathUtil.totalPageOf(Integer.parseInt(acount), 30);
				item.put("totalpage", maxpage);
				
				//<a href="/mneinv/2.html" class="a1">下一页</a>
				String r3 = "<a href=\"([^\"]+)\"[^<>]*>下一页</a>";
				String next = StrUtil.findFirstMatchedItem(r3, source);
				String fullurl = StrUtil.useDelimiter("/", "https://www.cct58.com", next);
				item.put("nextpage", fullurl);

//				String regex = "<ul class=\"clearfix\">(.+?)</ul>";
				String regex = "<li>\\s*<div class=\"listbox\">(.+?)</div>\\s*</li>";
//				String kids = StrUtil.findFirstMatchedItem(regex, source);
				Matcher ma = createMatcher(regex, source);
				while(ma.find()) {
					Map<String, Object> row = Amaps.newLinkHashMap();
					String kid = ma.group(1);
					String aurl = StrUtil.findFirstMatchedItem("<a href=\"(http[^\"]+)\"", kid);
					String cover = StrUtil.findFirstMatchedItem("<img src=\"([^\"]+)\"", kid);
					String title = StrUtil.findFirstMatchedItem("alt=\"([^\"]+)\"", kid);
//					String when = StrUtil.findFirstMatchedItem("<b class=\"b1\">([^<>]+)</b>", kid);
					
					row.put("aurl", aurl);
					row.put("cover", cover);
					row.put("title", title);
//					row.put("when", when);
//					row.put("tags", tagsFromMap(TOP_LADIES));
					
					mexItems.add(row);
				}
				
				item.put("photos", mexItems);
				C.listSome(mexItems, 3);
			}
		};
		
		return frank.process().getItem();
	}
	
	public static Album getAlbum(String albumurl) {
		Album bum = CatFetcher.of(albumurl);
		
		return bum;
	}
	
	public static String countOfImages(String albumurl) {
		Map<String, Object> info = CatFetcher.countAndTitleOf(albumurl);
		return info.get("count") + "";
	}
}
