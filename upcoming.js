export const renderTweet = function(tweet) {
    let aTweet = `<div class="tweet" id=${tweet.id} data-name=${tweet.body}>
            <p class="author">${tweet.author}</p>
            <p class="body">${tweet.body}</p>
            <p>Likes: ${tweet.likeCount}</p>
            <p>Retweets: ${tweet.retweetCount}</p>
            <p>Liked? ${tweet.isLiked}</p>
            <button class="reply">Reply</button>
            <button class="retweet">Retweet</button>
            <button class="edit" id=${tweet.body}>Edit</button>
            <button class="remove">Delete</button>
        </div>`
    return aTweet;
};

export const renderFeed = async function() {
    const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });
    for (let i=0; i<50; i++){
        $('#feed').append(renderTweet(result.data[i]));
    }
};

export const handleLikeButtonPress = async function(event) {
    let id = $(event.target).closest('div').attr('id');
    const result = await axios({
        method: 'put',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}/like`,
        withCredentials: true,
    });
    const readResult = await axios({
        method: 'get',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
    });
    $(event.target).closest('div').replaceWith(renderTweet(readResult.data));
};

export const handleUnlikeButtonPress = async function(event) {
    let id = $(event.target).closest('div').attr('id');
    const result = await axios({
        method: 'put',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}/unlike`,
        withCredentials: true,
    });
    const readResult = await axios({
        method: 'get',
        url: `https://comp426-1fa20.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
    });
    $(event.target).closest('div').replaceWith(renderTweet(readResult.data));
};

export const loadFeed = function(tweets) {
    renderFeed();
    $("#feed").on("click", "button.like", handleLikeButtonPress);
    $("#feed").on("click", "button.unlike", handleUnlikeButtonPress);
};

$(function() {
    loadFeed();
});
