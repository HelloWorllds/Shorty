$(document).ready(function() {
	
	function wResize() {
		var height = $(window).height() - 20;
		$("body").css("min-height", height);
	};
	wResize();
	$(window).resize(function() {
		wResize();
	});

	

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};	
});

document.querySelector("#nav-toggle").addEventListener("click", function() {
	this.classList.toggle("active");
});