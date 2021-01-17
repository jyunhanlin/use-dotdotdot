import React, { useState, useRef, useEffect } from 'react';

function checkNativeLineClamp() {
  if (window.CSS) {
    return window.CSS.supports('-webkit-line-clamp', '1');
  }
  return false;
}

export interface UseDotdotdotOptions {
  width?: number | string;
  maxLines: number;
}

export type TUseDotdotdot = UseDotdotdotOptions;

function useDotdotdot(options: UseDotdotdotOptions) {
  const { width, maxLines } = options;
  const wrapperRef = useRef<HTMLElement | null>();
  const canvasEl = useRef<HTMLCanvasElement>();
  const canvasContext = useRef<CanvasRenderingContext2D | null>();
  const [supportNativeLineClamp, setSupportNativeLineClam] = useState(false);
  const [targetWidth, setTargetWidth] = useState<string | number>(
    width ?? '100%'
  );

  const multiLinesStyle = {
    width: typeof targetWidth === 'string' ? targetWidth : `${targetWidth}px`,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: maxLines,
    overflow: 'hidden',
  };

  const singleLineStyle = {
    width: typeof targetWidth === 'string' ? targetWidth : `${targetWidth}px`,
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };

  const style =
    maxLines > 1
      ? supportNativeLineClamp
        ? multiLinesStyle
        : {}
      : singleLineStyle;

  const measureTextLength = (text: string) => {
    if (canvasContext.current)
      return canvasContext.current.measureText(text).width;
    return 0;
  };

  const _clampText = (text: string) => {
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
      <div
        key={index}
        style={{
          width:
            typeof targetWidth === 'string' ? targetWidth : `${targetWidth}px`,
        }}
      >
        {textLine}
      </div>
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
      style,
    },
    clampText,
  };
}

export { useDotdotdot };
