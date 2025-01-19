# @lusc/util

## Installation

```bash
npm i @lusc/util
yarn add @lusc/util
```

## relative-url

`relative-url` allows you to work with urls that don't contain a host, specifically, urls containing only a path, (optional) search paramaters, and a (optional) hash. It is a convenience wrapper around `URL`.

### Usage

```ts
import {RelativeUrl} from '@lusc/util/relative-url';

const url = new RelativeUrl('/path?abc=1#xyz');
url.path === '/path';
url.hash === '#xyz';
url.search === '?abc=1';

url.searchParams.set('def', '3');
console.log(url.href); // /path?abc=1&def=3#xyz
```

### API

`RelativeUrl` accepts an optional second argument `base`. You can use this for relative urls:

```ts
const url = new RelativeUrl('search', '/api/');
url.path === '/api/search';
```

`RelativeUrl` accepts `string`, `RelativeUrl`, and `URL` for both the url and the base.
Its TypeScript type is:

```ts
constructor(url: string | URL | RelativeUrl, base?: string | URL | RelativeUrl)
```

#### href

`.href` contains the full url, namely the path, search params, and hash. `.href` is readonly.

```ts
const url = new RelativeUrl('/path');
url.searchParams.set('a', 'b');
url.hash = 'hash';
url.href === '/path?a=b#hash';
```

#### path

`.path` contains the path of url. It can be used to modify the path.

```ts
const url = new RelativeUrl('/docs?p=1');
url.path === '/docs';
url.path = '/home';
url.href === '/home?p=1';
```

### search

`.search` contains the search parameters as a string.

```ts
const url = new RelativeUrl('/?q=hello');
url.search === '?q=hello';
url.searchParams.set('q', 'bye');
url.search === '?q=bye';
```

### searchParams

`.searchParams` contains the search parameters in form of `URLSearchParams`. `.searchParams` is readonly.

```ts
const url = new RelativeUrl('/search?q=ts&p=1');
console.log(url.searchParams); // URLSearchParams { q -> "ts", p -> "1" }
```

### hash

`.hash` contains the hash of the url. It can be used to modify the hash.

```ts
const url = new RelativeUrl('/#abc');
url.hash === '#abc';
url.hash = 'xyz';
url.hash === '#xyz';
```

## generate-password

Generate passwords with requirements. Customise length and charsets.

### Usage

```ts
import {generatePassword} from '@lusc/util/generate-password';

generatePassword(); // "ZPq4McdyOm.qF7oo*vGw@_wzlV(5HlMt"
generatePassword({length: 10}); // "EPiL<h8=JJ"
generatePassword({special: false}); // "43HOVXhnoCYjFI0eMSzV3FizFCmGIqM8"
```

### API

```ts
function generatePassword(options?: {
	// Specify length of generated password
	length?: number = 32;
	// Include special characters
	special?: boolean = true;
	// Include numbers
	number?: boolean = true;
	// Include lowercase characters
	lower?: boolean = true;
	// Include uppercase characters
	upper?: boolean = true;
}): string;
```

## make-slug

Sluggify strings, make url safe, remove diacritics.

### Usage

```ts
import {makeSlug} from '@lusc/util/slug';

makeSlug('Röbert the Böbert!'); // "robert-the-bobert-b9f60c69"
makeSlug('Röbert the Böbert!', {appendRandomHex: false}); // "robert-the-bobert"
```

### API

```ts
type SlugOptions = {
	appendRandomHex?: boolean;
};

function makeSlug(input: string, options?: SlugOptions): string;
```

## License

Copyright (C) 2025 Luca Schnellmann

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
