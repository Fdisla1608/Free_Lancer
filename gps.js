$(document).ready(function() {

	// how often should we send location data? in seconds
	var sendInterval = 1;
	var runnerId;
	while (!runnerId){
		runnerId = prompt("Enter your runner ID:", "");
	}
	var intervalId;
	var watchId;
	var index = 0;
	var formData = {};

	$("#status p").text("Not tracking");
	$('#start').on("click", startTrack);
	$('#stop').on("click", stopTrack);

	function startTrack(){
		if(navigator.geolocation){
			watchId = navigator.geolocation.watchPosition(geo_success, errorHandler,
			{enableHighAccuracy:true, maximumAge:30000, timeout:27000});
		}
		else{
			alert("Sorry, device does not support geolocation! Update your browser.");
		}
	}

	function stopTrack(){
		clearInterval(intervalId);
		navigator.geolocation.clearWatch(watchId);
		index = 0;
		$("#status p").text("Not tracking").removeClass("active").addClass("stopped");
		$("#start").removeAttr("disabled");
		$("#stop").attr("disabled", "disabled");
	}
	
	function geo_success(position){
		$("#status p").text("Tracking active").removeClass("stopped").addClass("active");
		$("#start").attr("disabled", "disabled");
		$("#stop").removeAttr("disabled");
		
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		formData.lat=lat;
		formData.lon=lon;
				
		if(index === 0){
			intervalId = setInterval(postData, sendInterval*1000);
		}

		index++;
	}}