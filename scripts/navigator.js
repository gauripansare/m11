//var isscorm = false;
//var isrevel = false;
//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var _Navigator = (function () {
    var packageType = "";//presenter/scorm/revel
    var _currentPageId = "";
    var _currentPageObject = {};
    var progressLevels = [26];
    var totalsimscore = 18;
    //var presentermode = false;
    var bookmarkpageid = "";
    var quizpageid = "p26";
    var _NData = {
        "p1": {
            pageId: "p1",
            prevPageId: "",
            nextPageId: "p2",
            dataurl: "p1.htm",
            isStartPage: true,
            isAnswered: true,
        },
        "p2": {
            pageId: "p2",
            prevPageId: "p1",
            nextPageId: "p3",
            dataurl: "p2.htm",
            hinturl: "hintp2.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player",
        },
        "p2m1": {
            pageId: "p2m1",
            prevPageId: "p2",
            nextPageId: "p2m2",
            dataurl: "p2m1.htm",
            hinturl: "hintp2m1.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player Organize Context menu open",
        },
        "p2m2": {
            pageId: "p2m2",
            prevPageId: "p2m1",
            nextPageId: "p3",
            dataurl: "p2m2.htm",
            hinturl: "hintp2m2.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player Organize menu submenu Sort by open",
        },

        "p3": {
            pageId: "p3",
            prevPageId: "p2",
            nextPageId: "p4",
            dataurl: "p3.htm",
            hasActivity: true,
            hasVideo: true,
        },
        "p4": {
            pageId: "p4",
            prevPageId: "p3",
            nextPageId: "p6",
            dataurl: "p4.htm",
            hinturl: "hintp4.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player",
        },
        "p5": {//optional
            pageId: "p5",
            prevPageId: "p4",
            nextPageId: "p6",
            dataurl: "p5.htm",
            hinturl: "hintp5.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player Music Context menu open",
        },
        "p6": {
            pageId: "p6",
            prevPageId: "p4",
            nextPageId: "p7",
            dataurl: "p6.htm",
            hinturl: "hintp6.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player",
        },
        "p7": {
            pageId: "p7",
            prevPageId: "p6",
            nextPageId: "p8",
            dataurl: "p7.htm",
            hasActivity: true,
            hasVideo: true,
        },
        "p8": {
            pageId: "p8",
            prevPageId: "p7",
            nextPageId: "p10",
            dataurl: "p8.htm",
            hinturl: "hintp8.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player Music Context menu open",
        },
        "p9": {//optional
            pageId: "p9",
            prevPageId: "p8",
            nextPageId: "p10",
            dataurl: "p9.htm",
            hinturl: "hintp9.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player Genre Context menu open",
        },
        "p10": {
            pageId: "p10",
            prevPageId: "p8",
            nextPageId: "p11",
            dataurl: "p10.htm",
            hinturl: "hintp10.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player",
        },
        "p11": {
            pageId: "p11",
            prevPageId: "p10",
            nextPageId: "p14",
            dataurl: "p11.htm",
            hinturl: "hintp11.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player",
        },
        "p12": {//optional
            pageId: "p12",
            prevPageId: "p11",
            nextPageId: "p13",
            dataurl: "p12.htm",
            hinturl: "hintp12.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player Organize Context menu open",
        },
        "p13": {//optional
            pageId: "p13",
            prevPageId: "p12",
            nextPageId: "p14",
            dataurl: "p13.htm",
            hinturl: "hintp13.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player Organize menu submenu Sort by open",
        },
        "p14": {
            pageId: "p14",
            prevPageId: "p11",
            nextPageId: "p15",
            dataurl: "p14.htm",
            hasActivity: true,
            hasVideo: true,
        },
        "p15": {
            pageId: "p15",
            prevPageId: "p14",
            nextPageId: "p16",
            dataurl: "p15.htm",
            hinturl: "hintp15.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player",
        },
        "p16": {
            pageId: "p16",
            prevPageId: "p15",
            nextPageId: "p17",
            dataurl: "p16.htm",
            hinturl: "hintp16.htm",
            hasActivity: true,
            hashint: true,
            accessText: "Windows Media Player Create playlist menu open",
        },
        "p17": {
            pageId: "p17",
            prevPageId: "p16",
            nextPageId: "p18",
            dataurl: "p17.htm",
            hinturl: "hintp17.htm",
            hasActivity: true,
            hashint: true,
            accessText: "New Auto Playlist dialogue window open",
        },
        "p18": {
            pageId: "p18",
            prevPageId: "p17",
            nextPageId: "p19",
            dataurl: "p18.htm",
            hinturl: "hintp18.htm",
            hasActivity: true,
            hashint: true,
            accessText: "New Auto Playlist dialogue window open",
        },
        "p19": {
            pageId: "p19",
            prevPageId: "p18",
            nextPageId: "p20",
            dataurl: "p19.htm",
            hinturl: "hintp19.htm",
            hasActivity: true,
            hashint: true,
            accessText: "New Auto Playlist dialogue window Music in my library combobox open",
        },
        "p20": {
            pageId: "p20",
            prevPageId: "p19",
            nextPageId: "p21",
            dataurl: "p20.htm",
            hinturl: "hintp20.htm",
            hasActivity: true,
            hashint: true,
            accessText: "New Auto Playlist dialogue window open",
        },
        "p21": {
            pageId: "p21",
            prevPageId: "p20",
            nextPageId: "p22",
            dataurl: "p21.htm",
            hinturl: "hintp21.htm",
            hasActivity: true,
            hashint: true,
            accessText: "New Auto Playlist dialogue window  Criteria Genre combo box open",
        },
        "p22": {
            pageId: "p22",
            prevPageId: "p21",
            nextPageId: "p23",
            dataurl: "p22.htm",
            hinturl: "hintp22.htm",
            hasActivity: true,
            hashint: true,
            accessText: "New Auto Playlist dialogue window open",
        },
        "p23": {
            pageId: "p23",
            prevPageId: "p22",
            nextPageId: "p24",
            dataurl: "p23.htm",
            hinturl: "hintp23.htm",
            hasActivity: true,
            hashint: true,
            accessText: "New Auto Playlist dialogue window  Criteria Genre combo box open",
        },
        "p24": {
            pageId: "p24",
            prevPageId: "p23",
            nextPageId: "p25",
            dataurl: "p24.htm",
            hasActivity: true,
            hinturl: "hintp24.htm",
            hashint: true,
            accessText: "New Auto Playlist dialogue window open",
        },
        "p25": {
            pageId: "p25",
            prevPageId: "p24",
            nextPageId: "p26",
            dataurl: "p25.htm",
            hasActivity: true,
            hasVideo: true,
        },

        "p26": {
            pageId: "p26",
            prevPageId: "p25",
            nextPageId: "",
            dataurl: "p26.htm",
            hasActivity: true,
            isLastPage: true,
            isAssessment: true,
            hideHint: true
        }
    }
    var _StateData = {}

    function OnPageLoad() {

        $(".hintcontainer").hide()
        $(".hintlink").removeClass("expanded");
        $(".hintlink").attr("aria-expanded", "false")
        $("#header-title h1").show()
        $("#header-title").removeClass("startpage");
        if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
            $("#header-title h1").hide()
            $("#header-title").addClass("startpage");
        }
        if (_currentPageObject.accessText != undefined) {
            $(".activityimg").attr("alt", _currentPageObject.accessText);
        }
        _ModuleCommon.OnPageLoad();
        if (_Navigator.IsPresenterMode()) {
            $("#linknext").k_enable();
            $(".start-btn").k_disable();
        }
        if ((_currentPageObject.pageId == "p3" || _currentPageObject.pageId == "p7" || _currentPageObject.pageId == "p14" || _currentPageObject.pageId == "p25") && (isIpad || isIphone || isSafari)) {
            $(".activityvideo").attr("controls", "true");
        }
    }
    return {
        Get: function () {
            return _NData;
        },

        Start: function () {
            this.LoadPage("p1");
            if (this.IsPresenterMode()) {
                _ModuleCommon.AppendFooter();
            }
        },

        LoadPage: function (pageId, jsonObj) {
            $(".hintcontainer").hide();
            if (_Navigator.IsRevel() && _currentPageId !=undefined && _currentPageId !="") {
               LifeCycleEvents.OnUnloadFromPlayer()
            }
            bookmarkpageid = pageId;
            if (jsonObj == undefined) {
                jsonObj = {};
            }
            _currentPageId = pageId;
            this.UpdateProgressBar();
            _currentPageObject = _NData[_currentPageId]
            $("#header-progress").show();
            $("#header-title").show();
            $("footer").show();

            if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();
                $("footer").hide();
                $("#header-progress").hide();
                if (this.IsPresenterMode())
                    _ModuleCommon.AppendFooter();

            }
            if (_currentPageObject.hasActivity != undefined && _currentPageObject.hasActivity && !this.IsAnswered()) {
                $("#linknext").k_disable();
                $('#submitbtn').k_disable();
            }
            if (this.IsAnswered() || _currentPageObject.played) {
                $("#linknext").k_enable();
            }

            if (_currentPageObject.isLastPage != undefined && _currentPageObject.isLastPage) {
                $("#linknext").k_disable();
            }
            _currentPageObject.isVisited = true;

            var pageUrl = _Settings.dataRoot + _currentPageObject.dataurl + _Caching.GetUrlExtension();
            if (_currentPageObject.pageId == "p2") { // temporary fix
                $("#progressdiv").css("margin-left", "-20px")
            }
            else {
                $("#progressdiv").css("margin-left", "-15px")
            }
            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad();
                    $("#titleheader").focus();
                });
            } else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        if ($(".activityimg").length > 0) {
                            $('.activityimg').load(function () {
                                OnPageLoad();
                                if (_currentPageObject.pageId == "p2") {
                                    $("#titleheader").focus();
                                }
                                else {
                                    if (_currentPageId != quizpageid) {
                                        $("#progressdiv").focus();
                                    }
                                    else {
                                        $("#Questioninfo").focus();
                                    }
                                }
                                if (_Navigator.IsPresenterMode() && (_currentPageObject.pageId !=quizpageid || _currentPageObject.pageId !="summary" || !_currentPageObject.hasVideo )) {
                                    _ModuleCommon.PresenterMode();
                                }

                            });
                        }
                        else{
                            OnPageLoad();
                        }

                        if (_currentPageId == quizpageid)//  change to assessment id
                        {
                            _Assessment.ShowQuestion();
                        }
                        if (_Navigator.GetCurrentPage().hasVideo && !_Navigator.IsAnswered()) {
                            $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
                        }
                        if (_Navigator.GetCurrentPage().hasVideo && _Navigator.IsPresenterMode()){
                            _Navigator.SetPageStatus(true);
                            _Navigator.UpdateProgressBar();
                        }
                        if (_Navigator.GetCurrentPage().pageId == "p17" && _Navigator.IsPresenterMode()){
                            _Navigator.SetPageStatus(true);
                            _Navigator.UpdateProgressBar();
                        }
                        //$("#hintdiv").show();
                        if (_currentPageObject.hideHint != undefined && _currentPageObject.hideHint) {
                            $("#hintlink").k_disable();
                            $(".hintdiv").hide();
                        }
                        if (_currentPageObject.hinturl != undefined || _currentPageObject.hashint) {
                            $("div#hintdiv").show();
                            //$(".hintlink").show();
                            $("div#hintdiv").css("margin-left", "auto");
                            $(".hintlink").k_enable();
                            $(".hintcontent").load("pagedata/hintdata/" + _currentPageObject.hinturl, function () { });
                        }
                        else {
                            //$(".hintlink").hide();
                            $("div#hintdiv").hide();
                        }
                        if (_Navigator.GetCurrentPage().hideHint != undefined && _Navigator.GetCurrentPage().hideHint) {
                            //$(".hintlink").hide();
                            $("div#hintdiv").hide();
                        }
                        _NData[_currentPageObject.pageId].isLoaded = true;
                        if (_currentPageObject.pageId == "p2")
                            $("#titleheader").focus();
                        else if(_currentPageObject.pageId == quizpageid)
                            $(".pageheading").focus();
                        else
                            $("#progressdiv").focus();

                        _Navigator.GetBookmarkData();
                    });
                })
            }

            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnLoadFromPlayer()
             }

        },
        LoadDefaultQuestion: function () {
            if (_currentPageObject.questions.length > 0) {
                _questionId = 0;
                _currentPageObject.questions[0].isQuestionVisit = true;
                for (var i = 0; i < _currentPageObject.questions.length; i++) {
                    if (_currentPageObject.questions[i].isCurrent) {
                        _questionId = i;
                    }
                }
                //second parameter is to disable question effect.
                _Question.Load(_currentPageObject.questions[_questionId], {
                    disableEffect: true
                });
            }
        },
        Prev: function () {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Previous link click.")
            }
            if (_currentPageObject.pageId == quizpageid && typeof (currentQuestionIndex) != 'undefined' && currentQuestionIndex > 0) {
                $("#ReviewIns").hide();
                $(".intro-content-question").show();
                $("#Questioninfo").show();
                currentQuestionIndex = currentQuestionIndex - 1;
                $("#Summary").empty();
                $("#Summary").hide();
                _Assessment.ShowQuestion();
            }
            else {
                this.LoadPage(_currentPageObject.prevPageId);
            }

        },
        Next: function () {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Next link click.")
            }
            $("#linkprevious").k_enable();
            
            if (_currentPageObject.pageId == quizpageid) {

                if (typeof (currentQuestionIndex) != 'undefined' && typeof (gRecordData.Questions) != 'undefined' && (currentQuestionIndex + 1) < gRecordData.Questions.length) {
                    currentQuestionIndex = currentQuestionIndex + 1
                    $("#Questioninfo").show();
                    _Assessment.ShowQuestion()

                    //this.UpdateProgressBar();
                    if (gRecordData.Status != "Completed" && !this.IsPresenterMode()) {
                        $("#linknext").k_disable();
                        $("#linkprevious").k_disable();
                    }
                }
                else if (typeof (currentQuestionIndex) != 'undefined' && typeof (gRecordData.Questions) != 'undefined' && (currentQuestionIndex + 1) == gRecordData.Questions.length) {
                    //this.UpdateProgressBar();
                    // Show review instruction

                    $(".intro-content-question").hide();
                    $(".questionwrapper").hide();
                    currentQuestionIndex = currentQuestionIndex + 1;
                    $("#Summary").show();
                    $("#Questioninfo").hide();
                    $("#Summary").load("pagedata/Summary.htm", function () {
                        _Assessment.ShowSummary()
                        $("#linkprevious").k_enable();
                        $("#Summary").find("input[type='radio']").attr("readonly", "readonly");
                        $(".question-band").find("img").attr("aria-hidden", "true");
                    })
                    $("#climate-deal").css("margin-left", "23%");
                    $("#linknext").k_disable();
                    //$(".inputcircle").k_disable();
                }

            }
            else {

                this.LoadPage(_currentPageObject.nextPageId);
            }
        },
        GetProgressData: function () {
            var visitpage = 0;
            for (var i in _NData) {
                if (_NData[i].isAnswered != undefined && (_NData[i].isAnswered == true)) {
                    visitpage++;
                }
            }
            visitpage += this.GetAnswerCount();
            return visitpage;
        },
        GetAnswerCount: function () {
            var cnt = (gRecordData.Questions.filter(function (item) {
                return item.IsAnswered;
            }).length)
            cnt += gRecordData.Status == "Completed" ? 1 : 0;
            return cnt;
        },
        UpdateProgressBar: function () {
            var progData = this.GetProgressData();
            var lprog_pecent = (progData * 100 / progressLevels[0]).toFixed(0);
            $(".progressDiv").text("Progress: " + lprog_pecent + "%");
            $(".progressFg").css("width", lprog_pecent + "%");


        },
        GetCurrentPage: function () {
            return _currentPageObject;
        },
        CompletePage: function (extendedJson) {
            _currentPageObject.IsComplete = true;
            _currentPageObject = $.extend(true, _currentPageObject, extendedJson)
            _StateData[_currentPageObject.pageId] = $.extend(true, {}, _currentPageObject);
        },
        GetTotalScore: function () {
            var ObtainPoint = 0;

            for (var i in _NData) {
                if (_NData[i].points > 0) {
                    ObtainPoint += _NData[i].points
                }
            }
            var score = (ObtainPoint / totalsimscore) * 100;
            return score.toFixed(0);
        },
        UpdateScore: function () {
            var percScore = this.GetTotalScore()
            $("#scorediv").html("Score: " + percScore + "%");
        },
        SetPageScore: function (points) {
            if (!_currentPageObject.isAnswered) {
                _NData[_currentPageId].points = points;
                this.UpdateScore();
            }
        },
        SetPageStatus: function (isAnswered) {
            if (isAnswered) {
                _NData[_currentPageObject.pageId].isAnswered = true;
                this.UpdateProgressBar();
            }
        },
        IsAnswered: function () {
            if (_currentPageObject.isAnswered != undefined && _currentPageObject.isAnswered)
                return true;

            return false;

        },
        IsLoaded: function () {
            if (_currentPageObject.isLoaded != undefined && _currentPageObject.isLoaded)
                return true;

            return false;

        },
        CheckIfPageLoaded: function (pageid) {
            return _NData[pageid].isLoaded != undefined && _NData[pageid].isLoaded ? true : false;
        },
        SetPresenterMode: function (val) {
            packageType = val;
        },
        IsPresenterMode: function () {
            if(packageType == "presenter"){
                return true;
            }
            else{
                return false;
            }
        },
        SetVideoStatus: function(){
            _NData[_currentPageId].played = true;
        },
        SetNextPageId: function (nextpageid) {
            if (nextpageid == "p12") {
                _NData[_currentPageObject.nextPageId].prevPageId = "p13";
                progressLevels[0] = progressLevels[0] + 2;//increase num of pages by 1 
            }
            else if (nextpageid == "p2m1") {
                _NData[_currentPageObject.nextPageId].prevPageId = "p2m2";
                progressLevels[0] = progressLevels[0] + 2;//increase num of pages by 1 
            }
            else {
                _NData[_currentPageObject.nextPageId].prevPageId = nextpageid;
                progressLevels[0] = progressLevels[0] + 1;//increase num of pages by 1 
            }
            _NData[_currentPageId].nextPageId = nextpageid;
            this.GetBookmarkData();

        },
         GetBookmarkData: function () {
            if (!this.IsScorm() && !this.IsRevel())
                return;
            var bookmarkobj = {}
            bookmarkobj.BMPageId = bookmarkpageid;
            bookmarkobj.VisistedPages = this.GetNavigatorBMData();
            bookmarkobj.ProgressLevels = progressLevels;
            bookmarkobj.ReviewData = _ModuleCommon.GetReviewData();
            bookmarkobj.AssessmentData = _Assessment.Getbookmarkdata();
            if (this.IsRevel()) {
                if (k_Revel.get_LaunchData().mode == LaunchModes.do) {
                    var suspend_data = JSON.stringify(bookmarkobj);
                    k_Revel.set_StateData(JSON.parse(suspend_data))
                    k_Revel.PostData(gRecordData.Score, gRecordData.AssessmentScore);
                }
            }
            else if (this.IsScorm()) {
                _ScormUtility.SetSuspendData(JSON.stringify(bookmarkobj))
            }

        },
        GetNavigatorBMData: function () {
            var gVisistedPages = [];
            for (var i in _NData) {
                if (_NData[i].isAnswered || _NData[i].hasVideo) {
                    if(_NData[i].hasVideo){
                        gVisistedPages.push({ id: _NData[i].pageId, prev: _NData[i].prevPageId, next: _NData[i].nextPageId, played: _NData[i].played })
                    }else{
                        gVisistedPages.push({ id: _NData[i].pageId, prev: _NData[i].prevPageId, next: _NData[i].nextPageId })
                    }
                }
            }
            return gVisistedPages;
        },
        SetNavigatorBMData: function (gVisistedPages) {
            for (var i = 0; i < gVisistedPages.length; i++) {
                if(_NData[gVisistedPages[i].id].hasVideo  ){
                    if( _NData[gVisistedPages[i].id].played != undefined &&  _NData[gVisistedPages[i].id].played )
                    _NData[gVisistedPages[i].id].isAnswered = gVisistedPages[i].played;
                    _NData[gVisistedPages[i].id].played = gVisistedPages[i].played;
                }
                else{
                    _NData[gVisistedPages[i].id].isAnswered = true;
                }
                _NData[gVisistedPages[i].id].prevPageId = gVisistedPages[i].prev;
                _NData[gVisistedPages[i].id].nextPageId = gVisistedPages[i].next;
            }
        },
          SetBookMarkPage: function () {
            if (!this.IsScorm() && !this.IsRevel())
                return;
            if (this.IsScorm()) {
                _ScormUtility.SetBookMark(bookmarkpageid);
            }
            else if (this.IsRevel()) {
                this.GetBookmarkData();
            }
        },
        SetBookmarkData: function () {
            var bookmarkdata;
            if(this.IsScorm())
            {
                bookmarkdata = _ScormUtility.GetSuspendData();
            }
            else if(this.IsRevel())
            {
                bookmarkdata = JSON.stringify(k_Revel.get_StateData())
            }
            
            if (bookmarkdata != undefined && bookmarkdata != "") {
                bookmarkdata = JSON.parse(bookmarkdata);
                bookmarkpageid = bookmarkdata.BMPageId;
                this.SetNavigatorBMData(bookmarkdata.VisistedPages)
                progressLevels = bookmarkdata.ProgressLevels;
                _ModuleCommon.SetReviewData(bookmarkdata.ReviewData)
                _Assessment.Setbookmarkdata(bookmarkdata.AssessmentData)
            }
        },
        GetBookMarkPage: function () {
            return bookmarkpageid;
        },
        Initialize: function () {
            if (packageType == "scorm") {
                _ScormUtility.Init();
                _Navigator.SetBookmarkData();
                //bookmarkpageid = _ScormUtility.GetBookMark();
                this.GotoBookmarkPage();
            }
            else if (packageType == "revel") {
                g_tempIntv = setInterval(function () {
                    if ((typeof piSession != 'undefined' && typeof piSession.currentToken() != 'undefined' && piSession.currentToken() != null)) {
                        clearInterval(g_tempIntv);
                        g_tempIntv = null;
                        //The rest of the code will go here.
                        LifeCycleEvents.InitParams();
                        LifeCycleEvents.OnLoad();
                        if (!k_Revel.isLaunchInitialize()) {
                            k_Revel.InitLaunch()
                            var suspend_data = JSON.stringify(k_Revel.get_StateData());
                            if (suspend_data != "" && suspend_data != "{}") {
                                var isTrue = this.SetBookmarkData();
                                if (isTrue && k_Revel.get_LaunchData().mode == "do") {
                                    this.GotoBookmarkPage();
                                } else {
                                    k_Revel.set_StateData(JSON.parse(suspend_data))
                                }
                            }
                        }
                        if (k_Revel.get_LaunchData().mode == "review") {
                            var suspend_data = JSON.stringify(k_Revel.get_StateData());
                            if (suspend_data != "" && suspend_data != "{}") {
                                this.SetBookmarkData(suspend_data);
                                isReview = true;
                            }
                        }
                    }
                }, 100);

            }
            else
            {
                _Navigator.Start();
            }
        },
        GotoBookmarkPage: function () {
           
            if (bookmarkpageid != undefined && bookmarkpageid != "") {
                _Navigator.LoadPage(bookmarkpageid)
            }
            else {
                _Navigator.Start();
            }
        },
        IsScorm: function () {
            if (packageType == "scorm")
                return true;

            return false;

        },
        IsRevel: function () {
            if (packageType == "revel")
                return true;
            return false;
        },
        GetPackageType: function () {
            return packageType;
        },
    };
})();



function setReader(idToStartReading) {
    $('#hiddenAnchor').attr("href", "#" + idToStartReading)
    $('#hiddenAnchor')[0].click()
}


function removeCSS(cssFileToRemove) {
    for (var w = 0; w < document.styleSheets.length; w++) {
        if (document.styleSheets[w].href.indexOf(cssFileToRemove) != -1) {
            document.styleSheets[w].disabled = true;
        }
    }
}
function addCSS(cssFileToAdd) {
    var isCSSAlreadyAdded = false;
    for (var w = 0; w < document.styleSheets.length; w++) {
        if (document.styleSheets[w].href.indexOf(cssFileToAdd) != -1) {
            isCSSAlreadyAdded = false;
        }
    }
    console.log(isCSSAlreadyAdded + " --")
    if (!isCSSAlreadyAdded) {
        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFileToAdd);
        document.getElementsByTagName("head").item(0).appendChild(newlink);
    }
}

function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
