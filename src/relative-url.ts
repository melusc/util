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

export class RelativeUrl {
	readonly #url: URL;

	constructor(
		url: string | URL | RelativeUrl,
		base?: string | URL | RelativeUrl,
	) {
		// It doesn't matter what the base url is, because that is not exposed publicly
		base ??= 'http://relativeurl/';

		if (base instanceof RelativeUrl) {
			base = base.#url;
		} else if (typeof base === 'string') {
			base = new URL(base, 'http://relativeurl/');
		}

		this.#url =
			url instanceof RelativeUrl ? new URL(url.href, base) : new URL(url, base);
	}

	get href(): string {
		const url = this.#url;

		return url.pathname + url.search + url.hash;
	}

	get path(): string {
		return this.#url.pathname;
	}

	set path(p: string) {
		this.#url.pathname = p;
	}

	get search(): string {
		return this.#url.search;
	}

	set search(s: string) {
		this.#url.search = s;
	}

	get searchParams(): URLSearchParams {
		return this.#url.searchParams;
	}

	get hash(): string {
		return this.#url.hash;
	}

	set hash(h: string) {
		this.#url.hash = h;
	}
}
