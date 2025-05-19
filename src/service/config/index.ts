let BASE_URL = '';
let TIME_OUT = 100;

if (import.meta.env.MODE === 'development') {
	BASE_URL = 'http://codercba.com:5000';
	TIME_OUT = 1000;
} else if (import.meta.env.MODE === 'production') {
	BASE_URL = '生产环境ip';
	TIME_OUT = 1000;
} else {
	BASE_URL = '测试环境ip';
	TIME_OUT = 2000;
}

export { BASE_URL, TIME_OUT };
