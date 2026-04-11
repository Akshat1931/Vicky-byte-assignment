import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const StreamingContext = createContext();

export function StreamingProvider({ children }) {
  const [hiddenIds, setHiddenIds] = useState([]);
  const [undoData, setUndoData] = useState(null);
  const [activeStream, setActiveStreamState] = useState(null);

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

  const setActiveStream = useCallback((data) => {
    setActiveStreamState(prev => {
      // Handle functional updates (prev => ...)
      const incoming = typeof data === 'function' ? data(prev) : data;
      
      if (!incoming) return null;
      
      // If we are setting the same stream, preserve the old timestamp if the incoming one is missing or is 0
      if (prev && prev.id === incoming.id) {
        const newTime = Number(incoming.timestamp) || 0;
        const prevTime = Number(prev.timestamp) || 0;
        
        // SHIELD: If new time is 0 (uninitialized) but we have history, ignore the reset.
        const finalTime = (newTime === 0 && prevTime > 0) ? prevTime : newTime;
        
        return { ...prev, ...incoming, timestamp: finalTime };
      }
      return incoming;
    });
  }, []);

  const value = useMemo(() => ({
    hiddenIds,
    hideEvent,
    restoreEvent,
    undoData,
    setUndoData,
    activeStream,
    setActiveStream
  }), [hiddenIds, hideEvent, restoreEvent, undoData, activeStream, setActiveStream]);

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
