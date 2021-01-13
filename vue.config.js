module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '/task-list-ls/' //имя проекта на gh-pages
    : '/' //путь для development mode
}