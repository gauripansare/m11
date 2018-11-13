
$(document).on("mouseover", ".qheight", function (event) {
    $(this).css({
        "font-weight": "bold"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#003058",
        "color": "#F9FF00"
    });
});

$(document).on("mouseout", ".qheight", function (event) {
    $(this).css({
        "font-weight": "normal"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#007AA2",
        "color": "#FFF"
    });
});

$(document).on("click", ".qheight", function (event) {
    $(".qheight").removeClass("optionselected");

    $(this).addClass("optionselected");

});

var hotspotclicked = false;;
var hotspot;
$(document).on("click", ".divHotSpot", function (event) {
    if (_Navigator.IsPresenterMode()) {
        return;
    }
    event.preventDefault();
    $(this).k_disable()
    if (hotspotclicked || _Navigator.IsAnswered())
        return;
    hotspotclicked = true;
    $(this).addClass("hotspotclicked")
    hotspot = $(this);
    setTimeout(function () {
        hotspotclicked = false;
        _ModuleCommon.HotspotClick(hotspot, event);
    }, 400)

});

/*$(document).on("dblclick", ".divHotSpotdbl", function (event) {
    if(_Navigator.IsPresenterMode()){
        return;
    }
    event.preventDefault();
    $(this).k_disable()
    if (hotspotclicked || _Navigator.IsAnswered())
        return;
    hotspotclicked = true;
    $(this).addClass("hotspotclicked")
    hotspot = $(this);
    setTimeout(function () {
        hotspotclicked = false;
        _ModuleCommon.HotspotClick(hotspot, event);
       
    },400)
});*/


$(document).on("click", ".divHotSpotdbl", function (event) {
    if (_Navigator.IsPresenterMode()) {
        return;
    }
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    else {
        event.preventDefault();
        $(this).k_disable()
        if (hotspotclicked || _Navigator.IsAnswered())
            return;
        $(this).addClass("hotspotclicked")
        hotspot = $(this);
        setTimeout(function () {
            hotspotclicked = false;
            _ModuleCommon.HotspotClick(hotspot, event);
        }, 400);
        count = 0;

    }
});
$(document).on("keyup", ".divHotSpotdbl", function (event) {
    if (_Navigator.IsPresenterMode()) {
        return;
    }
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    } else {
        event.preventDefault();
        if (window.event) {
            key = window.event.keyCode;
        } else if (event) {
            key = event.keyCode;
        }
        if (key == 13) {
            $(this).k_disable()
            if (hotspotclicked || _Navigator.IsAnswered())
                return;
            $(this).addClass("hotspotclicked")
            hotspot = $(this);
            setTimeout(function () {
                hotspotclicked = false;
                _ModuleCommon.HotspotClick(hotspot, event);
            }, 400);
        }

    }
});

$(document).on("keydown", ".divHotSpotDbClick", function (event) {
    if (_Navigator.IsPresenterMode()) {
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(this).trigger("click");
    }
});

$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Prev();
});

$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Next();
});

$(document).on("click", ".hintlink", function (event) {
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if ($(this).hasClass("expanded")) {
        $(".hintlink").removeClass("expanded")
        $(".hintlink").attr("aria-expanded", "false")
        $(".hintcontainer").slideUp(100);
        $(".pageheading").focus();
        open = "close";
    }
    else {
        $(".hintcontainer").slideDown(100, function () {
            $(".hintlink").addClass("expanded");
            $(".hintlink").attr("aria-expanded", "true");
            $(".hintcontainer .hintcontent").find("p:first").attr("tabindex", "-1")
            if (iOS) {
                $(".hintcontainer .hintcontent").find("p:first").attr("role", "text")
            }
            $(".hintcontainer .hintcontent").find("p:first").focus();
        });
    }
    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnInteraction("Hint button click. Hint " + open)
    }

});

$(document).on("click", ".closehintlink", function (event) {

    $(".hintlink").removeClass("expanded")
    $(".hintlink").attr("aria-expanded", "false")
    $(".hintcontainer").slideUp(100, function () { $("h2.pageheading").focus(); });
    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnInteraction("Hint button click. Hint closed")
    }

});

$(document).on("keydown", "input.EmbededElement", function (event) {
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        _ModuleCommon.InputEnter($(this));
    }
});

$(window).resize(function () {
    _ModuleCommon.OrientationChange();
});

$(window).resize(function () {
});

$(document).on('click', ".activityimg", function (event) {
    if ($(".divHotSpot").hasClass("disabled") || $(".divHotSpot").length == 0)
        return;
    _ModuleCommon.AddEditPropertiesClick(event);
});

$(document).on('click', "#start", function (event) {
    _Navigator.Next();
    //_Navigator.LoadPage("p3")
});

$(document).on('click', ".reviewsubmit", function (event) {
    _Navigator.Next();
});

$(document).on('touchstart', ".hintlink", function (event) {
    mouseenter();
    touchend = false;
});

var touchend = false;
$(document).on('touchend ', ".hintlink", function (event) {
    mouseleave();
    touchend = true;
});

