$(function(){module("tooltip"),test("should provide no conflict",function(){var t=$.fn.tooltip.noConflict();ok(!$.fn.tooltip,"tooltip was set back to undefined (org value)"),$.fn.tooltip=t}),test("should be defined on jquery object",function(){var t=$("<div></div>");ok(t.tooltip,"popover method is defined")}),test("should return element",function(){var t=$("<div></div>");ok(t.tooltip()==t,"document.body returned")}),test("should expose default settings",function(){ok(!!$.fn.tooltip.Constructor.DEFAULTS,"defaults is defined")}),test("should empty title attribute",function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').tooltip();ok(""===t.attr("title"),"title attribute was emptied")}),test("should add data attribute for referencing original title",function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').tooltip();equal(t.attr("data-original-title"),"Another tooltip","original title preserved in data attribute")}),test("should place tooltips relative to placement option",function(){$.support.transition=!1;var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({placement:"bottom"}).tooltip("show");ok($(".tooltip").is(".fade.bottom.in"),"has correct classes applied"),t.tooltip("hide")}),test("should allow html entities",function(){$.support.transition=!1;var t=$('<a href="#" rel="tooltip" title="<b>@fat</b>"></a>').appendTo("#qunit-fixture").tooltip({html:!0}).tooltip("show");ok($(".tooltip b").length,"b tag was inserted"),t.tooltip("hide"),ok(!$(".tooltip").length,"tooltip removed")}),test("should respect custom classes",function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({template:'<div class="tooltip some-class"><div class="tooltip-arrow"/><div class="tooltip-inner"/></div>'}).tooltip("show");ok($(".tooltip").hasClass("some-class"),"custom class is present"),t.tooltip("hide"),ok(!$(".tooltip").length,"tooltip removed")}),test("should fire show event",function(){stop();$('<div title="tooltip title"></div>').on("show.bs.tooltip",function(){ok(!0,"show was called"),start()}).tooltip("show")}),test("should fire shown event",function(){stop();$('<div title="tooltip title"></div>').on("shown.bs.tooltip",function(){ok(!0,"shown was called"),start()}).tooltip("show")}),test("should not fire shown event when default prevented",function(){stop();$('<div title="tooltip title"></div>').on("show.bs.tooltip",function(t){t.preventDefault(),ok(!0,"show was called"),start()}).on("shown.bs.tooltip",function(){ok(!1,"shown was called")}).tooltip("show")}),test("should fire hide event",function(){stop();$('<div title="tooltip title"></div>').on("shown.bs.tooltip",function(){$(this).tooltip("hide")}).on("hide.bs.tooltip",function(){ok(!0,"hide was called"),start()}).tooltip("show")}),test("should fire hidden event",function(){stop();$('<div title="tooltip title"></div>').on("shown.bs.tooltip",function(){$(this).tooltip("hide")}).on("hidden.bs.tooltip",function(){ok(!0,"hidden was called"),start()}).tooltip("show")}),test("should not fire hidden event when default prevented",function(){stop();$('<div title="tooltip title"></div>').on("shown.bs.tooltip",function(){$(this).tooltip("hide")}).on("hide.bs.tooltip",function(t){t.preventDefault(),ok(!0,"hide was called"),start()}).on("hidden.bs.tooltip",function(){ok(!1,"hidden was called")}).tooltip("show")}),test("should not show tooltip if leave event occurs before delay expires",function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:200});stop(),t.trigger("mouseenter"),setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in"),t.trigger("mouseout"),setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in"),start()},200)},100)}),test("should not show tooltip if leave event occurs before delay expires, even if hide delay is 0",function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:{show:200,hide:0}});stop(),t.trigger("mouseenter"),setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in"),t.trigger("mouseout"),setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in"),start()},200)},100)}),test("should wait 200 ms before hiding the tooltip",3,function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:{show:0,hide:200}});stop(),t.trigger("mouseenter"),setTimeout(function(){ok($(".tooltip").is(".fade.in"),"tooltip is faded in"),t.trigger("mouseout"),setTimeout(function(){ok($(".tooltip").is(".fade.in"),"100ms:tooltip is still faded in"),setTimeout(function(){ok(!$(".tooltip").is(".in"),"tooltip removed"),start()},150)},100)},1)}),test("should not hide tooltip if leave event occurs, then tooltip is show immediately again",function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:{show:0,hide:200}});stop(),t.trigger("mouseenter"),setTimeout(function(){ok($(".tooltip").is(".fade.in"),"tooltip is faded in"),t.trigger("mouseout"),setTimeout(function(){ok($(".tooltip").is(".fade.in"),"100ms:tooltip is still faded in"),t.trigger("mouseenter"),setTimeout(function(){ok($(".tooltip").is(".in"),"tooltip removed"),start()},150)},100)},1)}),test("should not show tooltip if leave event occurs before delay expires",function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:100});stop(),t.trigger("mouseenter"),setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in"),t.trigger("mouseout"),setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in"),start()},100)},50)}),test("should show tooltip if leave event hasn't occured before delay expires",function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({delay:150});stop(),t.trigger("mouseenter"),setTimeout(function(){ok(!$(".tooltip").is(".fade.in"),"tooltip is not faded in")},100),setTimeout(function(){ok($(".tooltip").is(".fade.in"),"tooltip has faded in"),start()},200)}),test("should destroy tooltip",function(){var t=$("<div/>").tooltip().on("click.foo",function(){});ok(t.data("bs.tooltip"),"tooltip has data"),ok($._data(t[0],"events").mouseover&&$._data(t[0],"events").mouseout,"tooltip has hover event"),ok("foo"==$._data(t[0],"events").click[0].namespace,"tooltip has extra click.foo event"),t.tooltip("show"),t.tooltip("destroy"),ok(!t.hasClass("in"),"tooltip is hidden"),ok(!$._data(t[0],"bs.tooltip"),"tooltip does not have data"),ok("foo"==$._data(t[0],"events").click[0].namespace,"tooltip still has click.foo"),ok(!$._data(t[0],"events").mouseover&&!$._data(t[0],"events").mouseout,"tooltip does not have any events")}),test("should show tooltip with delegate selector on click",function(){var t=$('<div><a href="#" rel="tooltip" title="Another tooltip"></a></div>');t.appendTo("#qunit-fixture").tooltip({selector:"a[rel=tooltip]",trigger:"click"});t.find("a").trigger("click"),ok($(".tooltip").is(".fade.in"),"tooltip is faded in")}),test("should show tooltip when toggle is called",function(){$('<a href="#" rel="tooltip" title="tooltip on toggle"></a>').appendTo("#qunit-fixture").tooltip({trigger:"manual"}).tooltip("toggle");ok($(".tooltip").is(".fade.in"),"tooltip should be toggled in")}),test("should place tooltips inside the body",function(){var t=$('<a href="#" rel="tooltip" title="Another tooltip"></a>').appendTo("#qunit-fixture").tooltip({container:"body"}).tooltip("show");ok($("body > .tooltip").length,"inside the body"),ok(!$("#qunit-fixture > .tooltip").length,"not found in parent"),t.tooltip("hide")}),test("should place tooltip inside window",function(){var t=$("<div />").appendTo("body").css({position:"absolute",width:200,height:200,bottom:0,left:0});$("<a href='#' title='Very very very very very very very very long tooltip'>Hover me</a>").css({position:"absolute",top:0,left:0}).appendTo(t).tooltip({placement:"top",animate:!1}).tooltip("show");stop(),setTimeout(function(){ok($(".tooltip").offset().left>=0),start(),t.remove()},100)}),test("should place tooltip on top of element",function(){var t=$("<div />").appendTo("body").css({position:"absolute",bottom:0,left:0,textAlign:"right",width:300,height:300}),o=$("<p style='margin-top:200px' />").appendTo(t),i=$("<a href='#' title='very very very very very very very long tooltip'>Hover me</a>").css({marginTop:200}).appendTo(o).tooltip({placement:"top",animate:!1}).tooltip("show");stop(),setTimeout(function(){var o=t.find(".tooltip");start(),ok(o.offset().top+o.outerHeight()<=i.offset().top),t.remove()},100)}),test("should add position class before positioning so that position-specific styles are taken into account",function(){$("head").append("<style> .tooltip.right { white-space: nowrap; } .tooltip.right .tooltip-inner { max-width: none; } </style>");var t=$("<div />").appendTo("body"),o=$('<a href="#" rel="tooltip" title="very very very very very very very very long tooltip in one line"></a>').appendTo(t).tooltip({placement:"right"}).tooltip("show"),i=t.find(".tooltip");ok(Math.round(o.offset().top+o[0].offsetHeight/2-i[0].offsetHeight/2)===Math.round(i.offset().top)),o.tooltip("hide")}),test("tooltip title test #1",function(){var t=$('<a href="#" rel="tooltip" title="Simple tooltip" style="display: inline-block; position: absolute; top: 0; left: 0;"></a>').appendTo("#qunit-fixture").tooltip({}).tooltip("show");equal($(".tooltip").children(".tooltip-inner").text(),"Simple tooltip","title from title attribute is set"),t.tooltip("hide"),ok(!$(".tooltip").length,"tooltip removed")}),test("tooltip title test #2",function(){var t=$('<a href="#" rel="tooltip" title="Simple tooltip" style="display: inline-block; position: absolute; top: 0; left: 0;"></a>').appendTo("#qunit-fixture").tooltip({title:"This is a tooltip with some content"}).tooltip("show");equal($(".tooltip").children(".tooltip-inner").text(),"Simple tooltip","title is set from title attribute while prefered over title option"),t.tooltip("hide"),ok(!$(".tooltip").length,"tooltip removed")}),test("tooltip title test #3",function(){var t=$('<a href="#" rel="tooltip" style="display: inline-block; position: absolute; top: 0; left: 0;"></a>').appendTo("#qunit-fixture").tooltip({title:"This is a tooltip with some content"}).tooltip("show");equal($(".tooltip").children(".tooltip-inner").text(),"This is a tooltip with some content","title from title option is set"),t.tooltip("hide"),ok(!$(".tooltip").length,"tooltip removed")}),test("tooltips should be placed dynamically, with the dynamic placement option",function(){$.support.transition=!1;var t=$('<div id="dynamic-tt-test"/>').css({height:400,overflow:"hidden",position:"absolute",top:0,left:0,width:600}).appendTo("body"),o=$('<div style="display: inline-block; position: absolute; left: 0; top: 0;" rel="tooltip" title="Top tooltip">Top Dynamic Tooltip</div>').appendTo("#dynamic-tt-test").tooltip({placement:"auto"}).tooltip("show");ok($(".tooltip").is(".bottom"),"top positioned tooltip is dynamically positioned bottom"),o.tooltip("hide");var i=$('<div style="display: inline-block; position: absolute; right: 0;" rel="tooltip" title="Right tooltip">Right Dynamic Tooltip</div>').appendTo("#dynamic-tt-test").tooltip({placement:"right auto"}).tooltip("show");ok($(".tooltip").is(".left"),"right positioned tooltip is dynamically positioned left"),i.tooltip("hide");var e=$('<div style="display: inline-block; position: absolute; bottom: 0;" rel="tooltip" title="Bottom tooltip">Bottom Dynamic Tooltip</div>').appendTo("#dynamic-tt-test").tooltip({placement:"auto bottom"}).tooltip("show");ok($(".tooltip").is(".top"),"bottom positioned tooltip is dynamically positioned top"),e.tooltip("hide");var l=$('<div style="display: inline-block; position: absolute; left: 0;" rel="tooltip" title="Left tooltip">Left Dynamic Tooltip</div>').appendTo("#dynamic-tt-test").tooltip({placement:"auto left"}).tooltip("show");ok($(".tooltip").is(".right"),"left positioned tooltip is dynamically positioned right"),l.tooltip("hide"),t.remove()})});