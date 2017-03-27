$(document).ready(function(){
	//ScrollSpy
	$('.anchor:visible:first').on('scrollSpy:enter', function() {
		$('.nav .nav-item').removeClass('active');
		$('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
	});

	$('.anchor').on('scrollSpy:exit', function() {
		//$('a[href="#' + $(this).attr('id') + '"]').parent().removeClass('active');
	});

	$('.anchor').scrollSpy();
});
