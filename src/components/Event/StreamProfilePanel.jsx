import { Heart, Link as LinkIcon, Video, Radio, MessagesSquare } from 'lucide-react';

export default function StreamProfilePanel({ event }) {
  // Production-ready dynamic goals linked to creator metadata
  const goalTarget = event.followerGoal?.target || 1000000;
  const currentFollowers = event.followerGoal?.current || 980000;
  const progress = Math.min(100, Math.round((currentFollowers / goalTarget) * 100));

  const SocialIcon = ({ platform }) => {
    switch (platform) {
      case 'YouTube': return <Video className="h-3.5 w-3.5" />;
      case 'Twitch': return <Radio className="h-3.5 w-3.5" />;
      case 'Discord': return <MessagesSquare className="h-3.5 w-3.5" />;
      default: return <LinkIcon className="h-3.5 w-3.5" />;
    }
  };

  return (
    <section className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-2 rounded-2xl border border-white/10 glass-panel p-5">
        <h3 className="text-lg font-semibold text-white">About {event.creator}</h3>
        <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
          {event.description}
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-neutral-400">Followers</p>
            <p className="mt-1 text-xl font-semibold text-white">{(currentFollowers / 1000).toFixed(1)}K</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-neutral-400">Category</p>
            <p className="mt-1 text-base font-medium text-white">{event.category}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {event.socialLinks ? event.socialLinks.map(link => (
            <a key={link.platform} 
               href={link.url}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-neutral-200 hover:bg-white/10 transition-colors">
              <SocialIcon platform={link.platform} />
              {link.platform}
            </a>
          )) : (
            <span className="text-xs text-neutral-500 italic">No social links provided</span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 glass-panel p-5">
        <h3 className="text-lg font-semibold text-white">{event.creator}'s Goals</h3>
        <p className="mt-2 text-sm text-neutral-300">Reach {goalTarget.toLocaleString()} followers</p>
        <div className="mt-4 rounded-full h-2 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-neutral-300">
          {currentFollowers.toLocaleString()} / {goalTarget.toLocaleString()}
        </p>

        <button className="mt-4 w-full justify-center inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-neutral-100 hover:bg-white/10 transition-colors shadow-lg">
          <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
          Follow Creator
        </button>
      </div>
    </section>
  );
}
