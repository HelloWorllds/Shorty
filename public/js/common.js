$(document).ready(function() {
	
	function wResize() {
		var height = $(window).height() - 20;
		$("body").css("min-height", height);
	}

	wResize();

	$(window).resize(function() {
		wResize();
	});

	$(".form-container form button").click(function() {
		$(".form-container").css("display", "none");
	});

	$("#nav-toggle").click(function() {
		var menuPosition = $(".main-menu-container").css("left");
		if (menuPosition === "-205px") {
			$(".main-menu-container").animate({
				left: "-10px"
			});
		}
		if (menuPosition === "-10px") {
			$(".main-menu-container").animate({
				left: "-205px"
			});
		}
	});

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	}

	$('#submitButton').on('click', function(){
		$.ajax({
			url: '/shorten',
			type: 'POST',
			dataType: 'JSON',
			data: {url: $('#mainTextBox').val()},
			success: function(data){
				$(".form-container").css("display", "block");
				$("#shortLink").val(data.shortUrl);
			}
		});
	});
});

document.querySelector("#nav-toggle").addEventListener("click", function() {
	this.classList.toggle("active");
});