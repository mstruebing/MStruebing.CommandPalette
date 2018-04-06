import manifest from '@neos-project/neos-ui-extensibility';

import wrapWithKeyboardListener from './WrapWithKeyboardListener';

manifest('Neos.Neos.Ui.ExtensibilityExamples:WrapWithKeyboardListener', {}, globalRegistry => {
    const containerRegistry = globalRegistry.get('containers');

    const App = containerRegistry.get('App')

    const InsertModeModal = containerRegistry.get('Modals/InsertModeModal');

    // only for demonstration of workingness

    // const exampleFunc = () => console.log('Hello World');
    // const wrapWithKeyboardListenerActionsAlreadyApplied = wrapWithKeyboardListener(exampleFunc);

    // you could pass a function or an array of functions
    // which gets executed in order when pressed the keyboard shortcut
    // elsewise a dialog will shown
    const wrapWithKeyboardListenerActionsAlreadyApplied = wrapWithKeyboardListener();
    const wrapWithKeyboardListenerElementToWrapAlreadyApplied = wrapWithKeyboardListenerActionsAlreadyApplied(App);
    // same as
    // wrapWithKeyboardListener()(App)

    containerRegistry.set('App', wrapWithKeyboardListenerElementToWrapAlreadyApplied);
});
