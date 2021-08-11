var DbUtil = {};
DbUtil.key = "encrypted";

DbUtil.queryAllQrCodeData = function(windowObj, cbfn) {
    if (windowObj) {
        var cordova = windowObj.cordova;
        if (cordova) {
            var platformId = cordova.platformId;
            if (platformId) {
                if (platformId == "android") {
                    DbUtil.queryAllQrCodeData_(windowObj,
                      function(rs) {
                            var data = JSON.stringify(rs.rows);
                            var str = "Record count (expected to be n): " + data;
                            windowObj.app.showDataFn(str);
                            if (cbfn) {
                                cbfn(data);
                            }
                        },
                        function(err) {
                            windowObj.app.showDataFn(err);
                        }
                    );
                } else {
                    var querySql = "select * from qrcode";
                    DbUtil.doQuery(windowObj, querySql, [], function(rs) {
                        var data = JSON.stringify(rs.rows);
                        var str = "Record count (expected to be n): " + data;
                        windowObj.app.showDataFn(str);
                        if (cbfn) {
                            cbfn(data);
                        }
                    });
                }
            }
        }
    }
};

DbUtil.queryOneQrCodeData = function(windowObj, id, cbfn) {
    windowObj.app.showDataFn("11111");
    if (windowObj) {
        var cordova = windowObj.cordova;
        if (cordova) {
            var platformId = cordova.platformId;
            if (platformId) {
                // if (platformId == "android") {
                windowObj.app.showDataFn("11112");
                DbUtil.queryOneQrCodeData_(
                    windowObj,
                    id,
                    function(rs) {
                        windowObj.app.showDataFn("11113");
                        if (rs) {
                          if (cordova.platformId == "ios") rs = JSON.parse(rs);
                            var data = rs.rows;
                            if (cbfn) {
                                cbfn(data);
                            }
                        }
                    },
                    function(err) {
                        windowObj.app.showDataFn(err);
                    }
                );
                // }

                // else {
                //     var querySql = "select * from qrcode where id=?";
                //     DbUtil.doQuery(windowObj, querySql, [id], function(rs) {
                //         var data = JSON.stringify(rs.rows);
                //         var str = "Record count (expected to be n): " + data;
                //         windowObj.app.showDataFn(str);
                //         if (cbfn) {
                //             cbfn(data);
                //         }
                //     });
                // }
            }
        }
    }
};

DbUtil.updateAllowSearch = function(windowObj, qrCodeId, cbfn) {
    console.log("updateAllowSearch");
    if (windowObj) {
        var cordova = windowObj.cordova;
        if (cordova) {
            var platformId = cordova.platformId;

            if (platformId) {
                if (platformId == "android") {
                    DbUtil.updateAllowSearch_(
                        windowObj,
                        qrCodeId,
                        function(res) {
                            if (res) {
                                console.log(JSON.stringify(res));
                                console.log("updateAllowSearch");
                                if (cbfn) {
                                    cbfn(res);
                                }
                            }
                        },
                        function(err) {
                            windowObj.app.showDataFn(err);
                        }
                    );
                } else {
                    var insertCallBackFn = function(rs) {
                        if (res) {
                            if (res.affected_rows) {
                                if (cbfn) {
                                    cbfn(res.affected_rows);
                                }
                            }
                        }
                    };

                    var querySql = "update qrcode set AllSearch=1 where id=?";

                    var querySqlPrams = [];

                    querySqlPrams.push(qrCodeId);

                    DbUtil.doQuery(windowObj, querySql, querySqlPrams, insertCallBackFn);
                }
            }
        }
    }

    if (qrCodeIds.length > 0) {
        if (cbfn) {
            cbfn(qrCodeIds);
        }
    }
};

