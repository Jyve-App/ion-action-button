'use strict'

import { ActionButtonFactory } from './action-button.factory'
import { ActionButtonComponent } from './action-button.component'

const moduleName = 'ionActionButton'

let module = angular.module(moduleName, [])
  .component('ionActionButton', ActionButtonComponent)
  .factory('$actionButton', ActionButtonFactory)

export const MODULE = module

export default moduleName
