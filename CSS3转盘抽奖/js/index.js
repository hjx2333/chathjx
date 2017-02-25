window.onload=function(){
	var now=document.querySelector("#now");
	var con=document.querySelector("#con");
	var val=[45,90,135,180,225,270,315,360];
	var a=0;
	var result=0;
	var index=720;
	now.onclick=function(){
		now.setAttribute("disabled", "disabled");
		a=Math.floor(Math.random()*6);
		result=val[a]+index;
		con.style.transform="rotate("+result+"deg)";
		index=index*2;
		setTimeout(function(){
			switch(result%720){
				case 45:alert("多谢参与");
				break;
				case 90:alert("充电宝一台");
				break;
				case 135:alert("多谢参与");
				break;
				case 180:alert("U盘一个");
				break;
				case 225:alert("多谢参与");
				break;
				case 270:alert("鼠标一个");
				break;
				case 315:alert("再转一次");
				break;
				case 360:alert("苹果6s一台");
				break;
			}
			now.removeAttribute("disabled");
		},3000)
	}
}