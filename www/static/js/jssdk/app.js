var app = {};
app.debug = false;
app.isCordova = true;

app.showDataFn = function (data) {
  if (app.debug) {
    console.log(data);
  } else {
    console.log(data);
  }
};

window.doCheckScanResultAndGoFlag =false;

//处理进来的电梯扫描device
window.doCheckScanResultAndGo = function (resObj) {
    var OpenDoorFlag = null;
    var DevId=resObj.Go_Next_Flag;

    if(DevId!=null){
    if(DevId!=-1){
       for (let index = 0; index < window.OpenDoorDatas.length; index++) {
          const element = window.OpenDoorDatas[index];
          var DevId_ = element.DevId;
          if (DevId == DevId_) {
            index_ = index;
          }
        }

      OpenDoorFlag = window.OpenDoorDatas[index_].OpenDoorFlag;
       if (OpenDoorFlag == true) {
          window.OpenDoorData = window.OpenDoorDatas[index_].QrId;
          var url =
            "content-frame.html#/ele_floor_result?OpenDoorData=" + window.OpenDoorDatas[index_].QrId;

          console.log("114:" + url);
          document.getElementById("content-frame").src = url;
          if (url_.indexOf(url) != -1) {
            document
              .getElementById("content-frame")
              .contentWindow.location.reload(true);
          }
        } }else{
          if (window.doCheckScanResultAndGoFlag) {
            setTimeout(function(){window.app.DoorMasterSdkUtil.checkDevices(window, "0"); }, 500);
          }
        }
      }else{
          if (window.doCheckScanResultAndGoFlag) {
            setTimeout(function(){window.app.DoorMasterSdkUtil.checkDevices(window, "0"); }, 500);
          }
        }
}


app.Init = function () {
  if (app.isCordova) {
        window.cordovaScanCallBackHandler = function (resObj) {
          if (resObj) {
            console.log(resObj.IsCheck != null);

            if (resObj.IsCheck != null) {
              if (resObj.IsCheck == true) {
                //处理进来的数据
                var url_ = document.getElementById("content-frame").src;
                  window.doCheckScanResultAndGo(resObj);
              }
            }
          }
        };
    window.cordovaScanCallBack = function (retIn) {

      if (retIn) {

        // console.log("从plugin 接受到的数据:" + retIn);

        var resObj = JSON.parse(retIn);

        // console.log("从plugin 接受到的数据:" + (resObj.IsCheck != null));

        window.cordovaScanCallBackHandler(resObj);
      }
    };
    window.cordovaCallBackHandler1 = function (ret) {
      console.log("111:" + ret);

      //console.log(window.OpenDooData!=null)
      console.log("113:" + window.OpenDoorData);

      if (ret != null) {
        //ret = 0;
        if (ret == 0) {
          var url_ = document.getElementById("content-frame").src;

          var index_ = -1;
          for (let index = 0; index < window.OpenDoorDatas.length; index++) {
            const element = window.OpenDoorDatas[index];
            var QrId = element.QrId;
            if (QrId == window.OpenDoorData) {
              index_ = index;
            }
          }

          var OpenDoorFlag = window.OpenDoorDatas[index_].OpenDoorFlag;

          if (OpenDoorFlag == true) {
            var QrIds = ret;
            var url =
              "content-frame.html#/ele_floor_result?OpenDoorData=" + QrIds;

            console.log("114:" + url);
            document.getElementById("content-frame").src = url;
            if (url_.indexOf(url) != -1) {
              document
                .getElementById("content-frame")
                .contentWindow.location.reload(true);
            }
          } else {

            setTimeout(function () {
              navigator.vibrate(500);
            }, 100);
            setTimeout(function () {
              alert("Success");
            }, 500);

            //var url =
            //"content-frame.html#/ele_result?OpenDoorData=" +
            //  OpenDoorData +
            // "&OpenFloorData=" +
            // OpenFloorData;

            // console.log("114:" + url);
            //document.getElementById("content-frame").src = url;
            //if (url_.indexOf(url) != -1) {
            //document
            // .getElementById("content-frame")
            // .contentWindow.location.reload(true);
            // }
          }
        }
      }
    };
    window.cordovaCallBack1 = function (retIn) {
      if (retIn) {
        if (retIn == 0) {
          if (window.cordovaCallBackHandler1) {
            window.cordovaCallBackHandler1(retIn);
          }
        } else {
          if (window.cordovaCallBackHandler1) {
            window.cordovaCallBackHandler1(retIn);
          }
        }
      }
    };
    window.cordovaCallBackHandler = function (ret) {
    var url_ = document.getElementById("content-frame").src;
      console.log("111:" + ret);

      //console.log(window.OpenDooData!=null)
      console.log("113:" + window.OpenDoorData);

      if (ret != null) {

        if (ret == 0) {
          var url = "content-frame.html#/ele_floor_scan";

          console.log("114:" + url);
          document.getElementById("content-frame").src = url;
          if (url_.indexOf(url) != -1) {
            document
              .getElementById("content-frame")
              .contentWindow.location.reload(true);
          }
        }
      }
    };
    window.cordovaCallBack = function (retIn) {
      if (retIn) {
        if (retIn == 0) {
          if (window.cordovaCallBackHandler) {
            window.cordovaCallBackHandler(retIn);
          }
        } else {
          if (window.cordovaCallBackHandler) {
            window.cordovaCallBackHandler(retIn);
          }
        }
      }
    };
    app.bind_action();
  }
};
app.bind_action = function () {
  window.app = app;
  window.OpenDoorDatas = [];

  window.app.DataProcessUtil = DataProcessUtil;
  window.app.DataInitUtil = DataInitUtil;

  if (window.cordova.platformId != "android") {
    DataInitUtil.initData();
  }

  if (app.debug) {
    DataInitUtil.initTestData();
  }
  window.app.DoorMasterSdkUtil = DoorMasterSdkUtil;
  window.app.DbUtil = DbUtil;
  window.app.OtherUtil = OtherUtil;
  window.app.xorCrypt = xorCrypt;

  if (!device.isVirtual) {
    setTimeout(function(){
      var data = {
          DeviceId: 1,
          Output: -1
      };
      var inDataStr = JSON.stringify(data);
      DoorMasterSdkUtil.doJsAction(window, "openDoor", inDataStr, function(rtn){});
    }, 4000);
  }
  // body...
};
