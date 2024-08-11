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

export class RelativeUrl {
	readonly #url: URL;

	constructor(base: string | URL | RelativeUrl) {
		this.#url
			= base instanceof RelativeUrl
				? new URL(base.full, 'http://localhost/')
				: new URL(base, 'http://localhost/');
	}

	get full(): string {
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
