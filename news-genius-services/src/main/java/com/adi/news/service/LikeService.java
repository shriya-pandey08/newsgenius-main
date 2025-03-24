package com.adi.news.service;

import java.util.List;

import com.adi.news.exception.TwitException;
import com.adi.news.exception.UserException;
import com.adi.news.model.Like;
import com.adi.news.model.User;

public interface LikeService {

	public Like likeTwit(Long twitId,User user)throws UserException, TwitException;
		
	
		
	public List<Like> getAllLikes(Long twitId) throws TwitException;
		
}
