// App.js

import React from 'react';
import Header from '../Header/header'
import Main from '../Main/main'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;