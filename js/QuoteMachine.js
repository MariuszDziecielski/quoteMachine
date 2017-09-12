function QuoteMachine(prefix, tweetLink, quoteUrl) {
    this.prefix = prefix;
    this.tweetLink = tweetLink;
    this.quoteUrl = quoteUrl;
    $('.trigger').click(() => {
        this.getQuote();
    });
}
QuoteMachine.prototype = {
    getQuote: function () {
        $.getJSON(`${this.prefix}${this.quoteUrl}`, this.createTweet);
        $.ajaxSetup({
            cache: false
        });
    },
    createTweet: function (input) {
        const data = input[0],
            quoteText = $(data.content).text().trim();
        let quoteAuthor = data.title;
        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown author";
        }
        const tweetText = `Quote of the day - ${quoteText} Author: ${quoteAuthor}`;
        if (tweetText.length > 140) {
            quoteMachine.getQuote();
        } else {
            const tweet = `${quoteMachine.tweetLink}${encodeURIComponent(tweetText)}`;
            $('.quote p').text(quoteText);
            $('.author').text(`Author: ${quoteAuthor}`);
            $('.tweet').attr('href', tweet);
        }
    }
};
const quoteMachine = new QuoteMachine("https://cors-anywhere.herokuapp.com/", "https://twitter.com/intent/tweet?text=", "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1");
quoteMachine.getQuote();