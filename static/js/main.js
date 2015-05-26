// require.config({
//     paths: {
//         "jquery": "jquery-2.1.3.min",
//         "velocity": "velocity.min"
//     },
//     shim: {
//         "velocity": {
//             deps: [ "jquery" ]
//         }
//     }
// });
// require([ "jquery", "velocity"], function ($, Velocity) {
// });


function addUserNode(i, item) {
    console.log(i);
    $(".roundusers").append("<div userid='test' class='avatar' style='background-image:url(../static/images/" + item.avatar + ")'><div class='onlinestatus'></div></div>");
}
function bindplayer() {
    $(".roundusers .avatar").bind("click", function () {
        $('.midstage_a').css('display', 'none');
        $('.midstage_b').css('visibility', 'visible');
        //$(".player_list").mCustomScrollbar({theme:"minimal"});
    });
    $('.music_logo').bind("click", function () {
        $('.midstage_b').css('visibility', 'hidden');
        $('.midstage_a').css('display', 'inline');
        return false;
    });
}
function addRadarAnimation() {
    $(".radar").velocity({scale: 2.5, opacity: 0.2}, {duration: 1000}).velocity({scale: 0.5, opacity: 1}, 0);
    $(".radar").velocity({scale: 2.5, opacity: 0.2}, {duration: 1000}).velocity({scale: 0.5, opacity: 1}, 0);
    $(".radar").velocity({scale: 2.5, opacity: 0.2}, {duration: 1000}).velocity({scale: 0.5, opacity: 1}, 0);
}
function addAnimation() {
    var roundusers = $(".roundusers").children(), cur = $(".roundusers"), len = roundusers.length, n = len, r = 200;
    // You can use 'for()' and [cur.eq(i) or roundusers[i]]
    console.log('len', roundusers);
     var deg1 =360 / len * Math.PI / 180;
    roundusers.each(function (i, item) {
        //在最后一个调用function回调函数
        if (i < (len - 1)) {
            $(this).velocity({
                translateX: (r * Math.cos(i * deg1)).toFixed(2),
                translateY: (r * Math.sin(i * deg1)).toFixed(2)
            }, {delay: (i) * 200, easing: [0.175, 0.885, 0.32, 1.275]});
        }
        else
            $(this).velocity({
                translateX: (r * Math.cos(i * deg1)).toFixed(2),
                translateY: (r * Math.sin(i * deg1)).toFixed(2)
            }, {
                delay: (i) * 200, easing: [0.175, 0.885, 0.32, 1.275], complete: function (item) {
                    addRadarAnimation();
                }
            });
    });
}
function addAnimation_min() {
    var roundusers = $(".roundusers").children().slice(0, 3), cur = $(".roundusers"), len = roundusers.length - 1, n = len, r = 200;
    // You can use 'for()' and [cur.eq(i) or roundusers[i]]
    console.log('len', roundusers);
    var deg1 = 180 / len * Math.PI / 180;
    $('.roundusers').css('bottom', '0px');
    roundusers.each(function (i, item) {
        //在最后一个调用function回调函数
        if (i == 0) {
            $(this).velocity({translateX: (screen_width / 2 - 40), translateY: (r).toFixed(2)}, {
                delay: (i) * 200,
                easing: [0.175, 0.885, 0.32, 1.275]
            });
        }
        else if (i == 1) {
            $(this).velocity({translateX: 0, translateY: (r).toFixed(2)}, {
                delay: (i) * 200,
                easing: [0.175, 0.885, 0.32, 1.275]
            });
        }
        else
            $(this).velocity({translateX: -(screen_width / 2 - 40), translateY: (r).toFixed(2)}, {
                delay: (i) * 200, easing: [0.175, 0.885, 0.32, 1.275], complete: function (item) {
                    addRadarAnimation();
                }
            });
    });
}
function getRounds() {
    $(".avatar").velocity("stop");
    $(".radar").velocity("stop");
    $.getJSON("./round", function (data) {
        // $.getJSON("http://localhost:8001/round",function(data){
        $(".roundusers").html("");
        $.each(data, function (i, item) {
            addUserNode(i, item);
        });
        bindplayer();
        if (screen_width > 500) {
            addAnimation();
        }
        else {
            addAnimation_min();
        }
    })
}
