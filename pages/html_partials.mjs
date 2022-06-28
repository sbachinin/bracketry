import { get_root_folder } from '../lib/utils/utils.mjs'

export const home_link = `
    <a class="home-link" href="/${get_root_folder()}index.html">
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1zm-1.5-7.506-4.751 4.507 4.751 4.507v-3.008h10.022v-2.998h-10.022z" fill-rule="nonzero"/></svg>
        &nbsp;
        Easy playoffs
    </a>
`

export const footer = `
    <div style="
        height: 252px;
        background: repeating-linear-gradient(90deg, white 0, white 30px, black 31px, black 31px);
        margin-top: 50px;
    "></div>
`