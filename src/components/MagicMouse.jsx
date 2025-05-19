import { useEffect } from 'react';
import { magicMouse } from 'magicmouse.js';

export default function MagicMouseInit() {
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const options = {
        "cursorOuter": "circle",
        "hoverEffect": "circle-move",
        "hoverItemMove": false,
        "defaultCursor": false,
        "outerWidth": 60,
        "outerHeight": 60
      };

      magicMouse(options);
    }

    // Clean up function if needed
    return () => {
      // If the library provides a cleanup method, use it here
      // Currently magicMouse.js doesn't have a built-in cleanup method

      // As a fallback, we can remove the cursor elements manually
      const magicCursors = document.querySelectorAll('.magic-cursor');
      magicCursors.forEach(cursor => cursor.remove());
    };
  }, []);

  // This component doesn't render anything
  return null;
}
