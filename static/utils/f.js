module.exports = {
	    sort: function (a, tar, hightolow, usinglen, tar2) { //排序大小,tar相同时再按tar2排序
	      var i = 0,
	        j = 0,
	        t = 0;
	      if (typeof a != 'object') return a;
	      if (a.length == 0) return a;
	      if (typeof hightolow !== 'boolean') hightolow = true
	      for (i = 0; i < a.length; i++) {
	        for (j = 0; j < a.length; j++) {
	          if (usinglen) {
	            if (hightolow ? (a[i][tar].length > a[j][tar].length) : (a[i][tar].length < a[j][tar].length)) { // 相邻元素两两对比
	              t = a[i];
	              a[i] = a[j];
	              a[j] = t;
	            }
	          } else if (hightolow ? (a[i][tar] > a[j][tar]) : (a[i][tar] < a[j][tar])) { // 相邻元素两两对比
	            t = a[i];
	            a[i] = a[j];
	            a[j] = t;
	          } else if ((a[i][tar] == a[j][tar]) && tar2) {
	            if (hightolow ? (a[i][tar2] > a[j][tar2]) : (a[i][tar2] < a[j][tar2])) {
	              t = a[i];
	              a[i] = a[j];
	              a[j] = t;
	            }
	          }
	          ////console.log('i:' + i + ' j:' + j + '  当前数组为：' + a);
	        }
	      }
	      return a;
	    },
	    showFail(res) {
	      wx.hideLoading({
	        success: (res) => {},
	      })
	      wx.showModal({
	        title: '错误',
	        content: res.errMsg,
	        showCancel: false
	      })
	    },
	    formatTime(time) {
	      var util = require('./util.js')
	      const tmp_dayTime = util.formatTime(new Date(time)).split("/").split("-")
	      return tmp_dayTime
	    },
	    getTime(date, time, src) { //src是是否返回地址格式（没有:）
	      if (typeof date == 'undefined') date = true
	      if (typeof time == 'undefined') time = true
	      if (typeof src == 'undefined') src = false
	
	      var util = require('./util.js')
	      const tmp_dayTime = util.formatTime(new Date());
	      if (date && !time) return tmp_dayTime.split(" ")[0].split("/").join("-")
	      if (!date && time)
	        if (!src) return tmp_dayTime.split(" ")[1]
	      else return tmp_dayTime.split(" ")[1].split(":").join("-")
	      if (date && time)
	        if (!src) return tmp_dayTime.split(" ")[0].split("/").join("-") + " " + tmp_dayTime.split(" ")[1]
	      else return tmp_dayTime.split(" ")[0].split("/").join("-") + "-" + tmp_dayTime.split(" ")[1].split(":").join("-")
	    },
	    isTimeLimit(taskid, timelimit, showTip) {
	      if (typeof timelimit != 'number') timelimit = 10
	      if (typeof tmp_PullDownLimitTime[taskid] != 'number') tmp_PullDownLimitTime[taskid] = 0
	      var time = (new Date()).getTime()
	      if (time - tmp_PullDownLimitTime[taskid] < timelimit * 1000) {
	        wx.stopPullDownRefresh({
	          success: (res) => {},
	        })
	        if (showTip)
	          wx.showModal({
	            showCancel: false,
	            title: '时间限制',
	            content: showTip + '，请' + (timelimit - (time - tmp_PullDownLimitTime[taskid]) / 1000 + 1).toFixed(0) + '秒后再试。'
	          })
	        return false
	      } else {
	        tmp_PullDownLimitTime[taskid] = time
	        return true
	      }
	    },
	    tmp_showRealtime(show, real, trans, dividechar) {
	      if (typeof dividechar != 'string') dividechar = ' '
	      if (show) return trans + dividechar + real
	      else return trans
	    },
	    transTimes(realtime, showRealtime, vaguetype, dividechar) { //转换realtime至相对时间，realtime的格式是2021-02-05 19:00
	      if (typeof realtime != 'string') return ''
	      if (realtime == '') return ''
	      if (typeof showRealtime != 'boolean') showRealtime = false
	      if (typeof vaguetype != 'boolean') vaguetype = true
	      if (typeof dividechar != 'string') dividechar = ' '
	      //var date = realtime.split(" ")[0]
	      if (realtime.substr(0, 1) == 'D') realtime = realtime.substr(1)
	      var time = realtime.split(" ")[1]
	      var timemin = time.split(":")[0] + ":" + time.split(":")[1]
	      //if (updatetime || nowtime == null) {
	      //Time = this.getTime(true, true, false)
	      //}
	      //var nowdate = Time.split(" ")[1]
	      //var nowtime = Time.split(" ")[0]
	
	      var dateBegin = new Date(realtime.replace(/-/g, "/")); //将-转化为/，使用new Date
	      var dateEnd = new Date(); //获取当前时间
	      var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
	      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
	      var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
	      var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
	      //计算相差分钟数
	      var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
	      var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
	      //计算相差秒数
	      var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
	      var seconds = Math.round(leave3 / 1000)
	      ////console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
	      ////console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数", hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");
	
	      //return
	      //旧算法
	      //var nt = nowtime.split(":")
	      var t = time.split(":")
	      //var h0 = Number(nt[0]),
	      var h = Number(t[0])
	      /*var m0 = Number(nt[1]),
	        m = Number(t[1])
	  
	      var dt = date.split("-")
	      var dt0 = nowdate.split("-")
	      var y = Number(dt[0]),
	        y0 = Number(dt0[0])
	      var mn = Number(dt[1]),
	        mn0 = Number(dt0[1])
	      var d = Number(dt[2]),
	        d0 = Number(dt0[2])*/
	      var today = new Date()
	      today.setHours(0);
	      today.setMinutes(0);
	      today.setSeconds(0);
	      today.setMilliseconds(0);
	      var dmilisec = today.getTime() - dateBegin.getTime(); //时间差的毫秒数
	      var dday = Math.floor(dmilisec / (24 * 3600 * 1000)); //计算出相差天数
	
	      //非模糊模式（聊天
	      if (!vaguetype) {
	        if (dateDiff < 0) return f.tmp_showRealtime(showRealtime, realtime, '未来', dividechar)
	        else if (dateDiff < 3600 * 1000) {
	          //一小时以内
	          if (dateDiff < 120 * 1000) return f.tmp_showRealtime(showRealtime, realtime, '刚刚', dividechar)
	          else return f.tmp_showRealtime(showRealtime, realtime, minutes + "分钟前", dividechar)
	        } else if (dateDiff < 3600 * 1000 * 5) {
	          return f.tmp_showRealtime(showRealtime, realtime, hours + "小时" + minutes + "分钟前", dividechar) //5小时内
	        } else if (dday < 2) { //48小时内
	          var text = ''
	          switch (dday) {
	            case -1:
	              text = '今天';
	              break
	            case 0:
	              text = '昨天';
	              break
	            case 1:
	              text = '前天';
	              break
	          }
	          return f.tmp_showRealtime(showRealtime, realtime, text + ' ' + timemin, dividechar)
	        } else {
	          var wday = dateEnd.getDay() || 7; // 周日是0 改成7
	          var Mon = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1 - wday).getTime();
	          var lastMon = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1 - wday - 7).getTime();
	          var mitime = dateBegin.getTime()
	          if (mitime >= Mon) { //这周但超过了2天
	            return f.tmp_showRealtime(showRealtime, realtime, f.getWeekDay(dateBegin.getDay()) + ' ' + timemin, dividechar)
	          } else if (mitime >= lastMon) {
	            return f.tmp_showRealtime(showRealtime, realtime, '上' + f.getWeekDay(dateBegin.getDay()) + ' ' + timemin, dividechar)
	          } else return realtime
	        }
	        return '错误'
	      }
	
	      //模糊模式
	      if (dateDiff < 0) return f.tmp_showRealtime(showRealtime, realtime, '未来', dividechar)
	      else if (dateDiff < 3600 * 1000) {
	        //一小时以内
	        if (dateDiff < 120 * 1000) return f.tmp_showRealtime(showRealtime, realtime, '刚刚', dividechar)
	        else return f.tmp_showRealtime(showRealtime, realtime, minutes + "分钟前", dividechar)
	      } else if (dateDiff < 3600 * 1000 * 5) return f.tmp_showRealtime(showRealtime, realtime, hours + "小时" + minutes + "分钟前", dividechar) //5小时内
	      else if (dday < 2) { //48小时内
	        var text = ''
	        /*var yesterday = (new Date()).setTime(dateEnd.getTime() - 24 * 60 * 60 * 1000);
	        var yesterdaytext = this.formatTime(yesterday).split(" ")[0]
	        yesterday.setHours(0);
	        yesterday.setMinutes(0);
	        yesterday.setSeconds(0);
	        yesterday.setMilliseconds(0);*/
	        switch (dday) {
	          case -1:
	            text = '今天';
	            break
	          case 0:
	            text = '昨天';
	            break
	          case 1:
	            text = '前天';
	            break
	        }
	        return f.tmp_showRealtime(showRealtime, realtime, text + f.getTimeText(h), dividechar)
	      } else {
	        var wday = dateEnd.getDay() || 7; // 周日是0 改成7
	        var Mon = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1 - wday).getTime();
	        var lastMon = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1 - wday - 7).getTime();
	        var mitime = dateBegin.getTime()
	        if (mitime >= Mon) { //这周但超过了2天
	          return f.tmp_showRealtime(showRealtime, realtime, f.getWeekDay(dateBegin.getDay()) + f.getTimeText(h), dividechar)
	        } else if (mitime >= lastMon) {
	          return f.tmp_showRealtime(showRealtime, realtime, '上' + f.getWeekDay(dateBegin.getDay()), dividechar)
	        } else return realtime
	      }
	    },
	    getTimeText(h) {
	      var text = ''
	      if (h >= 0 && h < 2) text = text + '午夜'
	      else if (h >= 2 && h < 4) text = text + '凌晨'
	      else if (h >= 4 && h < 6) text = text + '黎明'
	      else if (h >= 6 && h < 8) text = text + '清晨'
	      else if (h >= 8 && h < 11) text = text + '上午'
	      else if (h >= 11 && h < 13) text = text + '中午'
	      else if (h >= 13 && h < 16) text = text + '下午'
	      else if (h >= 16 && h < 19) text = text + '傍晚'
	      else if (h >= 19 && h < 22) text = text + '晚上'
	      else if (h >= 22 && h < 24) text = text + '深夜'
	      return text
	    },
	    getWeekDay(a) {
	      switch (a) {
	        case 0:
	          return '周日'
	        case 1:
	          return '周一'
	        case 2:
	          return '周二'
	        case 3:
	          return '周三'
	        case 4:
	          return '周四'
	        case 5:
	          return '周五'
	        case 6:
	          return '周六'
	        case 7:
	          return '周日'
	        default:
	          return ''
	      }
	    }
}