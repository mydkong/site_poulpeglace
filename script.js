let isEditionMode = true
let diapoCtxMenu

const whenSelected = e => {
        e.target.parentElement.querySelector('p').style.color = '#c43e1c'
}

const whenDeselected = e => {
        e.target.parentElement.querySelector('p').style.color = ''
}

const imgOnChange = e => {
        console.log('hi')
        if (e.target.classList.contains('selected')) return
        console.log('re')

        Array.prototype.slice.call(document.querySelectorAll('.diapo img')).forEach(elem => {
                elem.classList.remove('selected')
                whenDeselected({
                        target: elem
                })
        })
        e.target.classList.add('selected')
        whenSelected(e)

        const imgUrl = e.target.getAttribute('src')
        document.querySelector('.body div.actual-slide img').setAttribute('src', imgUrl)
}

Array.prototype.slice.call(document.querySelectorAll('div.actions-bar p')).forEach(action => {
        const selectionLine = document.querySelector('div.actions-bar div.selection-line')
        action.addEventListener('mouseenter', e => {
                const width = e.target.clientWidth
                const isSelected = e.target.classList.contains('selected')

                selectionLine.style.width = `${width + (isSelected ? 0 : -12)}px`
                selectionLine.style.left = `${e.target.getBoundingClientRect().x - (isSelected ? 0 : -6)}px`
                selectionLine.style.background = isSelected ? '#c43e1c' : '#c7c7c7'
        })

        action.addEventListener('click', e => {
                const width = e.target.clientWidth

                selectionLine.style.width = `${width}px`
                selectionLine.style.left = `${e.target.getBoundingClientRect().x}px`
                selectionLine.style.background = '#c43e1c'

                Array.prototype.slice.call(document.querySelectorAll('div.actions-bar p')).forEach(action => {
                        action.classList.remove('selected')
                })

                e.target.classList.add('selected')
        })

        action.addEventListener('mouseleave', e => {
                if (document.querySelectorAll('div.actions-bar p.selected').length > 0) {
                        const selected = document.querySelector('div.actions-bar p.selected')
                        const width = selected.clientWidth
                        selectionLine.style.width = `${width}px`
                        selectionLine.style.left = `${selected.getBoundingClientRect().x}px`
                        selectionLine.style.background = '#c43e1c'
                } else {
                        selectionLine.style.background = '#0000'
                }
        })
})

Array.prototype.slice.call(document.querySelectorAll('.diapo img')).forEach(img => {
        img.addEventListener('click', e => {
                imgOnChange(e)
        })

        img.addEventListener('contextmenu', e => {
                e.preventDefault()
                const contextMenu = document.querySelector('.context-menu')

                contextMenu.style.display = 'block'
                contextMenu.style.top = `${e.clientY}px`
                contextMenu.style.left = `${e.clientX}px`

                diapoCtxMenu = e.target
        })
})

document.addEventListener('click', e => {
        const contextMenu = document.querySelector('.context-menu')
        setTimeout(() => {
                contextMenu.style.display = ''
        }, 25)
        diapoCtxMenu = e.target
})

imgOnChange({
        target: document.querySelector('.diapo img')
})

document.querySelector('.context-menu .duplicate').addEventListener('click', e => {
    diapoCtxMenu.cloneNode(true)
})