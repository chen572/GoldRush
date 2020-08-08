export const toggleAnimation = (clicked) => {
    $(clicked).toggleClass('click')
    if ($(clicked).hasClass('one-player')) { $('.two-player').removeClass('click') }
    if ($(clicked).hasClass('two-player')) { $('.one-player').removeClass('click') }
    if ($(clicked).hasClass('local')) { $('.remote').removeClass('click'); $('.find-button').attr('disabled', true) }
    if ($(clicked).hasClass('remote')) {
        $('.one-player').removeClass('click')
        $('.two-player').addClass('click')
        $('.local').removeClass('click')
        $('.computer').removeClass('click')
        $('.find-button').removeAttr('disabled')
    }
    if ($(clicked).hasClass('computer')) {
        $('.remote').removeClass('click')
        $('.two-player').removeClass('click')
        $('.local').addClass('click')
        $('.one-player').addClass('click')
        $('.find-button').attr('disabled', true)
    }
}

export const keyMap =
{
    i: [1, 'up'],
    k: [1, 'down'],
    j: [1, 'left'],
    l: [1, 'right'],
    w: [2, 'up'],
    s: [2, 'down'],
    a: [2, 'left'],
    d: [2, 'right']
}
