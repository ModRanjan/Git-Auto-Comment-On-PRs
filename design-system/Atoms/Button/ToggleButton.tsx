import { useState, FC, useEffect } from 'react';

type ToggleButtonType = {
  enabled: boolean;
  setEnabled: () => void;
};
export const ToggleButton: FC<ToggleButtonType> = ({ enabled, setEnabled }) => {
  return (
    <button
      type="button"
      className={`relative inline-flex items-center cursor-pointer`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={enabled}
        readOnly
      />
      <div
        onClick={setEnabled}
        className="w-11 h-5 md:h-6 bg-neutral-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 md:after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"
      ></div>
    </button>
  );
};
