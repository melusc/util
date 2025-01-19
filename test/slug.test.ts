/*!
	This program is free software: you can redistribute it
	and/or modify it under the terms of the GNU General Public
	License as published by the Free Software Foundation,
	either version 3 of the License, or (at your option)
	any later version.

	This program is distributed in the hope that it will be
	useful, but WITHOUT ANY WARRANTY; without even the implied
	warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
	PURPOSE. See the GNU General Public License for more details.

	You should have received a copy of the GNU General Public
	License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

import {assert, test} from 'vitest';

import {makeSlug} from '../src/slug.js';

const tests = {
	ö: 'o',
	Ä: 'a',
	ß: 'ss',
	ñ: 'n',
	'Alpha Beta': 'alpha-beta',
	'a-  _  -__ -b': 'a-b',
	' a92 38do   ': 'a92-38do',
	'a-b-': 'a-b',
	'-a-c-': 'a-c',
};

test.for(Object.entries(tests))('makeSlug("%s") -> "%s"', ([input, output]) => {
	const slug = makeSlug(input);
	assert.match(slug, /-[a-f\d]+$/);

	const slugNoRandomEnd = makeSlug(input, {appendRandomHex: false});
	assert(slug.startsWith(slugNoRandomEnd + '-'));

	assert.equal(slugNoRandomEnd, output);

	assert.notMatch(slug, /--/);
});
