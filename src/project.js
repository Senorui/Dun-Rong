require = function n(c, r, s) {
    function h(t, e) {
        if (!r[t]) {
            if (!c[t]) {
                var a = "function" == typeof require && require;
                if (!e && a) return a(t, !0);
                if (l) return l(t, !0);
                var i = new Error("Cannot find module '" + t + "'");
                throw i.code = "MODULE_NOT_FOUND", i
            }
            var o = r[t] = {
                exports: {}
            };
            c[t][0].call(o.exports, function(e) {
                return h(c[t][1][e] || e)
            }, o, o.exports, n, c, r, s)
        }
        return r[t].exports
    }
    for (var l = "function" == typeof require && require, e = 0; e < s.length; e++) h(s[e]);
    return h
}({
    AdjustPositionJS: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "9bf842QTQ1J3KlowjcBf2MC", "AdjustPositionJS"), cc.Class({
            extends: cc.Component,
            properties: {
                AdjustNodeArray: {
                    default: [],
                    type: cc.Node
                }
            },
            onLoad: function() {
                if (this.gameWidth = cc.winSize.width, this.gameHeight = cc.winSize.height, 2 <= this.AdjustNodeArray.length) {
                    var e = this.AdjustNodeArray[this.AdjustNodeArray.length - 1].y + .5 * this.AdjustNodeArray[this.AdjustNodeArray.length - 1].height;
                    if (this.gameHeight < 1280 && e > .5 * this.gameHeight) {
                        for (var t = this.gameHeight, a = 0; a < this.AdjustNodeArray.length; a++) t -= this.AdjustNodeArray[a].height;
                        for (var i = (t = t < 0 ? 0 : t) / (this.AdjustNodeArray.length + 1), o = -.5 * this.gameHeight + i, n = 0; n < this.AdjustNodeArray.length; n++) o += .5 * this.AdjustNodeArray[n].height, this.AdjustNodeArray[n].y = o, o += .5 * this.AdjustNodeArray[n].height + i
                    }
                }
            }
        }), cc._RF.pop()
    }, {}],
    GameConfig: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "f0663sWtfNKCKOL+Hvnt0cI", "GameConfig");
        var i = {
            GameClubButton: null,
            GameScene: null,
            launchScene: null,
            Bros: null,
            caS: null,
            MAIN_MENU_NUM: "Classic",
            gameScore: 0,
            standScore: 30,
            GAME_OVER_BOOL: !0,
            ranLinkData: null,
            recGameData: null,
            InfoData: null,
            endShow0: null,
            endShow1: null,
            endShow2: null,
            endShow3: null,
            infoGameName: null,
            showText: null,
            startText: null,
            moreGameText: null,
            playAgainText: null,
            playNum: 0,
            noTouchBool: !0,
            returnRanNum: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            }
        };
        t.exports = i, cc._RF.pop()
    }, {}],
    GameManagerJS: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "bc65646iSZCQIHVsezDRh0f", "GameManagerJS");
        var i = e("GameConfig"),
            o = e("MyGlobalJS");
        cc.Class({
            extends: cc.Component,
            properties: {
                PanelPlayGame: cc.Node,
                PanelStopTouch: cc.Node,
                PanelstartBG: cc.Node
            },
            onLoad: function() {
                o.IfGameOver = !1, this.IsRelive = !1, this.ReliveOK = !1, o.GameManagerNode = this.node, this.gameWidth = cc.winSize.width, this.gameHeight = cc.winSize.height, this.PlayGameJS = this.PanelPlayGame.getComponent("PlayGameJS"), this.MainGameJS = this.node.getComponent("MainGameJS"), this.reliveLayer = this.node.getChildByName("ReliveLayer"), this.addTouchs()
            },
            start: function() {
                this.PanelPlayGame.active = !0, 0 == this.PanelstartBG.active && this.PlayGameJS.StartGame()
            },
            addTouchs: function() {
                var t = this;
                this.PanelstartBG.on(cc.Node.EventType.TOUCH_END, function(e) {
                    t.PlayGameJS.StartGame()
                }, this), this.PanelstartBG.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
                    t.PlayGameJS.StartGame()
                }, this)
            },
            GameOver: function(e) {
                i.gameScore = e, this.PanelStopTouch.active = !0, o.IfGameOver = !0, this.IsRelive || isAdBool ? this.GameOver2() : (this.IsRelive = !0, this.reliveLayer.getComponent("ReliveLayerJs").ShowRelive())
            },
            GameOver2: function() {
                this.MainGameJS.gameEnd()
            },
            Relive: function() {
                this.ReliveOK || (this.ReliveOK = !0, this.PlayGameJS.Relive(), this.PanelStopTouch.active = !1, o.IfGameOver = !1)
            }
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        MyGlobalJS: "MyGlobalJS"
    }],
    GameUiTools: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "b21e8tF461OFalpptyeuAE2", "GameUiTools");
        e("GameConfig");
        var i = {
            newSprite: function(e, t) {
                var a = new cc.Node;
                return t ? (e = e.split(".")[0], a.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(e)) : a.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame("res/raw-assets/resources/" + e), a
            },
            setNodeSpriteFrame: function(e, t) {
                e.getComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(t)
            },
            setButtonClickEvents: function(e, t, a, i, o) {
                var n = new Array;
                null == t.length ? n[0] = t : n = t;
                for (var c = 0; c < n.length; c++) {
                    var r = new cc.Component.EventHandler;
                    r.target = e.node, r.component = e.node.name, r.handler = a, null == t.length ? r.customEventData = i : r.customEventData = c;
                    var s = n[c].addComponent(cc.Button);
                    s.clickEvents.push(r), (null == o || o) && (s.transition = cc.Button.Transition.SCALE, s.duration = .1, s.zoomScale = 1.2)
                }
            },
            scheduleOnce: function(e, t, a) {
                e.runAction(cc.sequence(cc.delayTime(a), cc.callFunc(t, e)))
            },
            loadingScene: function(i, e) {
                e ? cc.loader.loadRes("panel/LoadingLayer", function(e, t) {
                    var a = cc.instantiate(t);
                    cc.director.getScene().children[0].addChild(a), cc.director.preloadScene(i, function() {
                        cc.director.loadScene(i)
                    })
                }) : cc.director.preloadScene(i, function() {
                    cc.director.loadScene(i)
                })
            },
            loadingLayer: function(e) {
                cc.loader.loadRes(e, function(e, t) {
                    if (!e) {
                        var a = cc.instantiate(t);
                        cc.director.getScene().children[0].addChild(a, 100)
                    }
                })
            }
        };
        t.exports = i, cc._RF.pop()
    }, {
        GameConfig: "GameConfig"
    }],
    HttpManagerJs: [function(e, t, a) {
        "use strict";
        var i;

        function o(e, t, a) {
            return t in e ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = a, e
        }
        cc._RF.push(t, "197e1hfNnxIcJx73V3VhUxY", "HttpManagerJs");
        var n = e("GameConfig"),
            c = (o(i = {
                URL: "http://www.wesane.com/h5service.php/Interface/services",
                cacheList: null,
                isBusy: null,
                req: null,
                perform: null,
                retGameId: 0
            }, "cacheList", []), o(i, "ctor", function() {}), o(i, "checkHave", function() {
                this.isBusy || this.sendOne()
            }), o(i, "httpInitUrl", function(e) {
                console.log("data", this.URL), this.retGameId = e
            }), o(i, "send", function(e, t, a, i) {
                this.cacheList.push({
                    type: e,
                    data: t,
                    func: a,
                    target: i
                }), this.isBusy || this.sendOne()
            }), o(i, "sendOne", function() {
                if (0 != this.cacheList.length) {
                    this.isBusy = !0, this.perform = this.cacheList.shift(), this.req = cc.loader.getXMLHttpRequest(), this.req.onreadystatechange = this.onDataHandler.bind(this), this.req.onerror = this.onErrorHandler.bind(this), this.req.ontimeout = this.onTimeoutHandler.bind(this), this.req.timeout = 2e3, cc.log("pos", this.URL), this.req.open("POST", this.URL), this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                    var e = this.returnLanguage();
                    console.log("gameIdid", this.retGameId);
                    var t = this.retGameId,
                        a = {
                            type: this.perform.type,
                            gid: t,
                            mid: null,
                            data: this.perform.data,
                            languageType: e
                        },
                        i = "send=" + JSON.stringify(a);
                    this.req.send(i)
                }
            }), o(i, "onDataHandler", function() {
                if (404 != this.req.status) {
                    if (4 == this.req.readyState && 200 <= this.req.status && this.req.status <= 207 && this.req.responseText) {
                        var e = JSON.parse(this.req.responseText);
                        this.isBusy = !1, this.perform.target ? this.perform.func.call(this.perform.target, e.error, e.data, e.commendGame, e.gameInfo) : this.perform.func(e)
                    }
                } else {
                    var t = n.launchScene,
                        a = n.Bros;
                    n.caS;
                    cc.director.loadScene(t, null, function() {
                        if (a) {
                            "";
                            var e = document.getElementById("GameDiv");
                            e && (e.style.backgroundImage = "")
                        }
                        cc.loader.onProgress = null, console.log("Success to load scene: " + t)
                    })
                }
            }), o(i, "returnLanguage", function() {
                return ("" + window.navigator.language).toLocaleLowerCase()
            }), o(i, "onErrorHandler", function() {
                cc.log("网络错误"), this.isBusy = !1, this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
            }), o(i, "onTimeoutHandler", function() {
                cc.log("请求超时"), this.isBusy = !1, this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
            }), o(i, "clearAll", function() {
                for (var e = this.cacheList.length, t = 0; t < e; t++) {
                    var a = this.cacheList[t];
                    a && (a.target ? a.func.call(a.target, -1) : a.func(-1))
                }
                this.cacheList.length = 0
            }), i);
        t.exports = c, cc._RF.pop()
    }, {
        GameConfig: "GameConfig"
    }],
    LanguageSetJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "4754e8KuPZJCqklCNyKpG29", "LanguageSetJs");
        t.exports = {
            language_1: {
                game_name: "「哥俩好」",
                game_name1: "哥俩好",
                game_info: "按住屏幕不松手,控制跳跃距离,不要碰到熊和鱼.",
                txtStart: "开始",
                txtMore: "更多游戏",
                txtAgain: "点击开始游戏",
                txtShare1: "在游戏中 ",
                txtShare2: "得分了，好啊!你和我一起来比赛!",
                bgRgb: "#3698C5",
                gameT1: "关注我们",
                gameT2: "纸牌接龙",
                gameT3: "锦上添花",
                gameUrl1: "http://g.regogame.com/game/9/",
                gameUrl2: "http://g.regogame.com/game/3/",
                gameT11: "关注微信",
                gameT12: "关注Kakao",
                gameT13: "关注Line",
                gameEndL: "游 戏 结 束",
                gameEndL1: "稍 候 查 看 分 数"
            },
            language_2: {
                game_name: "「Good Brothers」",
                game_name1: "Good Brothers",
                game_info: "Hold the screen and control the jumping distance. Don't touch the bear or the fish.",
                txtStart: "Start",
                txtMore: "More Game",
                txtAgain: "Play Again",
                txtShare1: "In Game ",
                txtShare2: " Let's play together!",
                bgRgb: "#3698C5",
                gameT1: "Follow Us",
                gameT2: "Thousand Flower",
                gameT3: "Eliminate Star",
                gameUrl1: "http://g.fromgame.com/game/53",
                gameUrl2: "http://g.fromgame.com/game/13",
                gameT11: "Focus WeChat",
                gameT12: "Focus Kakao",
                gameT13: "Focus Line",
                gameEndL: "Game Over",
                gameEndL1: "View the score later"
            }
        }, cc._RF.pop()
    }, {}],
    LoadSceneJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3ef908fwfNIwJsOjET8tCh2", "LoadSceneJs");
        var i = {
            goToCover: function(e, t, a, i, o) {
                var n = e;
                n = null == n || null == n || e, console.log("adBoolBeforeLoadS", n), this.needShow = !1, n && n ? (this.needShow = !0, showMyAds()) : this.needShow = !1, this.needShow ? (null == preloader && this.startGoToGame(a, i, o), resCompleteFlag = !0, adCompleteFlag && resCompleteFlag && this.startGoToGame(a, i, o)) : this.startGoToGame(a, i, o)
            },
            startGoToGame: function(e, t, a) {
                cc.director.loadScene(e, null, function() {
                    if (t) {
                        "";
                        var e = document.getElementById("GameDiv");
                        e && (e.style.backgroundImage = "")
                    }
                    cc.loader.onProgress = null
                })
            }
        };
        t.exports = i, cc._RF.pop()
    }, {}],
    MainGameJS: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0e7a8SkMLxEY7nCB1Bqi8WZ", "MainGameJS");
        var i = e("GameConfig"),
            o = e("GameUiTools"),
            n = e("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                startBgNode: cc.Node,
                gameOverT1: cc.Label,
                gameOverT2: cc.Label
            },
            onLoad: function() {
                this.gameOveEndBool = !1, this.gameOverNum = 0, this.gameWidth = cc.director.getWinSize().width, this.gameHeight = cc.director.getWinSize().height, 1 <= i.playNum && (this.startBgNode.active = !1), i.playNum++, this.addTouchEvents(), o.loadingLayer("panel/LinkIconSpr")
            },
            addTouchEvents: function() {
                var e = {
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function(e, t) {
                        return !0
                    },
                    onTouchMoved: function(e, t) {},
                    onTouchEnded: function(e, t) {}
                };
                cc.eventManager.addListener(e, this.node)
            },
            gameEnd: function() {
                i.GAME_OVER_BOOL = !1, n.gameOverShowText(i.gameScore, 1), this.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(this.gameEnd1.bind(this))))
            },
            gameEnd1: function() {
                this.gameOveEndBool = !0, this.gameOverT1.string = n.gameEndLText, this.gameOverT2.string = n.gameEndL1Text, this.gameOverT1.node.zIndex = 999, this.gameOverT2.node.zIndex = 999, this.gameOverT1.node.opacity = 0, this.gameOverT1.node.y = 100, this.gameOverT1.node.runAction(cc.sequence(cc.delayTime(.2), cc.spawn(cc.fadeIn(1), cc.moveBy(1, 0, -50)), cc.delayTime(.3), cc.callFunc(this.initEndLayer.bind(this)), cc.removeSelf())), this.gameOverT2.node.opacity = 0, this.gameOverT2.node.y = this.gameOverT1.node.y - 100, this.gameOverT2.node.runAction(cc.sequence(cc.delayTime(.2), cc.spawn(cc.fadeIn(1), cc.moveBy(1, 0, -50)), cc.delayTime(.3), cc.removeSelf()))
            },
            initEndLayer: function() {
                n.gotoEndLayer()
            },
            start: function() {},
            update: function(e) {
                this.gameOverGoToOVer()
            },
            gameOverGoToOVer: function() {
                this.gameOveEndBool && (this.gameOverNum++, 900 <= this.gameOverNum && (this.gameOverNum = 0, this.gameOveEndBool = !1))
            }
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage"
    }],
    MainManage: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "946adGkxvdBmZXnlD952XtK", "MainManage");
        var o = e("HttpManagerJs"),
            i = e("LanguageSetJs"),
            r = e("GameConfig"),
            s = e("LoadSceneJs"),
            n = e("GameUiTools"),
            c = e("MyGlobalJS"),
            h = {
                gameHttpId: 0,
                subScoreHttp: null,
                gameNameText: null,
                gameInfoText: null,
                txtStartText: null,
                txtMoreText: null,
                txtAgainText: null,
                gameEndLText: null,
                gameEndL1Text: null,
                bgLayRgb: null,
                gameEndName1: null,
                gameEndName2: null,
                gameEndUrl1: null,
                gameEndUrl2: null,
                langugeType: 1,
                ranLinkData: null,
                adShowBefore: !1,
                adShowAfter: !0,
                endLayCol: null,
                moreBtnBgCol: null,
                moreBtnTextCol: null,
                recGameData: null,
                recGameUrl: null,
                recGameDelPau: null,
                recGameDelPer: null,
                recGameimg1: null,
                recGameimg2: null,
                recGamePos: null,
                InfoData: null,
                endShow0: null,
                endShow1: null,
                endShow2: null,
                endShow3: null,
                infoGameName: null,
                showText: null,
                startText: null,
                moreGameText: null,
                playAgainText: null,
                endHttpShowInfo: null,
                moreGameUrl: null,
                init: function(e, t, a) {
                    r.launchScene = e, r.Bros = t, r.caS = a, this.curType = 1, this.getHttpGameId(), this.gamePV_load(), console.log("thisg", this.gameHttpId), o.httpInitUrl(this.gameHttpId), o.send("103", null, this.getLinkGameReturn, this);
                    var i = this.initLanguage();
                    this.gameNameText = i.game_name, this.gameInfoText = i.game_info, this.txtStartText = i.txtStart, this.txtMoreText = i.txtMore, this.txtAgainText = i.txtAgain, this.gameEndLText = i.gameEndL, this.gameEndL1Text = i.gameEndL1, this.bgLayRgb = i.bgRgb, this.gameEndName1 = i.gameT2, this.gameEndName2 = i.gameT3, this.gameEndUrl1 = i.gameUrl1, this.gameEndUrl2 = i.gameUrl2, this.langugeType = this.curType
                },
                getHttpGameId: function() {
                    var e = window.location.href,
                        t = e.substring(0, e.lastIndexOf("//") + 2),
                        a = window.location.host,
                        i = t + a + "/Service/Share/index";
                    this.gameAllHttp = i, cc.log("gameAll", this.gameAllHttp), this.subScoreHttp = t + a + "/Service/Score/index", this.gamePvHttp = t + a + "/Service/GamePv/index";
                    var o = document.URL,
                        n = 0,
                        c = o.substring(o.lastIndexOf("/game/") + 1, o.length).split("/");
                    2 <= c.length && (n = c[1]), this.gameHttpId = n, cc.log("gameId", n);
                    e.substring(e.lastIndexOf("//") + 4, e.lastIndexOf("com") + 3);
                    this.moreGameUrl = "http://m.wesane.com/"
                },
                gameOverShowText: function(e, t) {
                    this.ajaxLoad("http://www.wesane.com/admin.php/Gamescore/saveGamescore", "gameScore=" + e + "&gameId=" + this.gameHttpId + "&gameType=" + t, this.scoreResult)
                },
                gamePV_load: function() {
                    this.ajaxLoad("http://www.wesane.com/admin.php/Activityshow/gamelogo", "gameID=" + this.gameHttpId, this.ajaxOnLogoResult)
                },
                ajaxOnLogoResult: function() {},
                ajaxLoad: function(e, t, a) {
                    var i = cc.loader.getXMLHttpRequest();
                    i.onreadystatechange = a, i.open("POST", e), i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), i.send(t)
                },
                scoreResult: function(e) {
                    if (null != e.currentTarget.response && "" != e.currentTarget.response) {
                        var t = JSON.parse(e.currentTarget.response);
                        cc.log("endshow", t.content), h.endHttpShowInfo = t.content
                    }
                },
                initLanguage: function() {
                    var e = null;
                    return cc.sys.language == cc.sys.LANGUAGE_CHINESE ? (this.curType = 1, e = i.language_1) : (cc.log("英文"), this.curType = 2, e = i.language_2), e
                },
                getLinkGameReturn: function(e, t, a, i) {
                    if (console.log("err0", e), console.log("err1", t), console.log("err2", a), console.log("err3", i), 0 == e) {
                        this.ranLinkData = t, console.log("LoadMainGameScnee");
                        var o = r.launchScene,
                            n = r.Bros,
                            c = r.caS;
                        s.goToCover(this.adShowBefore, this.adShowAfter, o, n, c)
                    }
                },
                ranRecGameData: function() {
                    if (null != this.recGameData && "" != this.recGameData) {
                        this.returnBool = !1;
                        var e = this.recGameData.length,
                            t = r.returnRanNum(1, e) - 1;
                        cc.log("ranNNN", t), this.recGameUrl = this.recGameData[t].data_link, this.recGameDelPer = this.recGameData[t].delay_per, this.recGameDelPau = this.recGameData[t].delay_pau, this.recGameimg1 = this.recGameData[t].img_1, this.recGameimg2 = this.recGameData[t].img_2, this.recGamePos = this.recGameData[t].poistion
                    }
                },
                ranLinkUrl: function() {
                    if (null != this.ranLinkData && this.ranLinkData.gameList && null != this.ranLinkData.gameList) {
                        var e = this.ranLinkData.gameList.length,
                            t = r.returnRanNum(1, e) - 1;
                        return cc.log("templ", t, this.ranLinkData.gameList), cc.log("url", this.ranLinkData.gameList[0].gameName, this.ranLinkData.gameList[0].gameUrl), t
                    }
                    return null
                },
                gotoEndLayer: function() {
                    if (0 == c.IfGameOverPrefabShowing) return c.IfGameOverPrefabShowing = !0, void this.showGameEndLayer();
                    if (c.IfGameOverPrefabShowing = !1, adEndComplete = !1, resEndComplete = !1, this.needShow = null, 1 == window.navigator.onLine) {
                        var e = this.adShowAfter;
                        console.log("ad", e), (e = null == e || null == e || this.adShowAfter) ? (this.needShow = !0, console.log("showMyad"), showMyAds()) : this.needShow = !1
                    } else console.log("showOver1"), this.needShow = null;
                    console.log("showMyad2", this.needShow), null != this.needShow && (console.log("showMyad3"), this.needShow ? (console.log("pre", preloader), preloader, resEndComplete = !0, adEndComplete && resEndComplete && console.log("showOver1")) : console.log("gam"))
                },
                showGameEndLayer: function() {
                    1 == c.IfGameOver && n.loadingLayer("panel/GameOverLayer")
                }
            };
        t.exports = h, cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LanguageSetJs: "LanguageSetJs",
        LoadSceneJs: "LoadSceneJs",
        MyGlobalJS: "MyGlobalJS"
    }],
    MonkeyJS: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "087f0kygxJKNaDzFn5tqKsl", "MonkeyJS");
        var c = e("MyGlobalJS");
        cc.Class({
            extends: cc.Component,
            properties: {
                GrassParSpriteF: cc.SpriteFrame,
                GrassParParent: cc.Node
            },
            onLoad: function() {
                switch (this.WaterGravityScale = .3, this.RotateSpeed = 3, this.gameWidth = cc.winSize.width, this.gameHeight = cc.winSize.height, this.GameManagerJS = cc.director.getScene().children[0].getComponent("GameManagerJS"), this.PlayGameJS = this.GameManagerJS.PlayGameJS, this.MyPBoxCComp = this.node.getComponent(cc.PhysicsBoxCollider), this.MyRigidBody = this.node.getComponent(cc.RigidBody), this.MyBody = this.node.getChildByName("Sprite"), this.CurStandFloor = null, this.IfCanJump = !1, this.IfLeaveFloor = !0, this.IfInWater = !1, this.CurWater = null, this.MyIndex = null, this.node.name) {
                    case "Monkey1":
                        this.MyIndex = 0;
                        break;
                    case "Monkey2":
                        this.MyIndex = 1
                }
                this.InitSelf()
            },
            InitSelf: function() {},
            start: function() {},
            onBeginContact: function(e, t, a) {
                var i = a.node;
                switch (i.group) {
                    case "Floor":
                        if (this.CurStandFloor = i, this.IfLeaveFloor = !1, "Crocodile" == i.name) switch (this.MyIndex) {
                            case 0:
                                1 != i.IfTouchMonkey1 && (i.IfTouchMonkey1 = !0, i.runAction(cc.sequence(cc.moveBy(.5, 0, -35).easing(cc.easeQuadraticActionOut()), cc.moveBy(.5, 0, 35).easing(cc.easeQuadraticActionIn()))), this.BornSpray(i));
                                break;
                            case 1:
                                1 != i.IfTouchMonkey2 && (i.IfTouchMonkey2 = !0, i.runAction(cc.sequence(cc.moveBy(.5, 0, -35).easing(cc.easeQuadraticActionOut()), cc.moveBy(.5, 0, 35).easing(cc.easeQuadraticActionIn()))), this.BornSpray(i))
                        } else "Floor" == i.name && this.MyRigidBody.linearVelocity.y < -200 && this.node.y > i.y ? this.BornGrassPar() : "Wood" == i.name && this.MyRigidBody.linearVelocity.y < -200 && this.node.y > i.y && c.PlayAudio(this.PlayGameJS.AudioWood, 1, !1, !1);
                        this.MyRigidBody.linearVelocity.y < 0 && this.MyBody.runAction(cc.sequence(cc.scaleTo(.1, 1, 1 - this.MyRigidBody.linearVelocity.y / -3e3), cc.scaleTo(.1, 1, 1)));
                        break;
                    case "Sea":
                        this.IfInWater = !0, this.CurWater = i, this.MyRigidBody.gravityScale *= this.WaterGravityScale, this.MyRigidBody.linearVelocity = this.MyRigidBody.linearVelocity.mul(this.WaterGravityScale), this.BornSpray(i);
                        break;
                    case "Enemy":
                        this.DestroyMonkey()
                }
            },
            onEndContact: function(e, t, a) {
                switch (a.node.group) {
                    case "Floor":
                        this.IfLeaveFloor = !0;
                        break;
                    case "Sea":
                        this.IfInWater = !1, this.CurWater = null, this.MyRigidBody.gravityScale *= 1 / this.WaterGravityScale
                }
            },
            update: function(e) {
                this.MyBody.rotation += cc.clampf(this.MyRigidBody.linearVelocity.x / 300 * 15 - this.MyBody.rotation, -this.RotateSpeed, this.RotateSpeed), null != this.CurStandFloor && (this.node.x + this.MyPBoxCComp.offset.x + .5 * this.MyPBoxCComp.size.width > this.CurStandFloor.x - .5 * this.CurStandFloor.width * this.CurStandFloor.scaleX && this.node.x + this.MyPBoxCComp.offset.x - .5 * this.MyPBoxCComp.size.width < this.CurStandFloor.x + .5 * this.CurStandFloor.width * this.CurStandFloor.scaleX && this.node.y + this.MyPBoxCComp.offset.y - .5 * this.MyPBoxCComp.size.height < this.CurStandFloor.y + 20 && this.node.y + this.MyPBoxCComp.offset.y - .5 * this.MyPBoxCComp.size.height > this.CurStandFloor.y ? this.IfCanJump = !0 : 1 == this.IfLeaveFloor && (this.CurStandFloor = null, this.IfCanJump = !1))
            },
            BornSpray: function(e) {
                this.PlayGameJS.BornSpray(e, this.node, null, 1)
            },
            BornGrassPar: function() {
                c.PlayAudio(this.PlayGameJS.AudioGrass, 1, !1, !1);
                for (var e = 0; e < 10; e++) {
                    var t = {
                        easing: function(e) {
                            var t = null;
                            return e < .5 ? (t = !0, e += .5) : (t = !1, e -= .5), 1 == t ? (0 === e || 1 === e ? e : -.5 * (Math.cos(Math.PI * e) - 1)) - .5 : (0 === e || 1 === e ? e : -.5 * (Math.cos(Math.PI * e) - 1)) + .5
                        }
                    };
                    if (0 < c.PoolGrassPar.size()) var a = c.PoolGrassPar.get();
                    else(a = new cc.Node("GrassPar")).addComponent(cc.Sprite), a.getComponent(cc.Sprite).spriteFrame = this.GrassParSpriteF;
                    this.GrassParParent.addChild(a);
                    var i = Math.random();
                    if (a.scale = cc.lerp(.2, .3, i + c.GetRandomFloat(-.1, .1)), e < Math.ceil(4.5)) var o = 1;
                    else if (e > Math.ceil(4.5)) o = -1;
                    else o = c.GetRandomPNOne();
                    a.rotation = c.GetRandomInt(0, 360), a.position = this.node.position.add(cc.v2(c.GetRandomInt(0, .2 * this.node.width) * o, -.5 * this.node.height));
                    var n = c.GetRandomFloat(.4, .6);
                    a.runAction(cc.sequence(cc.spawn(cc.rotateBy(n, cc.lerp(0, 360, i + c.GetRandomFloat(-.2, .2)) * o), cc.moveBy(n, cc.lerp(50, 100, i + c.GetRandomFloat(-.2, .2)) * o, 0).easing(cc.easeSineOut()), cc.jumpBy(n, 0, -10, cc.lerp(20, 50, i + c.GetRandomFloat(-.2, .2)), 1).easing(cc.OutIn).easing(t), cc.fadeTo(n, 50).easing(cc.easeQuarticActionIn()), cc.scaleTo(n, .1)), cc.callFunc(function(e, t) {
                        e.rotation = 0, e.opacity = 255, e.scale = 1, c.PoolGrassPar.put(e)
                    }, this, this)))
                }
            },
            DestroyMonkey: function() {
                this.PlayGameJS.DestroyMonkey()
            }
        }), cc._RF.pop()
    }, {
        MyGlobalJS: "MyGlobalJS"
    }],
    MyGlobalJS: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "1af60iVXYJFs7VM8UV2/vwX", "MyGlobalJS"), t.exports = {
            IfBannerShowing: !1,
            IfGameOverPrefabShowing: !1,
            PoolGrassPar: new cc.NodePool,
            GameManagerNode: cc.Node,
            IfGameOver: !1,
            MyEaseBackInObj: {
                easing: function(e) {
                    return 0 === e || 1 === e ? e : e * e * (4.40316 * e - 3.40316)
                }
            },
            MyEaseBackOutObj: {
                easing: function(e) {
                    var t = 1.70158 * 3;
                    return (e -= 1) * e * ((t + 1) * e + t) + 1
                }
            },
            GetRandomFloat: function(e, t) {
                return Math.random() * (t - e) + e
            },
            GetRandomInt: function(e, t) {
                return Math.floor(Math.random() * (t - e + 1)) + e
            },
            GetRandomPNOne: function() {
                return 2 * Math.round(Math.random()) - 1
            },
            GetShakeAction: function(e, t, a, i, o) {
                if (0 != e) {
                    if (-1 == e) switch (a) {
                        case "Left":
                            var n = cc.sequence(cc.delayTime(t), cc.repeatForever(cc.sequence(cc.delayTime(t), cc.moveBy(.02 * i, cc.v2(-4 * o, 10 * o)), cc.moveBy(.02 * i, cc.v2(-7 * o, -8 * o)), cc.moveBy(.02 * i, cc.v2(6 * o, 7 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, -5 * o)), cc.moveBy(.02 * i, cc.v2(-5 * o, -4 * o)), cc.moveBy(.02 * i, cc.v2(5 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(4 * o, -2 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(1 * o, -2 * o)), cc.callFunc(function(e, t) {
                                e.position = cc.v2(Math.round(e.x), Math.round(e.y))
                            }, this, this))));
                            break;
                        case "Right":
                            n = cc.sequence(cc.delayTime(t), cc.repeatForever(cc.sequence(cc.delayTime(t), cc.moveBy(.02 * i, cc.v2(4 * o, 10 * o)), cc.moveBy(.02 * i, cc.v2(7 * o, -8 * o)), cc.moveBy(.02 * i, cc.v2(-6 * o, 7 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, -5 * o)), cc.moveBy(.02 * i, cc.v2(5 * o, -4 * o)), cc.moveBy(.02 * i, cc.v2(-5 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(-4 * o, -2 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(-1 * o, -2 * o)), cc.callFunc(function(e, t) {
                                e.position = cc.v2(Math.round(e.x), Math.round(e.y))
                            }, this, this))));
                            break;
                        case "Up":
                            n = cc.sequence(cc.delayTime(t), cc.repeatForever(cc.sequence(cc.delayTime(t), cc.moveBy(.02 * i, cc.v2(10 * o, 4 * o)), cc.moveBy(.02 * i, cc.v2(-8 * o, 7 * o)), cc.moveBy(.02 * i, cc.v2(7 * o, -6 * o)), cc.moveBy(.02 * i, cc.v2(-5 * o, -2 * o)), cc.moveBy(.02 * i, cc.v2(-4 * o, 5 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, -5 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, -4 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, -1 * o)), cc.callFunc(function(e, t) {
                                e.position = cc.v2(Math.round(e.x), Math.round(e.y))
                            }, this, this))));
                            break;
                        case "Down":
                            n = cc.sequence(cc.delayTime(t), cc.repeatForever(cc.sequence(cc.delayTime(t), cc.moveBy(.02 * i, cc.v2(10 * o, -4 * o)), cc.moveBy(.02 * i, cc.v2(-8 * o, -7 * o)), cc.moveBy(.02 * i, cc.v2(7 * o, 6 * o)), cc.moveBy(.02 * i, cc.v2(-5 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(-4 * o, -5 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, 5 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, 4 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, -2 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, 1 * o)), cc.callFunc(function(e, t) {
                                e.position = cc.v2(Math.round(e.x), Math.round(e.y))
                            }, this, this))))
                    } else switch (a) {
                        case "Left":
                            n = cc.sequence(cc.delayTime(t), cc.repeat(cc.sequence(cc.moveBy(.02 * i, cc.v2(-4 * o, 10 * o)), cc.moveBy(.02 * i, cc.v2(-7 * o, -8 * o)), cc.moveBy(.02 * i, cc.v2(6 * o, 7 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, -5 * o)), cc.moveBy(.02 * i, cc.v2(-5 * o, -4 * o)), cc.moveBy(.02 * i, cc.v2(5 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(4 * o, -2 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(1 * o, -2 * o)), cc.callFunc(function(e, t) {
                                e.position = cc.v2(Math.round(e.x), Math.round(e.y))
                            }, this, this)), e));
                            break;
                        case "Right":
                            n = cc.sequence(cc.delayTime(t), cc.repeat(cc.sequence(cc.moveBy(.02 * i, cc.v2(4 * o, 10 * o)), cc.moveBy(.02 * i, cc.v2(7 * o, -8 * o)), cc.moveBy(.02 * i, cc.v2(-6 * o, 7 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, -5 * o)), cc.moveBy(.02 * i, cc.v2(5 * o, -4 * o)), cc.moveBy(.02 * i, cc.v2(-5 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(-4 * o, -2 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(-1 * o, -2 * o)), cc.callFunc(function(e, t) {
                                e.position = cc.v2(Math.round(e.x), Math.round(e.y))
                            }, this, this)), e));
                            break;
                        case "Up":
                            n = cc.sequence(cc.delayTime(t), cc.repeat(cc.sequence(cc.moveBy(.02 * i, cc.v2(10 * o, 4 * o)), cc.moveBy(.02 * i, cc.v2(-8 * o, 7 * o)), cc.moveBy(.02 * i, cc.v2(7 * o, -6 * o)), cc.moveBy(.02 * i, cc.v2(-5 * o, -2 * o)), cc.moveBy(.02 * i, cc.v2(-4 * o, 5 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, -5 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, -4 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, -1 * o)), cc.callFunc(function(e, t) {
                                e.position = cc.v2(Math.round(e.x), Math.round(e.y))
                            }, this, this)), e));
                            break;
                        case "Down":
                            n = cc.sequence(cc.delayTime(t), cc.repeat(cc.sequence(cc.moveBy(.02 * i, cc.v2(10 * o, -4 * o)), cc.moveBy(.02 * i, cc.v2(-8 * o, -7 * o)), cc.moveBy(.02 * i, cc.v2(7 * o, 6 * o)), cc.moveBy(.02 * i, cc.v2(-5 * o, 2 * o)), cc.moveBy(.02 * i, cc.v2(-4 * o, -5 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, 5 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, 4 * o)), cc.moveBy(.02 * i, cc.v2(2 * o, -2 * o)), cc.moveBy(.02 * i, cc.v2(-2 * o, 1 * o)), cc.callFunc(function(e, t) {
                                e.position = cc.v2(Math.round(e.x), Math.round(e.y))
                            }, this, this)), e))
                    }
                    return n
                }
                return console.log("获取ShakeAction错误，不能为0次"), null
            },
            PlayAudio: function(e, t, a, i) {
                return 1 == i ? (cc.audioEngine.setMusicVolume(t), cc.audioEngine.playMusic(e, a)) : (cc.audioEngine.setEffectsVolume(t), cc.audioEngine.playEffect(e, a))
            },
            SaveStorageData: function(e, t) {
                cc.sys.localStorage.setItem(e, t)
            },
            GetStorageData: function(e) {
                return cc.sys.localStorage.getItem(e)
            },
            GetBoundingBoxToWorld: function(e) {
                var t = e.convertToWorldSpaceAR(cc.v2(-e.anchorX * e.width * (e.scaleX / Math.abs(e.scaleX)), -e.anchorY * e.height * (e.scaleY / Math.abs(e.scaleY))));
                return cc.rect(t.x, t.y, e.width * Math.abs(e.scaleX), e.height * Math.abs(e.scaleY))
            },
            AdjustLabelInterval: function(e, t) {
                for (var a = e.children, i = 0, o = 0; o < a.length; o++) i += a[o].width * Math.abs(a[o].scaleX);
                i += t * (a.length - 1);
                for (var n = 0; n < a.length; n++) a[n].x = 0 == n ? -.5 * i + .5 * a[n].width * Math.abs(a[n].scaleX) : a[n - 1].x + .5 * a[n - 1].width * Math.abs(a[n - 1].scaleX) + t + .5 * a[n].width * Math.abs(a[n].scaleX)
            }
        }, cc._RF.pop()
    }, {}],
    PiranhaJS: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "caf80uoaJdNp6Tg8XSR6ich", "PiranhaJS");
        e("MyGlobalJS");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.gameWidth = cc.winSize.width, this.gameHeight = cc.winSize.height, this.GameManagerJS = cc.director.getScene().children[0].getComponent("GameManagerJS"), this.PlayGameJS = this.GameManagerJS.PlayGameJS, this.InitSelf()
            },
            InitSelf: function() {},
            onBeginContact: function(e, t, a) {
                "Sea" == a.node.group && this.PlayGameJS.BornSpray(a.node, this.node, .7, .5)
            },
            onEndContact: function(e, t, a) {
                "Sea" == a.node.group && this.PlayGameJS.BornSpray(a.node, this.node, .7, .5)
            }
        }), cc._RF.pop()
    }, {
        MyGlobalJS: "MyGlobalJS"
    }],
    PlayGameJS: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "f9594ZNC4JJPaykj0xb4enP", "PlayGameJS");
        var j = e("MyGlobalJS"),
            z = cc.Enum({
                JumpDistance: 0,
                JumpHeight: 1,
                Crocodile: 2,
                Elevator: 3,
                Slider: 4,
                MoreElevator: 5,
                Bear: 6,
                Piranha: 7
            });
        cc.Class({
            extends: cc.Component,
            properties: {
                AudioBGM: {
                    default: null,
                    url: cc.AudioClip
                },
                AudioDeath: {
                    default: null,
                    url: cc.AudioClip
                },
                AudioGrass: {
                    default: null,
                    url: cc.AudioClip
                },
                AudioJumpArray: {
                    default: [],
                    url: [cc.AudioClip]
                },
                AudioWater: {
                    default: null,
                    url: cc.AudioClip
                },
                AudioWood: {
                    default: null,
                    url: cc.AudioClip
                },
                SpriteControl: cc.Node,
                SpriteScore: cc.Node,
                BGNode: cc.Node,
                MonkeyParent: cc.Node,
                CameraNode: cc.Node,
                FloorParent: cc.Node,
                RopeGraphicNode: cc.Node,
                RopeParent: cc.Node,
                MotionStreakParent: cc.Node,
                EnemyParent: cc.Node,
                SeaPrefab: cc.Prefab,
                SeaParent: cc.Node,
                WoodPrefab: cc.Prefab,
                FloorPrefab: cc.Prefab,
                BearPrefab: cc.Prefab,
                CrocodilePrefab: cc.Prefab,
                PiranhaPrefab: cc.Prefab,
                FloorNoGrassPrefab: cc.Prefab,
                PiranhaSpriteFrame: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                WaterParSpriteF: cc.SpriteFrame,
                WaterParParent: cc.Node,
                SprayParSpriteF: cc.SpriteFrame,
                SprayParParent: cc.Node,
                MonkeyBrokenParSpriteFArray: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                MonkeyBrokenParPrefab: cc.Prefab,
                MonkeyBrokenParParent: cc.Node,
                ControlArrowSpriteFArray: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                MonkeyGuide: cc.Node,
                SpriteHandClick: cc.Node,
                HandClickSpriteFArray: {
                    default: [],
                    type: [cc.SpriteFrame]
                }
            },
            onLoad: function() {
                this.JumpUpSpeed = cc.v2(300, 800), this.JumpUpDensity = 200, this.DropDownSpeed = cc.v2(300, -500), this.DropDownDensity = 40, this.DistToScoreRate = 20, this.FloorStartY = -87, this.ScoreHighestDifficulty = 5e3, this.WaitGameOverTime = 3, this.gameWidth = cc.winSize.width, this.gameHeight = cc.winSize.height, this.GameManagerJS = cc.director.getScene().children[0].getComponent("GameManagerJS"), this.MonkeyArray = this.MonkeyParent.children, this.FloorArray = this.FloorParent.children, this.RopeArray = this.RopeParent.children, this.MotionStreakArray = this.MotionStreakParent.children, this.EnemyArray = this.EnemyParent.children, this.SeaArray = this.SeaParent.children, this.MonkeyPointArray = [], this.IfControling = !1, this.CurTerrainBornX = null, this.CurScore = 0, this.CurControlMonkey = null, this.CurWaitGameOverTime = 0, this.InitSelf(), this.addTouch()
            },
            addTouch: function() {
                var t = this;
                this.BGNode.on(cc.Node.EventType.TOUCH_START, function(e) {
                    t.TouchBGStart(e)
                }, this), this.BGNode.on(cc.Node.EventType.TOUCH_END, function(e) {
                    t.TouchBGEnd(e)
                }, this), this.BGNode.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
                    t.TouchBGEnd(e)
                }, this)
            },
            InitSelf: function() {
                cc.director.getPhysicsManager().enabled = !0, this.BGNode.height = this.gameHeight, this.SpriteScore.y += .5 * this.gameHeight - 640
            },
            TouchBGStart: function() {
                if (null != this.CurControlMonkey) {
                    j.PlayAudio(this.AudioJumpArray[j.GetRandomInt(0, this.AudioJumpArray.length - 1)], 1, !1, !1), this.IfControling = !0;
                    var e = this.CurControlMonkey.getComponent(cc.RigidBody),
                        t = this.CurControlMonkey.getComponent(cc.PhysicsBoxCollider),
                        a = null;
                    a = this.CurControlMonkey.uuid == this.MonkeyArray[0].uuid ? 1 + Math.max(this.MonkeyArray[1].x - this.MonkeyArray[0].x, 0) / this.gameWidth * .4 : 1 + Math.max(this.MonkeyArray[0].x - this.MonkeyArray[1].x, 0) / this.gameWidth * .4, e.linearVelocity = cc.v2(this.JumpUpSpeed.x * a, this.JumpUpSpeed.y), t.density = this.JumpUpDensity, t.apply(), this.SpriteControl.opacity = 0, this.SpriteControl.stopAllActions()
                }
            },
            TouchBGEnd: function() {
                if (null != this.CurControlMonkey) {
                    this.IfControling = !1;
                    var e = this.CurControlMonkey.getComponent(cc.RigidBody),
                        t = this.CurControlMonkey.getComponent(cc.PhysicsBoxCollider);
                    (e.linearVelocity.x > this.DropDownSpeed.x || e.linearVelocity.y > this.DropDownSpeed.y) && (e.linearVelocity = cc.v2(Math.min(e.linearVelocity.x, this.DropDownSpeed.x), Math.min(e.linearVelocity.y, this.DropDownSpeed.y))), t.density = this.DropDownDensity, t.apply(), this.CurControlMonkey.uuid == this.MonkeyArray[0].uuid && 1 == this.MonkeyArray[1].getComponent("MonkeyJS").IfCanJump ? (this.CurControlMonkey = this.MonkeyArray[1], this.SpriteControl.getComponent(cc.Sprite).spriteFrame = this.ControlArrowSpriteFArray[1]) : this.CurControlMonkey.uuid == this.MonkeyArray[1].uuid && 1 == this.MonkeyArray[0].getComponent("MonkeyJS").IfCanJump && (this.CurControlMonkey = this.MonkeyArray[0], this.SpriteControl.getComponent(cc.Sprite).spriteFrame = this.ControlArrowSpriteFArray[0]), this.SpriteControl.opacity = 255, this.SpriteControl.runAction(cc.sequence(cc.callFunc(function(e, t) {
                        e.position = this.CurControlMonkey.position.add(cc.v2(10, 70))
                    }, this, this), cc.delayTime(3), cc.callFunc(function(e, t) {
                        e.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function(e, t) {
                            e.position = this.CurControlMonkey.position.add(cc.v2(10, 95))
                        }, this, this), cc.moveBy(.5, 0, -25).easing(cc.easeQuadraticActionOut()), cc.delayTime(1))))
                    }, this, this)))
                }
            },
            StartGame: function() {
                this.IfGameStart = !0, j.PlayAudio(this.AudioBGM, 1, !0, !0), this.ResetBoard()
            },
            ResetBoard: function() {
                if (this.MonkeyArray[0].getComponent(cc.PhysicsBoxCollider).density = this.DropDownDensity, this.MonkeyArray[0].getComponent(cc.PhysicsBoxCollider).apply(), this.MonkeyArray[1].getComponent(cc.PhysicsBoxCollider).density = this.DropDownDensity, this.MonkeyArray[1].getComponent(cc.PhysicsBoxCollider).apply(), this.CurTerrainBornX = .5 * this.gameWidth + 200, null != this.MonkeyGuide) {
                    var e = j.GetStorageData("GLHPlayTime");
                    e = null == e ? 0 : Number(e), e++, j.SaveStorageData("GLHPlayTime", e), e <= 2 ? this.MonkeyGuide.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function(e, t) {
                        var a = this.MonkeyGuide.getComponent(cc.RigidBody),
                            i = this.MonkeyGuide.getComponent(cc.PhysicsBoxCollider);
                        a.linearVelocity = cc.v2(this.JumpUpSpeed.x, this.JumpUpSpeed.y), i.density = this.JumpUpDensity, i.apply(), this.SpriteHandClick.getChildByName("Sprite").getComponent(cc.Sprite).spriteFrame = this.HandClickSpriteFArray[1]
                    }, this, this), cc.delayTime(.5), cc.callFunc(function(e, t) {
                        var a = this.MonkeyGuide.getComponent(cc.RigidBody),
                            i = this.MonkeyGuide.getComponent(cc.PhysicsBoxCollider);
                        (a.linearVelocity.x > this.DropDownSpeed.x || a.linearVelocity.y > this.DropDownSpeed.y) && (a.linearVelocity = cc.v2(Math.min(a.linearVelocity.x, this.DropDownSpeed.x), Math.min(a.linearVelocity.y, this.DropDownSpeed.y))), i.density = this.DropDownDensity, i.apply()
                    }, this, this), cc.delayTime(.45), cc.callFunc(function(e, t) {
                        this.SpriteHandClick.getChildByName("Sprite").getComponent(cc.Sprite).spriteFrame = this.HandClickSpriteFArray[0]
                    }, this, this), cc.delayTime(.55), cc.callFunc(function(e, t) {
                        e.x + .5 * e.width < -.5 * this.gameWidth + this.CameraNode.x ? (e.destroy(), this.SpriteHandClick.destroy()) : e.x = 470
                    }, this, this), cc.delayTime(1)))) : (this.MonkeyGuide.destroy(), this.SpriteHandClick.destroy())
                }
            },
            update: function(e) {
                if (1 == this.IfGameStart && 0 == j.IfGameOver) {
                    if (this.ResetRopeGraphic(), null != this.CurControlMonkey && 0 == this.IfControling && 0 == this.CurControlMonkey.getComponent("MonkeyJS").IfCanJump && (this.CurControlMonkey = null), null == this.CurControlMonkey)
                        for (var t = 0; t < this.MonkeyArray.length; t++)
                            if (1 == this.MonkeyArray[t].getComponent("MonkeyJS").IfCanJump) {
                                this.CurControlMonkey = this.MonkeyArray[t], this.SpriteControl.getComponent(cc.Sprite).spriteFrame = this.ControlArrowSpriteFArray[t];
                                break
                            }
                    null != this.CurControlMonkey ? 0 == this.SpriteControl.active && (this.SpriteControl.active = !0, this.SpriteControl.runAction(cc.sequence(cc.callFunc(function(e, t) {
                        e.position = this.CurControlMonkey.position.add(cc.v2(10, 70))
                    }, this, this), cc.delayTime(3), cc.callFunc(function(e, t) {
                        e.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function(e, t) {
                            e.position = this.CurControlMonkey.position.add(cc.v2(10, 95))
                        }, this, this), cc.moveBy(.5, 0, -25).easing(cc.easeQuadraticActionOut()), cc.delayTime(1))))
                    }, this, this)))) : 1 == this.SpriteControl.active && (this.SpriteControl.active = !1, this.SpriteControl.stopAllActions()), this.CheckCurTerrainBornX();
                    for (var a = !0, i = 0; i < this.MonkeyArray.length; i++)
                        if (this.MonkeyArray[i].y + .5 * this.MonkeyArray[i].height > -.5 * this.gameHeight) {
                            a = !1;
                            break
                        }
                    if (1 == a) this.DestroyMonkey();
                    else if (0 == this.MonkeyPointArray.length)
                        for (var o = 0; o < this.MonkeyArray.length; o++) this.MonkeyPointArray.push(this.MonkeyArray[o].position);
                    else if (null == this.CurControlMonkey) {
                        for (var n = !1, c = 0; c < this.MonkeyArray.length; c++)
                            if (this.MonkeyArray[c].position.sub(this.MonkeyPointArray[c]).mag() < 100) {
                                n = !0;
                                break
                            }
                        1 == n && (this.CurWaitGameOverTime > this.WaitGameOverTime ? this.DestroyMonkey() : this.CurWaitGameOverTime += e)
                    } else this.CurWaitGameOverTime = 0;
                    for (var r = 0; r < this.MonkeyArray.length; r++) 100 < this.MonkeyArray[r].position.sub(this.MonkeyPointArray[r]).mag() && (this.MonkeyPointArray[r] = this.MonkeyArray[r].position)
                }
            },
            lateUpdate: function(e) {
                if (1 == this.IfGameStart && 0 == j.IfGameOver) {
                    for (var t = 0; t < this.MotionStreakArray.length; t++) this.MotionStreakArray[t].position = this.MonkeyArray[t].position;
                    this.ResetCameraPoint()
                }
            },
            ResetCameraPoint: function() {
                var e = this.MonkeyArray[0].position.add(this.MonkeyArray[1].position).mul(.5).add(cc.v2(.2 * this.gameWidth, 0));
                200 < e.y ? this.CameraNode.y = e.y - 200 : e.y < -200 ? this.CameraNode.y = e.y + 200 : this.CameraNode.y = 0, this.CameraNode.x < e.x && (this.CameraNode.x = e.x, this.CurScore < Math.floor(this.CameraNode.x / this.DistToScoreRate) && (this.CurScore = Math.floor(this.CameraNode.x / this.DistToScoreRate), this.SpriteScore.getChildByName("Label").getComponent(cc.Label).string = this.CurScore, 0 == j.IfBannerShowing && 100 < this.CurScore && (j.IfBannerShowing = !0, showBanner())));
                var t = Math.min(.5 * this.gameWidth / (Math.abs(this.MonkeyArray[0].x - this.CameraNode.x) + .5 * this.MonkeyArray[0].width), .5 * this.gameWidth / (Math.abs(this.MonkeyArray[1].x - this.CameraNode.x) + .5 * this.MonkeyArray[1].width), .5 * this.gameHeight / (Math.abs(this.MonkeyArray[0].y - this.CameraNode.y) + .5 * this.MonkeyArray[0].height), .5 * this.gameHeight / (Math.abs(this.MonkeyArray[1].y - this.CameraNode.y) + .5 * this.MonkeyArray[1].height));
                t < 1 ? this.CameraNode.getComponent(cc.Camera).zoomRatio = t : 1 != this.CameraNode.getComponent(cc.Camera).zoomRatio && (this.CameraNode.getComponent(cc.Camera).zoomRatio = 1)
            },
            ResetRopeGraphic: function() {
                var e = this.RopeGraphicNode.getComponent(cc.Graphics);
                e.clear();
                var t = this.MonkeyArray[0].position.add(this.MonkeyArray[0].getComponent(cc.DistanceJoint).anchor);
                e.moveTo(t.x, t.y);
                for (var a = 0; a < this.RopeArray.length; a++) e.lineTo(this.RopeArray[a].x, this.RopeArray[a].y);
                var i = this.MonkeyArray[1].position.add(this.MonkeyArray[1].getComponent(cc.DistanceJoint).anchor);
                e.lineTo(i.x, i.y), e.stroke()
            },
            BornTerrain: function(e) {
                var m = this;
                switch (e) {
                    case z.JumpDistance:
                        for (var t = .5 < Math.random(), a = 1 == t ? this.WoodPrefab : this.FloorPrefab, i = j.GetRandomInt(2, 4), o = 0; o < i; o++) {
                            var n = 80 + 180 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1);
                            n = Math.min(n + j.GetRandomInt(0, 70), 260), this.CurTerrainBornX += n;
                            var c = cc.instantiate(a);
                            0 == t && (c.scaleX = Math.max(350 - 270 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1) - j.GetRandomInt(0, 50), 80) / c.width), this.FloorParent.addChild(c), c.position = cc.v2(this.CurTerrainBornX + .5 * c.width * c.scaleX, -87), this.CurTerrainBornX += c.width * c.scaleX
                        }
                        break;
                    case z.JumpHeight:
                        for (var r = .5 < Math.random(), s = 1 == r ? this.WoodPrefab : this.FloorPrefab, h = j.GetRandomInt(4, 7), l = -87, d = 50 + 200 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1), u = 0; u < h; u++) {
                            var g = 80 + 180 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1);
                            g = Math.min(g + j.GetRandomInt(0, 70), 260), this.CurTerrainBornX += g;
                            var y = cc.instantiate(s);
                            0 == r && (y.scaleX = Math.max(350 - 270 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1) - j.GetRandomInt(0, 50), 80) / y.width), this.FloorParent.addChild(y), l += l < -200 ? j.GetRandomInt(.5 * d, d) : j.GetRandomInt(-d, d), y.position = cc.v2(this.CurTerrainBornX + .5 * y.width * y.scaleX, l), this.CurTerrainBornX += y.width * y.scaleX
                        }
                        for (; Math.abs(l - -87) > d;) {
                            var p = 80 + 180 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1);
                            p = Math.min(p + j.GetRandomInt(0, 70), 260), this.CurTerrainBornX += p;
                            var f = cc.instantiate(s);
                            0 == r && (f.scaleX = Math.max(350 - 270 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1) - j.GetRandomInt(0, 50), 80) / f.width), this.FloorParent.addChild(f), l += -87 < l ? j.GetRandomInt(.5 * -d, -d) : j.GetRandomInt(.5 * d, d), f.position = cc.v2(this.CurTerrainBornX + .5 * f.width * f.scaleX, l), this.CurTerrainBornX += f.width * f.scaleX
                        }
                        var v = 80 + 180 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1);
                        v = Math.min(v + j.GetRandomInt(0, 70), 260), this.CurTerrainBornX += v;
                        var S = cc.instantiate(s);
                        0 == r && (S.scaleX = Math.max(350 - 270 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1) - j.GetRandomInt(0, 50), 80) / S.width), this.FloorParent.addChild(S), S.position = cc.v2(this.CurTerrainBornX + .5 * S.width * S.scaleX, -87), this.CurTerrainBornX += S.width * S.scaleX;
                        break;
                    case z.Crocodile:
                        var C = 80 + 180 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1);
                        C = Math.min(C + j.GetRandomInt(0, 70), 260), this.CurTerrainBornX += C;
                        var B = cc.instantiate(this.FloorPrefab);
                        B.scaleX = 130 / B.width, this.FloorParent.addChild(B), B.position = cc.v2(this.CurTerrainBornX + .5 * B.width * B.scaleX, -87), this.CurTerrainBornX += B.width * B.scaleX;
                        for (var M = j.GetRandomInt(2, 4), T = 0; T < M; T++) {
                            var G = 80 + 180 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1);
                            G = Math.min(G + j.GetRandomInt(0, 70), 260), this.CurTerrainBornX += G;
                            var A = cc.instantiate(this.CrocodilePrefab);
                            this.FloorParent.addChild(A), A.position = cc.v2(this.CurTerrainBornX + .5 * A.width, -112), this.CurTerrainBornX += A.width, A.runAction(cc.repeatForever(cc.sequence(cc.moveBy(2, 0, -50).easing(cc.easeCubicActionInOut()), cc.moveBy(2, 0, 50).easing(cc.easeCubicActionInOut()))))
                        }
                        var w = 80 + 180 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1);
                        w = Math.min(w + j.GetRandomInt(0, 70), 260), this.CurTerrainBornX += w;
                        var R = cc.instantiate(this.FloorPrefab);
                        R.scaleX = 130 / R.width, this.FloorParent.addChild(R), R.position = cc.v2(this.CurTerrainBornX + .5 * R.width * R.scaleX, -87), this.CurTerrainBornX += R.width * R.scaleX;
                        var P = cc.instantiate(this.SeaPrefab);
                        this.SeaParent.addChild(P), P.width = R.x - .5 * R.width * R.scaleX - (B.x + .5 * B.width * B.scaleX), P.getComponent(cc.PhysicsBoxCollider).size.width = P.width, P.getComponent(cc.PhysicsBoxCollider).apply(), P.position = cc.v2(.5 * (R.x - .5 * R.width * R.scaleX + (B.x + .5 * B.width * B.scaleX)), -112), P.runAction(cc.repeatForever(cc.sequence(cc.moveBy(2, 0, -50).easing(cc.easeCubicActionInOut()), cc.moveBy(2, 0, 50).easing(cc.easeCubicActionInOut())))), P.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.1), cc.callFunc(function(e, t) {
                            for (var a = 0; a < 1; a++) {
                                var i = new cc.Node("WaterPar");
                                i.addComponent(cc.Sprite), i.getComponent(cc.Sprite).spriteFrame = this.WaterParSpriteF, this.WaterParParent.addChild(i), i.position = e.position.add(cc.v2(j.GetRandomInt(-.48 * P.width, .48 * P.width), j.GetRandomFloat(-.25 * P.height, -.8 * P.height))), i.scale = 0, i.opacity = 0;
                                i.runAction(cc.sequence(cc.delayTime(j.GetRandomFloat(0, .1)), cc.spawn(cc.scaleTo(.3, j.GetRandomFloat(.3, .7)), cc.fadeTo(.3, j.GetRandomInt(150, 255))), cc.spawn(cc.fadeOut(1).easing(cc.easeCubicActionIn()), cc.scaleTo(1, 0).easing(cc.easeSineIn()), cc.moveBy(1, 0, j.GetRandomInt(50, 100))), cc.callFunc(function(e, t) {
                                    e.destroy()
                                }, this, this)))
                            }
                        }, this, this))));
                        var F = cc.instantiate(this.FloorNoGrassPrefab);
                        F.scaleX = P.width / F.width, this.SeaParent.addChild(F), F.position = cc.v2(P.x, -112 - P.height + 50);
                        break;
                    case z.Elevator:
                        for (var x = function(e) {
                                m.CurTerrainBornX += j.GetRandomInt(150, 200);
                                var t = cc.instantiate(m.FloorPrefab);
                                t.scaleX = j.GetRandomInt(200, 240) / t.width, m.FloorParent.addChild(t), t.position = 0 == e ? cc.v2(m.CurTerrainBornX + .5 * t.width * t.scaleX, -87) : cc.v2(m.CurTerrainBornX + .5 * t.width * t.scaleX, j.GetRandomFloat(150, 300)), m.CurTerrainBornX += t.width * t.scaleX, m.CurTerrainBornX += j.GetRandomInt(130, 200);
                                var a = cc.instantiate(m.WoodPrefab);
                                m.FloorParent.addChild(a), a.position = cc.v2(m.CurTerrainBornX + .5 * a.width * a.scaleX, -87), m.CurTerrainBornX += a.width * a.scaleX, a.getComponent(cc.RigidBody).type = cc.RigidBodyType.Kinematic;
                                var i = 10 - 7 * Math.min(Math.floor(m.CurTerrainBornX / m.DistToScoreRate) / m.ScoreHighestDifficulty, 1);
                                a.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function(e, t) {
                                    e.getComponent(cc.RigidBody).linearVelocity = cc.v2(e.getComponent(cc.RigidBody).linearVelocity.x, -100 / (i / 6))
                                }, m, m), cc.delayTime(i / 6), cc.callFunc(function(e, t) {
                                    e.getComponent(cc.RigidBody).linearVelocity = cc.v2(e.getComponent(cc.RigidBody).linearVelocity.x, 400 / (i / 2))
                                }, m, m), cc.delayTime(i / 2), cc.callFunc(function(e, t) {
                                    e.getComponent(cc.RigidBody).linearVelocity = cc.v2(e.getComponent(cc.RigidBody).linearVelocity.x, -300 / (i / 3))
                                }, m, m), cc.delayTime(i / 3))))
                            }, I = 0; I < 2; I++) x(I);
                        break;
                    case z.Slider:
                        this.CurTerrainBornX += j.GetRandomInt(150, 200);
                        var k = cc.instantiate(this.FloorPrefab);
                        k.scaleX = j.GetRandomInt(200, 240) / k.width, this.FloorParent.addChild(k), k.position = cc.v2(this.CurTerrainBornX + .5 * k.width * k.scaleX, -87), this.CurTerrainBornX += k.width * k.scaleX, this.CurTerrainBornX += j.GetRandomInt(25, 100);
                        var N = cc.instantiate(this.WoodPrefab);
                        this.FloorParent.addChild(N), N.position = cc.v2(this.CurTerrainBornX + .5 * N.width * N.scaleX, -87), this.CurTerrainBornX += N.width * N.scaleX, N.getComponent(cc.RigidBody).type = cc.RigidBodyType.Kinematic;
                        var b = 10 - 7 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1);
                        N.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function(e, t) {
                            e.getComponent(cc.RigidBody).linearVelocity = cc.v2(400 / (b / 2), e.getComponent(cc.RigidBody).linearVelocity.y)
                        }, this, this), cc.delayTime(b / 2), cc.callFunc(function(e, t) {
                            e.getComponent(cc.RigidBody).linearVelocity = cc.v2(-400 / (b / 2), e.getComponent(cc.RigidBody).linearVelocity.y)
                        }, this, this), cc.delayTime(b / 2)))), this.CurTerrainBornX += 400, this.CurTerrainBornX += j.GetRandomInt(25, 100);
                        var L = cc.instantiate(this.FloorPrefab);
                        L.scaleX = j.GetRandomInt(200, 240) / L.width, this.FloorParent.addChild(L), L.position = cc.v2(this.CurTerrainBornX + .5 * L.width * L.scaleX, -87), this.CurTerrainBornX += L.width * L.scaleX;
                        break;
                    case z.MoreElevator:
                        for (var D = j.GetRandomInt(2, 4), J = function(e) {
                                m.CurTerrainBornX += j.GetRandomInt(130, 200);
                                var t = cc.instantiate(m.WoodPrefab);
                                m.FloorParent.addChild(t), t.position = cc.v2(m.CurTerrainBornX + .5 * t.width * t.scaleX, -87), m.CurTerrainBornX += t.width * t.scaleX, t.getComponent(cc.RigidBody).type = cc.RigidBodyType.Kinematic;
                                var a = 12 - 9 * Math.min(Math.floor(m.CurTerrainBornX / m.DistToScoreRate) / m.ScoreHighestDifficulty, 1);
                                t.runAction(cc.sequence(cc.delayTime(j.GetRandomFloat(0, a)), cc.callFunc(function(e, t) {
                                    e.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function(e, t) {
                                        e.getComponent(cc.RigidBody).linearVelocity = cc.v2(e.getComponent(cc.RigidBody).linearVelocity.x, -100 / (a / 6))
                                    }, this, this), cc.delayTime(a / 6), cc.callFunc(function(e, t) {
                                        e.getComponent(cc.RigidBody).linearVelocity = cc.v2(e.getComponent(cc.RigidBody).linearVelocity.x, 400 / (a / 2))
                                    }, this, this), cc.delayTime(a / 2), cc.callFunc(function(e, t) {
                                        e.getComponent(cc.RigidBody).linearVelocity = cc.v2(e.getComponent(cc.RigidBody).linearVelocity.x, -300 / (a / 3))
                                    }, this, this), cc.delayTime(a / 3))))
                                }, m, m)))
                            }, O = 0; O < D; O++) J();
                        break;
                    case z.Bear:
                        for (var X = .5 < Math.random(), E = 1 == X ? this.WoodPrefab : this.FloorPrefab, H = j.GetRandomInt(3, 4), _ = Math.ceil(.5 * H), U = 0; U < H; U++) {
                            var q = 80 + 180 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1);
                            q = 1 != X || U != _ - 1 && U != _ ? Math.min(q + j.GetRandomInt(0, 70), 260) : 50, this.CurTerrainBornX += q;
                            var W = cc.instantiate(E);
                            if (0 == X && U != _ - 1 && (W.scaleX = Math.max(350 - 270 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1) - j.GetRandomInt(0, 50), 80) / W.width), this.FloorParent.addChild(W), W.position = cc.v2(this.CurTerrainBornX + .5 * W.width * W.scaleX, -87), this.CurTerrainBornX += W.width * W.scaleX, U == _ - 1) {
                                var V = cc.instantiate(this.BearPrefab);
                                this.EnemyParent.addChild(V), V.scale = .6 + .35 * Math.min(Math.floor(this.CurTerrainBornX / this.DistToScoreRate) / this.ScoreHighestDifficulty, 1), V.position = W.position.add(cc.v2(0, .5 * V.height * V.scaleY))
                            }
                        }
                        break;
                    case z.Piranha:
                        (function() {
                            var e = 80 + 180 * Math.min(Math.floor(m.CurTerrainBornX / m.DistToScoreRate) / m.ScoreHighestDifficulty, 1);
                            e = Math.min(e + j.GetRandomInt(0, 70), 260), m.CurTerrainBornX += e;
                            var t = cc.instantiate(m.FloorPrefab);
                            t.scaleX = 130 / t.width, m.FloorParent.addChild(t), t.position = cc.v2(m.CurTerrainBornX + .5 * t.width * t.scaleX, -87), m.CurTerrainBornX += t.width * t.scaleX;
                            for (var a = j.GetRandomInt(2, 5), i = 4 - 2 * Math.min(Math.floor(m.CurTerrainBornX / m.DistToScoreRate) / m.ScoreHighestDifficulty, 1), o = 1.5 - .9 * Math.min(Math.floor(m.CurTerrainBornX / m.DistToScoreRate) / m.ScoreHighestDifficulty, 1), n = 0; n < a; n++) {
                                var c = 80 + 180 * Math.min(Math.floor(m.CurTerrainBornX / m.DistToScoreRate) / m.ScoreHighestDifficulty, 1);
                                c = Math.min(c + j.GetRandomInt(0, 70), 260), m.CurTerrainBornX += c;
                                var r = cc.instantiate(m.PiranhaPrefab);
                                if (m.EnemyParent.addChild(r), r.position = cc.v2(m.CurTerrainBornX - .5 * c, -512), r.CurSpriteFIndex = 0, r.MySpriteFArray = m.PiranhaSpriteFrame, r.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function(e, t) {
                                        e.CurSpriteFIndex = e.CurSpriteFIndex + 1 > e.MySpriteFArray.length - 1 ? 0 : e.CurSpriteFIndex + 1, e.getComponent(cc.Sprite).spriteFrame = e.MySpriteFArray[e.CurSpriteFIndex]
                                    }, m, m), cc.delayTime(.1)))), r.runAction(cc.sequence(cc.delayTime(j.GetRandomFloat(0, i + 2 * o)), cc.callFunc(function(e, t) {
                                        e.runAction(cc.repeatForever(cc.sequence(cc.delayTime(i), cc.moveBy(o, 0, 800).easing(cc.easeQuadraticActionOut()), cc.callFunc(function(e, t) {
                                            e.rotation = 180
                                        }, this, this), cc.moveBy(o, 0, -800).easing(cc.easeQuadraticActionIn()), cc.callFunc(function(e, t) {
                                            e.rotation = 0
                                        }, this, this))))
                                    }, m, m))), n != a - 1) {
                                    var s = cc.instantiate(m.WoodPrefab);
                                    m.FloorParent.addChild(s), s.position = cc.v2(m.CurTerrainBornX + .5 * s.width * s.scaleX, -62), m.CurTerrainBornX += s.width
                                }
                            }
                            var h = cc.instantiate(m.FloorPrefab);
                            h.scaleX = 130 / h.width, m.FloorParent.addChild(h), h.position = cc.v2(m.CurTerrainBornX + .5 * h.width * h.scaleX, -87), m.CurTerrainBornX += h.width * h.scaleX;
                            var l = cc.instantiate(m.SeaPrefab);
                            m.SeaParent.addChild(l), l.width = h.x - .5 * h.width * h.scaleX - (t.x + .5 * t.width * t.scaleX), l.getComponent(cc.PhysicsBoxCollider).size.width = l.width, l.getComponent(cc.PhysicsBoxCollider).apply(), l.position = cc.v2(.5 * (h.x - .5 * h.width * h.scaleX + (t.x + .5 * t.width * t.scaleX)), -112), l.runAction(cc.repeatForever(cc.sequence(cc.moveBy(2, 0, -50).easing(cc.easeCubicActionInOut()), cc.moveBy(2, 0, 50).easing(cc.easeCubicActionInOut())))), l.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.1), cc.callFunc(function(e, t) {
                                for (var a = 0; a < 1; a++) {
                                    var i = new cc.Node("WaterPar");
                                    i.addComponent(cc.Sprite), i.getComponent(cc.Sprite).spriteFrame = this.WaterParSpriteF, this.WaterParParent.addChild(i), i.position = e.position.add(cc.v2(j.GetRandomInt(-.48 * l.width, .48 * l.width), j.GetRandomFloat(-.25 * l.height, -.8 * l.height))), i.scale = 0, i.opacity = 0;
                                    i.runAction(cc.sequence(cc.delayTime(j.GetRandomFloat(0, .1)), cc.spawn(cc.scaleTo(.3, j.GetRandomFloat(.3, .7)), cc.fadeTo(.3, j.GetRandomInt(150, 255))), cc.spawn(cc.fadeOut(1).easing(cc.easeCubicActionIn()), cc.scaleTo(1, 0).easing(cc.easeSineIn()), cc.moveBy(1, 0, j.GetRandomInt(50, 100))), cc.callFunc(function(e, t) {
                                        e.destroy()
                                    }, this, this)))
                                }
                            }, m, m))));
                            var d = cc.instantiate(m.FloorNoGrassPrefab);
                            d.scaleX = l.width / d.width, m.SeaParent.addChild(d), d.position = cc.v2(l.x, -112 - l.height + 50)
                        })()
                }
            },
            BornSpray: function(e, t, a, i) {
                Math.abs(t.x - this.CameraNode.x) < .5 * this.gameWidth && j.PlayAudio(this.AudioWater, i, !1, !1), null == a && (a = 1);
                for (var o = 0; o < 20; o++) {
                    var n = new cc.Node("SprayPar");
                    n.addComponent(cc.Sprite), n.getComponent(cc.Sprite).spriteFrame = this.SprayParSpriteF, this.SprayParParent.addChild(n), n.scale = j.GetRandomFloat(.3, .7) * a, n.position = cc.v2(t.x + j.GetRandomInt(-20, 20) * a, e.y + -.5 * n.height - 20 + j.GetRandomInt(0, -50) * a), n.runAction(cc.sequence(cc.jumpBy(j.GetRandomFloat(.8, 1.2) * a, (n.x - t.x) * j.GetRandomInt(2, 10) * a, 0, j.GetRandomInt(50, 300) * a, 1), cc.callFunc(function(e, t) {
                        e.destroy()
                    })))
                }
            },
            CheckCurTerrainBornX: function() {
                for (var e = 0; e < this.SeaArray && this.SeaArray[e].x + .5 * this.SeaArray[e].width * this.SeaArray[e].scaleX < -1.5 * this.gameWidth + this.CameraNode.x; e++) this.SeaArray[e].destroy();
                for (var t = 0; t < this.FloorArray.length && this.FloorArray[t].x + .5 * this.FloorArray[t].width * this.FloorArray[t].scaleX < -1.5 * this.gameWidth + this.CameraNode.x; t++) this.FloorArray[t].destroy();
                for (var a = 0; a < this.EnemyArray.length && this.EnemyArray[a].x + .5 * this.EnemyArray[a].width * this.EnemyArray[a].scaleX < -1.5 * this.gameWidth + this.CameraNode.x; a++) this.EnemyArray[a].destroy();
                this.CameraNode.x + 2.5 * this.gameWidth > this.CurTerrainBornX && (Math.floor(this.CurTerrainBornX / this.DistToScoreRate) < 100 ? this.BornTerrain(j.GetRandomInt(0, 0)) : Math.floor(this.CurTerrainBornX / this.DistToScoreRate) < 200 ? this.BornTerrain(j.GetRandomInt(0, 2)) : Math.floor(this.CurTerrainBornX / this.DistToScoreRate) < 400 ? this.BornTerrain(j.GetRandomInt(0, 4)) : Math.floor(this.CurTerrainBornX / this.DistToScoreRate) < 700 ? this.BornTerrain(j.GetRandomInt(0, 5)) : this.BornTerrain(j.GetRandomInt(0, 7)))
            },
            DestroyMonkey: function() {
                if (0 == j.IfGameOver) return j.PlayAudio(this.AudioDeath, 1, !1, !1), this.CurControlMonkey = null, this.SpriteControl.active = !1, this.RopeGraphicNode.getComponent(cc.Graphics).clear(), void this.GameOver()
            },
            GameOver: function() {
                this.GameManagerJS.GameOver(this.CurScore)
            },
            Relive: function() {
                for (var e = void 0, t = 1e3, a = 0; a < this.FloorArray.length; a++) {
                    var i = this.FloorArray[a],
                        o = Math.abs(i.x - this.MonkeyArray[0].x);
                    o < t && (t = o, e = i.position)
                }
                this.MonkeyArray[0].position = e, this.MonkeyArray[1].position = e;
                for (var n = 0; n < this.RopeArray.length; n++) {
                    this.RopeArray[n].position = e
                }
                this.MonkeyPointArray = [], this.CurWaitGameOverTime = 0
            }
        }), cc._RF.pop()
    }, {
        MyGlobalJS: "MyGlobalJS"
    }],
    ReliveLayerJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "e42c9q4uqtHq578hxvdaKXc", "ReliveLayerJs"), cc.Class({
            extends: cc.Component,
            properties: {
                YesBtn: cc.Node,
                NoBtn: cc.Node,
                MaskBg: cc.Node,
                ReliveLayer: cc.Node
            },
            onLoad: function() {
                this.GameManagerJS = cc.director.getScene().children[0].getComponent("GameManagerJS"), this.PlayGameJS = this.GameManagerJS.PlayGameJS
            },
            start: function() {
                this.addClickEvent()
            },
            addClickEvent: function() {
                var t = this;
                t.YesBtn.on(cc.Node.EventType.TOUCH_START, function(e) {
                    t.WaitADCall || t.ShowAD || (t.WaitADCall = !0, t.YesBtn.stopAllActions(), t.YesBtn.rotation = 0, t.YesBtn.setScale(1), t.clickVideoBtn())
                }), t.NoBtn.on(cc.Node.EventType.TOUCH_START, function(e) {
                    t.WaitADCall || (t.ReliveLayer.destroy(), t.MaskBg.active = !1, t.GameManagerJS.GameOver2())
                })
            },
            showScore: function() {},
            ShowRelive: function() {
                this.MaskBg.active = !0, this.ReliveLayer.runAction(cc.sequence(cc.moveTo(.5, cc.v2(0, 0)).easing(cc.easeBackOut()), cc.callFunc(function() {
                    this.YesBtn.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.5), cc.rotateTo(.1, -10), cc.rotateTo(.2, 10), cc.rotateTo(.2, -10), cc.rotateTo(.2, 10), cc.rotateTo(.1, 0), cc.delayTime(.5), cc.scaleTo(.5, 1.1, 1.1).easing(cc.easeSineOut()), cc.scaleTo(.5, 1, 1).easing(cc.easeSineOut()), cc.delayTime(.5))))
                }, this)))
            },
            clickVideoBtn: function() {
                var e = this;
                adBreak({
                    type: "reward",
                    name: "dasdf",
                    beforeReward: function(e) {
                        console.log("beforeReward--"), e()
                    },
                    adDismissed: function() {
                        console.log("没有看完广告不发放奖励"), e.ReliveLayer.destroy(), e.MaskBg.active = !1, e.GameManagerJS.GameOver2()
                    },
                    adViewed: function() {
                        console.log("广告播放完毕发放奖励"), e.MaskBg.active = !1, e.ReliveLayer.destroy(), e.WaitADCall = !1, e.ShowAD = !0, e.GameManagerJS.Relive()
                    },
                    adBreakDone: function(e) {
                        console.log("placementInfo")
                    }
                })
            }
        }), cc._RF.pop()
    }, {}],
    gameOverJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3621brbM61BsYFG7fM/74TL", "gameOverJs");
        var i = e("GameUiTools"),
            o = e("GameConfig"),
            n = e("MainManage"),
            c = e("MyGlobalJS");
        cc.Class({
            extends: cc.Component,
            properties: {
                bgLayer: cc.Node,
                scoreBg: cc.Node,
                overScoreT: cc.Label,
                overInfoT: cc.Label,
                moreBtn: cc.Button,
                leftBtn: cc.Button,
                rightBtn: cc.Button,
                midGameText: cc.Label,
                leftBtnText: cc.Label,
                rightBtnText: cc.Label,
                PanelGameOver: cc.Node
            },
            onLoad: function() {
                adBreak({
                    type: "next",
                    name: "dasdf"
                }), this.standardScore = o.standScore, this.game_max_score = 200, this.rigthBtnGameName = null, this.rightBtnGameUrl = null, this.UIPosChange(), this.addClickBtns(), this.addTouchEvents(), c.GameManagerNode.getComponent("GameManagerJS").PlayGameJS.SpriteScore.runAction(cc.fadeOut(.4));
                var e = c.GetStorageData("GLHMaxScore");
                null == e && (e = 0), o.gameScore > e && (c.SaveStorageData("GLHMaxScore", o.gameScore), e = o.gameScore), this.PanelGameOver.y += 500, this.PanelGameOver.opacity = 0, this.PanelGameOver.runAction(cc.spawn(cc.fadeIn(.7), cc.moveTo(1, 0, 0).easing(cc.easeBackOut()))), this.PanelGameOver.getChildByName("SpriteScore").getChildByName("SpriteScore").getComponent(cc.Label).string = o.gameScore, this.PanelGameOver.getChildByName("SpriteScore").getChildByName("SpriteMaxScore").getChildByName("Label").getComponent(cc.Label).string = e, c.AdjustLabelInterval(this.PanelGameOver.getChildByName("SpriteScore").getChildByName("SpriteMaxScore"), 30), this.PanelGameOver.getChildByName("SpriteMoreGame").on(cc.Node.EventType.TOUCH_END, function(e) {
                    window.location.href = n.moreGameUrl
                }), this.PanelGameOver.getChildByName("BG").on(cc.Node.EventType.TOUCH_END, function(e) {
                    n.gotoEndLayer(), o.GAME_OVER_BOOL = !0, o.gameScore = 0, i.loadingScene("MainGameScene")
                }), this.gameWidth = cc.winSize.width, this.gameHeight = cc.winSize.height;
                var t = this.PanelGameOver.getChildByName("SpriteAgain");
                t.opacity = 0, t.y = -.5 * this.gameHeight + 120 + .5 * t.height + 100, t.runAction(cc.sequence(cc.delayTime(7), cc.fadeIn(.2), cc.callFunc(function(e, t) {
                    e.runAction(cc.repeatForever(cc.sequence(cc.delayTime(2), cc.rotateBy(.125, 5), cc.rotateBy(.25, -10), cc.rotateBy(.25, 10), cc.rotateBy(.25, -10), cc.rotateBy(.125, 5))))
                }, this, this)))
            },
            addTouchEvents: function() {
                var e = {
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function(e, t) {
                        return console.log("gameOverJJJJJJJ"), !0
                    },
                    onTouchMoved: function(e, t) {},
                    onTouchEnded: function(e, t) {}
                };
                cc.eventManager.addListener(e, this.node)
            },
            UIPosChange: function() {
                this.overScoreT.string = o.gameScore, console.log("lang", n.langugeType);
                var e = null;
                if (e = 1 == n.langugeType ? this.getContentByScore(o.gameScore, n.gameNameText) : this.getContentByScore2(o.gameScore, n.gameNameText), console.log("nihao", n.endHttpShowInfo), null != n.endHttpShowInfo && "" != n.endHttpShowInfo && (cc.log("gototo"), e = n.endHttpShowInfo), this.overInfoT.string = e, document.title = e, this.moreBtn.node.y = this.scoreBg.y - this.overInfoT.node.height - this.scoreBg.height, this.leftBtn.node.y = this.moreBtn.node.y - 130, this.rightBtn.node.y = this.moreBtn.node.y - 130, console.log("gameOver txtMoreText", n.txtMoreText), this.midGameText.string = n.txtMoreText, this.PanelGameOver.getChildByName("SpriteMoreGame").getChildByName("LabelButtonShadow1").getComponent(cc.Label).string = n.txtMoreText, this.PanelGameOver.getChildByName("SpriteMoreGame").getChildByName("LabelButtonShadow2").getComponent(cc.Label).string = n.txtMoreText, this.leftBtnText.string = n.txtAgainText, this.tempArr = this.gameFocus(), null != n.ranLinkUrl()) {
                    var t = n.ranLinkUrl(),
                        a = n.ranLinkData.gameList[t].gameName;
                    this.rigthBtnGameName = a, this.rightBtnGameUrl = n.ranLinkData.gameList[t].gameUrl
                }
                null != this.rigthBtnGameName && "" != this.rigthBtnGameName ? this.rightBtnText.string = this.rigthBtnGameName : this.rightBtnText.string = this.tempArr[0]
            },
            gameFocus: function() {
                var e = [],
                    t = null,
                    a = null;
                return Math.random() <= .5 ? (t = n.gameEndName1, a = n.gameEndUrl1) : (t = n.gameEndName2, a = n.gameEndUrl2), e.push(t), e.push(a), e
            },
            addClickBtns: function() {
                var a = this;
                a.moreBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}), a.moreBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    console.log("MoreGame"), window.location.href = n.moreGameUrl
                }), a.leftBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}), a.leftBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    o.GAME_OVER_BOOL = !0, o.gameScore = 0, i.loadingScene("MainGameScene")
                }), a.rightBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}), a.rightBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    var t = null;
                    t = null != a.rightBtnGameUrl && "" != a.rightBtnGameUrl ? a.rightBtnGameUrl : a.tempArr[1], window.location.href = t
                })
            },
            getContentByScore: function(e, t) {
                var a = "我真是太厉害，在" + t + "中竟然得了0分，全球只有1个人得了0分！",
                    i = parseInt(.3 * this.standardScore),
                    o = parseInt(1.5 * this.standardScore),
                    n = parseInt(2.5 * this.standardScore),
                    c = parseInt(4 * this.standardScore);
                if (0 < e && e <= i) a = "我在" + t + "中得了" + e + "分，真是太棒了，再练练就能得心应手!";
                else if (i < e && e <= this.standardScore) a = "我在" + t + "中得了" + e + "分，真是太棒了，再练练就能达到游刃有余的境界！";
                else if (e > this.standardScore && e <= o) {
                    a = "我在" + t + "中得了" + e + "分，击败了全球" + (Math.floor(12 * (e - this.standardScore) / (o - this.standardScore)) + 80) + "%的玩家，进入了信手拈来的境界！"
                } else if (o < e && e <= n) {
                    a = "我在" + t + "中得了" + e + "分，击败了全球" + (Math.floor(7 * (e - o) / (n - o)) + 92) + "%的玩家，进入了运用自如的境界！"
                } else if (n < e && e <= c) a = "我在" + t + "中得了" + e + "分，击败了全球99%的玩家，达到了行云流水的境界！";
                else if (c < e && e < this.game_max_score) {
                    a = "我在" + t + "中得了" + e + "分，据说全球只有 " + (20 - Math.ceil(17 * (e - c) / (this.game_max_score - c))) + "个人达到这个水平，独孤求败！"
                } else e >= this.game_max_score && (a = "我在" + t + "中得了" + e + "分，超越了独孤求败，心有灵犀！");
                return a
            },
            getContentByScore2: function(e, t) {
                var a = "I'm awesome，in" + t + "got 0 points，only one person in the world has a 0！",
                    i = parseInt(.3 * this.standardScore),
                    o = parseInt(1.5 * this.standardScore),
                    n = parseInt(2.5 * this.standardScore),
                    c = parseInt(4 * this.standardScore);
                if (e >= this.game_max_score) a = "I got " + e + " points in the game, defeating all players worldwide, waiting for you to fight!";
                else if (0 < e && e <= i) a = "I got " + e + " points in the game, really great！";
                else if (i < e && e <= this.standardScore) a = "I got " + e + " points in the game, really great！";
                else if (e > this.standardScore && e <= o) {
                    a = "I got in the game in " + e + " points, beating out " + (Math.floor(12 * (e - this.standardScore) / (o - this.standardScore)) + 80) + "% of global players！"
                } else if (o < e && e <= n) {
                    a = "I got in the game in " + e + " points, beating out " + (Math.floor(7 * (e - o) / (n - o)) + 92) + "% of global players！"
                } else if (n < e && e <= c) a = "I got in the game in " + e + " points, beating out 99% of global players！";
                else if (c < e && e < this.game_max_score) {
                    a = "I got " + e + " points in the game, it said to be the world's only " + (20 - Math.ceil(17 * (e - c) / (this.game_max_score - c))) + " people to reach this level! Have you?"
                }
                return a
            },
            start: function() {}
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage",
        MyGlobalJS: "MyGlobalJS"
    }],
    linkHttpIconJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "95474fr0oNDP7SAidILF03q", "linkHttpIconJs");
        var r = e("MainManage"),
            c = e("GameConfig");
        cc.Class({
            extends: cc.Component,
            properties: {
                iconSpr: cc.Node,
                iconSpr1: cc.Node
            },
            onLoad: function() {
                if (this._imageArr = [], this.stopUpdateBool = !0, this.gameWidth = cc.director.getWinSize().width, this.gameHeight = cc.director.getWinSize().height, null != r.recGameData && "" != r.recGameData && null != r.recGameimg1 && "" != r.recGameimg1) {
                    var a = 50 - this.gameWidth / 2,
                        i = this.gameHeight - 50 - this.gameHeight / 2;
                    null != r.recGamePos && "" != r.recGamePos && (1 == r.recGamePos ? (a = 50 - this.gameWidth / 2, i = this.gameHeight - 50 - this.gameHeight / 2) : 2 == r.recGamePos ? (a = this.gameWidth - 50 - this.gameWidth / 2, i = this.gameHeight - 50 - this.gameHeight / 2) : 3 == r.recGamePos ? (a = this.gameWidth - 50 - this.gameWidth / 2, i = 50 - this.gameHeight / 2) : 4 == r.recGamePos && (a = 50 - this.gameWidth / 2, i = 50 - this.gameHeight / 2));
                    var e = r.recGameimg1,
                        t = r.recGameimg2,
                        o = this.iconSpr,
                        n = this.iconSpr1,
                        c = this;
                    cc.loader.load(e, function(e, t) {
                        o.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t), c.iconSpr.opacity = 0, c.iconSpr.x = a, c.iconSpr.y = i, c._imageArr.push(c.iconSpr)
                    }), cc.loader.load(t, function(e, t) {
                        n.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t), c.iconSpr1.opacity = 0, c.iconSpr1.x = a, c.iconSpr1.y = i, c._imageArr.push(c.iconSpr1)
                    })
                }
                this.addTouchEvents()
            },
            showLinkPic: function() {
                var e = 0,
                    t = 0;
                e = null != r.recGameDelPau ? r.recGameDelPau : 6, cc.log("dMainManager.recGameDelPer", r.recGameDelPer), t = null != r.recGameDelPer ? r.recGameDelPer : .7, this._imageArr[0].opacity = 255, this._imageArr[0].runAction(cc.repeatForever(cc.sequence(cc.delayTime(e), cc.rotateBy(t, 0, 180), cc.callFunc(function() {
                    this._imageArr[0].setRotation(0), this._imageArr[0].opacity = 0, this._imageArr[1].opacity = 255
                }, this), cc.delayTime(e), cc.callFunc(function() {
                    this.flowerAction(this._imageArr[1], t)
                }, this), cc.delayTime(t), cc.callFunc(function() {
                    this._imageArr[1].opacity = 0, this._imageArr[0].opacity = 255
                }, this))))
            },
            flowerAction: function(e, t) {
                e.runAction(cc.sequence(cc.rotateBy(t, 0, 180), cc.callFunc(function() {
                    e.setRotation(0)
                })))
            },
            start: function() {},
            addTouchEvents: function() {
                var n = this,
                    e = {
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        onTouchBegan: function(e, t) {
                            var a = e.getLocation();
                            if (2 <= n._imageArr.length) {
                                var i = Math.abs(a.x - n.gameWidth / 2 - n._imageArr[0].x),
                                    o = Math.abs(a.y - n.gameHeight / 2 - n._imageArr[0].y);
                                i <= 30 && o <= 30 && (c.noTouchBool = !1, null != r.recGameUrl && "" != r.recGameUrl && (n._imageArr[0].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1), cc.callFunc(function() {
                                    window.location.href = r.recGameUrl
                                }))), n._imageArr[1].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1)))), console.log("touchLinkHttp"))
                            }
                            return !0
                        },
                        onTouchMoved: function(e, t) {},
                        onTouchEnded: function(e, t) {}
                    };
                cc.eventManager.addListener(e, n.node)
            },
            update: function(e) {
                this.stopUpdateBool && 2 <= this._imageArr.length && (this.stopUpdateBool = !1, this.showLinkPic())
            }
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        MainManage: "MainManage"
    }],
    startGameJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "280c3rsZJJKnZ9RqbALVwtK", "startGameJs");
        var i = e("GameUiTools"),
            o = (e("HttpManagerJs"), e("MainManage"));
        e("LoadSceneJs"), e("GameConfig"), e("MyGlobalJS");
        cc.Class({
            extends: cc.Component,
            properties: {
                showInfoT: cc.Label,
                startT: cc.Label
            },
            onLoad: function() {
                this.showInfoT.string = o.gameInfoText, this.startT.string = o.txtStartText, this.node.on("touchend", function(e) {
                    this.node.x = -2e3
                }, this)
            },
            addTouchEvents: function() {
                var e = {
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function(e, t) {
                        return i.loadingScene("MainGameScene"), !0
                    },
                    onTouchMoved: function(e, t) {},
                    onTouchEnded: function(e, t) {}
                };
                cc.eventManager.addListener(e, this.node)
            },
            update: function(e) {}
        }), cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LoadSceneJs: "LoadSceneJs",
        MainManage: "MainManage",
        MyGlobalJS: "MyGlobalJS"
    }]
}, {}, ["AdjustPositionJS", "GameManagerJS", "MonkeyJS", "MyGlobalJS", "PiranhaJS", "PlayGameJS", "ReliveLayerJs", "HttpManagerJs", "LanguageSetJs", "LoadSceneJs", "MainGameJS", "MainManage", "GameConfig", "GameUiTools", "gameOverJs", "linkHttpIconJs", "startGameJs"]);