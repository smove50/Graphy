
function buildQueryURL() {

  var queryAPI = "ac6789edc5834e9c95d6ee57b3ac79dd";
  var querySearch = $("#search-term").val().split(' ').join("+").toLowerCase();
  console.log(querySearch);

  // queryURL is the url we'll use to query the API
  var queryURL = "https://newsapi.org/v2/top-headlines?q=" + querySearch + "&apiKey=" + queryAPI;

  console.log(queryURL);

  return queryURL;
}


function updatePage(NYTData) {
  // Get from the form the number of results to display
  // API doesn't have a "limit" parameter, so we have to do this ourselves
  // var numArticles = $("#article-count").val(); 

  // Log the NYTData to console, where it will show up as an object
  console.log(NYTData);
  console.log("------------------------------------");

  // Loop through and build elements for the defined number of articles
  for (var i = 0; i < 5; i++) {
    // Get specific article info for current index
    var article = NYTData.response.docs[i];

    // Increase the articleCount (track article # - starting at 1)
    var articleCount = i + 1;

    // Create the  list group to contain the articles and add the article content for each
    var $articleList = $("<ul>");
    $articleList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#article-section").append($articleList);

    // If the article has a headline, log and append to $articleList
    var headline = article.headline;
    var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    if (headline && headline.main) {
      console.log(headline.main);
      $articleListItem.append(
        "<span class='label label-primary'>" +
        articleCount +
        "</span>" +
        "<strong> " +
        headline.main +
        "</strong>"
      );
    }

    // If the article has a byline, log and append to $articleList
    var byline = article.byline;

    if (byline && byline.original) {
      console.log(byline.original);
      $articleListItem.append("<h5>" + byline.original + "</h5>");
    }

    // Log section, and append to document if exists
    var section = article.section_name;
    console.log(article.section_name);
    if (section) {
      $articleListItem.append("<h5>Section: " + section + "</h5>");
    }

    // Log published date, and append to document if exists
    var pubDate = article.pub_date;
    console.log(article.pub_date);
    if (pubDate) {
      $articleListItem.append("<h5>" + article.pub_date + "</h5>");
    }

    // Append and log url
    $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
    console.log(article.web_url);

    // Append the article
    $articleList.append($articleListItem);
  }
}

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();

  console.log("In Run search CLICK EVENT");

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(updatePage);

});

//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);