'use strict';

const 
    js0 = require('js0')
;

class Lock
{

    constructor()
    {
        this._queue = [];
    }

    async sync(obj, fn)
    {
        js0.args(arguments, null, 'function');

        let subqueue = this._getSubqueue(obj);
        if (subqueue === null)
            subqueue = this._createQueue(obj);

        subqueue.push(fn);

        console.log('Liiii');

        if (subqueue.length === 1)
            await this._executeNextFn(obj);
    }


    _createQueue(obj)
    {
        let subqueue = [];
        this._queue.push([ obj, subqueue ]);

        return subqueue;
    }

    _getSubqueue(obj)
    {
        for (let subqueue of this._queue) {
            if (subqueue[0] === obj)
                return subqueue[1];
        }

        return null;
    }

    async _executeNextFn(obj)
    {
        let subqueue = this._getSubqueue(obj);
        if (subqueue.length === 0)
            return;

        let fn = subqueue[0];
        subqueue.shift();

        await fn();
        this._executeNextFn(obj);
    }

}
module.exports = Lock;