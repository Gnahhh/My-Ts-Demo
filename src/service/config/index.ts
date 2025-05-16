let BASE_URL = '';

const TIME_OUT = 10000;

if (import.meta.env.MODE === 'development') {
	BASE_URL = '开发环境ip';
} else if (import.meta.env.MODE === 'production') {
	BASE_URL = '生产环境ip';
} else {
	BASE_URL = '测试环境ip';
}

export { BASE_URL, TIME_OUT };
