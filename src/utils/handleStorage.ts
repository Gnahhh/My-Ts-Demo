// 导出一个函数
export function useLocalStorage(prefix: string) {
	/**
	 * 设置localStorage项
	 * @param key -健
	 * @param value -值
	 * @param outTime -过期时间(单位:毫秒)
	 */
	const setItem = <T>(key: String, value: T, outTime?: number): void => {
		// 1. 使用前缀创建完整键名
		const prefixedKey = prefix + key;

		// 2. 过期判断
		const storageValue = outTime
			? {
					value,
					outTime: Date.now() + outTime
				}
			: {
					value
				};

		// 存储
		localStorage.setItem(prefixedKey, JSON.stringify(storageValue));
	};

	/**
	 * 获取localStorage的项
	 * @param key -键名
	 * @returns 存储的值
	 */
	const getItem = <T>(key: string): T | null => {
		// 获取key
		const prefixedKey = prefix + key;

		// 获取value
		const item = localStorage.getItem(prefixedKey);

		// 判断value
		if (!item) return null;

		try {
			const parsedItem = JSON.parse(item);

			if (parsedItem.outTime && parsedItem.expires < Date.now()) {
				// 已过期，删除并返回null
				removeItem(key);
				return null;
			}
			return parsedItem.value as T;
		} catch (err) {
			// 解析失败处理
			console.error('获取存储项失败:', err);
			return null;
		}
	};
	/**
	 * 删除localStorage项
	 * @param key - 键名
	 */
	const removeItem = (key: string): void => {
		const prefixedKey = prefix + key;
		// 先设置为空字符串(兼容性考虑)，再移除
		localStorage.setItem(prefixedKey, '');
		localStorage.removeItem(prefixedKey);
	};

	/**
	 * 清除所有localStorage项
	 * @param onlyWithPrefix - 是否只清除当前前缀的项
	 */
	const clearItems = (onlyWithPrefix: boolean = true): void => {
		if (onlyWithPrefix && prefix) {
			// 只清除带特定前缀的项
			Object.keys(localStorage).forEach(key => {
				if (key.startsWith(prefix)) {
					localStorage.removeItem(key);
				}
			});
		} else {
			// 清除所有项
			localStorage.clear();
		}
	};
	/**
	 * 检查键是否存在且未过期
	 * @param key - 键名
	 * @returns 是否存在有效值
	 */
	const hasItem = (key: string): boolean => {
		// 利用getItem的过期检查逻辑，简化实现
		return getItem(key) !== null;
	};
	return { setItem, getItem, removeItem, clearItems, hasItem };
}
