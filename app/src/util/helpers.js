import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
	if (!token) return true;

	try {
		const { exp } = jwtDecode(token);
		return Date.now() >= exp * 1000;
	} catch (e) {}
};

export const objectMatch = (obj1, obj2) => {
	const sortedKeys1 = Object.keys(obj1).sort();
	const sortedKeys2 = Object.keys(obj2).sort();

	if (sortedKeys1.length !== sortedKeys2.length) {
		return false;
	}

	for (let i = 0; i < sortedKeys1.length; i++) {
		const key1 = sortedKeys1[i];
		const key2 = sortedKeys2[i];

		if (key1 !== key2) {
			return false;
		}

		const val1 = obj1[key1];
		const val2 = obj2[key2];

		if (val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object') {
			if (!objectMatch(val1, val2)) {
				return false;
			}
		} else if (val1 !== val2) {
			return false;
		}
	}

	return true;
};
