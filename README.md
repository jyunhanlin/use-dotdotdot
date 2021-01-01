# use-dotdotdot

A hook to use CSS property, `line-clamp`, for the long text.

If the browser doesn't support `line-clamp`, use the canvas api, `measureText`, to generate clamp text.

## Installation

```
npm install use-dotdotdot

or

yarn add use-dotdotdot
```

## Props

| Name       |        Type        | Description                                                            |
| ---------- | :----------------: | ---------------------------------------------------------------------- |
| `width?`   | `string or number` | The width of wrapper. If not provide, use the default width of wrapper |
| `maxLines` |      `number`      | How many lines at most                                                 |

## Example

```javascript
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
