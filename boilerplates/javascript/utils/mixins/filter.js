/* eslint-disable vue/component-name-in-template-casing */
// eslint-disable-next-line vue/component-name-in-template-casing
export default {
  directives: {
    numeric: {
      bind(el) {
        // this two prevent from copy&paste non-number text, including "e".
        // need to have both together to take effect.
        el.type = 'tel'
        // el.addEventListener('input', e => {
        //   return el.validity.valid || (el.value = '')
        // })

        // this prevents from typing non-number text, including "e".
        el.addEventListener('keypress', (evt) => {
          evt = evt || window.event
          const charCode = evt.which ? evt.which : evt.keyCode
          if (charCode < 48 || charCode > 57) evt.preventDefault()
          else return true
        })
      },
    },
    alpha: {
      bind(el) {
        el.addEventListener('input', () => {
          return el.validity.valid || (el.value = '')
        })

        el.addEventListener('keypress', (evt) => {
          evt = evt || window.event
          const charCode = evt.which ? evt.which : evt.keyCode
          if (
            (charCode >= 65 && charCode <= 90) ||
            (charCode >= 95 && charCode <= 122) ||
            charCode === 32
          )
            return true
          else evt.preventDefault()
        })
      },
    },
    alphaNumeric: {
      bind(el) {
        el.addEventListener('input', () => {
          return el.validity.valid || (el.value = '')
        })

        // this prevents from typing non-number text, including "e".
        el.addEventListener('keypress', (evt) => {
          evt = evt || window.event
          const charCode = evt.which ? evt.which : evt.keyCode
          const charStr = String.fromCharCode(charCode)
          if (/[a-z0-9]/i.test(charStr) || charCode === 32) return true
          else evt.preventDefault()
        })
      },
    },
    idCard: {
      bind(el) {
        el.addEventListener('input', () => {
          return el.validity.valid || (el.value = '')
        })

        // this prevents from typing non-number text, including "e".
        el.addEventListener('keypress', (evt) => {
          evt = evt || window.event
          const charCode = evt.which ? evt.which : evt.keyCode
          const charStr = String.fromCharCode(charCode)
          if (/[a-z0-9]/i.test(charStr)) return true
          else evt.preventDefault()
        })
      },
    },
  },
}
