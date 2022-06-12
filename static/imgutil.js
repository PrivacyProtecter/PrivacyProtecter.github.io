
async function compressImage(src, platform) {
	const imageInfo = await getImageInfo(src);
	const orientation = imageInfo.orientation;
	let rotate = 0;
	let quality = 80;
	if (platform === 'ios') {
		rotate = 0;
		quality = 25;
	} else {
		switch (orientation) {
			case 'up': //exif:1 不旋转
				rotate = 0;
				break;
			case 'down': //exif:3 旋转180度
				rotate = 180;
				break;
			case 'right': //exif:6 旋转90度
				rotate = 90;
				break;
			case 'left': //exif:8 旋转270度
				rotate = 270;
				break;
			default:
				rotate = 0;
				break;
		}
	}
	return new Promise(function(resolve, reject) {
		plus.zip.compressImage({
				src: src,
				dst: "_doc/uniapp_temp" + '/compressed/' + Math.round(new Date()) + '.jpg',
				format: 'jpg',
				quality: quality,
				width: 'auto',
				height: 'auto',
				rotate: rotate,
			},
			function(event) {
				let tempPath = event.target;
				resolve(tempPath)
			},
			function(error) {
				reject(error);
			});
	})
}

function getImageInfo({src,success,fail}) { //修复orientation问题
	//return new Promise(function(resolve, reject) {
		var resolve = success, reject = fail, src2 = src
		
		var fun = ()=>{
			uni.getImageInfo({
				src: src,
				success: function(image) {
					uni.getImageInfo({
						src: src2,
						success: function(imageCompressed) {
							image.orientation = imageCompressed.orientation
							
							
							console.log(image.width);
							console.log(image.height);
							console.log('orientation=' + image.orientation);
							console.log('path=' + image.path);
							
							var degarr = {
								'up': 0,
								'down': 180,
								'left': 90,
								'right': -90,
								'up-mirrored': 0,
								'down-mirrored': 180,
								'left-mirrored': 90,
								'right-mirrored': -90
							}
							var deg = 0-degarr[image.orientation]
							
							uni.compressImage({
								src: src2,
								width: '100%',
								height: '100%',
								rotate: deg,
								success(res){
									if((deg/90)%2==1){//90的奇数倍
										image.compressedHeight = image.width
										image.compressedWidth = image.height
									}else{
										image.compressedHeight = image.height
										image.compressedWidth = image.width
									}
									
									image.compressedInfo = {
										info: imageCompressed,
										rotateWH: (deg/90)%2==1,
										rotate: deg!=0,
										deg: deg,
										height: image.compressedHeight,
										width: image.compressedWidth
									}
									image.compressed = res.tempFilePath
									resolve(image)
								}
							})
							
							
						},
						fail: function(err) {
							console.log("getImageInfoErr: " + JSON.stringify(err));
							reject(err)
						}
					});
				},
				fail: function(err) {
					console.log("getImageInfoErr: " + JSON.stringify(err));
					reject(err)
				}
			});			
		}
		
		// #ifdef APP-PLUS
		uni.compressImage({
			src: src,
			width: '100%',
			height: '100%',
			success(res) {
				src2 = res.tempFilePath
				fun()
			},
			fail(err) {
				reject(err)
			}
		})
		// #endif
		// #ifdef H5 || MP-WEIXIN	
		uni.getImageInfo({
			src: src,
			success: function(image) {
				console.log(image.width);
				console.log(image.height);
				console.log('orientation=' + image.orientation);
				console.log('path=' + image.path);
				image.orientation = 'up'
				image.compressed = src
				image.compressedHeight = image.height
				image.compressedWidth = image.width
				image.compressedInfo = {
					info: image,
					rotate: false,
					rotateWH: false,
					deg: 0
				}
				resolve(image)
			},
			fail: function(err) {
				console.log("getImageInfoErr: " + JSON.stringify(err));
				reject(err)
			}
		});
		// #endif
		
		
	//});
}

module.exports = {
	compressImage: compressImage,
	getImageInfo: getImageInfo
}
export default {
	compressImage: compressImage,
	getImageInfo: getImageInfo
}