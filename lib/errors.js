/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016, Joyent, Inc.
 */

module.exports = {
	ZKProtocolError: ZKProtocolError,
	ZKError: ZKError,
	ZKPingTimeoutError: ZKPingTimeoutError,
	ZKNotConnectedError: ZKNotConnectedError
};

const mod_assert = require('assert-plus');
const mod_util = require('util');

function ZKProtocolError(code, msg) {
	if (Error.captureStackTrace)
		Error.captureStackTrace(this, ZKProtocolError);
	this.code = code;
	this.name = 'ZKProtocolError';
	this.message = code + ': ' + msg;
}
mod_util.inherits(ZKProtocolError, Error);

function ZKPingTimeoutError() {
	if (Error.captureStackTrace)
		Error.captureStackTrace(this, ZKPingTimeoutError);
	ZKProtocolError.call(this, 'PING_TIMEOUT',
	    'The server failed to answer a ping within the required interval');
	this.name = 'ZKPingTimeoutError';
}
mod_util.inherits(ZKPingTimeoutError, ZKProtocolError);

function ZKNotConnectedError() {
	if (Error.captureStackTrace)
		Error.captureStackTrace(this, ZKNotConnectedError);
	ZKProtocolError.call(this, 'CONNECTION_LOSS',
	    'The ZooKeeper client is not currently connected and cannot ' +
	    'accept new requests.');
	this.name = 'ZKNotConnectedError';
}
mod_util.inherits(ZKNotConnectedError, ZKProtocolError);

function ZKError(code, msg) {
	if (Error.captureStackTrace)
		Error.captureStackTrace(this, ZKError);
	this.code = code;
	this.name = 'ZKError';
	this.message = code + ': ' + msg;
}
mod_util.inherits(ZKError, Error);
