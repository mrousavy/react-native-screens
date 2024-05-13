export * from './types';

/*
 * Core
 */
export {
  enableScreens,
  enableFreeze,
  screensEnabled,
  freezeEnabled,
  shouldUseActivityState,
} from './core';

/*
 * RNS Components
 */
export {
  default as Screen,
  NativeScreen,
  InnerScreen,
  ScreenContext,
} from './components/Screen';

export {
  default as ScreenContainer,
  NativeScreenContainer,
  NativeScreenNavigationContainer,
} from './components/ScreenContainer';

export { default as ScreenStack } from './components/ScreenStack';
export { default as ScreenSplit } from './components/ScreenSplit';

export {
  ScreenStackHeaderConfig,
  ScreenStackHeaderSubview,
  ScreenStackHeaderLeftView,
  ScreenStackHeaderCenterView,
  ScreenStackHeaderRightView,
  ScreenStackHeaderBackButtonImage,
  ScreenStackHeaderSearchBarView,
} from './components/ScreenStackHeaderConfig';

export {
  default as SearchBar,
  NativeSearchBar,
  NativeSearchBarCommands,
} from './components/SearchBar';

export { default as FullWindowOverlay } from './components/FullWindowOverlay';

export {
  default as ScreenFooter,
  NativeScreenFooter,
} from './components/ScreenFooter';

export {
  default as ScreenContentWrapper,
  NativeScreenContentWrapper,
} from './components/ScreenContentWrapper';

/*
 * Modules
 */
export { default as NativeScreensModule } from './fabric/NativeScreensModule';

/*
 * Contexts
 */
export { GHContext } from './native-stack/contexts/GHContext';

/*
 * Utils
 */
export {
  isSearchBarAvailableForCurrentPlatform,
  isNewBackTitleImplementation,
  executeNativeBackPress,
} from './utils';

/*
 * Hooks
 */
export { default as useTransitionProgress } from './useTransitionProgress';
