const Tags = ({ data, field, max = 4 }) => {
  const arr = data?.slice?.(0, max);

  const renderItem = (item, index) => {
    const label = index >= max - 1 ? '...' : item?.[field];
    return (
      <div key={index} className="rounded-sm border border-border-primary px-2 py-px text-xs">
        {label}
      </div>
    );
  };

  return <div className="flex flex-wrap items-center gap-2">{arr?.map?.(renderItem)}</div>;
};

export default Tags;
