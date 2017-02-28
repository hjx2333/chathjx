$(function(){
	var prize_control=$("#prize_control");
	var Table=$("#Table");
	var user_all=$("#all");
	var over_exchange=$("#over_exchange");
	var not_exchange=$("#not_exchange");
	var prize_inner=$("#prize_inner");
	var table_inner=$("#table_inner");
	
	prize_control.off("tap");
	prize_control.on("tap", function(){
		user();	
		setTimeout(function(){
			table_inner.scrollTop(0);	
		},200);
	});
	
	user_all.off("tap");
	user_all.on("tap", function(){
		user();	
		setTimeout(function(){
			table_inner.scrollTop(0);	
		},200);
	});
	
	over_exchange.off("tap");
	over_exchange.on("tap", function(){
		user(1);
		setTimeout(function(){
			table_inner.scrollTop(0);	
		},200);	
	});
	
	not_exchange.off("tap");
	not_exchange.on("tap", function(){
		user(2);
		setTimeout(function(){
			table_inner.scrollTop(0);	
		},200);	
	});
	//获取用户信息
	function user(val){
		$.post("/mine/prize_system.php", {"val":val}, function(data){
			console.log(data);
			var len=parseInt(data[1]);
			var str='';
			var info=[];
			var getPrize=[];
			var str_tip ='<tr><td>uid</td><td>微信名</td><td>头像<td>电话</td></tr>';
			var str_tip2 ='<tr><td>pid</td><td>奖品名</td><td>奖品<td>兑换状态</td></tr>';
			for(var j=0;j<len;j++){
				if(data[0][j]['status']==1){
					str+=str_tip;
					str+="<tr><td>"+data[0][j]['uid']+"</td><td>"+data[0][j]['nickname']+"</td><td><img src="+data[0][j]['heading']+"></td><td>"+data[0][j]['phone']+"</td></tr>"+str_tip2+"<tr><td>"+data[0][j]['pid']+"</td><td>"+data[0][j]['prize_name']+"</td><td><img src="+data[0][j]['prize_src']+"></td><td><div class='btn'>已兑换</div></td></tr>";	
				}else {
					str+=str_tip;
					str+="<tr><td>"+data[0][j]['uid']+"</td><td>"+data[0][j]['nickname']+"</td><td><img src="+data[0][j]['heading']+"></td><td>"+data[0][j]['phone']+"</td></tr>"+str_tip2+"<tr><td>"+data[0][j]['pid']+"</td><td>"+data[0][j]['prize_name']+"</td><td><img src="+data[0][j]['prize_src']+"></td><td><div class='btn'>未兑换</div></td></tr>";	
				}			
			}
			Table.html(str);
			prize_inner.css("display", "block");
		},"json");
	}
});