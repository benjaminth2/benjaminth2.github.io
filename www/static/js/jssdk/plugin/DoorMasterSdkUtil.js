var DoorMasterSdkUtil = {};

DoorMasterSdkUtil.debug = true;
DoorMasterSdkUtil.dbName = "encrypted.db";
DoorMasterSdkUtil.key = "encrypted";
DoorMasterSdkUtil.queryAllDeviceDataFromDb = function(
    windowObj,
    deviceids,
    cbfn
) {
    this.doJsAction(windowObj, "queryAllDeviceData", deviceids, cbfn)
};

DoorMasterSdkUtil.queryDeviceDataFromDb = function(windowObj, deviceid, cbfn) {
    if (windowObj) {
        if (windowObj.sqlitePlugin) {
            var db = windowObj.sqlitePlugin.openDatabase({
                name: DoorMasterSdkUtil.dbName, //'unencrypted.db',
                key: DoorMasterSdkUtil.key,
                location: 0,
            });
            var sql = 'select * from dev where id = "' + deviceid + '"';
            windowObj.app.showDataFn(db != null);
            windowObj.app.showDataFn(sql);
            db.executeSql(
                sql,
                [],
                function(rs) {
                    var str = "Record count (expected to be n): " + rs.rows.item(0);
                    windowObj.app.showDataFn(str);
                    if (cbfn) {
                        //windowObj.app.showDataFn(typeof(rs.rows.item(0)))
                        cbfn(rs.rows.item(0));
                    }
                },
                function(error) {
                    windowObj.app.showDataFn(error);
                }
            );
        }
    }
};

DoorMasterSdkUtil.doJsAction = function(
    windowObj,
    actionCode,
    actionData,
    dataSucessCallBackFn,
    dataErrorCallBackFn
) {
    if (windowObj) {
        var cordova = windowObj.cordova;
        if (cordova) {
            console.log("getSqliteDbData");
            windowObj.app.showDataFn(actionCode);
            windowObj.app.showDataFn(actionData);

            cordova.plugins.CommunicationHelper.doJsAction(
                actionCode,
                actionData,
                function(returnData) {
                    if (returnData) {
                        if (dataSucessCallBackFn) {
                            dataSucessCallBackFn(returnData);
                        }
                    }
                },
                function(errorData) {
                    if (errorData) {
                        if (dataErrorCallBackFn) {
                            dataErrorCallBackFn(errorData);
                        }
                    }
                }
            );
        }
    }
};
DoorMasterSdkUtil.checkDevices = function(windowObj, isCheck, dataCallBackFn) {
    var dataCallBackFn_ = function(resultData) {
        if (resultData) {
            if (dataCallBackFn) {
                dataCallBackFn(resultData);
            }
        }
    };
    var OpenDoorCheckDeviceData = window.OpenDoorCheckDeviceData;

    if (OpenDoorCheckDeviceData) {
        var data = {
            "OpenDoorCheckDeviceData": JSON.stringify(OpenDoorCheckDeviceData),
            "IsCheck": isCheck,
            "Rssi": "-100"
        }
        this.doJsAction(windowObj, "scanDevice", JSON.stringify(data), dataCallBackFn_);
    }

};

DoorMasterSdkUtil.openDoor = function(windowObj, deviceId, outPut, dataCallBackFn) {
    var dataCallBackFn_ = function(resultData) {
        if (resultData) {
            if (dataCallBackFn) {
                dataCallBackFn(resultData);
            }
        }
    };
    if (outPut != null) {
        if (windowObj) {
            if (outPut != -1) {
                var i = windowObj.OpenDoorData;
                console.log(i);
                if (i != null) {
                    var index_ = -1;
                    for (let index = 0; index < windowObj.OpenDoorDatas.length; index++) {
                        const element = windowObj.OpenDoorDatas[index];
                        var qrid = element.QrId;
                        if (qrid == i) {
                            index_ = index;
                        }
                    }
                    console.log(index_);
                    windowObj.OpenDoorDatas[index_].OpenDoorFlag = false;
                }
            }
            var cordova = windowObj.cordova;
            if (!cordova) return;
            var data = {
                DeviceId: deviceId,
                Output: outPut
            };
            var inDataStr = JSON.stringify(data);
            this.doJsAction(windowObj, "openDoor", inDataStr, dataCallBackFn_);
        }
    }
};
