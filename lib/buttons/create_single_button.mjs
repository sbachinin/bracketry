import { create_element_from_Html } from '../utils/utils.mjs'

export const create_single_button = side => {
    const wrapper = create_element_from_Html(`
        <div class="scroll-button-wrapper scroll-button-wrapper-${side}">
            <div class="button-clickable-area" class="hidden">
            </div>
        </div>
    `)

    return {
        wrapper,
        clickable_area: wrapper.querySelector('.button-clickable-area')
    }
}