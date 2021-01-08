export default function datefilter(value) {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'short'
	}
	return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}