import React from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import {store} from './store';
import {Provider} from 'react-redux';
import {AuthProvider} from './src/context/AuthContext';

export const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
