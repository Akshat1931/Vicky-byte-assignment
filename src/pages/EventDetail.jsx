import { useParams, Navigate } from 'react-router-dom';
import { mockEvents } from '../data/mockEvents';
import VideoPlayer from '../components/Event/VideoPlayer';
import LiveChat from '../components/Event/LiveChat';
import EventInfo from '../components/Event/EventInfo';
import StreamControls from '../components/Event/StreamControls';
import StreamProfilePanel from '../components/Event/StreamProfilePanel';
import SuggestedEvents from '../components/Event/SuggestedEvents';

export default function EventDetail() {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-container py-4 sm:py-6 lg:py-8 max-w-[1600px]">
      {/* Mobile: video → chat → meta. Desktop: video+meta | chat column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 xl:gap-8">
        <div className="order-1 lg:order-none lg:col-span-8 xl:col-span-9 lg:row-start-1 min-w-0">
          <VideoPlayer event={event} />
        </div>

        <aside className="order-2 lg:order-none lg:col-span-4 xl:col-span-3 lg:row-start-1 lg:row-span-2 min-w-0 self-start lg:sticky lg:top-20 xl:top-24 z-10">
          <LiveChat />
        </aside>

        <div className="order-3 lg:order-none lg:col-span-8 xl:col-span-9 lg:row-start-2 min-w-0 space-y-4 sm:space-y-5">
          <StreamControls event={event} />
          <EventInfo event={event} />
          <StreamProfilePanel event={event} />
          <SuggestedEvents currentEventId={event.id} />
        </div>
      </div>
    </div>
  );
}
