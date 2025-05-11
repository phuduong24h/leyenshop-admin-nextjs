import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(classNames(inputs));
}

export function mergeRefs(refs) {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

export const checkColor = text => {
  // Regex kiểm tra mã màu HEX (3, 4, 6, 8 ký tự sau #)
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

  // Regex kiểm tra mã màu RGB/RGBA
  const rgbRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|0?\.\d+|1))?\s*\)$/;

  // Regex kiểm tra mã màu HSL/HSLA
  const hslRegex = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%(?:\s*,\s*(0|0?\.\d+|1))?\s*\)$/;

  // Kiểm tra nếu là HEX, RGB hoặc HSL
  return hexRegex.test(text) || rgbRegex.test(text) || hslRegex.test(text);
};
