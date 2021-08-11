function writeResult(ResultData) {
    if (ResultData) {
        // console.log(ResultData);
    }
}

function SaveDataAndGo(qrCodeProcessData) {
    console.log("SaveDataAndGo " + JSON.stringify(qrCodeProcessData));
    if (window) {
        if (qrCodeProcessData) {
            var app = window.app;
            if (app) {
                var DbUtil = app.DbUtil;
                var DoorMasterSdkUtil = app.DoorMasterSdkUtil;
                if (DbUtil) {
                    console.log("DbUtil.saveQrCodeData");
                    DbUtil.saveQrCodeData(window, qrCodeProcessData, function(qrCodeIds) {
                        console.log("1114");
                        if (qrCodeIds && Array.isArray(qrCodeIds)) {
                            var BtnList = qrCodeProcessData.BtnList;
                            var EstateData = qrCodeProcessData.EstateData;
                            var DevIds = [];
                            if (EstateData && Array.isArray(EstateData)) {
                                for (var i = 0; i < EstateData.length; i++) {
                                    DevIds.push(EstateData[i].DevId);
                                }
                                window.app.DoorMasterSdkUtil.queryAllDeviceDataFromDb(window, DevIds, function(res) {
                                    if (cordova.platformId == 'ios') {
                                        res = JSON.parse(res);
                                    }
                                    var devSns = [];
                                    if (res && res.rows && res.rows.length > 0) {
                                        var rows = res.rows;
                                        for (var i = 0; i < rows.length; i++) {
                                            // devSns.push(rows[i].DevSn);
                                            devSns.push(rows[i]);
                                        }
                                        window.OpenDoorCheckDeviceData = devSns;
                                        if (BtnList && Array.isArray(BtnList)) {
                                            var l = BtnList.length;
                                            if (l == 1) {
                                                if (DoorMasterSdkUtil) {

                                                    window.OpenDoorData = qrCodeIds;
                                                    DoorMasterSdkUtil.openDoor(window, BtnList[0], -1);
                                                }
                                            } else {
                                                var QrIds = JSON.stringify(qrCodeIds);
                                                var url =
                                                    "content-frame.html#/ele_call?QrIds=" + QrIds;
                                                window.app.showDataFn("11112：" + url);
                                                document.getElementById("content-frame").src = url;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    }
}

function doQrCodeScan() {
    if (window.app) {
        window.app.OtherUtil.openQrCodeScaner(
            window,
            function(returnData) {
                writeResult(returnData);
            },
            function(errorData) {
                // body...
                writeResult(errorData);
            }
        );
    }
}

function openDoorAndOutputEqualZero() {
    var app = window.app;
    if (app) {
        var btnData = {
            DeviceId: 101,
            Output: 0
        };
        window.cordovaCallBack(1);
        app.DoorMasterSdkUtil.openDoor(
            window,
            btnData,
            function(returnData) {
                writeResult(returnData);
            },
            function(errorData) {
                // body...
                writeResult(errorData);
            }
        );
    }
}

function openDoor() {
    var app = window.app;
    if (app) {
        var btnData = {
            DeviceId: 101,
            Output: 10
        };
        window.cordovaCallBack(1);
        app.DoorMasterSdkUtil.openDoor(window, btnData, function(returnData) {
            writeResult(returnData);
        });
    }
}

function doScanDevice() {
    window.app.DoorMasterSdkUtil.checkDevices(window, "1", function(ret) {
        console.log(ret);
    });
}

function doQrCodeScanAndGo() {
    console.log("index.js doQrCodeScanAndGo");
    var isSim = device.isVirtual;
    window.device = {};
    window.device.isVirtual = isSim;
    if (window.app) {
        if (!isSim) {
            window.app.OtherUtil.openQrCodeScanner(window, function(qrCodeScanResultData) {
                writeResult(qrCodeScanResultData);
                var temp = xorCrypt(qrCodeScanResultData);
                try {
                    JSON.parse(temp);
                } catch (e) {
                    alert("Invalid QR code");
                    document.getElementById("content-frame").src = 'content-frame.html';
                }
                window.app.DataProcessUtil.processQrCodeScanResultData(window, temp, function(returnData) {
                    console.log("processQrCodeScanResultData returned");
                    SaveDataAndGo(returnData);
                });
            });
        } else {
            var qrCodeScanResultData = "]$K$*]]$龋閆笪丆埈<Eor&Ihc&Btgaih$*]$笪7庡<Djiem&7$*]$7虙橙<Jo`r&7$*&$D5*D4*D7*A*7*4*5*3*76*77*74*75*72*73*70*71$*&$7*4*5*2*3*0*1*>*?*76*77*74*75*72*73*70$*&$26$*&$7311>6>666$*&$$[[[[*]24*25[[";
            writeResult(qrCodeScanResultData);
            var temp = xorCrypt(qrCodeScanResultData);
            window.app.DataProcessUtil.processQrCodeScanResultData(window, temp, function(returnData) {
                console.log("processQrCodeScanResultData returned");
                console.log("cordova.file.documentsDirectory: " + cordova.file.documentsDirectory);
                SaveDataAndGo(returnData);
            });
        }
    }
}
