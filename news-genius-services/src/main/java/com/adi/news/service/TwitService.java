package com.adi.news.service;

import java.util.List;

import com.adi.news.exception.TwitException;
import com.adi.news.exception.UserException;
import com.adi.news.model.Twit;
import com.adi.news.model.User;
import com.adi.news.request.TwitReplyRequest;

public interface TwitService {

	public Twit createTwit(Twit req,User user)throws UserException;
	public List<Twit> findAllTwit();
	public Twit retwit(Long twitId,User user)throws UserException,TwitException;
	public Twit findById(Long twitId) throws TwitException;
	
	public void deleteTwitById(Long twitId,Long userId) throws TwitException, UserException;
	
	public Twit removeFromReTwit(Long twitId, User user)throws TwitException, UserException;
	
	public Twit createdReply(TwitReplyRequest req,User user)throws TwitException;
	
	public List<Twit> getUserTwit(User user);
	
	public List<Twit> findByLikesContainsUser(User user); 
}
