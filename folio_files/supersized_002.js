/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.1
	Site	: www.buildinternet.com/project/supersized
	
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License
	
*/

(function(a){a(document).ready(function(){a("body").append('<div id="supersized-loader"></div><div id="supersized"></div>')});a.supersized=function(b){var c="#supersized",d=this;d.$el=a(c);d.el=c;vars=a.supersized.vars;d.$el.data("supersized",d);api=d.$el.data("supersized");d.init=function(){a.supersized.vars=a.extend(a.supersized.vars,a.supersized.themeVars);a.supersized.vars.options=a.extend({},a.supersized.defaultOptions,a.supersized.themeOptions,b);d.options=a.supersized.vars.options;d._build()};d._build=function(){var f=0,i="",g,e="",h;while(f<=d.options.slides.length-1){switch(d.options.slide_links){case"num":g=f;break;case"name":g=d.options.slides[f].title;break;case"blank":g="";break}if(f==d.options.start_slide-1){if(d.options.slide_links){i=i+'<li class="slide'+f+' current-slide"><a>'+g+"</a></li>"}if(d.options.thumb_links){d.options.slides[f].thumb?h=d.options.slides[f].thumb:h=d.options.slides[f].image;e=e+'<li class="thumb'+f+' current-thumb"><img src="'+h+'"/></li>'}}else{if(d.options.slide_links){i=i+'<li class="slide'+f+'"><a>'+g+"</a></li>"}if(d.options.thumb_links){d.options.slides[f].thumb?h=d.options.slides[f].thumb:h=d.options.slides[f].image;e=e+'<li class="thumb'+f+'"><img src="'+h+'"/></li>'}}f++}if(d.options.slide_links){a(vars.slide_list).html(i)}if(d.options.thumb_links&&vars.thumb_tray.length){a(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace("#","")+'"></ul>');a(vars.thumb_list).html(e)}if(d.options.thumbnail_navigation){vars.current_slide-1<0?prevThumb=d.options.slides.length-1:prevThumb=vars.current_slide-1;a(vars.prev_thumb).show().html(a("<img/>").attr("src",d.options.slides[prevThumb].image));vars.current_slide==d.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;a(vars.next_thumb).show().html(a("<img/>").attr("src",d.options.slides[nextThumb].image))}d._start()};d._start=function(){if(d.options.start_slide){vars.current_slide=d.options.start_slide-1}else{vars.current_slide=Math.floor(Math.random()*d.options.slides.length)}var n=d.options.new_window?' target="_blank"':"";if(d.options.performance==3){d.$el.addClass("speed")}else{if((d.options.performance==1)||(d.options.performance==2)){d.$el.addClass("quality")}}if(d.options.random){arr=d.options.slides;for(var g,e,h=arr.length;h;g=parseInt(Math.random()*h),e=arr[--h],arr[h]=arr[g],arr[g]=e){}d.options.slides=arr}if(d.options.slides.length>1){vars.current_slide-1<0?loadPrev=d.options.slides.length-1:loadPrev=vars.current_slide-1;var m=(d.options.slides[loadPrev].url)?"href='"+d.options.slides[loadPrev].url+"'":"";var l=a('<img src="'+d.options.slides[loadPrev].image+'"/>');l.appendTo(d.el).wrap('<a class="image-loading" '+m+n+"></a>");l.load(function(){a(this).data("origWidth",a(this).width()).data("origHeight",a(this).height());d.resizeNow()})}else{d.options.slideshow=0}m=(api.getField("url"))?"href='"+api.getField("url")+"'":"";var f=a('<img src="'+api.getField("image")+'"/>');f.appendTo(d.el).wrap('<a class="image-loading activeslide" '+m+n+"></a>").css("visibility","hidden");f.load(function(){d._origDim(a(this));d.resizeNow();d.launch();if(typeof theme!="undefined"&&typeof theme._init=="function"){theme._init()}});if(d.options.slides.length>1){vars.current_slide==d.options.slides.length-1?loadNext=0:loadNext=vars.current_slide+1;m=(d.options.slides[loadNext].url)?"href='"+d.options.slides[loadNext].url+"'":"";var k=a('<img src="'+d.options.slides[loadNext].image+'"/>');k.appendTo(d.el).wrap('<a class="image-loading" '+m+n+"></a>");k.load(function(){a(this).data("origWidth",a(this).width()).data("origHeight",a(this).height());d.resizeNow()})}d.$el.css("visibility","hidden");a(".load-item").hide()};d.launch=function(){d.$el.css("visibility","visible");a("#supersized-loader").hide();if(typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"){theme.beforeAnimation("next")}a(".load-item").show();if(d.options.keyboard_nav){a(document.documentElement).keyup(function(e){if(vars.in_animation){return false}if((e.keyCode==37)||(e.keyCode==40)){clearInterval(vars.slideshow_interval);d.prevSlide()}else{if((e.keyCode==39)||(e.keyCode==38)){clearInterval(vars.slideshow_interval);d.nextSlide()}else{if(e.keyCode==32&&!vars.hover_pause){clearInterval(vars.slideshow_interval);d.playToggle()}}}})}if(d.options.slideshow&&d.options.pause_hover){a(d.el).hover(function(){if(vars.in_animation){return false}vars.hover_pause=true;if(!vars.is_paused){vars.hover_pause="resume";d.playToggle()}},function(){if(vars.hover_pause=="resume"){d.playToggle();vars.hover_pause=false}})}if(d.options.slide_links){a("li",vars.slide_list).click(function(){index=a("li",vars.slide_list).index(this);targetSlide=index+1;d.goTo(targetSlide);return false})}if(d.options.thumb_links){a("li",vars.thumb_list).click(function(){index=a("li",vars.thumb_list).index(this);targetSlide=index+1;api.goTo(targetSlide);return false})}if(d.options.slideshow&&d.options.slides.length>1){if(d.options.autoplay&&d.options.slides.length>1){vars.slideshow_interval=setInterval(d.nextSlide,d.options.slide_interval)}else{vars.is_paused=true}a(".load-item img").bind("contextmenu mousedown",function(){return false})}a(window).resize(function(){d.resizeNow()})};d.resizeNow=function(){return d.$el.each(function(){a("img",d.el).each(function(){thisSlide=a(this);var f=(thisSlide.data("origHeight")/thisSlide.data("origWidth")).toFixed(2);var e=d.$el.width(),h=d.$el.height(),i;if(d.options.fit_always){if((h/e)>f){g()}else{j()}}else{if((h<=d.options.min_height)&&(e<=d.options.min_width)){if((h/e)>f){d.options.fit_landscape&&f<1?g(true):j(true)}else{d.options.fit_portrait&&f>=1?j(true):g(true)}}else{if(e<=d.options.min_width){if((h/e)>f){d.options.fit_landscape&&f<1?g(true):j()}else{d.options.fit_portrait&&f>=1?j():g(true)}}else{if(h<=d.options.min_height){if((h/e)>f){d.options.fit_landscape&&f<1?g():j(true)}else{d.options.fit_portrait&&f>=1?j(true):g()}}else{if((h/e)>f){d.options.fit_landscape&&f<1?g():j()}else{d.options.fit_portrait&&f>=1?j():g()}}}}}function g(k){if(k){if(thisSlide.width()<e||thisSlide.width()<d.options.min_width){if(thisSlide.width()*f>=d.options.min_height){thisSlide.width(d.options.min_width);thisSlide.height(thisSlide.width()*f)}else{j()}}}else{if(d.options.min_height>=h&&!d.options.fit_landscape){if(e*f>=d.options.min_height||(e*f>=d.options.min_height&&f<=1)){thisSlide.width(e);thisSlide.height(e*f)}else{if(f>1){thisSlide.height(d.options.min_height);thisSlide.width(thisSlide.height()/f)}else{if(thisSlide.width()<e){thisSlide.width(e);thisSlide.height(thisSlide.width()*f)}}}}else{thisSlide.width(e);thisSlide.height(e*f)}}}function j(k){if(k){if(thisSlide.height()<h){if(thisSlide.height()/f>=d.options.min_width){thisSlide.height(d.options.min_height);thisSlide.width(thisSlide.height()/f)}else{g(true)}}}else{if(d.options.min_width>=e){if(h/f>=d.options.min_width||f>1){thisSlide.height(h);thisSlide.width(h/f)}else{if(f<=1){thisSlide.width(d.options.min_width);thisSlide.height(thisSlide.width()*f)}}}else{thisSlide.height(h);thisSlide.width(h/f)}}}if(thisSlide.parent().hasClass("image-loading")){a(".image-loading").removeClass("image-loading")}if(d.options.horizontal_center){a(this).css("left",(e-a(this).width())/2)}if(d.options.vertical_center){a(this).css("top",(h-a(this).height())/2)}});if(d.options.image_protect){a("img",d.el).bind("contextmenu mousedown",function(){return false})}return false})};d.nextSlide=function(){if(vars.in_animation||!api.options.slideshow){return false}else{vars.in_animation=true}clearInterval(vars.slideshow_interval);var h=d.options.slides,e=d.$el.find(".activeslide");e.removeClass("activeslide");if(e.length==0){e=d.$el.find("a:last")}var g=e.next().length?e.next():d.$el.find("a:first"),i=g.prev().length?g.prev():d.$el.find("a:last");i.addClass("prevslide");vars.current_slide+1==d.options.slides.length?vars.current_slide=0:vars.current_slide++;if(d.options.performance==1){d.$el.removeClass("quality").addClass("speed")}loadSlide=false;var j=d.options.new_window?' target="_blank"':"";vars.current_slide==d.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;imageLink=(d.options.slides[loadSlide].url)?"href='"+d.options.slides[loadSlide].url+"'":"";var f=a('<img src="'+d.options.slides[loadSlide].image+'"/>');f.appendTo(d.el).wrap('<a class="image-loading" '+imageLink+j+"></a>").css("visibility","hidden");f.load(function(){d._origDim(a(this));d.resizeNow()});if(d.options.thumbnail_navigation==1){vars.current_slide-1<0?prevThumb=d.options.slides.length-1:prevThumb=vars.current_slide-1;a(vars.prev_thumb).html(a("<img/>").attr("src",d.options.slides[prevThumb].image));nextThumb=loadSlide;a(vars.next_thumb).html(a("<img/>").attr("src",d.options.slides[nextThumb].image))}e.prev().remove();if(typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"){theme.beforeAnimation("next")}if(d.options.slide_links){a(".current-slide").removeClass("current-slide");a("li",vars.slide_list).eq(vars.current_slide).addClass("current-slide")}g.css("visibility","hidden").addClass("activeslide");switch(d.options.transition){case 0:case"none":g.css("visibility","visible");vars.in_animation=false;break;case 1:case"fade":g.animate({opacity:0},0).css("visibility","visible").animate({opacity:1,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 2:case"slideTop":g.animate({top:-d.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 3:case"slideRight":g.animate({left:d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 4:case"slideBottom":g.animate({top:d.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 5:case"slideLeft":g.animate({left:-d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 6:case"carouselRight":g.animate({left:d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});e.animate({left:-d.$el.width(),avoidTransforms:false},d.options.transition_speed);break;case 7:case"carouselLeft":g.animate({left:-d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});e.animate({left:d.$el.width(),avoidTransforms:false},d.options.transition_speed);break}return false};d.prevSlide=function(){if(vars.in_animation||!api.options.slideshow){return false}else{vars.in_animation=true}clearInterval(vars.slideshow_interval);var h=d.options.slides,e=d.$el.find(".activeslide");e.removeClass("activeslide");if(e.length==0){e=d.$el.find("a:first")}var g=e.prev().length?e.prev():d.$el.find("a:last"),i=g.next().length?g.next():d.$el.find("a:first");i.addClass("prevslide");vars.current_slide==0?vars.current_slide=d.options.slides.length-1:vars.current_slide--;if(d.options.performance==1){d.$el.removeClass("quality").addClass("speed")}loadSlide=false;var j=d.options.new_window?' target="_blank"':"";vars.current_slide-1<0?loadSlide=d.options.slides.length-1:loadSlide=vars.current_slide-1;imageLink=(d.options.slides[loadSlide].url)?"href='"+d.options.slides[loadSlide].url+"'":"";var f=a('<img src="'+d.options.slides[loadSlide].image+'"/>');f.prependTo(d.el).wrap('<a class="image-loading" '+imageLink+j+"></a>").css("visibility","hidden");f.load(function(){d._origDim(a(this));d.resizeNow()});if(d.options.thumbnail_navigation==1){prevThumb=loadSlide;a(vars.prev_thumb).html(a("<img/>").attr("src",d.options.slides[prevThumb].image));vars.current_slide==d.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;a(vars.next_thumb).html(a("<img/>").attr("src",d.options.slides[nextThumb].image))}e.next().remove();if(typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"){theme.beforeAnimation("prev")}if(d.options.slide_links){a(".current-slide").removeClass("current-slide");a("li",vars.slide_list).eq(vars.current_slide).addClass("current-slide")}g.css("visibility","hidden").addClass("activeslide");switch(d.options.transition){case 0:case"none":g.css("visibility","visible");vars.in_animation=false;d.afterAnimation();break;case 1:case"fade":g.animate({opacity:0},0).css("visibility","visible").animate({opacity:1,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 2:case"slideTop":g.animate({top:d.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 3:case"slideRight":g.animate({left:-d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 4:case"slideBottom":g.animate({top:-d.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 5:case"slideLeft":g.animate({left:d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 6:case"carouselRight":g.animate({left:-d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});e.animate({left:0},0).animate({left:d.$el.width(),avoidTransforms:false},d.options.transition_speed);break;case 7:case"carouselLeft":g.animate({left:d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});e.animate({left:0},0).animate({left:-d.$el.width(),avoidTransforms:false},d.options.transition_speed);break}return false};d.playToggle=function(){if(vars.in_animation||!api.options.slideshow){return false}if(vars.is_paused){vars.is_paused=false;if(typeof theme!="undefined"&&typeof theme.playToggle=="function"){theme.playToggle("play")}vars.slideshow_interval=setInterval(d.nextSlide,d.options.slide_interval)}else{vars.is_paused=true;if(typeof theme!="undefined"&&typeof theme.playToggle=="function"){theme.playToggle("pause")}clearInterval(vars.slideshow_interval)}return false};d.goTo=function(f){if(vars.in_animation||!api.options.slideshow){return false}var e=d.options.slides.length;vars.update_images=true;if(f<0){f=e}else{if(f>e){f=1}}f=e-f+1;clearInterval(vars.slideshow_interval);if(typeof theme!="undefined"&&typeof theme.goTo=="function"){theme.goTo()}if(vars.current_slide==e-f){if(!(vars.is_paused)){vars.slideshow_interval=setInterval(d.nextSlide,d.options.slide_interval)}return false}if(e-f>vars.current_slide){vars.current_slide=e-f-1;d._placeSlide("next")}else{if(e-f<vars.current_slide){vars.current_slide=e-f+1;d._placeSlide("prev")}}if(d.options.slide_links){a(".current-slide",vars.slide_list).removeClass("current-slide");a("li",vars.slide_list).eq((e-f)).addClass("current-slide")}if(d.options.thumb_links){a(".current-thumb",vars.thumb_list).removeClass("current-thumb");a("li",vars.thumb_list).eq((e-f)).addClass("current-thumb")}};d._placeSlide=function(e){var g=d.options.new_window?' target="_blank"':"";if(e=="next"){a(".activeslide").next().remove();loadSlide=false;vars.current_slide==d.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;imageLink=(d.options.slides[loadSlide].url)?"href='"+d.options.slides[loadSlide].url+"'":"";var f=a('<img src="'+d.options.slides[loadSlide].image+'"/>');f.appendTo(d.el).wrap('<a class="image-loading" '+imageLink+g+"></a>").css("visibility","hidden");if(vars.update_images){d.nextSlide()}f.load(function(){d._origDim(a(this));d.resizeNow()})}else{if(e=="prev"){a(".activeslide").prev().remove();loadSlide=false;vars.current_slide-1<0?loadSlide=d.options.slides.length-1:loadSlide=vars.current_slide-1;imageLink=(d.options.slides[loadSlide].url)?"href='"+d.options.slides[loadSlide].url+"'":"";var f=a('<img src="'+d.options.slides[loadSlide].image+'"/>');f.prependTo(d.el).wrap('<a class="image-loading" '+imageLink+g+"></a>").css("visibility","hidden");if(vars.update_images){d.prevSlide()}f.load(function(){d._origDim(a(this));d.resizeNow()})}}};d._origDim=function(e){e.data("origWidth",e.width()).data("origHeight",e.height()).css("visibility","visible")};d.afterAnimation=function(){if(d.options.performance==1){d.$el.removeClass("speed").addClass("quality")}if(vars.update_images){vars.update_images=false;d._placeSlide("next");d._placeSlide("prev")}vars.in_animation=false;if(!vars.is_paused&&d.options.slideshow){vars.slideshow_interval=setInterval(d.nextSlide,d.options.slide_interval);if(d.options.stop_loop&&vars.current_slide==d.options.slides.length-1){d.playToggle()}}if(typeof theme!="undefined"&&typeof theme.afterAnimation=="function"){theme.afterAnimation()}return false};d.getField=function(e){return d.options.slides[vars.current_slide][e]};d.init()};a.supersized.vars={thumb_tray:"#thumb-tray",thumb_list:"#thumb-list",current_slide:0,in_animation:false,is_paused:false,hover_pause:false,slideshow_interval:false,update_images:false,options:{}};a.supersized.defaultOptions={slideshow:1,autoplay:1,start_slide:1,stop_loop:0,random:0,slide_interval:5000,transition:1,transition_speed:750,new_window:1,pause_hover:0,keyboard_nav:1,performance:1,image_protect:1,fit_always:0,fit_landscape:0,fit_portrait:1,min_width:0,min_height:0,horizontal_center:1,vertical_center:1,slide_links:1,thumb_links:1,thumbnail_navigation:0};a.fn.supersized=function(b){return this.each(function(){(new a.supersized(b))})}})(jQuery);