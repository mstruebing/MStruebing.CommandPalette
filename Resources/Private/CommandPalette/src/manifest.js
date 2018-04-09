import manifest from '@neos-project/neos-ui-extensibility';

import wrapWithKeyboardListener from './WrapWithKeyboardListener';

manifest('Neos.Neos.Ui.ExtensibilityExamples:WrapWithKeyboardListener', {}, globalRegistry => {
    const containerRegistry = globalRegistry.get('containers');
    const App = containerRegistry.get('App')

    containerRegistry.set('App', wrapWithKeyboardListener(App));
});
