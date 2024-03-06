import React from 'react';


function test(a: number, b: number): string {
  return 'result: ' + a + b;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Реакт работает. <br></br>

          {test(5, 8)}
        </p>
      </header>
    </div>
  );
}

export default App;
