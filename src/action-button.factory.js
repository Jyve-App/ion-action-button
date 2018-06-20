'use strict'

class $actionButton {
  constructor ($rootScope, $compile, $ionicBody, $animate) {
    Object.assign(this, {$rootScope, $compile, $ionicBody, $animate})
  }

  create (options) {
    let scope = this.$rootScope.$new(true)
    let visible = true

    scope.options = options
    scope.options.removeOnStateChange = true
    scope.menuOpened = false

    //  Compile the template
    let element = scope.element = this.$compile('<ion-action-button on-create="show()" options="options" dispatcher="buttonClicked(data)"></ion-action-button>')(scope)

    let mainButtonElement
    let secondaryButtonsContainer

    // append to the body
    this.$ionicBody.append(element)

    scope.removeButton = () => {
      if (scope.removed) {
        return
      }

      scope.removed = true
      return this.$animate
        .addClass(mainButtonElement, 'action-button-hide')
        .then(() => {
          visible = false
          scope.$destroy()
          element.remove()
        })
    }

    scope.buttonClicked = (data) => {
      // we handle main button clicks
      if (data.type === 'main') {
        // if we have secondary actions...
        if (data.openMenu) {
          // if menu is opened, we close it
          if (scope.menuOpened) {
            element.removeClass('action-button-menu-show')
            element.addClass('action-button-menu-hide')
            this.$animate.addClass(secondaryButtonsContainer, 'action-button-small-hide').then(() => {
              secondaryButtonsContainer.removeClass('action-button-small-show')
              secondaryButtonsContainer.removeClass('action-button-small-hide')
              secondaryButtonsContainer.addClass('action-button-small-container__hidden')
              scope.menuOpened = false
            })
          } else {
            // if menu is closed, we open it
            element.removeClass('action-button-menu-hide')
            element.addClass('action-button-menu-show')
            secondaryButtonsContainer.removeClass('action-button-small-container__hidden')
            this.$animate.addClass(secondaryButtonsContainer, 'action-button-small-show')
              .then(() => {
                scope.menuOpened = true
              })
          }
        } else {
          // if we don't have secondary actions
          if (scope.options.mainAction.onClick) {
            return scope.options.mainAction.onClick()
          }
          return
        }
      }

      if (data.type === 'secondary') {
        if (scope.options.buttons[data.index].onClick) {
          return scope.options.buttons[data.index].onClick()
        }
      }
    }

    scope.show = () => {
      // hack to wait till the element is appended? dont know...
      this.$animate.addClass(element, 'button-active').then(() => {
        visible = true
        mainButtonElement = angular.element(element[0].getElementsByClassName('action-button'))
        secondaryButtonsContainer = angular.element(element[0].getElementsByClassName('action-button-small-container'))

        if (scope.options.startHidden) {
          return
        }
        return this.$animate.addClass(mainButtonElement, 'action-button-show')
      })
    }

    scope.showButton = () => {
      return this.$animate.addClass(mainButtonElement, 'action-button-show')
        .then(() => {
          visible = true
        })
    }

    scope.hideButton = () => {
      return this.$animate.addClass(mainButtonElement, 'action-button-hide').then(() => {
        mainButtonElement.removeClass('action-button-show')
        mainButtonElement.removeClass('action-button-hide')
        element.removeClass('action-button-menu-hide')
        visible = false
      })
    }

    // auto remove when state changes
    let __rootListener = this.$rootScope.$on('$stateChangeSuccess', () => {
      if (scope.options.removeOnStateChange) {
        scope.removeButton()
        __rootListener()
      }
    })

    return {
      show: () => {
        return scope.showButton()
      },
      hide: () => {
        return scope.hideButton()
      },
      remove: () => {
        return scope.removeButton()
      },
      visible: () => {
        return visible
      }
    }
  }
}

export const ActionButtonFactory = ($rootScope, $compile, $ionicBody, $animate) => {
  'ngInject'
  return new $actionButton($rootScope, $compile, $ionicBody, $animate)
}
