import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const StreamingContext = createContext();

export function StreamingProvider({ children }) {
  const [hiddenIds, setHiddenIds] = useState([]);
  const [undoData, setUndoData] = useState(null);
  const [activeStream, setActiveStream] = useState(null);

  const hideEvent = useCallback((id) => {
    const stringId = String(id);
    setHiddenIds(prev => prev.includes(stringId) ? prev : [...prev, stringId]);
    setUndoData({ id: stringId, message: 'Removed from feed' });
  }, []);

  const restoreEvent = useCallback(() => {
    if (undoData) {
      setHiddenIds(prev => prev.filter(id => id !== String(undoData.id)));
      setUndoData(null);
    }
  }, [undoData]);

  const value = useMemo(() => ({
    hiddenIds,
    hideEvent,
    restoreEvent,
    undoData,
    setUndoData,
    activeStream,
    setActiveStream
  }), [hiddenIds, hideEvent, restoreEvent, undoData, activeStream]);

  return (
    <StreamingContext.Provider value={value}>
      {children}
    </StreamingContext.Provider>
  );
}

export function useStreaming() {
  const context = useContext(StreamingContext);
  if (!context) throw new Error('useStreaming must be used within a StreamingProvider');
  return context;
}