$(document).on('mouseenter', ".hintlink", function (event) {
    mouseenter();
});

$(document).on('mouseleave', ".hintlink", function (event) {
    mouseleave();
});

$(document).on("change", ".assessmentradio", function (event) {
    $(".assessmentSubmit").k_enable();

});

$(document).on('keydown', "#p17val1", function (event) {
    var currentpid = _Navigator.GetCurrentPage().pageId;
    if (event.keyCode == 13) {
        if ($(this).val() == undefined || $(this).val() == "") {
            return;
        }
        var inputtextids = $("input[type='text']").map(function () {
            return $(this).attr("id");
        });
        for (var i = 0; i < inputtextids.length; i++) {
            _ModuleCommon.AddReviewData(inputtextids[i], true);
        }
        if ($.trim($(this).val()).toLowerCase() == _PData[currentpid].answerset) {
            _Navigator.GetCurrentPage().isAnswered = true;
            _Navigator.Next();
        }
    }
});

$(document).on("change", ".assessmentradio", function (event) {
    $(".assessmentSubmit").k_enable();
});

$(document).on("click", ".assessmentSubmit", function (event) {
    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnSubmit();
    }
    gRecordData.Questions[currentQuestionIndex].UserSelectedOptionId = $("input[type='radio']:checked").attr("id");
    gRecordData.Questions[currentQuestionIndex].IsAnswered = true;
    _Navigator.GetBookmarkData();
    _Navigator.Next();
});

$(document).on('click', ".menuArrow", function (event) {
    //$(".levelsubMenu").hide();
    $(".levelsubMenu").toggle();
});

$(document).on('click', ".inputcircle", function (event) {
    $(this).next(".inpputtext").trigger("click");
});

window.onload = function () {
    _ScormUtility.Init();
}

window.onunload = function () {
    _ScormUtility.End();
}

$(document).on("mousemove", ".imgSliderHover", function (e) {
    if (isAndroid || isIphone)
        return;
    var cursorX = e.pageX - this.offsetLeft;
    console.log(cursorX + ":: X ::");
    var imagerightPosition = Number($(".imgAnimate").css('right').replace("px", ""));
    if (cursorX >= 179 && cursorX <= 575) {
        if (imagerightPosition == -400) {
            $(".activityContainer .imgAnimate").animate({ right: "-=400px" }, { queue: false, complete: function () { } });
        }
    }
    if (cursorX >= 575 && cursorX <= 975) {
        if (imagerightPosition == -800) {
            $(".activityContainer .imgAnimate").animate({ right: "+=400px" }, { queue: false, complete: function () { } });
        }
    }
});

$(document).on("mousemove", ".imgAnimate", function (e) {
    if (isAndroid || isIphone)
        return;
    var cursorXX = e.pageX - this.offsetLeft;
    console.log(cursorXX + ":: XX ::");
    var imagerightPosition = Number($(".imgAnimate").css('right').replace("px", ""));
    if (cursorXX >= 340 && cursorXX <= 575) {
        if (imagerightPosition == -400) {
            $(".activityContainer .imgAnimate").animate({ right: "+=400px" }, { queue: false, complete: function () { } });
        }
    }
    if (imagerightPosition == 0) {
        if (cursorXX >= 179 && cursorXX <= 575) {
            $(".activityContainer .imgAnimate").animate({ right: "-=800px" }, { queue: false, complete: function () { } });
        }
        if (cursorXX >= 401 && cursorXX <= 730) {
            $(".activityContainer .imgAnimate").animate({ right: "-=400px" }, { queue: false, complete: function () { } });
        }
    }
});

$(document).on("mouseout", ".imgSliderHover, .imgAnimate", function (e) {
    if (isAndroid || isIphone)
        return;
    var imagerightPosition = Number($(".imgAnimate").css('right').replace("px", ""));
    if (imagerightPosition == -400) {
        $(".activityContainer .imgAnimate").animate({ right: "+=400px" }, { queue: false, complete: function () { } });
    }
    if (imagerightPosition == 0) {
        $(".activityContainer .imgAnimate").animate({ right: "-=400px" }, { queue: false, complete: function () { } });
    }
});

$(document).on('click', ".vpwrapperimage img", function (event) {
    if ($(this).hasClass('imgSliderHover')) {
        $(".vpwrapperimage .imgSliderHover").css('z-index', '-1');
        $(".vpwrapperimage .imgAnimate").css('z-index', '1');
    } else {
        $(".vpwrapperimage .imgSliderHover").css('z-index', '1');
        $(".vpwrapperimage .imgAnimate").css('z-index', '-1');
    }
})

function mouseenter() {
    $(".hintlink .hintlinkspan").css({ "color": "#b22222", "border-bottom": "1px solid #b22222" })
    $(".hintlink").find("path").css({ "fill": "#b22222" })
}

function mouseleave() {
    $(".hintlink .hintlinkspan").css({ "color": "#047a9c", "border-bottom": "1px solid #047a9c" })
    $(".hintlink").find("path").css({ "fill": "#047a9c" })
}

