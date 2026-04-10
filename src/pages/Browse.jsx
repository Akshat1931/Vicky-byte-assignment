import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { CATEGORIES, mockEvents } from '../data/mockEvents';
import EventCard from '../components/Home/EventCard';

const FOLLOWED_CREATORS = ['ESL Network', 'DJ Synth', 'HoopsCentral', 'PixelStudios', 'ChessTV', 'BuildInPublic'];

const INITIAL_ROW = 4;

function EventShelf({ title, events }) {
  const [expanded, setExpanded] = useState(false);
  if (!events.length) return null;

  const visible = expanded ? events : events.slice(0, INITIAL_ROW);
  const hasMore = events.length > INITIAL_ROW;

  return (
    <section className="mt-10 first:mt-2">
      <h3 className="text-lg md:text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visible.map((event) => (
          <EventCard key={`${title}-${event.id}`} event={event} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-200 hover:bg-indigo-500/20 transition-colors"
          >
            {expanded ? 'Show less' : 'Show more'}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </section>
  );
}

export default function Browse() {
  const location = useLocation();
  const isFollowing = location.pathname.includes('following');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const pageTitle = isFollowing ? 'Following' : 'Browse';
  const pageSubtitle = isFollowing
    ? 'Streams from creators you follow — grouped by category.'
    : 'Discover live and upcoming streams by category.';

  const baseEvents = useMemo(() => {
    if (isFollowing) {
      return mockEvents.filter((event) => FOLLOWED_CREATORS.includes(event.creator));
    }
    return mockEvents;
  }, [isFollowing]);

  const filteredByCategory = useMemo(() => {
    if (selectedCategory === 'All') return baseEvents;
    return baseEvents.filter((event) => event.category === selectedCategory);
  }, [baseEvents, selectedCategory]);

  const groupedShelves = useMemo(() => {
    const categories =
      selectedCategory === 'All' ? CATEGORIES.filter((item) => item !== 'All') : [selectedCategory];
    return categories.map((category) => ({
      category,
      events: filteredByCategory.filter((event) => event.category === category),
    }));
  });

  return (
    <div className="app-container section-space">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{pageTitle}</h1>
        <p className="mt-2 text-sm text-neutral-400 max-w-2xl">{pageSubtitle}</p>
      </div>

      <div className="mt-5 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-white text-black border-white'
                : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {groupedShelves.map((shelf) => (
        <EventShelf key={shelf.category} title={shelf.category} events={shelf.events} />
      ))}
    </div>
  );
}
