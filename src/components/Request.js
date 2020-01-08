import React, { Fragment, useState } from "react";

const Request = () => {
  const [symbols, setSymbols] = useState("");
  const [title, setTitle] = useState("");
  const [tweets, setTweets] = useState([]);

  const handleChange = e => setSymbols(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.stocktwits.com/api/2/streams/symbol/${symbols}.json`
      );
      const responseJSON = await response.json();
      setTitle(responseJSON.symbol.title);
      setTweets(responseJSON.messages);
    } catch (err) {
      console.log(err);
    }
  };

  const tweetsList = tweets.map(tweet => {
    return (
      <div key={tweet.id} className="tweet-container">
        <h4 className="tweet-name">{tweet.user.name}</h4>
        <h5 className="tweet-username">@{tweet.user.username}</h5>
        <p className="tweet-body">{tweet.body}</p>
      </div>
    );
  });

  return (
    <Fragment>
      <h4 className="request-header">
        Please enter the stock symbol(s) for the tweets you wish to display.
      </h4>
      <form className="request-form" onSubmit={e => handleSubmit(e)}>
        <input
          className="request-field"
          type="text"
          name="symbols"
          value={symbols}
          onChange={e => handleChange(e)}
          required
        />
        <small>
          If multiple, please separate by a comma (e.g. AAPL, MSFT, TSLA)
        </small>
        <input type="submit" className="btn" />
      </form>
      <h2>{title}</h2>
      <div>{tweetsList}</div>
    </Fragment>
  );
};

export default Request;