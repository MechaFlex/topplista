<!DOCTYPE html>
<meta charset="UTF-8">
<html>
	<link rel="stylesheet" href="style.css"/>
	<head>
			<title>Jacobs topplista</title>
			<link rel="icon" href="anka.ico">
	</head>
	<body>
		
		<div id="formContainer">
			<div id="imageContainer">
				<img id="gameImage" onerror="this.style.display='none'"/>
			</div>
			<div id="addImage">
				<label id="addImageLabel">Välj bild<input type="file" id="file" name="file" accept=".jpg" style="position: fixed; top: -100em"></label>

			</div>
			
			<input id="gameName" type="text" placeholder="Spelets namn">
			<select id="gameGenre">
				<option value="platformer">Platformer</option>
				<option value="adventure">Adventure</option>
				<option value="openworld">Open-world</option>
				<option value="shooter">Shooter</option>
				<option value="puzzle">Puzzle</option>
				<option value="racing">Racing</option>
				<option value="multiplayer">Multiplayer</option>
			</select>
			
			<input id="gameDescription1" type="text" placeholder="Beskrivning rad 1">
			<input id="gameDescription2" type="text" placeholder="Beskrivning rad 2">
			
			<div id="btnConfirm">✔ Add</div>
			<div id="btnCancel">✘ Cancel</div>
		</div>
		
		
		<input id="top" type="text" value="Jacobs topplista">
		<div id="topspacer"></div>
		
		
		<div id="add">+</div>
		<div id="remove">✖</div>

		<div id="save">💾</div>

		<div id="legend">
			<span class="legendGenre" id="legendPlatformer">Platformer</span><br/>
			<span class="legendGenre" id="legendAdventure">Adventure</span><br/>
			<span class="legendGenre" id="legendOpenworld">Open-world</span><br/>
			<span class="legendGenre" id="legendShooter">Shooter</span><br/>
			<span class="legendGenre" id="legendPuzzle">Puzzle</span><br/>
			<span class="legendGenre" id="legendRacing">Racing</span><br/>
			<span class="legendGenre" id="legendMultiplayer">Multiplayer</span>
		</div>


		<ol id="sortable"></ol>

		<div id="topspacer"></div>
		
		<script src="jquery.js"></script>
		<script src="jqueryui.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"></script>
		<script src="script.js"></script>
		<script>
			var imgUrl;

			$(document).ready(function(){
				$(document).on('change', '#file', function(){

					var name = document.getElementById("file").files[0].name;
					var form_data = new FormData();
					var ext = name.split('.').pop().toLowerCase();

					if(jQuery.inArray(ext, ['jpg']) == -1) {
						alert("Endast .jpg tillåts");
					}

					else{
						var oFReader = new FileReader();
						oFReader.readAsDataURL(document.getElementById("file").files[0]);
						var f = document.getElementById("file").files[0];
						var fsize = f.size||f.fileSize;

						if(fsize > 2000000){
							alert("Bilden får inte vara större än 2MB");
						}
						else{
							form_data.append("file", document.getElementById('file').files[0]);
							$.ajax({
								url:"upload.php",
								method:"POST",
								data: form_data,
								contentType: false,
								cache: false,
								processData: false,
								beforeSend:	function(){
									$('#addImageLabel').html("Image Uploading...");
								},   
								success:function(data)
								{
									$('#imageContainer').html('<img src="' + data + '" height="150" width="150" id="gameImage" onerror="this.style.display=none"/>');
									imgUrl = data;
									$('#addImageLabel').html('Välj bild<input type="file" id="file" name="file" accept=".jpg" style="position: fixed; top: -100em">');
								}
							});
						}
					}
				});
			});
		</script>
	</body>
</html>