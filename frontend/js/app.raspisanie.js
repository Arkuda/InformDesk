
var raspisanie = function(){};

    raspisanie.DayOfWeek = 0;
    raspisanie.nowGroup = localStorage.getItem("nowGroup") || "pive31";
    raspisanie.isOnline;
    raspisanie.currentBuild = 2;

    raspisanie.isAnglDate = false;
    raspisanie.groupsJSON;

    raspisanie.namesWeek = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","ВЫХОДНОЙ НАХ"];


    raspisanie.init = function() {

            var html = new EJS({url: 'views/raspisanie.ejs'}).render();
             $("#content2").append(html);

            //showSplashScreen();
            raspisanie.checkIsOnline(function () {
                raspisanie.setAutomDayOfWeek();
                raspisanie.getGroups(function () {
                    raspisanie.loadAndSetRaspisane(raspisanie.nowGroup, null);
                });
            });
    };

    /*raspisanie.render = function(json)
    {
        var html = new EJS({url: 'views/raspisanie.ejs'}).render(json);
        $("#content2").append(html);
    };*/

    raspisanie.loadAndSetRaspisane = function(_groupName, callback) {
        if (raspisanie.isOnline) {
            $.get("http://dl.dropboxusercontent.com/u/61847240/raspisanie/" + _groupName + ".json", function (data) {
                localStorage.setItem("raspisanie-"+_groupName+"-json",data);
                var  raspisanej = JSON.parse(data);
                switch (raspisanie.DayOfWeek)
                {
                    case 0:
                        var lol = raspisanej.pon;
                        break;
                    case 1:
                        var lol = raspisanej.vtorn;
                        break;
                    case 2:
                        var lol = raspisanej.sreda;
                        break;
                    case 3:
                        var lol = raspisanej.chetv;
                        break;
                    case 4:
                        var lol = raspisanej.pyat;
                        break;
                    case 5:
                        var lol = raspisanej.sub;
                        break;
                }
                if(lol == null){
                    var lol = raspisanej.pon;
                }
                for(var i =0; i < lol.length; i++){
                    $("#rasp"+i+"p").text(lol[i].split(';')[0]);
                    $("#rasp"+i+"c").text(lol[i].split(';')[1]);
                }
                callback();
            }).fail(function(ex) {
                console.error("error of loading "+_groupName+".json");
            });
        }
        else
        {
            var  raspisanej = JSON.parse(localStorage.getItem("raspisanie-"+_groupName+"-json"));
            switch (raspisanie.DayOfWeek)
            {
                case 0:
                    var lol = raspisanej.pon;
                    break;
                case 1:
                    var lol = raspisanej.vtorn;
                    break;
                case 2:
                    var lol = raspisanej.sreda;
                    break;
                case 3:
                    var lol = raspisanej.chetv;
                    break;
                case 4:
                    var lol = raspisanej.pyat;
                    break;
                case 5:
                    var lol = raspisanej.sub;
                    break;
            }
            for(var i =0; i < lol.length; i++){
                $("#rasp"+i+"p").text(lol[i].split(';')[0]);
                $("#rasp"+i+"c").text(lol[i].split(';')[1]);
            }
            callback();
        }
    };
    raspisanie.checkIsOnline = function(callback)
    {
        $.get("http://dl.dropboxusercontent.com/u/61847240/raspisanie/avalible.json",function(data)
        {
            var xml = JSON.parse(data);
            console.log("ISONLINE = TRUE;");
            raspisanie.isOnline = true;
            callback();
        }).fail(function(ex) {
            console.log("ISONLINE = FALSE;");
            raspisanie.isOnline = false;
            callback();
        });

    };
    raspisanie.getGroups = function(callback)
    {

        if(raspisanie.isOnline){
            $.get("http://dl.dropboxusercontent.com/u/61847240/raspisanie/avalible.json",function(data)
            {
                raspisanie.groupsJSON = data;
                localStorage.setItem("groups-json",data);
                var _group = JSON.parse(data);
                for(var i = 0; i <= _group.size-1; i++)
                {
                    raspisanie.addGroup(_group.groups.split(',')[i]);
                    if(raspisanie.nowGroup == null)
                    {
                        raspisanie.nowGroup = _group.groups.split(',')[i];
                    }
                }
                callback();
            }).fail(function(ex) {
                console.error("error of loading avalible.json");
            });
        }
        else
        {
            var _group = JSON.parse(localStorage.getItem("groups-json"));
            for(var i = 0; i <= _group.size-1; i++)
            {
                raspisanie.addGroup(_group.groups.split(',')[i]);
            }
            callback();
        }
    };
    raspisanie.addGroup = function(_groupName)
    {
        console.log(_groupName);
        var ah = $("<a></a>").attr("onclick","setNowGroup(\"" +_groupName + "\")").text(_groupName);
        var _group = $("<li></li>").append(ah);
        $("#groupsselct").append(_group);
        console.log(_group);
    };
    raspisanie.setNowGroup = function(groupName)
    {
        localStorage.setItem("nowGroup",groupName);
        raspisanie.nowGroup = groupName;
        raspisanie.loadAndSetRaspisane(raspisanie.nowGroup);

    };
    raspisanie.setAutomDayOfWeek = function()
    {
        var d = new Date();
        var n = d.getDay();
        if(raspisanie.isAnglDate){
            if(!(n ==6) || !(n ==0) ) raspisanie.selectDayOfWeek(n-1);
            else raspisanie.selectDayOfWeek(0);
        }else
        {
            if(!(n ==5) || !(n == 6) ) raspisanie.selectDayOfWeek(n-1);
            else raspisanie.selectDayOfWeek(0);
        }


    };

    raspisanie.selectDayOfWeek = function(i)
    {
        raspisanie.DayOfWeek = i;
        $("#btn1").text(raspisanie.namesWeek[i]);
        raspisanie.loadAndSetRaspisane(raspisanie.nowGroup);
    };

