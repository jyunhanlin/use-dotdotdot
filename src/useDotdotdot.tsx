import React, { useState, useRef, useEffect } from 'react';

function checkNativeLineClamp() {
  if (window.CSS) {
    return window.CSS.supports('-webkit-line-clamp', '1');
  }
  return false;
}

function getStyle(
  maxLines: number,
  supportNativeLineClamp: boolean,
  targetWidth: string | number
) {
  const width =
    typeof targetWidth === 'string' ? targetWidth : `${targetWidth}px`;

  if (maxLines > 1) {
    if (supportNativeLineClamp) {
      return {
        width,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLines,
        overflow: 'hidden',
      };
    }

    return {
      wordBreak: 'break-all',
    };
  }

  return {
    width,
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };
}

export interface UseDotdotdotOptions {
  width?: number | string;
  maxLines: number;
  wrapper?: React.ElementType;
}

export type TUseDotdotdot = UseDotdotdotOptions;

function useDotdotdot(options: UseDotdotdotOptions) {
  const { width, maxLines, wrapper } = options;
  const wrapperRef = useRef<HTMLElement | null>();
  const canvasEl = useRef<HTMLCanvasElement>();
  const canvasContext = useRef<CanvasRenderingContext2D | null>();
  const [supportNativeLineClamp, setSupportNativeLineClam] = useState(false);
  const [targetWidth, setTargetWidth] = useState<string | number>(
    width ?? '100%'
  );

  const measureTextLength = (text: string) => {
    if (canvasContext.current)
      return canvasContext.current.measureText(text).width;
    return 0;
  };

  const _clampText = (text: string) => {
    const Wrapper = wrapper ?? 'span';
    const textLines: string[] = [];
    const textLength = text.length;
    let textIndex = 0;

    for (let lineIndex = 0; lineIndex < maxLines; lineIndex += 1) {
      let textLine = '';

      while (
        measureTextLength(textLine + text.charAt(textIndex)) < targetWidth &&
        textIndex < textLength
      ) {
        textLine += text.charAt(textIndex);
        textIndex++;
      }

      if (lineIndex === maxLines - 1 && textIndex < textLength) {
        textLine = textLine.replace(/(.{3})$/, ' ...');
      }

      textLines.push(textLine);
    }

    return textLines.map((textLine, index) => (
      <Wrapper
        key={index}
        style={{
          width:
            typeof targetWidth === 'string' ? targetWidth : `${targetWidth}px`,
        }}
      >
        {textLine}
      </Wrapper>
    ));
  };

  const clampText = (text: string) => {
    if (maxLines === 1 || supportNativeLineClamp) return text;
    if (targetWidth !== -1) return _clampText(text);
    return text;
  };

  useEffect(() => {
    canvasEl.current = document.createElement('canvas');
    canvasContext.current = canvasEl.current.getContext('2d');
    setSupportNativeLineClam(checkNativeLineClamp());

    if (
      !checkNativeLineClamp() &&
      wrapperRef.current &&
      canvasContext.current &&
      maxLines > 1
    ) {
      const wrapperStyle = window.getComputedStyle(wrapperRef.current);

      canvasContext.current.font = [
        wrapperStyle.fontWeight,
        wrapperStyle.fontStyle,
        wrapperStyle.fontSize,
        wrapperStyle.fontFamily,
      ].join(' ');

      setTargetWidth(
        width
          ? width
          : wrapperRef.current.getBoundingClientRect().width ?? '100%'
      );
    }
  }, []);

  return {
    wrapperProps: {
      ref: (el: any) => {
        wrapperRef.current = el;
      },
      style: getStyle(maxLines, supportNativeLineClamp, targetWidth),
    },
    clampText,
  };
}

export { useDotdotdot };
