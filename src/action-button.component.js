'use strict'

import ActionButtonTemplate from './action-button.html'
import './action-button.scss'
import { ActionButtonComponentCtrl } from './action-button.controller'

let ActionButtonComponent = {
  template: ActionButtonTemplate,
  bindings: {
    options: '<',
    dispatcher: '&',
    onCreate: '&'
  },
  controller: ActionButtonComponentCtrl
}

export { ActionButtonComponent }
