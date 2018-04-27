//服务支持邮箱
var supportMail = '1191837698@qq.com';

//设置全局AJAX配置（跨域支持,携带cookie）
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
});

// 常规浏览器语言和IE浏览器
String.prototype.orEnglish = function (en) {
    var lang = navigator.language || navigator.userLanguage;
    lang = lang.substr(0, 2);
    return (lang === 'zh') ? this.toString() : en;
};

// 跳转页面
function jumpToURL(URL) {
    window.location.href = URL;
    //$("#jump").attr("action", URL);
    //$("#jump").submit();
    //$('#jump').attr('href',URL);  
    //$('a#toMain>p').trigger('click') ;
}

// 这个接口用来保存永久数据(localStorage)
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify({ value: value }));
}

function loadData(key) {
    var data = localStorage.getItem(key);
    return data ? JSON.parse(data).value : null;
}

// 这个接口用来保存临时数据，浏览器关闭时会清空(sessionStorage)
function saveCache(key, value) {
    sessionStorage.setItem(key, JSON.stringify({ value: value }));
}

function loadCache(key) {
    var data = sessionStorage.getItem(key);
    return data ? JSON.parse(data).value : null;
}

//翻译数字
function getSequence(num) {
    if (isNaN(num)) {
        return num;
    }
    return (num == 1) ? '1st' : (num == 2) ? '2nd' : (num == 3) ? '3rd' : (num > 3) ? (num + 1) + 'th' : num;
}

//获取所有供应商
function getSuppliers() {
    var cacheKey = 'suppliers';
    var result = loadCache(cacheKey);
    if (result) {
        console.log('Find suppliers in cache.');
    } else {
        $.ajax({
            url: 'http://localhost:8091/api/basic/supplier/all',
            type: 'GET',
            async: false,   // 同步获取数据
            dataType: "json",
            success: function (result) {
                result = result;
                saveCache(cacheKey, result);
            },
        });
    }
    result = loadCache(cacheKey);
    return result;
}

//获取所有产品
function getProduces() {
    var cacheKey = 'produces';
    var result = loadCache(cacheKey);
    if (result) {
        console.log('Find produces in cache.');
    } else {
        $.ajax({
            url: 'http://localhost:8091/api/basic/produce/all',
            type: 'GET',
            async: false,   // 同步获取数据
            dataType: "json",
            success: function (result) {
                result = result;
                saveCache(cacheKey, result);
            },
        });
    }
    result = loadCache(cacheKey);
    return result;
}

//获取所有采购订单(分页获取)
function getPurchaseOrders(statusId, pageNum, pageSize) {
    var statusId = statusId;
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'purchaseOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: 'http://localhost:8091/api/purchase/order/all?statusId=' + statusId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取所有生产订单(分页获取)
function getProduceOrders(statusId, pageNum, pageSize) {
    var statusId = statusId;
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'produceOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: 'http://localhost:8091/api/produce/order/all?statusId=' + statusId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取所有销售订单(分页获取)
function getSaleOrders(statusId, pageNum, pageSize) {
    var statusId = statusId;
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'saleOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: 'http://localhost:8091/api/sale/order/all?statusId=' + statusId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取待付款订单-采购订单(分页获取)
function getToPayOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'toPayOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: 'http://localhost:8091/api/purchase/order/toPay?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取已付款订单-采购订单(分页获取)
function getAlreadyPayOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'alreadyPayOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: 'http://localhost:8091/api/purchase/order/alreadyPay?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取待收款(定金)订单-销售订单(分页获取)
function getIsPayDepositOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'isPayDepositOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: 'http://localhost:8091/api/sale/order/isPayDeposit?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取待收款(尾款)订单-销售订单(分页获取)
function getIsPayFinalOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'isPayFinalOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: 'http://localhost:8091/api/sale/order/isPayFinal?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

//获取已完成订单-销售订单(分页获取)
function getIsSuccessOrders(pageNum, pageSize) {
    var pageNum = pageNum;
    var pageSize = pageSize;
    var result;
    var cacheKey = 'isSuccessOrders';
    sessionStorage.removeItem(cacheKey);
    $.ajax({
        url: 'http://localhost:8091/api/sale/order/isSuccess?pageNum=' + pageNum + '&pageSize=' + pageSize,
        data: {},
        type: 'GET',
        cache: false,    //关闭缓存
        async: false,   // 同步获取数据
        dataType: "json",
        success: function (result) {
            result = result;
            saveCache(cacheKey, result);
        },
    });
    result = loadCache(cacheKey);
    return result;
}

























function checkManifestFile(vueComponent, file) {
    var fileName = file.name;
    var fileSuffix = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (fileSuffix != 'xml') {
        vueComponent.$message.error('请选择xml格式的manifest文件。'.orEnglish('Please select a xml format file.'));
        return false;
    }
    var MAX_SIZE = 3 * 100 * 1024; //max manifest file size is 300kb.
    if (file.size > MAX_SIZE) {
        vueComponent.$message.error('上传文件的大小不要超过300kb。'.orEnglish('Upload file size should not exceed 300kb.'));
        return false;
    }
    return true;
}



Array.prototype.expandParams = function () {
    for (var i = 0; i < this.length; i++) {
        var params = this[i].parameters;
        for (var j = 0; j < params.length; j++) {
            var key = params[j].name;
            this[i][key] = params[j].value;
        }
    }
};
