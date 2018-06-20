# ion-action-button

This is a small AngularJS module that adds a FAB button to your Ionic 1.x application


The $actionButton removes itself from the DOM when the view changes.

# Install

`npm install ion-action-button`

Then include the `.css` and `js`. Add the script tags or use a module loader.

Webpack:
``` javascript
import 'ion-action-button'
import 'ion-action-button/dist/ion-action-button.css'
```

Then include the angular module dependency

``` javascript
angular.module('sweet.app', ['ionActionButton'])
```

# API

`$actionButton.create(options)` - returns an object with the methods below:

`show()` - Shows the button. Return promise.

`hide()` - Hides the button. Return promise.

`remove()` - Remove the button. Return promise.

`visible()` - Return boolean. True if visible, false if not.


# Example
``` javascript
.controller('exmapleCtrl', ($scope, $actionButton) => {
  //you create a new action button.
  let actionButton = $actionButton.create({
    mainAction: {
      icon: 'ion-android-create',//Uses ionicons icons.
      backgroundColor: 'blue',
      textColor: ' white',
      onClick: () => {
        console.log('clicked main BUTTON');
      }
    },
    buttons: [{
      //if this array is empty or the buttons key non existant
      //there will be no secondary actions.
      //If there are secondary actions, the main action is overwritten to show
      //the open and close sub menu

      //shows pin icons with a 'find' label

      icon: 'ion-android-pin',
      label: 'Find',
      backgroundColor: 'red',
      iconColor: 'white',
      onClick: () => {
        console.log('clicked pin');
      }
    }, {
      //shows a label and icon defaults to first letter of label
      label: 'Ben Sparrow',
      onClick: () => {
        console.log('clicked O');
      }
    }, {
      //shows a label and icon is the letter configured
      label: 'Max Lynx',
      letter: 'O'
      onClick: () => {
        console.log('clicked Testing');
      }
    }]
  });

  actionButton.hide().then(() => {
    console.log('Do something after hide');
  });

  actionButton.show().then(() => {
    console.log('Do something after show');
  });
})
```

# Thanks

This code was originally forked from `Fernando`'s https://market.ionicframework.com/plugins/material-action-button. It has been rewritten, addressing some bug, with `ES6`, `ng-annotate`, bundled with `webpack`. Thank you the great start `Fernando`.
