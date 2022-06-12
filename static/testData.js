var data = {
	"info": {
		"items": {
			"name": "特定物品", 
			"level": 1, 
			"lists": [
				{
					"name": "灯笼", 
					"tip": "识别到灯笼，您可能...等等", 
					"level": 1, 
					"pos": { 
						"x": 0.1,
						"y": 0.1,
						"width": 0.1,
						"height": 0.1
					}
				}
			]
		},
		"face": {
			"name": "生物信息",
			"level": 3,
			"lists": [{
				"name": "人脸1", 
				"tip": "人脸1", 
				"pos": { 
					"x": 0.2,
					"y": 0.2,
					"width": 0.2,
					"height": 0.1
				}
			}]
		},
		"landmark": 
		{
			"name": "地点标志",
			"level": 2,
			"lists": [{
				"name": "地点1", 
				"tip": "地点1", 
				"level": 2, 
				"pos": { 
					"x": 0.8,
					"y": 0.8,
					"width": 0.1,
					"height": 0.1
				}
			}]
		},
		"text": {
			"name": "文本",
			"level": 2,
			"lists": [{
				"name": "文本1", 
				"tip": "文本1", 
				"level": 2, 
				"pos": { 
					"x": 0.5,
					"y": 0.2,
					"width": 0.1,
					"height": 0.1
				}
			}]
		},
		"exif": {
			"name": "照片信息",
			"level": 3,
			"lists": [{
					"name": "地点",
					"tip": "照片的地点信息:A省A市A区（40.00°N，120°E）",
					"level": 3,
					"pos": false
				},
				{
					"name": "时间",
					"tip": "照片的拍摄时间信息:2022年2月14日 13:00:00",
					"level": 3,
					"pos": false
				},
				{
					"name": "设备型号",
					"tip": "照片的拍摄设备型号信息: Canon 5700 未使用闪光灯",
					"level": 3,
					"pos": false 
				}
			]
		},
		"zother": {
			"name": "其他信息",
			"level": 0,
			"lists": [{
					"name": "1",
					"tip": "1",
					"pos": {
						"x": 0.5,
						"y": 0,
						"width": 0.1,
						"height": 0.1
					}
				},{
					"name": "3",
					"tip": "3",
					"pos": {
						"x": 0.6,
						"y": 0,
						"width": 0.1,
						"height": 0.1
					}
				},{
					"name": "2",
					"tip": "2",
					"pos": {
						"x": 0.7,
						"y": 0,
						"width": 0.1,
						"height": 0.1
					}
				},
			]
		}
	},
	"pic": {
		"width": 1,
		"height": 1,
		"orientation": 0
	}
}
module.exports = {
	data: data
}