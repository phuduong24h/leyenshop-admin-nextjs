'use client';

import { useMemo, useState } from 'react';

import { Image } from 'antd';

interface ImagesProps<T> {
  data: T[];
  max?: number;
  width?: number;
  height?: number;
}

function Images<T>({ data, width, height, max = 2 }: ImagesProps<T>) {
  const [visible, setVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const visibleImages = useMemo(() => data?.slice?.(0, max), [data, max]);

  const handlePreviewImage = () => {
    setPreviewIndex(max - 1);
    setVisible(true);
  };

  const renderPreviewImage = (item: any, index: number) => {
    const { url } = item || {};
    return <Image key={index} src={url} preview={{ visible: false }} className="hidden" />;
  };

  const renderImage = (item: any, index: number) => {
    const { url, name } = item || {};
    const count = (data?.length || 0) - max;
    const hasOverflow = index + 1 === max && data?.length > max;

    return (
      <div key={index} className="relative h-auto max-h-[200px] w-full overflow-hidden">
        <Image src={url} alt={name} className="size-full object-cover" style={{ width, height }} />
        {hasOverflow && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/60 text-xl font-bold text-white"
            aria-hidden
            onClick={handlePreviewImage}>
            +{count}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: width ? `repeat(auto-fit, minmax(${width}px, 1fr))` : 'repeat(2, 1fr)'
        }}>
        {visibleImages?.map?.(renderImage)}
      </div>
      <Image.PreviewGroup
        preview={{
          visible,
          onVisibleChange: value => setVisible(value),
          current: previewIndex,
          onChange: index => setPreviewIndex(index)
        }}>
        {data?.map?.(renderPreviewImage)}
      </Image.PreviewGroup>
    </>
  );
}

export default Images;
