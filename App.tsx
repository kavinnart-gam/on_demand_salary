import React from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import {store} from './store';
import {Provider} from 'react-redux';

export const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
