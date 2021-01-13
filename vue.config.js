module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '/task-list-fb/' //имя проекта на gh-pages
    : '/' //путь для development mode
}