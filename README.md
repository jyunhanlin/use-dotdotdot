# use-dotdotdot

No reason, just make the text dot dot dot!!

A hook to use CSS property, `line-clamp`, for the long text.

If only one line, use `text-overflow` for the long text.

If the browser doesn't support `line-clamp` and need multiline text, use the canvas api, `measureText`, to generate clamp text.

## Installation

```
npm install use-dotdotdot

or

yarn add use-dotdotdot
```

## Props

| Name       |         Type         | Description                                             |
| ---------- | :------------------: | ------------------------------------------------------- |
| `width?`   | `string` or `number` | The width of wrapper. If not provide, the width is 100% |
| `maxLines` |       `number`       | How many lines at most                                  |
| `wrapper?` | `React.ElementType`  | The wrapper for clamp Text. Default value is `span`     |

## Example

```jsx
import { useDotdotdot } from 'use-dotdotdot';

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
```

or use `useDotdotdot` create your own Component
