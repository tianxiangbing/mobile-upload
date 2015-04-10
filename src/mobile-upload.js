/*
 * Created with Sublime Text 2.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2015-03-17
 * Time: 18:06:23
 * Contact: 55342775@qq.com
 */
;
(function(root, factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['$'], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.Mobile_upload = factory(window.Zepto || window.jQuery || $);
	}
})(this, function($) {
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
	};

	function Mobile_upload() {
		var rnd = Math.random().toString().replace('.', '');
		this.id = 'upload_' + rnd;
		this.fileInput;
	}
	Mobile_upload.prototype = {
		init: function(settings) {
			this.settings = $.extend({}, this.settings, settings);
			this.target = this.settings.target;
			this.createFile();
			this.name = this.settings.name || "files";
			this.bindEvent();
			this.bindFileChange();
		},
		touch: function(obj, fn) {
			var move;
			$(obj).on('click', click);

			function click(e) {
				return fn.call(this, e);
			}
			$(obj).on('touchmove', function(e) {
				move = true;
			}).on('touchend', function(e) {
				e.preventDefault();
				if (!move) {
					var returnvalue = fn.call(this, e, 'touch');
					if (!returnvalue) {
						e.preventDefault();
						e.stopPropagation();
					}
				}
				move = false;
			});
		},
		createFile: function() {
			var _this = this;
			_this.fileInput && _this.fileInput.remove();
			_this.fileInput = $('<input type="file" style="position:absolute;top:0;left:0;width:1px;height:1px;opacity:0;"  accept="image/*" id="' + _this.id + '"/>');
			$(_this.target).after(_this.fileInput);
			if (this.settings.multiple) {
				this.fileInput.attr('multiple', 'multiple');
			}
		},
		bindEvent: function(e) {
			var _this = this;
			this.touch($(this.target), function(e, t) {
				if ($(this).parent().siblings().size() >= _this.settings.max) {
					_this.settings.maxCallback && _this.settings.maxCallback(this);
				} else {
					$(_this.fileInput).trigger('click');
				}
				return false;
			});
			_this.bindFileEvent();
		},
		bindFileEvent: function() {
			var _this = this;
			$(this.fileInput).click(function(e) {
				e.stopPropagation();
			});
		},
		bindFileChange: function() {
			var _this = this;
			$('body').on('change', '#'+_this.id, function(e) {
				var reg_type = /^image\//i;
				var files = e.target.files;
				for (var i = files.length - 1; i >= 0; i--) {
					var file = files[i];
					if (reg_type.test(file.type)) {
						var reader = new FileReader();
						_this.settings.startUpload && _this.settings.startUpload(_this.target);
						reader.onload = function() {
							//清除缓存
							_this.createFile();
							_this.bindFileEvent();
							_this.settings.imageReady && _this.settings.imageReady(_this.target, this.result);
							if (_this.settings.ajax) {
								var data = {};
								data[_this.settings.ajax.name || 'file'] = this.result;
								$.ajax({
									type: 'post',
									url: _this.settings.ajax.url,
									data: data,
									dataType: 'json',
									success: function(result) {
										if (_this.settings.callback) {
											_this.settings.callback(result);
										}
									},
									complete: function() {
										_this.settings.endUpload && _this.settings.endUpload(_this.target);
									}
								});
							} else
							if (_this.settings.callback) {
								_this.settings.callback(this.result, file, _this.name);
							}
						};
						reader.readAsDataURL(file);
					} else {
						alert("不是图片文件");
						break;
					}
				};
			});
		}
	};
	return Mobile_upload;
});