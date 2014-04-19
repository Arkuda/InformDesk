

var app = function(){};



app.renderNews = function()
{
    var html = new EJS({url: 'views/news.ejs'}).render();
    $("#content").append(html);
}


app.renderRaspisanie = function()
{
    var html = new EJS({url: 'views/raspisanie.ejs'}).render();
}

app.renderContacts = function()
{
    var html = new EJS({url: 'views/contacts.ejs'}).render();
}