DbUtil.saveQrCodeData = function(windowObj, qrCodeProcessData, cbfn) {
    var this_ = this;
    if (windowObj) {
        var cordova = windowObj.cordova;
        if (!cordova) return;
        if (qrCodeProcessData) {
            var buildMaps = qrCodeProcessData.EstateData;
            var BtnList = qrCodeProcessData.BtnList;
            var l = BtnList.length;
            if (cordova.platformId && true) { // platformId == "android") {
                var insertCallBackFn = function(res) {
                    if (res) {
                        var resData = JSON.parse(res);
                        if (resData) {
                            var state = resData.state;
                            if (state == 0) {
                                windowObj.app.showDataFn("resData.data:" + resData.data);
                                var r = resData.data;
                                var qrCodeIds = [];
                                if (r != null && Array.isArray(r) && r.length > 0) {
                                    //windowObj.app.showDataFn("1112")
                                    for (let index = 0; index < r.length; index++) {
                                        const element = r[index];
                                        qrCodeIds.push(element.Id);
                                        console.log("DbUtil.saveQrCodeData element = " + element);

                                        windowObj.OpenDoorDatas.push({
                                            CallButtonDevId: parseInt(element.CallButtonDevId),
                                            DevId: parseInt(element.DevId),
                                            QrId: parseInt(element.Id),
                                            OpenDoorFlag: true,
                                        });
                                    }


                                    console.log(JSON.stringify(windowObj.OpenDoorDatas));
                                    if (cbfn) {
                                        cbfn(qrCodeIds);
                                    }
                                }
                            }
                        }
                    }
                };
                var saveQrCodeDatas = [];
                var doOne = function(BtnList, buildMaps, index) {
                    console.log(index);
                    const id = BtnList[index]
                    console.log(id);

                    for (let index = 0; index < buildMaps.length; index++) {
                        let temp = buildMaps[index];
                        temp.CallButtonDevId = id;
                        temp.AllowSearch = 0;
                        saveQrCodeDatas.push(JSON.stringify(temp));

                    }
                    var i11111111111111 = index + 1;
                    console.log(saveQrCodeDatas)
                    if (i11111111111111 != BtnList.length) {
                        doOne(BtnList, buildMaps, i11111111111111)

                    } else {
                        return false;
                    }
                }
                doOne(BtnList, buildMaps, 0);
                var saveQrCodeDatasREAL = [];
                for (var i = 0; i < saveQrCodeDatas.length; i++) {
                    saveQrCodeDatasREAL.push(JSON.parse(saveQrCodeDatas[i]));
                }
                //alert(JSON.stringify(saveQrCodeDatas));
                DbUtil.saveQrCodeData_(
                    windowObj,
                    JSON.stringify(saveQrCodeDatasREAL),
                    insertCallBackFn,
                    function(err) {
                        windowObj.app.showDataFn(err);
                    }
                );
            } else {
                // var i = 0;
                // var i1 = 0;
                // var insertOne = function(i, BtnList) {
                //     var buildMap = buildMaps[i];
                //     const element = BtnList[i1];
                //     var querySql =
                //         "insert into qrcode values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
                //     var querySqlPrams = [];
                //     if (buildMap) {
                //         const element = BtnList[index];
                //
                //         var querySqlPrams = [];
                //
                //         querySqlPrams.push(buildMap.DevId);
                //         querySqlPrams.push(buildMap.Estate);
                //         querySqlPrams.push(buildMap.Building);
                //         querySqlPrams.push(buildMap.Machine);
                //         querySqlPrams.push(buildMap.Button);
                //         querySqlPrams.push(0);
                //         querySqlPrams.push(buildMap.OutPut);
                //         querySqlPrams.push(buildMap.Type);
                //         querySqlPrams.push(element);
                //
                //         DbUtil.doQuery(
                //             windowObj,
                //             querySql,
                //             querySqlPrams,
                //             insertCallBackFn
                //         );
                //     }
                // };
                // var insertCallBackFn = function(res) {
                //     if (res) {
                //         var resData = JSON.parse(res);
                //         if (resData) {
                //             var state = resData.state;
                //             if (state == 0) {
                //                 windowObj.app.showDataFn("resData.data:" + resData.data);
                //                 windowObj.app.showDataFn(qrCodeIds.length);
                //                 qrCodeIds.push(resData.data);
                //                 windowObj.app.showDataFn(qrCodeIds.length);
                //             }
                //         }
                //         i = i + 1;
                //         if (i == buildMaps.length - 1) {
                //             if (i1 != l) {
                //                 i = 0;
                //                 i1 = 1;
                //                 insertOne(i, BtnList);
                //             } else {
                //                 //windowObj.app.showDataFn("1111")
                //                 //windowObj.app.showDataFn(qrCodeIds.length)
                //                 if (qrCodeIds.length > 0) {
                //                     //windowObj.app.showDataFn("1112")
                //                     for (let index = 0; index < qrCodeIds.length; index++) {
                //                         const element = qrCodeIds[index];
                //
                //                         windowObj.OpenDoorDatas.push({
                //
                //                             qrid: element,
                //                             openDoorFlag: true,
                //                         });
                //                     }
                //                     if (cbfn) {
                //                         cbfn(qrCodeIds);
                //                     }
                //                 }
                //             }
                //         } else {
                //             insertOne(i, BtnList);
                //         }
                //     }
                // };
                // insertOne(i, BtnList);
            }
        }
    }
    windowObj.app.showDataFn("1111");
    windowObj.app.showDataFn(qrCodeIds.length);
    if (qrCodeIds.length > 0) {
        windowObj.app.showDataFn("1111");
        if (cbfn) {
            cbfn(qrCodeIds);
        }
    }
};
//just for ios
DbUtil.doQuery = function(windowObj, querySql, querySqlPrams, cbfn) {
    if (windowObj) {
        if (windowObj.sqlitePlugin) {
            var db = windowObj.sqlitePlugin.openDatabase({
                name: DbUtil.dbName,
                key: DbUtil.key,
                location: 0,
            });

            windowObj.app.showDataFn(db != null);
            windowObj.app.showDataFn(sql);
            db.executeSql(querySql, querySqlPrams, cbfn, function(error) {
                windowObj.app.showDataFn(error);
            });
        }
    }
};

