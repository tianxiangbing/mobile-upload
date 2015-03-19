/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2015-03-18
 * Time: 09:38:55
 * Contact: 55342775@qq.com
 */
(function($) {
	$.fn.Mobile_upload = function(settings) {
		var list = [];
		$(this).each(function() {
			var upload = new Mobile_upload();
			var options = $.extend({
				target: $(this)
			}, settings);
			upload.init(options);
			list.push(upload);
		});
		return list;
	}
})(jQuery);