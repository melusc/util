import {readFile, writeFile} from 'node:fs/promises';

import stableStringify from 'json-stable-stringify';

const packageJsonPath = new URL('../package.json', import.meta.url);
const pathsToRemove = [['scripts'], ['devDependencies'], ['packageManager']];

function removePath(path: string[], object: Record<string, unknown>) {
	if (path.length === 0) {
		throw new Error('path cannot be empty.');
	}

	let index = 0;

	while (index < path.length - 1) {
		const key = path[index]!;
		const pathStringified = ['(root)', ...path.slice(0, index)].join('.');

		if (!Object.hasOwn(object, key)) {
			throw new Error(`${pathStringified} does not have property "${key}".`);
		}

		const newObject = object[key];
		if (
			typeof newObject !== 'object' ||
			newObject === null ||
			Array.isArray(newObject)
		) {
			throw new Error(`${pathStringified}.${key} is not an object.`);
		}

		object = newObject as Record<string, unknown>;
		++index;
	}

	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
	delete object[path[index]!];
}

const inputPackageJsonRaw = await readFile(packageJsonPath, 'utf8');
const packageJson = JSON.parse(inputPackageJsonRaw) as Record<string, unknown>;

for (const path of pathsToRemove) {
	removePath(path, packageJson);
}

const outPackageJsonRaw = stableStringify(packageJson, {
	space: '\t',
})!;
await writeFile(packageJsonPath, outPackageJsonRaw);
