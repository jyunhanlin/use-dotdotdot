import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { useDotdotdot } from '../.';

import { useDotdotdot2 } from '../src/useDotdotdot2';

const App = () => {
  const { containerProps } = useDotdotdot2({ maxLines: 2 });
  return (
    <div {...containerProps}>
      1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam corrupti
      aspernatur beatae amet ipsum ex omnis sapiente alias officia hic, iusto
      porro ab, nemo est, suscipit quas minima et sequi.
      <div>
        2.1 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex,
        deleniti. Ratione voluptatibus ducimus pariatur ab eaque ut vitae,
        reprehenderit, fugit corrupti quas impedit eum, aut veniam facilis
        voluptate commodi non?'
        <span>
          2.2 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex,
          deleniti. Ratione voluptatibus ducimus pariatur ab eaque ut vitae,
          reprehenderit, fugit corrupti quas impedit eum, aut veniam facilis
          voluptate commodi non?'
        </span>
      </div>
      <span>
        3 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex,
        deleniti. Ratione voluptatibus ducimus pariatur ab eaque ut vitae,
        reprehenderit, fugit corrupti quas impedit eum, aut veniam facilis
        voluptate commodi non?'
      </span>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
