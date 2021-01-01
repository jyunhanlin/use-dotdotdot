import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDotdotdot } from '../.';

const App = () => {
  const { wrapperProps, clampText } = useDotdotdot({ maxLines: 2 });
  return (
    <div {...wrapperProps}>
      {clampText(
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, deleniti. Ratione voluptatibus ducimus pariatur ab eaque ut vitae, reprehenderit, fugit corrupti quas impedit eum, aut veniam facilis voluptate commodi non?'
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
