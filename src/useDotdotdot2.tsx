import React, { useState, useRef, useEffect } from 'react';

export interface UseDotdotdot2Options {
  width?: number | string;
  maxLines: number;
  wrapper?: React.ElementType;
}

export type TUseDotdotdot2 = UseDotdotdot2Options;

/**
 * 1. childNodes
 * 2. Node.cloneNode(true)
 * 3. nodeName, nodeType
 * 4. ref: https://github.com/FrDH/dotdotdot-js/blob/master/src/dotdotdot.ts
 */

/**
 * 1. clean the original content
 * 2. container.innerHtml = '';
 * 3. calculate the height then append the node to container
 * 3.1. get line height
 * 3.2.
 */

function useDotdotdot2(options: UseDotdotdot2Options) {
  const { width, maxLines } = options;
  const containerRef = useRef<HTMLElement | null>();
  const canvasEl = useRef<HTMLCanvasElement>();
  const canvasContext = useRef<CanvasRenderingContext2D | null>();
  const [targetWidth, setTargetWidth] = useState<UseDotdotdot2Options['width']>(
    width
  );

  const measureTextLength = (text: string) => {
    if (canvasContext.current)
      return canvasContext.current.measureText(text).width;
    return 0;
  };

  const clamp = (originalContainer: Node) => {
    const els: Node[] = [];

    if (containerRef.current) {
      const formattedTargetWidth =
        typeof targetWidth === 'number' ? targetWidth : 1000;

      let lineIndex = 0;
      let currentNodeWidth = 0;

      const textEl = document.createTextNode('...');

      for (let i = 0; i < originalContainer.childNodes.length; i += 1) {
        const node = originalContainer.childNodes[i];

        if (node.nodeType === 1) {
          currentNodeWidth += (node as Element).clientWidth;
        }
        if (node.nodeType === 3) {
          currentNodeWidth += measureTextLength(node.textContent ?? '');
        }

        console.log(currentNodeWidth, formattedTargetWidth);

        if (currentNodeWidth > formattedTargetWidth) {
          lineIndex += 1;
          currentNodeWidth = currentNodeWidth - formattedTargetWidth;
        }

        if (lineIndex === maxLines) {
          node.appendChild(textEl);
          break;
        }

        els.push(node);
      }
    }

    console.log(els);

    return els;
  };

  useEffect(() => {
    canvasEl.current = document.createElement('canvas');
    canvasContext.current = canvasEl.current.getContext('2d');

    if (containerRef.current && canvasContext.current && maxLines > 1) {
      const containerStyle = window.getComputedStyle(containerRef.current);

      canvasContext.current.font = [
        containerStyle.fontWeight,
        containerStyle.fontStyle,
        containerStyle.fontSize,
        containerStyle.fontFamily,
      ].join(' ');

      setTargetWidth(
        width ? width : containerRef.current.getBoundingClientRect().width
      );

      console.log(containerRef.current.getBoundingClientRect());

      const cloneNode = containerRef.current.cloneNode(true);

      containerRef.current.innerHTML = '';

      containerRef.current.append(...clamp(cloneNode));
    }
  }, []);

  return {
    containerProps: {
      ref: (el: any) => {
        containerRef.current = el;
      },
    },
  };
}

export { useDotdotdot2 };
