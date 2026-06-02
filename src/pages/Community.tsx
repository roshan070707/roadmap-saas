import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageSquare, Share2, Award, Zap, Loader2 } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Community() {
  const [newPost, setNewPost] = useState('');
  
  const posts = useQuery(api.collaboration.getCommunityPosts);
  const createPost = useMutation(api.collaboration.createCommunityPost);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    await createPost({ content: newPost });
    setNewPost('');
  };

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
              <button onClick={handlePost} className="btn-premium px-6 py-2 text-sm">Post</button>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {posts === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-luxury-purple animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <div className="glass-card p-12 text-center text-text-muted">
                No posts yet. Be the first to share!
              </div>
            ) : (
              posts.map((post: any, idx: number) => (
                <motion.div 
                  key={post._id}
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
                          {new Date(post.timestamp).toLocaleString()} • <span className="text-luxury-gold">{post.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-text-main font-light leading-relaxed mb-6 whitespace-pre-wrap">
                    {post.content}
                  </p>
                  
                  <div className="flex gap-6 pt-4 border-t border-text-main/5">
                    <button className="flex items-center gap-2 text-text-muted hover:text-red-400 transition-colors text-sm font-semibold">
                      <Heart className="w-4 h-4" /> {post.likes || 0}
                    </button>
                    <button className="flex items-center gap-2 text-text-muted hover:text-luxury-purple transition-colors text-sm font-semibold">
                      <MessageSquare className="w-4 h-4" /> Reply
                    </button>
                    <button className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors text-sm font-semibold ml-auto">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </motion.div>
              ))
            )}
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
              {posts && posts.length > 0 ? (
                posts.slice(0, 3).map((post: any, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-text-main/10 flex items-center justify-center text-text-main text-xs font-bold">
                      {post.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-main">{post.user}</div>
                      <div className="text-xs text-text-muted">{post.likes * 12 || 12} Rep</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-text-muted">No contributors yet.</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
