
var app = function(){

    app.renderNews();
    $("#content1").html(new EJS({url: 'views/news.ejs'}).render());
    raspisanie.init();
    $("#content3").html(new EJS({url: 'views/contacts.ejs'}).render());

};




    app.renderNews = function () {
        $("#content1").show();
        $("#content2").hide();
        $("#content3").hide();
    };


    app.renderRaspisanie = function () {
        $("#content1").hide();
        $("#content2").show();
        $("#content3").hide();
    };

    app.renderContacts = function () {
        $("#content1").hide();
        $("#content2").hide();
        $("#content3").show();
    };
