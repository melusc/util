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

import {randomBytes} from 'node:crypto';

export type SlugOptions = {
	appendRandomHex?: boolean;
};

export function makeSlug(s: string, options: SlugOptions = {}) {
	// Turn 'ß' into 'ss' (and maybe more?)
	s = s.trim().toUpperCase().toLowerCase();

	// à -> a
	s = s.normalize('NFKD').replaceAll(/\p{Diacritic}/gu, '');

	if (options.appendRandomHex !== false) {
		s += '-' + randomBytes(4).toString('hex');
	}

	// Merge many "-", "_", and spaces into single "-"
	s = s.replaceAll(/[\s_\-/]+/g, '-');

	s = s.replaceAll(/[^\da-z-]/g, '');

	// Remove leading and trailing `-`
	s = s.replaceAll(/^-+|-+$/g, '');

	return s;
}
