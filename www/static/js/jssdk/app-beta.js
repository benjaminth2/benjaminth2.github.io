var app = {};
app.debug = false;
app.isCordova = true;

app.showDataFn = function(data) {
  if (app.debug) {
    console.log(data);
  } else {
    console.log(data);
  }
};

window.doCheckScanResultAndGo = function(ret, IsCheck) {
  if (IsCheck!=null&&IsCheck == true) {


    console.log("ret.DeviceList:" + ret.DeviceList.length );
    var DeviceList = ret.DeviceList;
   // if (DeviceList) {
    console.log("ret.DeviceList:" + ret.DeviceList.length );
     // if (DeviceList.length > 0) {

        console.log("ret.DeviceList:" + ret.DeviceList.length );
        var data = window.OpenDoorCheckDeviceData;
         //alert(Array.isArray(data))
        console.log("ret.DeviceList:" + window.OpenDoorCheckDeviceData);
        var data1 = window.OpenDoorData;

        console.log("window.OpenDoorData:" + data1);
        if (data) {
            var devSns=[]
            var devSns_indexs=[]
            for (var i = 0; i < data.length; i++) {
                                    devSns.push(data[i].DevSn);
                                    devSns_indexs.push(data[i].id);
                                  }
          var i1 = -1;
            i1=1;

          if(i1!=null && i1!=-1){
          //alert(i1);
            var url_ = document.getElementById("content-frame").src;
                    var QrIds=window.OpenDoorData
                    var DevId=-1
                    var QrId_=-1
                    var index_ = -1;
                     var OpenDoorFlag=null;
                    if(QrIds.length>1){

                        DevId=devSns_indexs[i1];


                                              //alert( window.OpenDoorDatas.length);

                                              for (let index = 0; index < window.OpenDoorDatas.length; index++) {
                                                const element = window.OpenDoorDatas[index];
                                                var DevId = element.DevId;
                                                if (DevId ==DevId) {
                                                  index_ = index;
                                                }
                                              }

                                              OpenDoorFlag = window.OpenDoorDatas[index_].OpenDoorFlag;

                    }else{
                        QrId_=window.OpenDoorData



                                                                      //alert( window.OpenDoorDatas.length);
                                                                      //alert(QrId_)
                                                                      for (let index = 0; index < window.OpenDoorDatas.length; index++) {
                                                                        const element = window.OpenDoorDatas[index];
                                                                        var QrId = element.QrId;
                                                                        if (QrId_ ==QrId) {
                                                                          index_ = index;
                                                                        }
                                                                      }

                                                                       OpenDoorFlag= window.OpenDoorDatas[index_].OpenDoorFlag;
                    }


                      if (OpenDoorFlag == true) {
                        window.OpenDoorData=window.OpenDoorDatas[index_].QrId;
                        var url =
                          "content-frame.html#/ele_floor_result?OpenDoorData=" + window.OpenDoorDatas[index_].QrId;

                        console.log("114:" + url);
                        document.getElementById("content-frame").src = url;
                        if (url_.indexOf(url) != -1) {
                          document
                            .getElementById("content-frame")
                            .contentWindow.location.reload(true);
                        }
                      } else {
                          setTimeout(function(){ navigator.vibrate(500); }, 100);
                          setTimeout(function(){ alert("成功"); }, 500);
                      }

            }else{
              setTimeout(function(){window.app.DoorMasterSdkUtil.checkDevices(window, "0"); }, 3000);
            }
        }else{
          setTimeout(function(){window.app.DoorMasterSdkUtil.checkDevices(window, "0"); }, 3000);
        }
  }
};
app.Init = function() {
  if (app.isCordova) {
    window.cordovaScanCallBackHandler = function(ret) {
      console.log("111:" + JSON.stringify(ret));

      //console.log(window.OpenDooData!=null)
      if (ret) {
        var resObj = JSON.parse(ret);

        console.log(resObj.IsCheck != null);
        if (resObj.IsCheck != null) {
          window.doCheckScanResultAndGo(resObj, resObj.IsCheck);
        }
      }
    };
    window.cordovaScanCallBack = function(retIn) {
      if (retIn) {
        window.cordovaScanCallBackHandler(retIn);
      }
    };
    window.cordovaCallBackHandler1 = function(ret) {
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

              setTimeout(function(){ navigator.vibrate(500); }, 100);
              setTimeout(function(){ alert("成功"); }, 500);

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
    window.cordovaCallBack1 = function(retIn) {
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
    window.cordovaCallBackHandler = function(ret) {
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
    window.cordovaCallBack = function(retIn) {
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
app.bind_action = function() {
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

  // body...
};
