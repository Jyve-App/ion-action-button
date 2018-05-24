'use strict'

class ActionButtonComponentCtrl {
  constructor ($timeout) {
    'ngInject'
    this.$timeout = $timeout
  }

  closeMenu (data) {
    // we simulate a main button touch order to close
    data.openMenu = true
    this.dispatcher({
      data: data
    })
  }

  $postLink () {
    this.$timeout(() => {
      this.onCreate()
    })
  }

  buttonClicked (data) {
    // if the element has no buttons configured...
    if (!this.options.buttons || !this.options.buttons.length) {
      this.dispatcher({
        data: data
      })
      return
    }

    // if the element has buttons configured...
    // we pass the openMenu true prop...
    if (data.type === 'main') {
      data.openMenu = true
      this.dispatcher({
        data: data
      })
      return
    }

    // any other click here has to be from a small button
    this.dispatcher({
      data: data
    })
  }
}

export { ActionButtonComponentCtrl }
