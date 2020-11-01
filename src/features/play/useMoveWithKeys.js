const { useEffect } = require("react");

function useMoveWithKeys(
  parentRef,
  directionKeys = {
    up: ["ArrowUp", "w"],
    down: ["ArrowDown", "s"],
    right: ["ArrowRight", "d"],
    left: ["ArrowLeft", "a"],
  }
) {
  useEffect(() => {
    function handleKeyDown(event) {
      const focusedIndex = Array.from(parentRef.current.children).indexOf(
        document.activeElement
      );
      const total = parentRef.current.children.length;
      const size = Math.sqrt(total);
      const row = Math.floor(focusedIndex / size);
      const column = Math.floor(focusedIndex % size);

      if (event.key === "Tab") {
        return;
      }

      if (focusedIndex === -1) {
        return parentRef.current.children[0]?.focus();
      }

      let nextFocus, tmp;

      if (directionKeys.down.includes(event.key)) {
        tmp = (row + 1) * size + column;
        if (tmp <= total) {
          nextFocus = tmp;
        }
      } else if (directionKeys.up.includes(event.key)) {
        tmp = (row - 1) * size + column;
        if (tmp >= 0) {
          nextFocus = tmp;
        }
      } else if (directionKeys.right.includes(event.key)) {
        tmp = row * size + (column + 1);
        if (Math.floor(tmp / size) === row) {
          nextFocus = tmp;
        }
      } else if (directionKeys.left.includes(event.key)) {
        tmp = row * size + (column - 1);
        if (Math.floor(tmp / size) === row) {
          nextFocus = tmp;
        }
      }

      if (nextFocus !== undefined) {
        return parentRef.current.children[nextFocus]?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [directionKeys, parentRef]);
}

export default useMoveWithKeys;
