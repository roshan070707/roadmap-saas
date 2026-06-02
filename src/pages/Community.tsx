import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageSquare, Share2, Award, Zap } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Community() {
  const [newPost, setNewPost] = useState('');
  
  // Mock data for preview, in a real app this uses the communityPosts convex query
  const mockPosts = [
    { id: 1, user: "Alex Chen", avatar: "A", time: "2h ago", content: "Just completed the Python Fundamentals chapter! 🐍 The exercises on generators really made it click for me.", likes: 24, replies: 3, role: "AI Engineer Path" },
    { id: 2, user: "Sarah Smith", avatar: "S", time: "5h ago", content: "Hit a 15-day study streak today! Consistency is definitely more important than intensity.", likes: 89, replies: 12, role: "Data Scientist Path" },
    { id: 3, user: "David Kim", avatar: "D", time: "1d ago", content: "Created a custom roadmap for mastering WebGL and Three.js. Anyone want to collaborate and share resources?", likes: 45, replies: 8, role: "Custom Path" },
  ];

  return (
    <div className="min-h-screen bg-luxury-bg pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
        
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-main mb-4 flex items-center gap-3">
              <Users className="w-8 h-8 text-luxury-purple" /> Community
            </h1>
            <p className="text-text-muted">Share your progress, celebrate milestones, and learn together.</p>
          </div>

          {/* Compose Post */}
          <div className="glass-card p-6">
            <textarea 
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="Share an update, milestone, or ask a question..."
              className="w-full bg-transparent text-text-main border-none resize-none focus:ring-0 p-0 placeholder:text-text-muted/50"
              rows={3}
            />
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-text-main/10">
              <div className="text-xs text-text-muted font-semibold uppercase tracking-wider">Markdown Supported</div>
              <button className="btn-premium px-6 py-2 text-sm">Post</button>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {mockPosts.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 border-text-main/10 hover:border-luxury-purple/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-luxury-purple/20 flex items-center justify-center text-luxury-purple font-bold">
                      {post.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-text-main">{post.user}</div>
                      <div className="text-xs text-text-muted flex items-center gap-2">
                        {post.time} • <span className="text-luxury-gold">{post.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-text-main font-light leading-relaxed mb-6">
                  {post.content}
                </p>
                
                <div className="flex gap-6 pt-4 border-t border-text-main/5">
                  <button className="flex items-center gap-2 text-text-muted hover:text-red-400 transition-colors text-sm font-semibold">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-text-muted hover:text-luxury-purple transition-colors text-sm font-semibold">
                    <MessageSquare className="w-4 h-4" /> {post.replies}
                  </button>
                  <button className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors text-sm font-semibold ml-auto">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" /> Active Now
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Total Members</span>
                <span className="font-mono text-text-main font-bold">2,405</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Studying Today</span>
                <span className="font-mono text-text-main font-bold">342</span>
              </div>
            </div>
            <button className="w-full mt-6 btn-premium-secondary py-2 text-sm">Invite Friends</button>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-luxury-purple" /> Top Contributors
            </h3>
            <div className="space-y-4">
              {mockPosts.slice(0, 3).map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-text-main/10 flex items-center justify-center text-text-main text-xs font-bold">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-main">{user.user}</div>
                    <div className="text-xs text-text-muted">{user.likes * 12} Rep</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
