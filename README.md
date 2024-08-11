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

### Api

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
