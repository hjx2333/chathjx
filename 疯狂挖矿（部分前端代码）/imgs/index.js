var chatuid=null;
var gamename=null;
var heading=null;

$(function(){
	//产矿、收矿动画变量
	var machine=$("#machine");
	var fire=$("#fire");
	var car=$("#car");
	var carFire=$("#carFire");
	var carControl=$("#carControl");
	var light=$("#light");
	var base=$("#base");
	var control=$("#control");
	var getGem=$("#getGem");
	var minGem=$(".minGem");
	var men=$("#men");
	var productNum=$("#productNum");
	//导航
	var li1=$("#nav>li:eq(1)");
	var li2=$("#nav>li:eq(2)");
	var li3=$("#nav>li:eq(3)");
	var li4=$("#nav>li:eq(4)");
	var top=$("#top");
	var lose=$("#lose");
	var closeWin=$(".close");
	var steal=$('#steal');
	var count=$("#count");
	var prize=$("#prize");
	var countNum=0;
	var productCount=0;
	//挖矿王
	var topTable=$("#topTable");
	var topFirst=$("#topFirst");
	var topLast=$("#topLast");
	var topPrev=$("#topPrev");
	var topNext=$("#topNext");
	var topTitle=$("#top>h3");
	var top_inner=$(".top_inner");
	var stealTable=$("#stealTable");
	var loseTable=$("#loseTable");
	var div_scroll=null;
	var scroll_text='';
	//蹭矿去
	var stealFirst=$("#stealFirst");
	var stealLast=$("#stealLast");
	var stealPrev=$("#stealPrev");
	var stealNext=$("#stealNext");
	var steal_inner=$("#steal_inner");
	var stealTitle=$("#steal>h3");
	var steal_scroll=null;
	//谁蹭我
	var lose_inner=$("#lose_inner");
	var loseFirst=$("#loseFirst");
	var loseLast=$("#loseLast");
	var losePrev=$("#losePrev");
	var loseNext=$("#loseNext");
	var loseTitle=$("#lose>h3");
	var backBtn=$("#back");
	//奖品
	var prizeTable=$("#prizeTable");
	var prize_inner=$("#prize_inner");
	var prizeFirst=$("#prizeFirst");
	var prizeLast=$("#prizeLast");
	var prizePrev=$("#prizePrev");
	var prizeNext=$("#prizeNext");
	var prize_scroll=null;
	var prize_ask=$("#prize_ask");
	var prizeS=$("#prizeS");
	var prizeC=$("#prizeC");
	var prizeIntr=$("#prizeIntr");
	var prizeGem=$("#prizeGem");
	var prize_surplus=$("#prize_surplus");
	var pid=null;
	//蹭矿动画变量
	var stealActiveDiv=$("#stealActive>div");
	var stealActiveh2=$("#stealActive>h2");
	var msgs=$("#msgs");
	var dialog=$("#dialog");
	//当前页码，页数
	var steal_pagerLen=0;
	var steal_nowPager=1;
	var top_pagerLen=0;
	var top_nowPager=1;
	var lose_pagerLen=0;
	var lose_nowPager=1;
	var prize_pagerLen=0;
	var prize_nowPager=1;
	//按钮
	var btnC=$("#btn-cancel");
	var btnS=$("#btn-success");
	//基地升级
	var tip=$("#tip");
	var nowLevel=$("#nowLevel");
	var nextLevel=$("#nextLevel");
	var updateGem=$("#updateGem");
	var updateMa=$("#updateMa");
	var gemNum=$("#gemNum");
	var setGem=$("#setGem");
	var updateBase=$("#updateBase");
	var base_inner=$("#base_inner");
	var baseLevel=$("#baseLevel>img");
	//等级
	var userLevel=1;
	var maLevel=1;
	var updateWhich=null;
	var uid=null;
	var nowUid=null;
	//生产速度
	var proSpeed=0;
	//基地宝石容量
	var capacity=0;
	//基地升级费用
	var userCost=0;
	//机器升级费用
	var maCost=0;
	var loseSum=0;
	//获奖信息
	var prize_info=$("#prize_info");
	var maImg=machine.find("img");
	var steal_fail=$("#steal_fail");
	//定时器
	var time1=null;
	var time2=null;
	var time3=null;
	var timeCar=[];
	var timeFire=[];
	var address=[".4rem, 1.3rem, 0", ".8rem, 1.4rem, 0", "1.3rem, 1.5rem, 0", "1.9rem, 1.5rem, 0","2.4rem, 1.4rem, 0", ".8rem, 0.8rem, 0", "1.4rem, 0.9rem, 0","2rem, .9rem, 0","1.2rem, .4rem, 0","1.7rem, .4rem, 0"];
	var stealActive=$("#stealActive");
	//排行榜加载状态
	var refresh_status=0;
	var active={
			firstFire : function(){
					setTimeout(function(){
						machine.toggleClass("machineMove");					
					},500);
					setTimeout(function(){
						fire.toggleClass("fireIn");	
					},1000);				
				},
			secondFire : function(){
					setTimeout(function(){
						machine.css("transform", "translate3d(0,0,0)");	
						fire.toggleClass("fireIn");
						machine.toggleClass("machineMove");	
					},5000);			
				},
			carFirst : function (){
					//采石车第一步
					carFire.toggleClass("carFire2");	
					car.css("backgroundPosition", "0 0");
					timeCar[0]=setTimeout(function(){
						car.css("transform", "rotateY(-180deg)");
						carControl.css("transform", "translate3d(-3.4rem, -3.4rem, 0)");
						timeFire[0]=setTimeout(function(){
							carFire.css("display", "block");					
						},3000);
					},300);
					//采石车第二步
					timeCar[1]=setTimeout(function(){
						carFire.css("display", "none");	
						car.css("transform", "rotateY(0deg)");
						carControl.css("transform", "translate3d(0, -5rem, 0)");
						timeFire[1]=setTimeout(function(){
							carFire.css("display", "block");					
						},3000);
					},6300);
					//采石车第三步
					timeCar[2]=setTimeout(function(){
						carFire.css("display", "none");	
						car.css("transform", "rotateY(0deg)");
						carControl.css("transform", "translate3d(3rem, -8rem, 0)");
						timeFire[2]=setTimeout(function(){
							carFire.css("display", "block");					
						},3000);
					},12300);
					//采石车第四步
					timeCar[3]=setTimeout(function(){
						carFire.css("display", "none");	
						car.css("transform", "rotateY(180deg)");
						carControl.css("transform", "translate3d(1rem, -9rem, 0)");
						timeFire[3]=setTimeout(function(){
							carFire.css("display", "block");					
						},3000);
					},18300);
				},
			carSecond : function (){			
					timeCar[4]=setTimeout(function(){
						carFire.toggleClass("carFire2");
						carFire.css("display", "none");	
						car.css("backgroundPosition", "0 -3.2rem");
						car.css("transform", "rotateY(180deg)");
						carControl.css("transform", "translate3d(3rem, -8rem, 0)");
						timeFire[4]=setTimeout(function(){
							carFire.css("display", "block");					
						},3000);
					},24300);				
					timeCar[5]=setTimeout(function(){
						carFire.css("display", "none");	
						car.css("transform", "rotateY(0deg)");
						carControl.css("transform", "translate3d(0, -5rem, 0)");
						timeFire[5]=setTimeout(function(){
							carFire.css("display", "block");					
						},3000);
					},30300);			
					timeCar[6]=setTimeout(function(){
						carFire.css("display", "none");	
						car.css("transform", "rotateY(0deg)");
						carControl.css("transform", "translate3d(-3.4rem, -3.4rem, 0)");
						timeFire[6]=setTimeout(function(){
							carFire.css("display", "block");					
						},3000);
					},36300);	
					timeCar[7]=setTimeout(function(){
						carFire.css("display", "none");	
						car.css("transform", "rotateY(180deg)");
						carControl.css("transform", "translate3d(0, 0, 0)");
					},42300);
					timeCar[8]=setTimeout(function(){
						car.css("transform", "rotateY(0deg)");
					},45600);
				},
			lightControl : function(){
				light.toggleClass("lightIn");
			},
			//宝石生产
			product : function(){
				if(minGem.css("visibility")=="hidden"){
					var timeStart=0;
					getGem.css("display", "block");
					men.css("display", "block");
					minGem.css("transition", "all 200ms ease-out");
					minGem.css("visibility", "visible");
					for(var i=0;i<minGem.length;i++){
						gemGo(i,"translate3d("+address[i]+")",timeStart);	
						timeStart=timeStart+100;
					}					
					setTimeout(function(){
						men.css("display", "none");
						productNum.css("display", "block");
						getGem.attr("value", 0);
						minGem.css("transition", "all 1s ease-out");
					},1100);
				}
				if(loseSum){
					productCount=loseSum;
					productNum.text(productCount);
				}else {
					if(productCount < capacity){
						productCount+=10*proSpeed;	
					}else {
						productCount=capacity;		
					}
					productNum.text(productCount);
				}
			},
			//挖矿王排行榜
			topRanking : function(data){
				refresh_status=0;
				//每页长度
				var len=data[0].length;
				var str='';
				//页数
				top_pagerLen=Math.ceil(data[2]/10);
				var arr=[];
				for(var i=0;i<len;i++){
					arr[i]='u'+data[0][i]['uid'];
				}
				for(var j=0;j<len;j++){
					if(!data[1][arr[j]]['heading']){
						data[1][arr[j]]['heading']="imgs/heading.png";	
					}
					if(!data[1][arr[j]]['gamename']){
						data[1][arr[j]]['gamename']='';
					}
					if(data[0][j]["uid"]==nowUid){
						data[0][j]["uid"] = 'now';	
						str+='<tr><td><img src='+data[1][arr[j]]['heading']+'></td><td>'+data[1][arr[j]]['gamename']+'<br><span>宝石总量:'+data[0][j]['hisSum']+'</span></td></tr>';	
					}else {
						str+='<tr data-uid='+data[0][j]["uid"]+'><td><img src='+data[1][arr[j]]['heading']+'></td><td>'+data[1][arr[j]]['gamename']+'<br><span>宝石总量:'+data[0][j]['hisSum']+'</span></td></tr>';
					}					
				}	
				if(top_nowPager==1){
					scroll_text='<div id="div_scroll">继续滑动刷新</div>';
					if(top_pagerLen>1){
						topTable.html(str+scroll_text);	
						div_scroll=$("#div_scroll");
					}else {
						topTable.html(str);
					}
					refresh_status=1;
					//top_inner.scrollTop(0);
				}else {
					//设置缓冲时间，使滑动刷新时记录不会向上移
					setTimeout(function(){
						top.find(div_scroll).remove();	
						if(top_nowPager==top_pagerLen){
							scroll_text='<div id="div_scroll">已到最后</div>';
						}
						topTable.html(topTable.html()+str+scroll_text);
						div_scroll=$("#div_scroll");
						refresh_status=1;
					},200);
				} 
				setTimeout(function(){
					if(top_pagerLen>1){
						tuodong2(top_nowPager,topTable,top_inner,top_pagerLen,0);
					}
					var topTr=$("#topTable>tr[data-uid]");
					topTr.off("tap");
					topTr.on("tap", function(){
						top.css("transform","translateY(-28rem)");
						setTimeout(function(){
							backBtn.css("display", "block");		
						},500);
						active.unmain();
						active.userInfo($(this).attr("data-uid"));
						active.unbinding();
					});		
				},200);	
			},
			//谁蹭我排行榜
			loseRanking : function(data){
				refresh_status=0;
				if(data[0]){
					var len=data[0].length;		
					if(len>0){
						var str='';
						lose_pagerLen=Math.ceil(data[3]/10);
						var arr=[];
						for(var i=0;i<len;i++){
							arr[i]='u'+data[0][i];
						}
						var arrInfo=[];
						for(var x=0;x<len;x++){
							arrInfo[x]='u'+x+data[0][x];
						}
						for(var j=0;j<len;j++){
							if(!data[2][arr[j]]['heading']){
								data[2][arr[j]]['heading']="imgs/heading.png";	
							}
							if(!data[2][arr[j]]['gamename']){
								data[2][arr[j]]['gamename']='';
							}
							str+='<tr data-uid='+data[0][j]+'><td><img src='+data[2][arr[j]]['heading']+'></td><td>'+data[2][arr[j]]['gamename']+'<br><span>已蹭:'+data[1][arrInfo[j]][2]+'</span></td><td>'+data[1][arrInfo[j]][1]+'</td></tr>';	
						}
						if(lose_nowPager==1){
							scroll_text='<div id="div_scroll">继续滑动刷新</div>';
							if(lose_pagerLen>1){
								loseTable.html(str+scroll_text);	
								div_scroll=$("#div_scroll");
							}else {
								loseTable.html(str);
							}
							refresh_status=1;
						}else {
							setTimeout(function(){
								lose.find(div_scroll).remove();
								if(lose_nowPager==lose_pagerLen){
									scroll_text='<div id="div_scroll">已到最后</div>';
								}
								loseTable.html(loseTable.html()+str+scroll_text);
								div_scroll=$("#div_scroll");
								refresh_status=1;
							},200);
						} 
						setTimeout(function(){
							if(lose_pagerLen>1){
								tuodong2(lose_nowPager,loseTable,lose_inner,lose_pagerLen,1);
							}
							var loseTr=$("#loseTable>tr");
						},200);
						}		
				}else {
					loseTable.html('<h2>无记录</h2>');	
				}
			},
			//蹭矿去排行榜
			stealRanking : function(data){
				refresh_status=0;
				var str='';
				if(!data[5]){
					var len=data[0].length;
					var stealuid=0;
					var text='蹭矿去';
					var val=0;
					//判断是否有矿可蹭
					if(len>0){
						steal_pagerLen=Math.ceil(data[3]/10);
						var arrUser=[];
						var arrGem=[];
						for(var i=0;i<len;i++){
							arrUser[i]='u'+data[0][i]['uid'];
							arrGem[i]='u'+data[0][i]['uid'];
						}
						//判断是否存在已蹭的用户
						if(data[4]){
							for(var j=0;j<len;j++){
								for(var x=0;x<data[4].length;x++){
									if(data[4][x] == data[0][j]['uid']){
										text = '已蹭';
										val=1;
										break;
									}else {
										text = '蹭矿去';
										val=0;
										continue;
									}
								}
								if(!data[1][arrUser[j]]['heading']){
									data[1][arrUser[j]]['heading']="imgs/heading.png";	
								}
								if(!data[1][arrUser[j]]['gamename']){
									data[1][arrUser[j]]['gamename']='';
								}
								str+='<tr value='+val+' data-uid='+data[0][j]["uid"]+'><td><img src='+data[1][arrUser[j]]['heading']+'></td><td>'+data[1][arrUser[j]]['gamename']+'<br><span>可蹭总量:'+data[2][arrGem[j]]['time']+'</span></td><td><div class="btn">'+text+'</div></td></tr>';
							}
						}else {
							for(var z=0;z<len;z++){
								if(!data[1][arrUser[z]]['heading']){
									data[1][arrUser[z]]['heading']="imgs/heading.png";	
								}
								str+='<tr value='+val+' data-uid='+data[0][z]["uid"]+'><td><img src='+data[1][arrUser[z]]['heading']+'></td><td>'+data[1][arrUser[z]]['gamename']+'<br><span>可蹭总量:'+data[2][arrGem[z]]['time']+'</span></td><td><div class="btn">'+text+'</div></td></tr>';
							}
						}
						if(steal_nowPager==1){
							//steal_inner.scrollTop(0);
							scroll_text='<div id="div_scroll"><div>继续滑动刷新</div></div>';
							if(steal_pagerLen>1){
								stealTable.html(str+scroll_text);	
								div_scroll=$("#div_scroll");
							}else {
								stealTable.html(str);
							}
							refresh_status=1;
						}else {
							setTimeout(function(){
								steal.find(div_scroll).remove();
								if(steal_nowPager==steal_pagerLen){
									scroll_text='<div id="div_scroll">已到最后</div>';
								}
								stealTable.html(stealTable.html()+str+scroll_text);
								div_scroll=$("#div_scroll");
								refresh_status=1;
							},200);
						} 
						setTimeout(function(){
							if(steal_pagerLen>1){
								tuodong2(steal_nowPager,stealTable,steal_inner,steal_pagerLen,2);
							}
							active.steal_Action();
						},200);
					}else {
						stealTable.html('<h2>无记录</h2>');	
					}
				}else {
					stealTable.html('<h2>'+data[5]+'</h2>');	
				}
			},
			//奖品
			prizeRanking : function(data){
				refresh_status=0;
				var len=data[0].length;
				var str='';
				prize_pagerLen=Math.ceil(data[1]/10);
				var src_arr=[];
				var gem_arr=[];
				var name_arr=[];
				var pid_arr=[];
				var text="兑换";
				var val=0;
				for(var i=0;i<len;i++){
					src_arr[i]=data[0][i]['prizeSrc'];	
					name_arr[i]=data[0][i]['name'];
					gem_arr[i]=data[0][i]['gemNum'];	
					pid_arr[i]=data[0][i]['pid'];	
				}
				if(data[2]){
					for(var y=0;y<len;y++){
						for(var x=0;x<data[2].length;x++){
							if(data[2][x] == pid_arr[y]){
								text = '已兑换';
								val=1;
								break;
							}else {
								text = '兑换';
								val=0;
								continue;
							}	
						}
						str+='<tr value='+val+' data-id='+pid_arr[y]+'><td><img src='+src_arr[y]+'></td><td>'+name_arr[y]+'<br><span>兑换所需:'+gem_arr[y]+'</span></td><td><div class="btn">'+text+'</div></td></tr>';
					}
				}else {
					for(var z=0;z<len;z++){
						str+='<tr value="0" data-id='+pid_arr[z]+'><td><img src='+src_arr[z]+'></td><td>'+name_arr[z]+'<br><span>兑换所需:'+gem_arr[z]+'</span></td><td><div class="btn">'+text+'</div></td></tr>';
					}
				}
				if(prize_nowPager==1){
					scroll_text='<div id="div_scroll">继续滑动刷新</div>';
					if(prize_pagerLen>1){
						prizeTable.html(str+scroll_text);	
						div_scroll=$("#div_scroll");
					}else {
						prizeTable.html(str);
					}
					refresh_status=1;
				}else {
					setTimeout(function(){
						prize.find(div_scroll).remove();
						if(prize_nowPager==prize_pagerLen){
							scroll_text='<div id="div_scroll">已到最后</div>';
						}
						prizeTable.html(prizeTable.html()+str+scroll_text);
						div_scroll=$("#div_scroll");
						refresh_status=1;
					},200);
				}
				setTimeout(function(){
					if(prize_pagerLen>1){
						tuodong2(prize_nowPager,prizeTable,prize_inner,prize_pagerLen,3);
					}
					var prizeTr=$("#prizeTable>tr[value='0']");
					prizeTr.off("tap");
					prizeTr.on("tap", function(){
						prize_scroll=prize_inner.scrollTop();
						dialog.css("display", "block");
						fadeIn(prize_ask);
						setTimeout(function(){
								
						},200);
						prize_ask.scrollTop(0);
						pid=$(this).attr("data-id");
						prize_msg(pid);
						prize_inner.scrollTop(prize_scroll);
					});	
				},200);
			},
			//蹭矿动画
			steal_Action : function(stealuid){
				var stealTr=$("#stealTable>tr[value='0']");
				stealTr.off("tap");
				stealTr.on("tap", function(){
					steal_scroll=steal_inner.scrollTop();
					stealActiveh2.text("请选择已解锁的宝石");
					stealuid=$(this).attr("data-uid");
					slideOut(steal);
					dialog.css("display", "block");
					stealActive.css("display", "block");
					titleIn(stealActiveh2);
					dialog.off("tap");
					dialog.on("tap", function(){
						stealRe();	
						slideIn(steal);
						stealActiveDiv.css("transition", "none");
						stealActiveDiv.removeClass("usableGem");
					});
				$.post("/mine/stealInfo.php", {"uid": stealuid}, function(data){
					//获取被蹭矿玩家的等级
					var level=parseInt(data);
					var selNum=level+1;
					for(var i=0;i<selNum;i++){
						stealActiveDiv.eq(i).addClass("usableGem");	
					}
					stealActiveDiv.css("transition", "all 1s ease-out");
					//为可选的宝石绑定事件
					$("#stealActive>div[class='usableGem']").off("tap");
					$("#stealActive>div[class='usableGem']").on("tap", function(){
						dialog.off("tap");
						$(this).addClass("steal_center").siblings().css("display", "none");
						$.post("/mine/stealAction_new.php", {"uid": stealuid, "sel": $(this).index()}, 											
						function(data){
							if(data[2]){
								setTimeout(function(){
									steal_fail.find("img").attr("src", "imgs/steal_f1.jpeg");
									steal_fail.css("display", "block");
									setTimeout(function(){
										steal_fail.css("display", "none");		
									},1500);
									stealRe();
								},1200);
								setTimeout(function(){
									stealTable.html('');
									active.stealPage((steal_nowPager-1)*10,1);	
									setTimeout(function(){
										steal_inner.scrollTop(steal_scroll);
									},400);
									slideIn(steal);
								},2400);
							}else {
								setTimeout(function(){
									steal_fail.find("img").attr("src","imgs/steal_s1.gif");
									steal_fail.css("display", "block");
									setTimeout(function(){
										steal_fail.css("display", "none");		
									},1500);
									gemNum.text(data[5]);
									addNum(gemNum);
								},1000);
								setTimeout(function(){
									count.text(data[0]);
									stealRe();
								},2000);
								setTimeout(function(){
									stealTable.html('');
									active.stealPage((steal_nowPager-1)*10,1);
									setTimeout(function(){
										steal_inner.scrollTop(steal_scroll);
									},400);
									slideIn(steal);
								},2200);	
							}	
							setTimeout(function(){
								stealActiveDiv.css("transition", "none");
								stealActiveDiv.removeClass("usableGem");	
							},2400);	
						},"json");	
						});
				},"json");
				});
			},
			//加载宝石数据
			gemInfo : function(uid){
				$.post("/mine/gemInfo.php",{"uid": uid}, function(data){
					count.text(data['gemInfo']['sumGem']);
					countNum=parseInt(data['gemInfo']['sumGem']);
					userLevel=parseInt(data['gemInfo']['level']);
					maLevel=parseInt(data['gemInfo']['malevel']);
					proSpeed=parseFloat(data['gemInfo']['proSpeed']);
					capacity=parseInt(data['gemInfo']['capacity']);
					userCost=parseInt(data['gemInfo']['userCost']);
					maCost=parseInt(data['gemInfo']['maCost']);
					loseSum=parseInt(data['gemInfo']['loseSum']);
					maImg.attr("src", "imgs/wkj"+maLevel+".png");
					baseLevel.attr("src", "imgs/base"+userLevel+".png");
					if(data['gemInfo']['notCollect'] != 0){
						minGem.css("transition", "all 1s ease-out");
						minGem.css("visibility", "visible");
						for(var i=0;i<minGem.length;i++){
							minGem.eq(i).css("transform", "translate3d("+address[i]+")");	
						}
						getGem.css("display", "block");
						productNum.css("display", "block");
						productNum.text(data['gemInfo']['notCollect']);
						productCount=parseInt(data['gemInfo']['notCollect']);
					}
					else {
						productNum.css("display", "none");
						minGem.css("visibility", "hidden");
						getGem.css("display", "none");
						productCount=0;
					}
				},"json");	
			},
			//页面加载基本信息
			userInfo : function(uid){
				$.get("check_status.php", function(data){
					//判断登录是否成功
					if(data!=0){
						$.post("user_info.php",{"status": data, "uid": uid}, function(data){
							//判断登录是否成功
							if(data['error'] == 1){
								alert(data['msgs']);
							}else {
								if(data['uidInfo']['heading']){
									$(".header>img").attr("src", data['uidInfo']['heading']);
									heading=data['uidInfo']['heading'];
								}else {
									$(".header>img").attr("src", "imgs/heading.png");
									heading="imgs/heading.png";
								}
								$(".gamename").text(data['uidInfo']['gamename']);
								gamename=data['uidInfo']['gamename'];
								//console.log('uids '+data['uid']);
								chatuid = data['uid'];
								//加载宝石数据
								active.gemInfo(uid);
								active.unmain();
								active.main();
								nowUid = data['uid'];
							} 
						},"json");	
					}else {
						/*
						console.log("检测到尚未登陆，3秒后跳转到登陆界面");
						setTimeout(function(){
							window.location='login.html';		
						},3000);
						*/
					}
				});		
			},
			//挖矿王分页
			topPage : function(number){
					$.post("/mine/topRanking.php",{"number": number}, function(data){
						active.topRanking(data);
					},"json");	
			},
			//谁蹭分页
			losePage : function(number){
				$.post("/mine/loseRanking.php",{"number": number}, function(data){
					active.loseRanking(data);
				},"json");	
			},
			//蹭矿去分页
			stealPage : function(number,status){
				$.post("/mine/stealRanking_new.php",{"number": number, "nowPager": steal_nowPager, "status": status}, function(data){
					/*
					if(data[6]){
						steal_nowPager--;	
						//stealTitle.html("蹭矿去-矿排名（第"+steal_nowPager+"页）");
					}
					*/
					active.stealRanking(data);
				},"json");	
			},
			//奖品分页
			prizePage : function(number,status){
				$.post("/mine/prizeRanking.php",{"number": number, "nowPager": prize_nowPager, "status": status}, function(data){
					active.prizeRanking(data);
				},"json");	
			},
			//动画启动
			main : function(){
				carControl.css("transition","all 3s linear");
				active.firstFire();
				active.secondFire();
				active.carFirst();
				active.carSecond();
				active.lightControl();
				time1=setInterval(function(){
					active.carFirst();
					active.carSecond();
					setTimeout(function(){
						active.product();
					},600);
				},48600);
				time2=setInterval(function(){
					active.firstFire();
					active.secondFire();
				},7000);
				time3=setInterval(function(){
					active.lightControl();
				},1000);
			},
			//动画停止,初始化
			unmain : function(){
				clearInterval(time1);
				clearInterval(time2);
				clearInterval(time3);
				carControl.css("transition","none");
				carControl.css("transform","translate3d(0,0,0)");
				carFire.addClass("carFire2");
				carFire.css("display", "none");	
				for(var i=0;i<timeCar.length;i++){
					clearTimeout(timeCar[i]);	
				}
				for(var j=0;j<timeFire.length;j++){
					clearTimeout(timeFire[j]);	
				}	
			},
			//绑定事件
			binding : function(){
				//基地
				base.off("tap");
				base.on("tap", function(){
					slideIn(control);	
				});
				//基地升级
				updateBase.off("tap");
				updateBase.on("tap", function(){
					slideOut(control);	
					dialog.off("tap");
					fadeIn(base_inner);
					dialog.css("display", "block");
					controlLevel(userLevel,0);
					updateWhich=0;
				});
				//钻地机升级
				updateMa.off("tap");
				updateMa.on("tap", function(){
					slideOut(control);	
					dialog.off("tap");
					fadeIn(base_inner);
					dialog.css("display", "block");
					controlLevel(maLevel,1);
					updateWhich=1;
				});
				//确认升级
				btnS.off("tap");
				btnS.on("tap", function(){
					$.post("/mine/updateLevel.php", {"updateWhich": updateWhich}, function(data){
						if(!data['updateInfo']['status']){
							controlMsgs(data['updateInfo']['news']);
						}else {
							fadeOut(base_inner);
							controlMsgs(data['updateInfo']['news']);
							count.text(data['updateInfo']['sum']);
							if(updateWhich){
								maLevel=parseInt(data['updateInfo']['level']);
								maCost=parseInt(data['updateInfo']['maCost']);
								proSpeed=parseFloat(data['updateInfo']['speed']);
								controlLevel(maLevel,1);
								maImg.attr("src", "imgs/wkj"+maLevel+".png");
							}else {
								userLevel=parseInt(data['updateInfo']['level']);
								userCost=parseInt(data['updateInfo']['userCost']);
								capacity=parseInt(data['updateInfo']['capacity']);
								controlLevel(userLevel,0);
								baseLevel.attr("src", "imgs/base"+userLevel+".png");
							}
							setTimeout(function(){
								fadeIn(base_inner);	
							},1000);
						}
					},"json");		
				});
				//取消升级
				btnC.off("tap");
				btnC.on("tap", function(){
					fadeOut(base_inner);
					slideIn(control);
					dialog.css("display", "none");
				});
				//宝石放置
				setGem.off("tap");
				setGem.on("tap", function(){
					stealActiveh2.text("请选择宝石放置地点");
					slideOut(control);
					dialog.css("display", "block");
					stealActive.css("display", "block");
					titleIn(stealActiveh2);
					dialog.off("tap");
					dialog.on("tap", function(){
						stealRe();	
						slideIn(control);
						stealActiveDiv.css("transition", "none");
						stealActiveDiv.removeClass("usableGem");
					});
					for(var i=0;i<userLevel+1;i++){
						stealActiveDiv.eq(i).addClass("usableGem");	
					}
					stealActiveDiv.css("transition", "all 1s ease-out");
					//为可选的宝石绑定事件
					$("#stealActive>div[class='usableGem']").off("tap");
					$("#stealActive>div[class='usableGem']").on("tap", function(){
						dialog.off("tap");
						$.post("/mine/setPosition.php", {"sel": $(this).index()}, function(){
							controlMsgs("操作成功");
							setTimeout(function(){
								stealRe();
							},600);
							setTimeout(function(){	
								slideIn(control);
								stealActiveDiv.css("transition", "none");
								stealActiveDiv.removeClass("usableGem");	
							},700);
						},"json");	
					});
				});
				//采矿
				getGem.off("tap");
				getGem.on("tap", function(){
					if($(this).attr("value") == 0){
						productNum.text(0);
						productNum.css("display", "none");
						minGem.css("transform", "translate3d(999px,0,0)");
						getGem.attr("value", 1);
						gemNum.text(productCount);
						setTimeout(function(){
							minGem.css("transition", "");
							minGem.css("visibility", "hidden");
							minGem.css("transform", "translate3d(0,0,0)");
						},1100);
						addNum(gemNum);
						$.post("/mine/getGem.php",{"productNum":productCount}, function(data){
							setTimeout(function(){
								count.text(data['gemInfo']);
								countNum=parseInt(data['gemInfo']);
								loseSum=parseInt(data['loseSum']);
							},1050);	
						},"json");		
						productCount=0;	
					}		
				});
				//挖矿王START
				//挖矿王排行榜(分页：首页、上一页、下一页、末页)
				li1.off("tap");
				li1.on("tap", function(){
					top_nowPager=1;
					active.topPage(0);
					slideIn(top);	
					//control_pager();	
					top_inner.scrollTop(0);
				});
				topFirst.off("tap");
				topFirst.on("tap", function(){
					if($(this).attr("data-value") == 0){
						$(this).text("刷新中...");
						$(this).attr("data-value", "1");
						top_nowPager=1;
						active.topPage(0);
						top_inner.scrollTop(0);
						if(refresh_status){
							controlMsgs("刷新完毕");	
							topFirst.attr("data-value", "0");
							topFirst.text("刷新");
						}
					}
				});
				//挖矿王END
				//谁蹭我START
				li2.off("tap");
				li2.on("tap", function(){
					lose_nowPager=1;
					active.losePage(0);
					slideIn(lose);
					lose_inner.scrollTop(0);
				});
				//首页
				loseFirst.off("tap");
				loseFirst.on("tap", function(){
					if($(this).attr("data-value") == 0){
						$(this).text("刷新中...");
						$(this).attr("data-value", "1");
						lose_nowPager=1;
						active.losePage(0);
						lose_inner.scrollTop(0);
						if(refresh_status){
							controlMsgs("刷新完毕");	
							loseFirst.attr("data-value", "0");
							loseFirst.text("刷新");
						}
					}
				});
				//END
				//蹭矿去排行榜START
				li3.off("tap");
				li3.on("tap", function(){
					steal_nowPager=1;
					active.stealPage(0);
					slideIn(steal);
					steal_inner.scrollTop(0);
				});
				//首页
				stealFirst.off("tap");
				stealFirst.on("tap", function(){
					if($(this).attr("data-value") == 0){
						$(this).text("刷新中...");
						$(this).attr("data-value", "1");
						steal_nowPager=1;
						active.stealPage(0);
						steal_inner.scrollTop(0);
						if(refresh_status){
							controlMsgs("刷新完毕");	
							stealFirst.attr("data-value", "0");
							stealFirst.text("刷新");
						}
					}
				});
				//蹭矿去END
				//奖品START
				li4.off("tap");
				li4.on("tap", function(){
					prize_nowPager=1;
					active.prizePage(0);
					slideIn(prize);
					prize_inner.scrollTop(0);
				});
				prizeFirst.off("tap");
				prizeFirst.on("tap", function(){
					$(this).text("刷新中...");
					if($(this).attr("data-value") == 0){
						$(this).attr("data-value", "1");
						prize_nowPager=1;
						active.prizePage(0);
						prize_inner.scrollTop(0);
						if(refresh_status){
							controlMsgs("刷新完毕");	
							prizeFirst.attr("data-value", "0");
							prizeFirst.text("刷新");
						}
					}
				});
				//确认兑换
				prizeS.off("tap");
				prizeS.on("tap", function(){
					exPrize(pid);	
				});
				prizeC.off("tap");
				prizeC.on("tap", function(){
					dialog.css("display", "none");
					fadeOut(prize_ask);	
				});
				//奖品END
				//关闭按钮
				closeWin.off("tap");
				closeWin.on("tap", function(){
					slideOut(top);
					slideOut(steal);
					slideOut(lose);
					slideOut(control);
					slideOut(prize);
					top.find(div_scroll).remove();
					steal.find(div_scroll).remove();
					lose.find(div_scroll).remove();
					prize.find(div_scroll).remove();
				});	
				//返回按钮
				backBtn.off("tap");
				backBtn.on("tap", function(){
					backBtn.css("display", "none");
					slideIn(top);
					setTimeout(function(){
						active.unmain();
						active.userInfo(uid);
						active.binding();	
					},1000);	
				});
				$(".container").off("touchstart");
				$(".container").on("touchstart", function(event){})
						 .on("touchmove", function(event){
							event.preventDefault();
						 })		
						 .on("touchend", function(event){});
			},
			//导航、收矿解绑
			unbinding : function(){
				getGem.off("tap");
				//挖矿王START
				//挖矿王排行榜(分页：首页、上一页、下一页、末页)
				li1.off("tap");
				//挖矿王END
				li2.off("tap");
				//蹭矿去排行榜START
				li3.off("tap");
				base.off("tap");
				li4.off("tap");
			},
		};
		//开始产矿动画
		function gemGo(value,address,time){
			setTimeout(function(){
				minGem.eq(value).css("transform",address);
			},time);			
		}
		//重置蹭矿动画
		function stealRe(){
			stealActiveh2.css({
				"transform":"translateY(-30px)",
				"display":"none"	
			});	
			dialog.css("display", "none");
			stealActive.css("display", "none");
			stealActiveDiv.css("display", "block");	
			stealActiveDiv.removeClass("steal_center");
		}
		//提示信息
		function controlMsgs(val){
			msgs.text(val);
			msgs.css({
				"transition":"",
				"display":"block",
				"opacity": "1",
				"transform": "translateY(0)"	
			});	
			setTimeout(function(){
				msgs.css({
					"transition":"all 1s",
					"opacity": "0",
					"transform": "translateY(-30px)"	
				});
			},400);
			setTimeout(function(){
				msgs.css("display", "none");
			},1401);
		}
		//显示等级
		function controlLevel(val,data){
			nowLevel.text("当前等级：lv"+val);
			if(val<8){
				if(data){
					tip.html("（tip：升级钻地机可以提高宝石的生产速度）");
					nextLevel.text("下一等级：lv"+(val+1));	
					updateGem.text("升级所需宝石："+maCost);
				}else {
					tip.html("（tip：升级基地可以容纳更多的宝石，解锁更多宝石存放的位置，重要的是升级基地是升级钻地机的前提）");
					nextLevel.text("下一等级：lv"+(val+1));	
					updateGem.text("升级所需宝石："+userCost);
				}
			}else {
				if(data){
					tip.html("（tip：升级钻地机可以提高宝石的生产速度）");
				}else {
					tip.html("（tip：升级基地可以容纳更多的宝石，解锁更多宝石存放的位置，重要的是升级基地是升级钻地机的前提）");
				}
				nextLevel.text("当前等级为最高等级");		
				updateGem.text("无");
			}
		}
		//淡入
		function fadeIn(which){
			which.css({
				"transform":"translateY(30px)",
				"display":"block",
				"opacity":"0"
			});
			setTimeout(function(){
				which.css({
					"transform":"translateY(0)",
					"opacity":"1"
				});
			},100);
		}
		//淡出
		function fadeOut(which){
			which.css({
				"transform":"translateY(30px)",
				"display":"none"
			});
		}
		//滑入界面
		function slideIn(which){
			which.css({
				"transform":"translateY(-28rem)",
				"display":"block"
			});
			setTimeout(function(){
				which.css("transform","translateY(0)" );
			},100);
		}
		//滑出界面
		function slideOut(which){
			which.css("transform","translateY(-28rem)" );
			/*
			setTimeout(function(){
				which.css("display","none");
			},1001);	*/
		}
		//宝石增加动画
		function addNum(which){
			which.css({
				"transform":"translateY(0)",
				"display":"block"
			});
			setTimeout(function(){
				which.css({
					"transform":"translateY(-8rem)",
					"font-size":"1rem",
					"opacity":".7"
				});
			},100);
			setTimeout(function(){
				which.css({
					"transform":"translateY(0)",
					"font-size":"1.4rem",
					"opacity":"1",
					"display":"none"
				});
			},1100);
		}
		//标题出现
		function titleIn(which){
			which.css({
				"transform":"translateY(-18px)",
				"display":"block"
			});
			setTimeout(function(){				
				which.css("transform", "translateY(0)");
			},100);	
		}
		//获取奖品信息
		function prize_msg(pid){
			$.post("/mine/prizeInfo.php",{"pid": pid}, function(data){
				prize_ask.find("img").attr("src",data["src"]);
				prize_ask.find("h4").text(data["name"]);
				prizeIntr.text(data["introduce"]);
				prizeGem.text("兑换所需："+data["gemNum"]);
				prize_ask.find("h5").text("奖品赞助："+data["company"]);
				prize_surplus.text("奖品剩余："+data["prizeNum"]);
			},"json");
		}
		//奖品兑换
		function exPrize(prizeId){
			$.post("/mine/prizeAction.php",{"pid": prizeId}, function(data){
				if(!data['status']){
					controlMsgs(data['news']);
				}else {
					fadeOut(prize_ask);
					count.text(data['sum']);
					prizeTable.html('');
					active.prizePage((prize_nowPager-1)*10,1);
					setTimeout(function(){
						prize_inner.scrollTop(prize_scroll);
					},400);
					controlMsgs(data['news']);
					fadeIn(prize_info);
					prize_info.html("恭喜您成功兑换：<br><p>"+data['name']+"</p>请用此号码：<span>"+data['phone']+"</span><br>与工作人员联系，以便完成兑奖");	
					dialog.css("display", "block");
					setTimeout(function(){
						dialog.off("tap");
						dialog.on("tap", function(){
							prize_info.css("display", "none");
							dialog.css("display", "none");
						});	
					},2000);
				}
			},"json");		
		}
		//拖动刷新
		function tuodong2(nowPager,Table,inner,Len,which){
			var touch=null;
			var one=null;
			var two=null;	
			var status=0;
			Table.off("touchstart");
			Table.on("touchstart", function(event){
				var a=Table.height();
				var b=inner.height();
				var c=inner.scrollTop();
				touch=event.touches[0];
				one=touch.pageY;
				if((b+c+10)>=a){
					status=1;	
				}else {
					status=0;		
				}
			}).on("touchmove", function(event){
				touch=event.touches[0];
				two=touch.pageY;
				var sum = one - two;
				if(status){
					if(nowPager<Len){
						if( sum > 0){
							event.preventDefault();//阻止触摸屏滑动
							div_scroll.css('transition', '0ms cubic-bezier(0.1, 0.57, 0.1, 1)').css('-webkit-transition', '0ms cubic-bezier(0.1, 0.57, 0.1, 1)').css('transform', 'translateY(-' + sum + 'px)').css('-webkit-transform', 'translateY(-' + sum + 'px)');
						}
					}
				}
			}).on("touchend", function(event){
				var sum = one - two;
				div_scroll.css('transition', '100ms cubic-bezier(0.1, 0.57, 0.1, 1)').css('-webkit-transition', '100ms cubic-bezier(0.1, 0.57, 0.1, 1)').css('transform', 'translateY(0px)').css('-webkit-transform', 'translateY(0px)');
				if(status && two){
					if(nowPager<Len){
						if( sum > 60){
							//执行刷新
							div_scroll.html("加载中...");
							$( this ).unbind();//删除绑定 不然会重复绑定 严重影响速度);
							if(which==0){
								top_nowPager=nowPager+1;
								active.topPage((top_nowPager-1)*10);
							}else if(which==1){
								lose_nowPager=nowPager+1;
								active.losePage((lose_nowPager-1)*10);
							}else if(which==2){
								steal_nowPager=nowPager+1;
								active.stealPage((steal_nowPager-1)*10);
							}else if(which==3){
								prize_nowPager=nowPager+1;
								active.prizePage((prize_nowPager-1)*10);
							}
						}else if(sum < -5){
							//delete $.fn.swipeS;
							//加了之后当sum<0,事件解绑
							//$( this ).unbind();//删除绑定 不然会重复绑定 严重影响速度
						}
					}
				}
			});	
		}
		function a() {
	        var clientWidth = document.documentElement.clientWidth;
	        var fontSize = 20;
	        if (!clientWidth) return;
	        if(clientWidth < 640) {
	        	fontSize = 20 * (clientWidth / 320);
	        } else {
	            fontSize = 20 * (640 / 320);
	            fontSize > 26?fontSize = 25.875:fontSize = fontSize;
	        }
	        document.documentElement.style.fontSize = fontSize + 'px';
	    }
		//运行程序
		active.userInfo(uid);	
		active.binding();
		a(document, window);
		(function (doc, win) {
            var _root = doc.documentElement,
            resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize',
            resizeCallback = function () {
                var clientWidth = _root.clientWidth,
                    fontSize = 20;
                if (!clientWidth) return;
                if(clientWidth < 640) {
                    fontSize = 20 * (clientWidth / 320);
                } else {
                    fontSize = 20 * (640 / 320);
                    fontSize > 26?fontSize = 25.875:fontSize = fontSize;
                }
                _root.style.fontSize = fontSize + 'px';
            };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvent, resizeCallback, false);
            doc.addEventListener('DOMContentLoaded', resizeCallback, false);
    })(document, window);
});
