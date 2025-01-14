/*!
Copyright (C) 2024  Luca Schnellmann

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import {assert, test} from 'vitest';

import {RelativeUrl} from '../src/relative-url.ts';

test('pathname only', () => {
	const u = new RelativeUrl('/abc');

	assert.equal(u.path, '/abc');
	assert.equal(u.href, '/abc');

	u.path = '/def';

	assert.equal(u.path, '/def');
	assert.equal(u.href, '/def');
});

test('search', () => {
	const u = new RelativeUrl('?a=b');

	assert.equal(u.search, '?a=b');
	assert.equal(u.searchParams.get('a'), 'b');
	assert.equal(u.href, '/?a=b');

	u.searchParams.delete('a');
	assert.equal(u.search, '');

	u.search = 'b=c';
	assert.equal(u.search, '?b=c');
	assert.equal(u.searchParams.get('b'), 'c');
	assert.equal(u.href, '/?b=c');
});

test('hash', () => {
	const u = new RelativeUrl('#abc');

	assert.equal(u.hash, '#abc');
	assert.equal(u.href, '/#abc');

	u.hash = '';

	assert.equal(u.hash, '');
	assert.equal(u.href, '/');

	u.hash = 'def';

	assert.equal(u.hash, '#def');
	assert.equal(u.href, '/#def');
});

test('href', () => {
	const u = new RelativeUrl('/path?query=1#hash');

	assert.equal(u.path, '/path');
	assert.equal(u.search, '?query=1');
	assert.equal(u.hash, '#hash');
	assert.equal(u.href, '/path?query=1#hash');

	assert.throws(() => {
		// @ts-expect-error Is readonly
		u.href = '/';
	});
});

test('Cloning', () => {
	const url = new URL('http://localhost/abc?query=1#h1');
	const rUrl = new RelativeUrl(url);

	assert.equal(rUrl.href, '/abc?query=1#h1');

	const rUrlClone = new RelativeUrl(rUrl);

	assert.equal(rUrlClone.href, '/abc?query=1#h1');

	assert.notEqual(rUrl, rUrlClone);
	assert.notEqual(rUrl.searchParams, rUrlClone.searchParams);
});

test('Base url', () => {
	// Base url string
	assert.equal(new RelativeUrl('./a', '/b/c').href, '/b/a');
	assert.equal(new RelativeUrl('a', '/b/c').href, '/b/a');
	assert.equal(new RelativeUrl('/a', '/b/c').href, '/a');

	// Base url RelativeUrl
	assert.equal(new RelativeUrl('./a', new RelativeUrl('/b/c')).href, '/b/a');
	assert.equal(new RelativeUrl('a', new RelativeUrl('/b/c')).href, '/b/a');
	assert.equal(new RelativeUrl('/a', new RelativeUrl('/b/c')).href, '/a');

	// Base url URL
	assert.equal(
		new RelativeUrl('./a', new URL('https://google.com/b/c')).href,
		'/b/a',
	);
	assert.equal(
		new RelativeUrl('a', new URL('https://google.com/b/c')).href,
		'/b/a',
	);
	assert.equal(
		new RelativeUrl('/a', new URL('https://google.com/b/c')).href,
		'/a',
	);
});
