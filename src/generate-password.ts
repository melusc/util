import {randomInt} from 'node:crypto';

export const lowercaseCharSet = 'abcdefghijklmnopqrstuvwxyz';
export const uppercaseCharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const numberCharSet = '0123456789';
export const specialCharSet = '~!@#$%^&*()_-+=:;<,>.?/';

function randomChar(chars: string) {
	const index = randomInt(chars.length);
	return chars.charAt(index);
}

function shuffleArray(array: unknown[]) {
	for (let index1 = array.length - 1; index1 > 0; index1--) {
		const index2 = randomInt(index1);
		[array[index1], array[index2]] = [array[index2]!, array[index1]!];
	}
}

export type Options = {
	length?: number;
	number?: boolean;
	uppercase?: boolean;
	lowercase?: boolean;
	special?: boolean;
};
/**
 *
 * @param options.length default 32, length of password
 * @param options.number default true, allow password to contain numbers
 * @param options.uppercase default true, allow password to contain uppercase characters
 * @param options.lowercase default true, allow password to contain lowercase characters
 * @param options.special default true, allow password to contain special characters
 * @returns {string}
 */
export function generatePassword(options: Options = {}): string {
	// For `-luns` it pushes a lowercase, uppercase, etc. character
	// to the password, to guarantee at least one of each
	// Any requested type is also pushed to `allCharSet`
	// The rest of the password will be taken from there
	let allCharSet = '';
	const password: string[] = [];

	if (options.lowercase !== false) {
		allCharSet += lowercaseCharSet;
		password.push(randomChar(lowercaseCharSet));
	}

	if (options.uppercase !== false) {
		allCharSet += uppercaseCharSet;
		password.push(randomChar(uppercaseCharSet));
	}

	if (options.number !== false) {
		allCharSet += numberCharSet;
		password.push(randomChar(numberCharSet));
	}

	if (options.special !== false) {
		allCharSet += specialCharSet;
		password.push(randomChar(specialCharSet));
	}

	const length = options.length ?? 32;
	while (password.length < length) {
		password.push(randomChar(allCharSet));
	}

	shuffleArray(password);
	return password.join('');
}
