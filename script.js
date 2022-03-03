var gameName = "";
var gameDescription1 = "";
var gameDescription2 = "";
var gameGenre = "";

$(document).ready( function() {
	$("#sortable").sortable({
		helper: "clone",
		axis:"y",
		stop: function(){

			$("#sortable").sortable("disable");
			
			$.post('empty.php');

			var olcontent = '' + $("#sortable").html();
			var data = {'olContent': olcontent};
			$.post('save.php', data);

			$("#sortable").sortable("enable");
		}
	});

	$("#sortable").disableSelection();
	$.ajax({
		url:"read.php",
		method:"POST",  
		success: function(data)
		{
			$("#sortable").append(data);
		}
	});

	$("#sortable").sortable("disable");
});

//Lägg til nedladdningsknapp för listelementen

$(document).ready( function() {

	$("#top").keyup( function() {

		if($("#top").val() == "Jacobs topplist"){

			$("#top").animate({color: "#0d0"}, 100 );

			$("#sortable").sortable("enable");

		}
		else{

			$("#top").animate({color: "#fff"}, 100 );

			$("#sortable").sortable("disable");
		}
	});

	//Saveknappen
	$("#save").on("mouseover", function(){
		$(this).animate({opacity: "1.0"}, 100 );
	});
	$("#save").on("mouseleave", function(){
		$(this).animate({opacity: "0.7"}, 100 );
	});
	$("#save").on("click", function(e){

		var olcontent = '' + $("#sortable").html();

		var t = new Date();
		
		var y = t.getFullYear();		
		var m = ("0" + (t.getMonth() + 1)).slice(-2);
		var d = ("0" + t.getDate()).slice(-2);
		var hour = ("0" + t.getHours()).slice(-2);
		var minute = ("0" + t.getMinutes()).slice(-2);

		var backupFileName = "databackup_" + y + "-" + m + "-" + d + "_" + hour + "-" + minute + ".txt";

		if(e.shiftKey){
			var blob = new Blob([olcontent], {type: "text/plain;charset=utf-8"});
  			saveAs(blob, "" + backupFileName);
		}
		
		$.post('empty.php');

		var data = {'olContent': olcontent};
		$.post('save.php', data);

		$(this).animate({left: "-200"}, 1000);
		$(this).animate({left: "25"}, 1000);
	});
	
	//Plusknappen
	$("#add").on("mouseover", function(){
		$(this).animate({color: "#fa0", fontSize: "93px"}, 100 );
	});
	$("#add").on("mouseleave", function(){
		$(this).animate({color: "#fff", fontSize: "90px",}, 100 );
	});
	$("#add").on("click", function(){
		$("#formContainer").show(300);
	});
	
	//X-knappen
	var deleteMode = 0; 
	
	$("#remove").on("mouseover", function(){
		$(this).animate({fontSize: "65px"}, 100 );
	});
	$("#remove").on("mouseleave", function(){
		$(this).animate({fontSize: "60px",}, 100 );
	});
	$("#remove").on("click", function(){
		if($("#top").val() == "Jacobs topplist"){
			if(Boolean(deleteMode)){
				$(this).animate({color: "#fff"}, 100 );
				deleteMode = 0;
			}
			else{
				$(this).animate({color: "#f00"}, 100 );
				deleteMode = 1;
			}
		}
	});
	
	//Ta bort listelement <li>
	$(document).on("click","li",function(){
    	if(Boolean(deleteMode)){
			$(this).remove();

			$.post('empty.php');

			var olcontent = '' + $("#sortable").html();
			var data = {'olContent': olcontent};
			$.post('save.php', data);
		}
	});


	//Cancelknappen
	$("#btnCancel").on("click", function(){
		$("#formContainer").hide(300);
	});
	$("#btnCancel").on("mouseover", function(){
		$(this).animate({"background-color": "#f00", "color": "#fff"}, 200 );
	});
	$("#btnCancel").on("mouseleave", function(){
		$(this).animate({"background-color": "rgba(0,0,0,0)", "color": "#f00"}, 200 );
	});
	
	//Confirmknappen
	$("#btnConfirm").on("click", function(){

		gameName = $("#gameName").val();
		gameDescription1 = $("#gameDescription1").val();
		gameDescription2 = $("#gameDescription2").val();
		gameGenre = $("#gameGenre").val();
		
		var spelid = Math.random().toString(36).slice(2);
		$("#sortable").append('<li id="' + spelid + '" class="ui-state-default ui-sortable-handle" draggable="true"><div class=' + gameGenre + '><img class="icon" src="' + imgUrl + '"/><span class="game">' + gameName + '</span><span class="desc">' + gameDescription1 + '<br/>' + gameDescription2 + '</span></div></li>');

		$.post('empty.php');

		var olcontent = '' + $("#sortable").html();
		var data = {'olContent': olcontent};
		$.post('save.php', data);

		$("#formContainer").hide(300);
		$("#gameName").val("");
		$("#gameDescription1").val("");
		$("#gameDescription2").val("");
		$('#gameImage').attr('src', "img/black.jpg");
	});
	$("#btnConfirm").on("mouseover", function(){
		$(this).animate({"background-color": "#0a0", "color": "#fff"}, 200 );
	});
	$("#btnConfirm").on("mouseleave", function(){
		$(this).animate({"background-color": "rgba(0,0,0,0)", "color": "#0a0"}, 200 );
	});
	
	//Bildfil-lablen
	$("#addImageLabel").on("mouseover", function(){
		$(this).animate({"color": "#aaa",}, 200 );
	});
	$("#addImageLabel").on("mouseleave", function(){
		$(this).animate({"color": "#fff",}, 200 );
	});
	
	$("#gameGenre").on("mouseleave", function(){
	
	var chosenGenre = $("#gameGenre option:selected").val();
	
	if(chosenGenre == "platformer")
	    $("#gameGenre").animate({"background-color": "#ff0", "color": "000"}, 500);
	
	else if(chosenGenre == "adventure")
	    $("#gameGenre").animate({"background-color": "#f00", "color": "fff"}, 500);
	
	else if(chosenGenre == "openworld")
	    $("#gameGenre").animate({"background-color": "#0c0", "color": "fff"}, 500);
	    
	else if(chosenGenre == "shooter")
	    $("#gameGenre").animate({"background-color": "#d0a", "color": "fff"}, 500);
	 
	else if(chosenGenre == "puzzle")
	    $("#gameGenre").animate({"background-color": "#0ff", "color": "000"}, 500);
	    
	else if(chosenGenre == "racing")
	    $("#gameGenre").animate({"background-color": "#00f", "color": "fff"}, 500);
	    
	else if(chosenGenre == "multiplayer")
	    $("#gameGenre").animate({"background-color": "#fa0", "color": "fff"}, 500);
	
	else{}
	});
});