Handlebars.registerHelper('ifCoin', function (arg1) {
    return arg1 === 'c'
})

Handlebars.registerHelper('ifObstacle', function (arg1) {
    return arg1 === 'x'
})

Handlebars.registerHelper('ifPlayerOne', function (arg1) {
    return arg1 === 1
})

Handlebars.registerHelper('ifPlayerTwo', function (arg1) {
    return arg1 === 2
})