//just for android
DbUtil.saveQrCodeData_ = function(windowObj, qrSaveData, saveCallBack, saveErrorCallBack) {
    console.log("DbUtil.saveQrCodeData_ 1");
    if (windowObj) {
        var app = windowObj.app;
        if (app) {
            var DoorMasterSdkUtil = app.DoorMasterSdkUtil;
            if (DoorMasterSdkUtil) {
                var actionCode = "saveQrCodeData";
                DoorMasterSdkUtil.doJsAction(windowObj, actionCode, qrSaveData, saveCallBack, saveErrorCallBack);
            }
        }
    }
};
//just for android
DbUtil.queryAllQrCodeData_ = function(
    windowObj,
    queryCallBack,
    queryErrorCallBack
) {
    if (windowObj) {
        var app = windowObj.app;
        if (app) {
            var DoorMasterSdkUtil = app.DoorMasterSdkUtil;
            if (DoorMasterSdkUtil) {
                var actionCode = "queryAllQrCodeData";
                DoorMasterSdkUtil.doJsAction(
                    windowObj,
                    actionCode,
                    "1111",
                    queryCallBack,
                    queryErrorCallBack
                );
            }
        }
    }
};
//just for android
DbUtil.queryOneQrCodeData_ = function(windowObj, qrCodeId, queryCallBack, queryErrorCallBack) {
    if (windowObj) {
        var app = windowObj.app;
        if (app) {
            var DoorMasterSdkUtil = app.DoorMasterSdkUtil;
            if (DoorMasterSdkUtil) {
                var actionCode = "queryOneQrCodeData";
                DoorMasterSdkUtil.doJsAction(windowObj, actionCode, qrCodeId, queryCallBack, queryErrorCallBack);
            }
        }
    }
};
DbUtil.updateAllowSearch_ = function(
    windowObj,
    qrCodeId,
    queryCallBack,
    queryErrorCallBack
) {
    if (windowObj) {
        var app = windowObj.app;
        if (app) {
            var DoorMasterSdkUtil = app.DoorMasterSdkUtil;
            if (DoorMasterSdkUtil) {
                var actionCode = "updateAllowSearch";
                DoorMasterSdkUtil.doJsAction(
                    windowObj,
                    actionCode,
                    qrCodeId,
                    queryCallBack,
                    queryErrorCallBack
                );
            }
        }
    }
};
