'use strict';

const
    js0 = require('js0'),

    Lock = require('./Lock')
;

class abLock_Class
{

    constructor() {
        this._lock = new Lock();
    }

    async sync(obj, fn) {
        js0.args(arguments, null, 'function');

        await this._lock.sync(obj, fn);
    }

}
module.exports = new abLock_Class();