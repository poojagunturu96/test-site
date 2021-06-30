import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SplitPaneContext from "./split-pane-context";

export const Divider = (props) => {
  const { onMouseHoldDown } = useContext(SplitPaneContext);

  return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export const SplitPaneLeft = ({ children, ...props }) => {
  const topRef = createRef();
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

  const resizeSection = () => {
    setClientWidth(document.getElementsByTagName("html")[0].clientWidth / 4);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeSection);
    return () => {
      window.removeEventListener("resize", resizeSection);
    };
  }, []);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current.clientWidth);
      return;
    }

    topRef.current.style.minWidth = clientWidth + "px";

    if (document.documentElement.clientWidth >= 1024) {
      topRef.current.style.maxWidth = clientWidth + "px";
    } else {
      topRef.current.style.maxWidth = "initial";
    }
  }, [clientWidth]);

  return (
    <aside {...props} className="split-pane-left" ref={topRef}>
      {children}
    </aside>
  );
};

export const SplitPaneRight = ({ children, ...props }) => {
  return (
    <main {...props} className="split-pane-right" id="right-plane">
      <div id="print-section">{children}</div>
    </main>
  );
};

const SplitPane = ({ children, ...props }) => {
  const [clientHeight, setClientHeight] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const yDividerPos = useRef(null);
  const xDividerPos = useRef(null);

  const onMouseHoldDown = (e) => {
    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  const onMouseHoldUp = () => {
    yDividerPos.current = null;
    xDividerPos.current = null;
  };

  const onMouseHoldMove = (e) => {
    if (!yDividerPos.current && !xDividerPos.current) {
      return;
    }

    setClientHeight(clientHeight + e.clientY - yDividerPos.current);
    setClientWidth(clientWidth + e.clientX - xDividerPos.current);

    yDividerPos.current = e.clientY;
    xDividerPos.current = e.clientX;
  };

  useEffect(() => {
    if (document.documentElement.clientWidth >= 1024) {
      document.addEventListener("mouseup", onMouseHoldUp);
      document.addEventListener("mousemove", onMouseHoldMove);
    }

    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  });

  return (
    <div {...props}>
      <SplitPaneContext.Provider
        value={{
          clientHeight,
          setClientHeight,
          clientWidth,
          setClientWidth,
          onMouseHoldDown,
        }}
      >
        {children}
      </SplitPaneContext.Provider>
    </div>
  );
};

export default SplitPane;
