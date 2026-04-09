import { Link } from 'react-router-dom';
import Hero from '../components/Home/Hero';
import LivePulseStrip from '../components/Home/LivePulseStrip';
import LiveChannelsRail from '../components/Home/LiveChannelsRail';
import EventGrid from '../components/Home/EventGrid';
import CategoryShelves from '../components/Home/CategoryShelves';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <LivePulseStrip />
      <div className="app-container xl:grid xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-6">
        <LiveChannelsRail />
        <div>
          <CategoryShelves />
          <section className="mt-4 border-t border-white/10 pt-8 pb-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">Explore everything</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  Search & filter all streams
                </h2>
                <p className="mt-1 text-sm text-neutral-400 max-w-xl">
                  Browse every category in one grid — or use the dedicated Browse page for shelves-only discovery.
                </p>
              </div>
              <Link
                to="/browse"
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Open Browse
              </Link>
            </div>
            <EventGrid useContainer={false} />
          </section>
        </div>
      </div>
    </div>
  );
}
