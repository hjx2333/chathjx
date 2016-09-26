$(function(){
    $("#fullpage").fullpage({
    	"verticalCentered": false,
		    "css3": true,
		    "sectionsColor": ["#4CB2B7", "#336699", "#695684"],
		     anchors: ["page1", "page2", "page3"],
		    "navigation": true,
		    "navigationPosition": "right",
		    "navigationTooltips": ["首页", "专业技能", "感谢"],
		    afterLoad: function(anchorLink, index){
		    	if(index==1){
		          	$(".myself").fadeIn(3000);
		        }
		        else if(index==2){
		    		$(".skill").fadeIn(3000);
		    		$(".firstSkill").addClass("a");		
		        }
		        else {
		    		$(".end").fadeIn(3000);		          		
		        }
		    }
    });
    
});