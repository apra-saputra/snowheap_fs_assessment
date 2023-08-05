import { useEffect } from "react";

interface UseUnscrollProps {
  isTrue: boolean;
};

const useUnscroll = ({ isTrue }: UseUnscrollProps) => {
  useEffect(() => {
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.style.overflow = isTrue ? "hidden" : "auto";
    }

    return () => {
      if (bodyElement) {
        bodyElement.style.overflow = "auto";
      }
    };
  }, [isTrue]);
  return null;
};

export default useUnscroll;
