$(document).ready(function(){
	$("#example1").datepicker();
    document.getElementById("go-back").onclick = function (){
        window.location.href = '/';
    };
})