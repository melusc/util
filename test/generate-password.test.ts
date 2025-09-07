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

import {
	generatePassword,
	lowercaseCharSet,
	numberCharSet,
	specialCharSet,
	uppercaseCharSet,
} from '../src/generate-password.js';

test('default options', () => {
	const password = generatePassword();

	assert.equal(password.length, 32);
	assert.match(password, /.*[a-z]/);
	assert.match(password, /.*[A-Z]/);
	assert.match(password, /.*\d/);
	assert.match(password, /.*[^\da-z]/i);
});

test('lower, upper, special, number, length 2', () => {
	const password = generatePassword({
		length: 2,
		lowercase: true,
		uppercase: true,
		special: true,
		number: true,
	});

	assert.match(password, /.*[a-z]/);
	assert.match(password, /.*[A-Z]/);
	assert.match(password, /.*\d/);
	assert.match(password, /.*[^\da-z]/i);
});

test('length 200', () => {
	const password = generatePassword({
		length: 200,
		uppercase: true,
		lowercase: true,
		special: true,
		number: true,
	});
	assert.deepEqual(password.length, 200);
});

test('upper, length 200', () => {
	const password = generatePassword({
		length: 200,
		uppercase: true,
		lowercase: false,
		special: false,
		number: false,
	});

	assert.match(password, /^[A-Z]{200}$/);
});

test('lower, length 200', () => {
	const password = generatePassword({
		length: 200,
		uppercase: false,
		lowercase: true,
		special: false,
		number: false,
	});

	assert.match(password, /^[a-z]{200}$/);
});

test('number, length 200', () => {
	const password = generatePassword({
		length: 200,
		uppercase: false,
		lowercase: false,
		special: false,
		number: true,
	});

	assert.match(password, /^\d{200}$/);
});

test('special, length 200', () => {
	const password = generatePassword({
		length: 200,
		uppercase: false,
		lowercase: false,
		special: true,
		number: false,
	});

	assert.match(password, /^[^\da-z]{200}$/i);
});

test('lower, upper, special, number, length 65535', () => {
	const password = generatePassword({
		length: 65_535,
		uppercase: true,
		lowercase: true,
		special: true,
		number: true,
	});

	assert.equal(password.length, 65_535);

	assert.deepEqual(
		// eslint-disable-next-line @typescript-eslint/no-misused-spread
		new Set([...password].toSorted()),
		new Set(
			[
				// eslint-disable-next-line @typescript-eslint/no-misused-spread
				...(uppercaseCharSet +
					lowercaseCharSet +
					numberCharSet +
					specialCharSet),
			].toSorted(),
		),
	);
});
