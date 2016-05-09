$(document).ready(function() {

  // Turn caching off so that "New Quote" button works every time
  $.ajaxSetup({ cache: false });

  // Function which performs main page update logic based on input json object
  function updatePage(json) {
    // Store quote and author in respective variables
    var quoteString = json[0]["content"];
    var quoteAuthor = json[0]["title"];

    // Convert HTML Codes for special characters to plain text
    quoteString = $('<textarea />').html(quoteString).text();
    quoteAuthor = $('<textarea />').html(quoteAuthor).text();

    // Remove all HTMl formatting tags from quote
    quoteString = jQuery(quoteString).text();

    // Remove all beginning and trailing whitespace from quote
    quoteString = quoteString.trim();
    quoteAuthor = quoteAuthor.trim();

    // Encoded version of quote for the twitter share button
    var encodedQuoteString = encodeURIComponent(quoteString);
    var encodedQuoteAuthor = encodeURIComponent(quoteAuthor);


    // Update the quote, author, and twitter share button
    $("span").html(quoteString);
    $("footer").html(quoteAuthor);
    $("#twitterButton").attr("href", "https://twitter.com/intent/tweet?text=\"" + encodedQuoteString + "\" " + encodedQuoteAuthor);
  }


  // On initial page load, pull quote and display it
  $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {

    // Run function to update entire page
    updatePage(json);

  });


  // On button click, pull quote and display it
  $("#getNewQuote").on("click", function() {
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {

      // Run function to update entire page
      updatePage(json);

    });

  });
});