function getStyle(elem, attr){
	if(elem.currentStyle){
		return elem.currentStyle[attr];
	}
	else return getComputedStyle(elem, false)[attr];
}
window.onload=function(){
	var btn=document.querySelector("#btn-collapse");
	var navbar=document.querySelector("#navbar");
	btn.addEventListener("click", function(){
		navbar.classList.toggle("navbar-in");
	})
}
window.onscroll=function(){
	var top=document.body.scrollTop||document.documentElement.scrollTop;
	var goup=document.querySelector("#goup");
	var time=null;
	var value=0;
	if(top>200){
		goup.style.display="block";
	}
	else goup.style.display="none";
}