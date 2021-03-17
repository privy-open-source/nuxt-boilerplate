import { RootMenu } from '~/types'

/**
 * Routing configuration
 *
 * Default
 * `name`   : Menu title (String)
 * `url`    : Menu URL (String)
 * `icon`   : Menu icon (String)
 * `access` : Menu role-based access control (Array of String)
 *
 * Has Children
 * `name`     : Menu title (String)
 * `url`      : Menu URL (String)
 * `icon`     : Menu icon (String)
 * `access`   : Menu role-based access control (Array of String)
 * `children` : Submenu (Children) (Array of Default)
 *
 * Note :
 * For the `access` field, you should discuss with the backend engineers. Because it depends on the API you're using.
 * If you want to find more icons for the `icon` field, see https://materialdesignicons.com.
 */
const Menu: RootMenu[] = [
  {
    name: 'Dashboard',
    url: '/admin',
    icon: 'mdi-home',
    access: ['super_admin'],
  },
  {
    name: 'Users',
    url: '/admin/users',
    icon: 'mdi-account-multiple',
    access: ['super_admin'],
  },
  {
    name: 'Submenu',
    url: '/admin/submenu',
    icon: 'mdi-subtitles',
    access: ['super_admin'],
    children: [
      {
        name: 'Settings',
        url: '/admin/submenu/setting',
        icon: '',
        access: ['super_admin'],
      },
    ],
  },
]

export default Menu
