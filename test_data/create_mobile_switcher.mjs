export const create_mobile_switcher = (wrapper_el, cb) => {
    let is_mobile = false
    wrapper_el.innerHTML = `
        switch mobile layout on/off
        <svg
            style="margin-left: 10px;"
            class="crossed"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path d="M7 0c-1.105 0-2 .896-2 2v18.678c-.001 2.213 3.503 3.322 7.005 3.322 3.498 0 6.995-1.106 6.995-3.322v-18.678c0-1.104-.895-2-2-2h-10zm5 22c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm5-4h-10v-14h10v14z"/></svg>
    `
    wrapper_el.addEventListener('click', () => {
        is_mobile = !is_mobile
        cb(is_mobile)
        wrapper_el.querySelector('svg').classList[is_mobile ? 'remove' : 'add']('crossed')
    })
}