
import { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsTablet(width >= 768 && width < 1024);
    setIsDesktop(width >= 1024);
  }, [width]);

  return {
    width,
    height,
    isTablet,
    isDesktop,
    isMobile: !isTablet && !isDesktop,
    isWideScreen: width > 768,
  };
};
