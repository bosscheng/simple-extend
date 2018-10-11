!(function () {

    function _isArray(obj) {
        return typeof obj === 'array';
    }

    // 纯粹的对象，通过  {}  / new Object 创建的。
    function _isPlainObject(obj) {
        var proto;
        var Ctor;
        //
        var toString = Object.prototype.toString;
        // has own property
        var hasOwn = Object.hasOwnProperty;
        //
        var hasOwnString = hasOwn.toString;

        // 如果为空 或者不是 object 类型的直接 返回
        if (!obj || toString.call(obj) !== '[object Object]') {
            return false;
        }

        //
        proto = Object.getPrototypeOf(obj);

        // object with no prototype (Object.create(null))
        if (!proto) {
            return true;
        }

        // 是否存在 constructor 属性
        Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;

        return typeof Ctor === 'function' && hasOwnString.call(Ctor) === hasOwnString.call(Object);
    }

    function extend() {
        var src;
        var copyIsArray;
        var copy;
        var name;
        var options;
        var clone;
        var target = {};// 最终生成的 对象
        var target1 = arguments[0] || {}; //
        var length = arguments.length;
        var deep = false; // 是否深入递归
        var i = 0;

        // 如果存在 deep 参数。
        if (typeof target1 === 'boolean') {
            deep = target1;
            i++;
        }

        for (; i < length; i++) {
            //
            if ((options = arguments[i]) != null) {
                // 遍历 object
                for (name in options) {
                    src = target[name]; //
                    copy = options[name];

                    // 防止死循环
                    if (target === copy) {
                        continue;
                    }

                    //
                    if (deep && copy && (_isPlainObject(copy) || (copyIsArray = _isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && _isArray(src) ? src : [];
                        }
                        else {
                            clone = src && _isPlainObject(src) ? src : {};
                        }

                        // 递归
                        target[name] = extend(deep, clone, copy);
                    }
                    // 直接覆盖式写法
                    else if (target !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }

    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function () {
            return extend;
        });
        // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = extend;
    } else {
        // browser
        window.extend = extend;
    }


})();