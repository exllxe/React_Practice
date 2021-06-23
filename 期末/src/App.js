import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import { Actions } from "./Actions";
import { Provider } from "./Context";

function App() {
  const data = Actions();
  const routing = useRoutes(routes);
  return (
    <Provider value={data}>
      <GlobalStyles />
      {routing}
    </Provider>
  );
}

/*
const App = () => {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};
*/
export default App;
