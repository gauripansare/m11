var userAgentCustom = window.navigator.userAgent;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CurClientWidth = window.innerWidth;
var Macbrowser = navigator.userAgent.indexOf('Chrome');
var Macos = navigator.userAgent.indexOf('Mac');
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isIpad = userAgentCustom.match(/iPad/i)
var isIphone = navigator.userAgent.indexOf('iPhone') > -1
var isIEEdge = /Edge/.test(navigator.userAgent)
var isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)
var animTime = 1000;

if (isIphone != null) {
    animTime = 3000;
}

jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
        if (isIE11version) {
            if ($(this).attr("type") != undefined && $(this).attr("type") == "radio")
                return;
            $(this).removeAttr("disabled")
        }
        return;
    },
    link_k_disable: function() {
        return this.addClass('disabled').attr("aria-disabled","true");
    },
    k_IsDisabled: function () {
        if (this.hasClass('disabled')) { return true; } else { return false; }
    }
});


var _ModuleCommon = (function () {
    var reviewData = [];
    return {
        EnableNext: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (currentPageData.nextPageId != undefined && currentPageData.nextPageId != "") {
                $("#linknext").k_enable();
            }
        },

        GetPageReviewData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        return reviewData[i];
                    }
                }
            }
        },
        GetReviewData: function () {
            return reviewData;
        },
        SetReviewData: function (rData) {
            reviewData = rData;
        },
        GetPageDetailData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            return pageData;
        },

        ShowFeedbackReviewMode: function () {
            var pageData = this.GetPageDetailData();
            var fdkurl = "";
            if (pageData != undefined) {
                if (pageData.EmbedSettings != undefined) {
                    fdkurl = pageData.EmbedSettings.feedbackurl;
                }
                else {
                    if (pageData.ImageHotSpots.correctfeedback != undefined) {
                        fdkurl = pageData.ImageHotSpots.correctfeedback;
                    }
                }
                if (fdkurl != undefined && fdkurl != "") {
                    fdkurl = _Settings.dataRoot + fdkurl;
                    $("#div_feedback").show();
                    $("#div_feedback").css("display", "inline-block");
                    $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                        //this.SetFeedbackTop()
                        $("body").animate({
                            scrollTop: $(document).height()
                        }, 1000);
                    });
                }
            }
        },

        DisplayInstructorReviewMode: function () {
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {
                this.ViewTextEntryInReviewMode();
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    for (var i = 0; i < reviewData.Positions.length; i++) {
                        var posObj = reviewData.Positions[i];
                        var appendImage = $(".wrapperimage");
                        var ht = appendImage.height();
                        if (ht < 597)
                            ht = 597;
                        while ((posObj.posY + 40) > ht) {
                            posObj.posY = posObj.posY - 2;
                        }
                        if (posObj.isCorrect) {
                            var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                            appendImage.append(_div);
                        } else {
                            var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";
                            appendImage.append(_divI);
                        }
                    }
                }
            }
            if (_Navigator.GetCurrentPage().pageId == "p2" && _Navigator.CheckIfPageLoaded("p2m1"))//do not load feedback on p2 if another path is taken by user
            {
                return;
            }
            this.ShowFeedbackReviewMode();

            $(".divHotSpot").addClass("disabled");
            $(".divHotSpot").attr("aria-disabled", "true");
            $(".divHotSpot").attr("disabled", "true");

        },

        InstructorReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {
                var p = "";
                for (i = 0; i < reviewData.textEntry.length; i++) {
                    if (reviewData.textEntry[i] != undefined && reviewData.textEntry[i] != "") {
                        var tEntry = reviewData.textEntry[i].trim();
                        if (pageDetailData.answerset.indexOf(tEntry) >= 0) {
                            if (reviewData.isCorrect && i == 0) {
                                $("#" + pageDetailData.EmbedSettings[i].inputid).val(reviewData.textEntry[i]).css({ "color": ColorCodes.green, "font-weight": "bold" });
                                $("#" + pageDetailData.EmbedSettings[i].inputid).show().k_disable();
                            }
                            else {
                                $("#" + pageDetailData.EmbedSettings[i - 1].reviewid).val(reviewData.textEntry[i]).css({ "color": ColorCodes.red, "font-weight": "bold" });
                                $("#" + pageDetailData.EmbedSettings[i - 1].reviewid).show();
                            }
                        }
                        else {
                            $("#" + pageDetailData.EmbedSettings[i].inputid).val(reviewData.textEntry[i]).css({ "color": ColorCodes.red, "font-weight": "bold" });
                            $("#" + pageDetailData.EmbedSettings[i].inputid).show();
                        }
                    }
                }
                $(".textentryreview1").show();
            }
        },

        DisplayUserReviewMode: function () {
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {
                this.DisplayReviewModeForTextEntry();
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    var posObj = reviewData.Positions[reviewData.Positions.length - 1];
                    var appendImage = $(".wrapperimage");
                    var ht = appendImage.height();
                    while ((posObj.posY + 40) > ht) {
                        posObj.posY = posObj.posY - 2;
                    }
                    if (posObj.isCorrect) {
                        var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                        appendImage.append(_div);
                    } else {
                        var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";
                        appendImage.append(_divI);
                    }
                }
            }
            this.ShowFeedbackReviewMode();
        },

        GetReviewData: function () {
            return reviewData;
        },

        AddReviewData: function (textentryObjId, isCorrect) {
            var found = false;
            var pageReviewData;
            var textentryObj = $("input#" + textentryObjId)
            var str = textentryObj.val().trim();
            var objId = textentryObjId;
            reviewData = this.GetReviewData();
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == _Navigator.GetCurrentPage().pageId && objId == reviewData[r].objId) {
                    var sameText = false;
                    if (reviewData[r].textEntry != undefined) {
                        for (var i = 0; i < reviewData[r].textEntry.length; i++) {
                            if (reviewData[r].textEntry[i] == str) {
                                sameText = true;
                                break;
                            }
                        }
                        if (!sameText) {
                            if (reviewData[r].textEntry.length < 2) {
                                reviewData[r].textEntry.push(str);
                            }
                            else {
                                reviewData[r].textEntry.splice(0, 1);
                                reviewData[r].textEntry.push(str);
                            }
                        }
                    }
                    else {
                        reviewData[r].textEntry = [str];
                    }
                    found = true;
                }
            }
            if (!found) {
                var _obj = {};
                _obj.pageId = _Navigator.GetCurrentPage().pageId;
                _obj.textEntry = [str];
                _obj.isCorrect = isCorrect;
                _obj.objId = objId;
                reviewData.push(_obj);
            }
            /*ITSimModule.SetReviewData(reviewData)
            if (isCorrect) {
              fSetScoreForReviewMode();
            }*/
        },

        DisplayReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {
                var p = "";
                if (reviewData.textEntry[reviewData.textEntry.length - 1] != undefined && reviewData.textEntry[reviewData.textEntry.length - 1] != "") {
                    var tEntry = reviewData.textEntry[reviewData.textEntry.length - 1].trim().toLowerCase();
                    if (pageDetailData.answerset.indexOf(tEntry) >= 0) {
                        $(".textentryreview1").html("<span class='OpenSansFont' style='color:green;font-weight:bold;font-size: 13px; '>" + reviewData.textEntry[reviewData.textEntry.length - 1] + "</span>")
                    }
                }
                $(".textentryreview1").show();
            }
        },

        ViewTextEntryInReviewMode: function () {
            $("input[type='text']").k_disable();
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _ModuleCommon.GetPageDetailData();
            if (reviewData != undefined) {
                for (var i = 0; i < reviewData.length; i++) {
                    var rData = reviewData[i];
                    if (pageData != undefined) {
                        if (pageData.EmbedSettings != undefined) {
                            for (j = 0; j < pageData.EmbedSettings.length; j++) {
                                if (rData.objId == pageData.EmbedSettings[j].inputid) {
                                    var txtObj = $("#" + pageData.EmbedSettings[j].reviewid);
                                    for (k = 0; k < rData.textEntry.length; k++) {
                                        var tEntry = rData.textEntry[k].trim();
                                        if (k == 0) {
                                            if (rData.textEntry[k].trim().toLowerCase() == pageData.answerset[k].trim().toLowerCase()) {
                                                $("#" + rData.objId).val(rData.textEntry[k]).css({ "color": ColorCodes.green, "font-weight": "bold" });
                                                $("#acc" + pageData.EmbedSettings[j].reviewid).text("correct value Entered " + rData.textEntry[k]);
                                                $("#" + rData.objId).attr("aria-hidden", "true");
                                                $("#" + rData.objId).prev("label").attr("aria-hidden", "true");
                                            }
                                            else {
                                                $("#" + rData.objId).val(rData.textEntry[k]).css({ "color": ColorCodes.red, "font-weight": "bold" });
                                                //$("#acc" + pageData.EmbedSettings[j].reviewid).text("incorrect value Entered " + rData.textEntry[k]);
                                                $("#" + rData.objId).attr("aria-hidden", "true");
                                                $("#" + rData.objId).prev("label").attr("aria-hidden", "true");
                                            }
                                        }
                                        if (k == 1) {
                                            $("#" + pageData.EmbedSettings[j].reviewid).text(rData.textEntry[k]).css({ "color": ColorCodes.green, "font-weight": "bold" });
                                            $("#acc" + pageData.EmbedSettings[j].reviewid).text("correct value Entered " + rData.textEntry[k] + " incorrect value entered " + rData.textEntry[k - 1]);
                                            $("#" + pageData.EmbedSettings[j].reviewid).show();
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        },

        AddHotspotClick: function (hotspotObj, event, isCorrect) {
            if (_Navigator.IsAnswered()) {
                return;
            }
            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;
            var rposX;
            var rposY;
            if (event != undefined && event.pageX != undefined) {
                rposX = (event.pageX - posX);
                rposY = (event.pageY - posY);
            }
            if (rposX < 0 || rposY < 0) {//gp if module is attmpted using accessibility
                rposX = hotspotObj.position().left + 20;
                rposY = hotspotObj.position().top + 20;
            }
            var currentPageData = _Navigator.GetCurrentPage();
            var page = this.GetPageDetailData();
            if (page.EmbedSettings != undefined) {
                return;
            }
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {
                    var sameclick = false;
                    var posindex = 0;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posY == rposY) {
                                sameclick = true;
                                posindex = i;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                            if (reviewData[r].Positions.length < 3) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                reviewData[r].Positions.splice(0, 1);
                                reviewData[r].Positions.push(position);
                            }
                        }
                        else {
                            if (reviewData[r].Positions[posindex].isCorrect == undefined || reviewData[r].Positions[posindex].isCorrect == false) {
                                reviewData[r].Positions[posindex].isCorrect = isCorrect;
                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                        reviewData[r].Positions = [position]
                    }
                    found = true;
                }
            }
            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                _obj.Positions = [position];
                //_obj.hsid = hotspotObj.hsid;
                reviewData.push(_obj);
            }

        },

        AddEditPropertiesClick: function (event) {
            if (_Navigator.IsAnswered()) {
                return;
            }
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData.EmbedSettings != undefined)
                return;
            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;
            var rposX = (event.pageX - posX);
            var rposY = (event.pageY - posY);
            if (isNaN(rposX) || isNaN(rposY))
                return;
            var currentPageData = _Navigator.GetCurrentPage();
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {
                    var sameclick = false;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posy == rposY) {
                                sameclick = true;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: false };
                            if (reviewData[r].Positions.length < 3) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                reviewData[r].Positions.splice(0, 1);
                                reviewData[r].Positions.push(position);
                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: false };
                        reviewData[r].Positions = [position]
                    }
                    found = true;
                }
            }
            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                var position = { posX: rposX, posY: rposY, isCorrect: false };
                _obj.Positions = [position]
                reviewData.push(_obj);
            }
        },

        OnPageLoad: function () {
            this.LoadHotSpot();
            this.ApplycontainerWidth();
            if ($("#div_feedback").length > 0) {
                $("#div_feedback").hide();

            }
            if (_Navigator.IsAnswered()) {
                this.DisplayInstructorReviewMode();
                $(".divHotSpot, .divHotSpotdbl").addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
                //this.ViewTextEntryInReviewMode();
            }
            if (isFirefox) {
                $('#footer-navigation').css('display', 'table');
            }
            $("h2.pageheading").attr("tabindex", "-1");
            if (isIE11version) {
                $(".hintlink").css("padding-left", "68px");
            }
        },

        LoadHotSpot: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            if (pageData != undefined) {
                var hotspotdata = pageData.ImageHotSpots;
                var htmlForDivHotspotImage = "";
                if (pageData.ImageHotSpots != undefined) {
                    for (var i = 0; i < hotspotdata.Hotspots.length; i++) {
                        var currImg = $("img")
                        var orw = currImg.width();
                        var orh = currImg.height();
                        var hsId = hotspotdata.Hotspots[i].HotspotId;
                        var pwdth = hotspotdata.Hotspots[i].width;
                        var phight = hotspotdata.Hotspots[i].height;
                        var pleft = hotspotdata.Hotspots[i].left;
                        var ptop = hotspotdata.Hotspots[i].top;
                        var accessText = hotspotdata.Hotspots[i].accessText;
                        if ((hotspotdata.Hotspots[i].left + "").indexOf("px") != -1) {
                            pleft = getPerc(Number(hotspotdata.Hotspots[i].left.replace("px", "").replace("%", "")), orw) + "%";
                            ptop = getPerc(Number(hotspotdata.Hotspots[i].top.replace("px", "").replace("%", "")), orh) + "%";
                        }
                        var eventname = hotspotdata.Hotspots[i].eventName;
                        if (eventname != undefined && !isAndroid && !isIOS) {
                            htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpotdbl divHotSpotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "'/>";
                        }
                        else {
                            htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpot divHotSpotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "'/>";
                        }
                    }
                    $(".wrapperimage").append(htmlForDivHotspotImage)
                }
            }
        },

        PresenterMode: function () {
            /*
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = this.GetPageDetailData();
            var appendImage = $(".wrapperimage");
            if (pageData != undefined) {
                if (currentPageData.pageId == "p17" && pageData.EmbedSettings != undefined) {
                    $("input[type='text']").addClass("greenspan");
                    $("input[type='text']").val(pageData.answerset[0]);
                    $("input[type='text']").k_disable();
                }
                else {
                    if (currentPageData.pageId == "p6" || currentPageData.pageId == "p10") {
                        for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                            if (pageData.ImageHotSpots.Hotspots[i].correct == true) {
                                var posObj = pageData.ImageHotSpots.Hotspots[i];
                                var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.left + ";top:" + posObj.top + ";'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                            }
                        }
                        $(".divHotSpotdbl").addClass("hotspotclicked");
                        $(".divHotSpotdbl").addClass("disabled");
                        $(".divHotSpot").addClass("disabled");
                        appendImage.append(_div);
                    }
                    else if (pageData.ImageHotSpots != undefined) {
                        var posObj = pageData.ImageHotSpots.Hotspots[0];
                        var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.left + ";top:" + posObj.top + ";'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                        $(".divHotSpot").addClass("hotspotclicked");
                        $(".divHotSpot").addClass("disabled");
                        appendImage.append(_div);
                    }
                    if (pageData.ImageHotSpots.correctfeedback != undefined) {
                        if (_Navigator.IsPresenterMode()) {
                            $("#linknext").k_enable();
                            _Navigator.SetPageStatus(true);
                            _Navigator.UpdateProgressBar();
                            return;
                        }
                        $("#div_feedback").show();
                        $("#div_feedback").css("display", "inline-block");
                        $("#div_feedback .div_fdkcontent").load(_Settings.dataRoot + pageData.ImageHotSpots.correctfeedback, function () {
                            $("#div_feedback p:first").attr("tabindex", "-1")
                            if (isIOS) {
                                $("#div_feedback p:first").attr("role", "text");
                            }
                        });
                    }
                }
            }
            
            _Navigator.SetPageStatus(true);
            _Navigator.UpdateProgressBar();*/
            $("#linknext").k_enable();
        },

        ApplycontainerWidth: function () {
            var innerWidth = $(window).width();
            $("#header-title img").attr("src", "assets/images/logo.png")
            if (innerWidth < 850) {
                if ($(".activityContainer").find(".activityimg").length > 0) {
                    var marginleft = $(".intro-content:first").css("margin-left");
                    marginleft = marginleft.substring(0, marginleft.indexOf("px"))
                    var imgcntwidth = innerWidth - (marginleft * 2);
                    $(".activity").css({ "width": imgcntwidth + "px" })
                }
                if (innerWidth <= 500) {
                    $("#header-title img").attr("src", "assets/images/pearson-logo-v1.png")
                }
            }
            else {
                $(".activity").css({ "width": "auto" })
            }
        },

        OrientationChange: function () {
            this.ApplycontainerWidth();
        },

        HotspotClick: function (_hotspot, event) {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Hotspot click.")
            }
            if (_Navigator.IsAnswered())
                return;
            var action = _hotspot.attr("action")
            //this.AddHotspotClick(_hotspot, event);
            var score = 0;
            var nextpgid = "";
            var pageData = this.GetPageDetailData();
            isCorrect = true;
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {

                        nextpgid = pageData.ImageHotSpots.Hotspots[i].nextPageId;

                        if (pageData.ImageHotSpots.Hotspots[i].correct != undefined) {
                            isCorrect = pageData.ImageHotSpots.Hotspots[i].correct;
                        }
                    }
                }
            }
            this.AddHotspotClick(_hotspot, event, isCorrect);
            _Navigator.SetPageScore(score)
            switch (action) {
                case "next":
                    _Navigator.SetPageStatus(true);
                    if (nextpgid != undefined && nextpgid != "") {
                        var ndata = _Navigator.SetNextPageId(nextpgid)
                        _Navigator.LoadPage(nextpgid);
                    }
                    else {
                        this.HotspotNext();
                    }
                    break;
                case "feedback":
                    _Navigator.SetPageStatus(true);
                    this.HotspotFeedback(_hotspot);
                case "inputcheck":
                    _ModuleCommon.InputEnter($("input.EmbededElement"));
                    break;
                default:
                    break;
            }
            _Navigator.GetBookmarkData();
        },

        SetFeedbackTop: function () {
            var ptop = Number($("#div_feedback").position().top);
            var pheight = Number($("#div_feedback").outerHeight());
            var pdiff = (_Settings.minHeight + _Settings.topMargin) - (ptop + pheight);
            if (pdiff > 0) {
                $("#div_feedback").css("margin-top", (pdiff + 35) + "px");
            }
        },

        InputFeedback: function () {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnFeedback()
            }
            var pageData = this.GetPageDetailData();
            var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.EmbedSettings.feedbackurl;
            $("input").k_disable();
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                // this.SetFeedbackTop()   
                $("#div_feedback .div_fdkcontent p:first").attr("tabindex", "-1")
                if (iOS) {
                    $("#div_feedback p:first").attr("role", "text")
                }
                /*if (isIE11version) {
                    $("#div_feedback .div_fdkcontent p:first").focus();
                    $('html,body').animate({ scrollTop: document.body.scrollHeight }, animTime, function () {
                    });
                }
                else {
                    $('html,body').animate({ scrollTop: document.body.scrollHeight }, animTime, function () {
                        $("#div_feedback .div_fdkcontent p:first").focus();

                    });
                }*/
                window.scrollTo(0, document.body.scrollHeight);
                $("#div_feedback .div_fdkcontent p:first").focus();
            });
            this.EnableNext();
        },

        HotspotFeedback: function (_hotspot) {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnFeedback()
            }
            var pageData = this.GetPageDetailData();
            var url = "";
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        url = pageData.ImageHotSpots.correctfeedback;
                        break;
                    }
                    else {
                        url = pageData.ImageHotSpots.incorrectfeedback;
                    }
                }
            }
            var fdbkUrl = _Settings.dataRoot + url;

            $("input").k_disable();
            $(".divHotSpot").k_disable();
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                // this.SetFeedbackTop()
                $("#div_feedback .div_fdkcontent p:first").attr("tabindex", "-1")

                if (iOS) {
                    $("#div_feedback p:first").attr("role", "text")
                }
                window.scrollTo(0, document.body.scrollHeight);
                $("#div_feedback .div_fdkcontent p:first").focus();
            });
            this.EnableNext();
        },

        HotspotNext: function (_hotspot) {
            _Navigator.Next(_hotspot);
        },

        InputNext: function () {
            _Navigator.Next();
        },

        InputEnter: function (inputtext) {
            if (_Navigator.IsAnswered())
                return;
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Input Enter click.")
            }
            if ($.trim(inputtext.val()) != "") {
                var pageData = this.GetPageDetailData();
                var vtextarr = pageData.EmbedSettings.validatearray;
                var isVRequired = false;
                for (var i = 0; i < vtextarr.length; i++) {
                    if (($.trim(vtextarr[i])).toLowerCase() == ($.trim(inputtext.val())).toLowerCase()) {
                        isVRequired = true;
                        break;
                    }
                }
                var found = false;
                var str = $.trim(inputtext.val()).toLowerCase();
                var currentPageData = _Navigator.GetCurrentPage();
                if (reviewData != undefined && reviewData.length > 0) {
                    for (var i = 0; i < reviewData.length; i++) {
                        if (reviewData[i].pageId == currentPageData.pageId) {
                            if (reviewData[i].textEntry.length < 2) {
                                reviewData[i].textEntry.push(str);
                            } else {
                                reviewData[i].textEntry.splice(0, 1);
                                reviewData[i].textEntry.push(str);
                            }
                            found = true;
                        }
                    }
                }
                if (!found) {
                    var _obj = {};
                    _obj.pageId = currentPageData.pageId;
                    _obj.textEntry = [str];
                    _obj.isCorrect = true;
                    reviewData.push(_obj);
                }
            }
            if (isVRequired) {
                var score = pageData.EmbedSettings.score;
                _Navigator.SetPageScore(score)
                var action = pageData.EmbedSettings.action;
                _Navigator.SetPageStatus(true);
                switch (action) {
                    case "next":
                        this.InputNext();
                        break;
                    case "feedback":
                        this.InputFeedback();
                        break;
                    default:
                        break;
                }
            }
            else {
                $(".divHotSpot").removeClass("disabled");
                $(".divHotSpot").removeClass("hotspotclicked");
                $(".divHotSpot").k_enable();
            }
            _Navigator.GetBookmarkData();
        },

        videoEnded: function () {
            // $("#linknext").k_enable();
            this.EnableNext();
            _Navigator.SetPageStatus(true);

            var currpageId = _Navigator.GetCurrentPage().pageId;
            if (currpageId == "p3" || currpageId == "p7" || currpageId == "p14" || currpageId == "p25") {
                this.VideoQuery();
            }

            _Navigator.SetVideoStatus();

            _Navigator.GetBookmarkData();
        },
        videoStart: function () {
            if (!_Navigator.IsAnswered()) {
                $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
            }
            if (_Navigator.IsPresenterMode()) {
                $("#linknext").k_enable();
            }
        },

        VideoQuery: function () {
            $(".activityvideo").hide();
            $(".slidImgStyle").show();
            if (!isAndroid && !isIphone) {
                $(".imgAnimate").animate({
                    right: "-400px"
                }, {
                        queue: false,
                        complete: function () { }
                    });
            }
            if (isIphone || isAndroid) {
                $(".vpwrapperimage .imgAnimate").css('right', '0px');
            }
        },

        AppendFooter: function () {
            $("#header-progress .presentationModeFooter").show();

            $("footer").show();
            $("#linknext").k_enable();

        },
        AppendScormReviewFooter: function () {
            $(".presentationModeFooter").html('Review Mode');
            $("#header-progress .presentationModeFooter").show();           
                
                $("footer").show();
                $("#linknext").k_enable();   
            /*
            if ($(".ScormReviewFooter").length == 0) {
                var str = '<div class="ScormReviewFooter"> Review Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }*/
        },
    }
})();

$(document).ready(function () {
    _Navigator.Initialize();
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});