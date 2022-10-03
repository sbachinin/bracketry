import { get_default_or_custom_node } from './get_default_or_custom_node.mjs'

const get_default_round_name = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const get_round_titles = (all_data, get_option) => {
    return all_data.rounds.map((r, i) => {
        const content = get_default_or_custom_node(
            () => r.name || get_default_round_name(all_data.rounds.length, i),
            get_option('getRoundTitleElement'),
            [r, i, all_data],
            'getRoundTitleElement'
        )

        const wrapper = document.createElement('div')
        wrapper.className = 'round-title'

        if (typeof content === 'string') {
            wrapper.innerHTML = content
        } else if (content instanceof Element) {
            wrapper.append(content)
        }

        return wrapper
    })
}
