import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Loader2, Flame, Clock, Target, Star, Compass, Crown, Zap, Calendar, Share2, Copy, Code, Globe, Link as LinkIcon, Plus, ExternalLink, Download } from 'lucide-react';
import ProjectUploadModal from '../components/ProjectUploadModal';

export default function Profile() {
  const { identifier } = useParams();
  const [isCopied, setIsCopied] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  const currentUser = useQuery(api.users.current);
  
  const profile = useQuery(api.profiles.getUserProfile, { 
    identifier: identifier || '' 
  });

  if (profile === undefined || currentUser === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-bg">
        <Loader2 className="w-8 h-8 text-luxury-purple animate-spin" />
      </div>
    );
  }

  if (profile === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-bg">
        <h2 className="text-2xl font-bold text-text-main mb-4">Profile not found</h2>
        <p className="text-text-muted mb-8">The user you are looking for does not exist or has an invalid identifier.</p>
        <button onClick={() => window.history.back()} className="px-6 py-2 bg-luxury-purple text-white rounded-full font-bold">Go Back</button>
      </div>
    );
  }

  const { user, profile: profileData, stats, achievements, projects } = profile;
  const isOwner = currentUser?._id === user._id;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6 print:pt-10 print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto">
        
        {/* Profile Header */}
        <div className="glass-card mb-8 text-center flex flex-col items-center p-12 relative print:shadow-none print:border-none print:bg-transparent">
          <div className="absolute top-6 right-6 flex gap-2 print:hidden">
            <button 
              onClick={handlePrintResume}
              className="flex items-center gap-2 px-3 py-1.5 bg-text-main/5 hover:bg-text-main/10 rounded-full text-xs font-semibold text-text-main transition-colors border border-text-main/10"
              title="Recruiter Snapshot (Print to PDF)"
            >
              <Download className="w-3.5 h-3.5" /> Snapshot
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-1.5 bg-text-main/5 hover:bg-text-main/10 rounded-full text-xs font-semibold text-text-main transition-colors border border-text-main/10"
            >
              {isCopied ? <Copy className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
              {isCopied ? 'Copied' : 'Share'}
            </button>
          </div>

          {user.image ? (
            <img src={user.image} alt={user.name} className="w-28 h-28 rounded-full mb-6 border-2 border-luxury-purple/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] print:shadow-none" />
          ) : (
            <div className="w-28 h-28 rounded-full mb-6 border-2 border-luxury-purple/50 bg-luxury-purple/10 flex items-center justify-center text-4xl font-bold text-luxury-purple shadow-[0_0_20px_rgba(139,92,246,0.3)] print:shadow-none">
              {user.name?.charAt(0) || 'U'}
            </div>
          )}
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-text-main print:text-black">{user.name}</h1>
            {profileData?.username && (
              <span className="text-text-muted text-sm font-medium">@{profileData.username}</span>
            )}
          </div>
          
          {profileData?.bio && (
            <p className="text-text-muted max-w-xl mx-auto mb-4">{profileData.bio}</p>
          )}

          <div className="flex items-center justify-center gap-6 mb-6 text-sm">
            {profileData?.location && (
              <span className="text-text-muted">{profileData.location}</span>
            )}
            {profileData?.github && (
              <a href={profileData.github.startsWith('http') ? profileData.github : `https://github.com/${profileData.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-text-muted hover:text-luxury-purple transition-colors">
                <Code className="w-4 h-4" /> GitHub
              </a>
            )}
            {profileData?.linkedin && (
              <a href={profileData.linkedin.startsWith('http') ? profileData.linkedin : `https://linkedin.com/in/${profileData.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-text-muted hover:text-luxury-purple transition-colors">
                <Globe className="w-4 h-4" /> LinkedIn
              </a>
            )}
            {profileData?.portfolioUrl && (
              <a href={profileData.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-text-muted hover:text-luxury-purple transition-colors">
                <LinkIcon className="w-4 h-4" /> Portfolio
              </a>
            )}
          </div>
          
          <div className="text-sm text-text-muted flex items-center gap-2 border-t border-text-main/10 pt-4">
            <Calendar className="w-4 h-4" /> Joined {new Date(user._creationTime).toLocaleDateString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12 print:mb-8">
          <div className="glass-card p-6 text-center print:border print:border-gray-300 print:shadow-none">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2"><Clock className="w-4 h-4 text-luxury-purple print:text-black"/> Study Time</div>
            <div className="text-2xl font-bold text-text-main print:text-black">{stats.studyTime} <span className="text-sm font-normal text-text-muted">min</span></div>
          </div>
          <div className="glass-card p-6 text-center print:border print:border-gray-300 print:shadow-none">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2"><Flame className="w-4 h-4 text-luxury-gold print:text-black"/> Current Streak</div>
            <div className="text-2xl font-bold text-text-main print:text-black">{stats.streak} <span className="text-sm font-normal text-text-muted">Days</span></div>
          </div>
          <div className="glass-card p-6 text-center print:border print:border-gray-300 print:shadow-none">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2"><Target className="w-4 h-4 text-green-500 print:text-black"/> Completed</div>
            <div className="text-2xl font-bold text-text-main print:text-black">{stats.roadmapCompletion} <span className="text-sm font-normal text-text-muted">Topics</span></div>
          </div>
          <div className="glass-card p-6 text-center print:border print:border-gray-300 print:shadow-none">
            <div className="text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center justify-center gap-2"><Star className="w-4 h-4 text-blue-500 print:text-black"/> Roadmaps</div>
            <div className="text-2xl font-bold text-text-main print:text-black">{stats.roadmapsCount}</div>
          </div>
        </div>

        {/* Portfolio Showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-text-main print:text-black">Portfolio Projects</h3>
            {isOwner && (
              <button 
                onClick={() => setIsProjectModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-luxury-purple text-white rounded-full text-sm font-bold hover:bg-luxury-purple/90 transition-colors print:hidden"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            )}
          </div>
          
          {(!projects || projects.length === 0) ? (
            <div className="glass-card p-12 text-center text-text-muted border-dashed border-text-main/20">
              <Compass className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No projects showcased yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project: any) => (
                <div key={project._id} className="glass-card overflow-hidden group print:border print:border-gray-300 print:shadow-none">
                  {project.imageUrl ? (
                    <div className="h-48 w-full bg-text-main/5 overflow-hidden">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-luxury-purple/10 to-transparent flex items-center justify-center border-b border-text-main/10">
                      <CodeIcon className="w-12 h-12 text-luxury-purple/30" />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-text-main mb-2 print:text-black">{project.title}</h4>
                    <p className="text-sm text-text-muted mb-6 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-4">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-text-main hover:text-luxury-purple transition-colors print:text-blue-600">
                          <Code className="w-4 h-4" /> Code
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-luxury-purple hover:text-luxury-purple/80 transition-colors print:text-blue-600">
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Achievements */}
        <h3 className="text-xl font-bold text-text-main mb-6 print:text-black">Achievements</h3>
        {achievements.length === 0 ? (
          <div className="glass-card p-8 text-center text-text-muted">
            No achievements unlocked yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((ach: any) => {
              const Icon = ach.detail?.icon === 'Star' ? Star : 
                           ach.detail?.icon === 'Compass' ? Compass :
                           ach.detail?.icon === 'Crown' ? Crown :
                           ach.detail?.icon === 'Flame' ? Flame :
                           ach.detail?.icon === 'Zap' ? Zap : Star;
              return (
                <div key={ach._id} className="glass-card flex items-center gap-4 p-4 border-luxury-gold/30 bg-luxury-gold/5 print:border print:border-gray-300 print:shadow-none">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main print:text-black">{ach.detail?.title}</h4>
                    <p className="text-xs text-text-muted">{ach.detail?.description}</p>
                    <p className="text-[10px] text-luxury-gold mt-1">Unlocked {new Date(ach.unlockedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {isProjectModalOpen && (
        <ProjectUploadModal onClose={() => setIsProjectModalOpen(false)} />
      )}
    </div>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
