import manifest from '@neos-project/neos-ui-extensibility';

import wrapWithKeyboardListener from './WrapWithKeyboardListener';

manifest('Neos.Neos.Ui.ExtensibilityExamples:WrapWithKeyboardListener', {}, globalRegistry => {
    const containerRegistry = globalRegistry.get('containers');

    const App = containerRegistry.get('App')

    const InsertModeModal = containerRegistry.get('Modals/InsertModeModal');

    containerRegistry.set('App', wrapWithKeyboardListener([InsertModeModal])(App));
});
