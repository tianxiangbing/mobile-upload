# p_upload
手机上传图片
##用法
		<button id="btn_upload">upload</button>
		<script src="../src/jquery-1.9.1.min.js"></script>
		<script src="../src/p_upload.js"></script>
		<script>
		var upload = new P_upload();
		upload.init({target:$('#btn_upload'),multiple:true,callback:function(result,name,postName){
			$('body').append('<img src="'+result+'"/><input type="hidden" name="'+postName+'"/>');
		}});
		</script>
***
##或者
		<script src="../src/jquery-1.9.1.min.js"></script>
		<script src="../src/p_upload-jquery.js"></script>
		<button class="p_upload">upload</button>
		<script>
		$(function(){
			$('.p_upload').P_upload({multiple:true,callback:function(result,name,postName){
				$('body').append('<img src="'+result+'"/><input type="hidden" name="'+postName+'"/>');
			}});
		});
		</script>
***注意：使用jquery的写法，引用的js文件是p_upload-jquery.js  ***
#属性和方法
##属性
###target:
		上传的对象结点(jquery方式调用的为它本身)
###multiple:
		是否上传多张
##方法
###callback:function(result,name,postName)
		上传完成后的回调,参数result是返回图片数据，name是文件名,postName是隐藏input的name，方便form提交时使用