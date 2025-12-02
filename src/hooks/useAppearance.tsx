import React, { createContext, useContext, useLayoutEffect, useState } from 'react';
import { Appearance } from 'react-native';

import { NOOP } from '@sendbird/uikit-utils';

import { mmkv } from '../App';

const DEFAULT_APPEARANCE = 'light';

const AppearanceContext = createContext<{ scheme: 'light' | 'dark'; setScheme: (val: 'light' | 'dark') => void }>({
  scheme: DEFAULT_APPEARANCE,
  setScheme: NOOP,
});

const SchemeManager = {
  KEY: 'sendbird@scheme',
  get() {
    return (mmkv.getString(SchemeManager.KEY) ?? Appearance.getColorScheme() ?? DEFAULT_APPEARANCE) as
      | 'light'
      | 'dark';
  },
  set(scheme: 'light' | 'dark') {
    mmkv.set(SchemeManager.KEY, scheme);
  },
};

export const AppearanceProvider = ({ children }: React.PropsWithChildren) => {
  const [scheme, setScheme] = useState<'light' | 'dark'>(Appearance.getColorScheme() ?? DEFAULT_APPEARANCE);

  useLayoutEffect(() => {
    setScheme(SchemeManager.get());
  }, []);

  // Handle scheme from Settings screen.
  // useEffect(() => {
  //   const unsubscribe = Appearance.addChangeListener(({ colorScheme }) => setScheme(colorScheme ?? DEFAULT_APPEARANCE));
  //   return () => unsubscribe.remove();
  // }, []);

  return (
    <AppearanceContext.Provider
      value={{
        scheme,
        setScheme: (value) => {
          setScheme(value);
          SchemeManager.set(value);
        },
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
};

const useAppearance = () => {
  return useContext(AppearanceContext);
};

export const withAppearance = (Component: (props: object) => React.ReactElement) => {
  return (props: object) => (
    <AppearanceProvider>
      <Component {...props} />
    </AppearanceProvider>
  );
};

export default useAppearance;
