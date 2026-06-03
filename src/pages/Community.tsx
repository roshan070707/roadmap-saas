import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, MessageSquare, Share2, Award, Loader2, MoreVertical, Edit2, Trash2, Check, X } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

export default function Community() {
  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingPost, setEditingPost] = useState<{ id: string, content: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  
  const posts = useQuery(api.collaboration.getCommunityPosts);
  const createPost = useMutation(api.collaboration.createCommunityPost);
  const editPost = useMutation(api.collaboration.editCommunityPost);
  const deletePost = useMutation(api.collaboration.deleteCommunityPost);
  const likePost = useMutation(api.collaboration.likePost);
  const unlikePost = useMutation(api.collaboration.unlikePost);
  const replyToPost = useMutation(api.collaboration.replyToPost);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    await createPost({ content: newPost });
    setNewPost('');
  };

  const handleLike = async (postId: Id<"communityPosts">, hasLiked: boolean) => {
    if (hasLiked) {
      await unlikePost({ postId });
    } else {
      await likePost({ postId });
    }
  };

  const handleReply = async (postId: Id<"communityPosts">) => {
    if (!replyContent.trim()) return;
    await replyToPost({ postId, content: replyContent });
    setReplyingTo(null);
    setReplyContent('');
  };

  const handleEdit = async () => {
    if (!editingPost || !editingPost.content.trim()) return;
    await editPost({ postId: editingPost.id as Id<"communityPosts">, content: editingPost.content });
    setEditingPost(null);
    setDropdownOpen(null);
  };

  const handleDelete = async (postId: Id<"communityPosts">) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost({ postId });
      setDropdownOpen(null);
    }
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
              className="w-full bg-transparent text-text-main border-none resize-none focus:outline-none p-0 placeholder:text-text-muted/50"
              rows={3}
            />
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-text-main/10">
              <div className="text-xs text-text-muted font-semibold uppercase tracking-wider">Markdown Supported</div>
              <button 
                onClick={handlePost} 
                disabled={!newPost.trim()}
                className="btn-premium px-6 py-2 text-sm disabled:opacity-50"
              >
                Post
              </button>
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
                  className="glass-card p-6 border-text-main/10 hover:border-luxury-purple/30 transition-all relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-luxury-purple/20 flex items-center justify-center text-luxury-purple font-bold">
                        {post.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-text-main">{post.user}</div>
                        <div className="text-xs text-text-muted flex items-center gap-2">
                          {new Date(post.timestamp).toLocaleString()} 
                          {post.updatedAt && <span>(edited)</span>}
                        </div>
                      </div>
                    </div>

                    {post.isOwner && (
                      <div className="relative">
                        <button 
                          onClick={() => setDropdownOpen(dropdownOpen === post._id ? null : post._id)}
                          className="text-text-muted hover:text-white p-1"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {dropdownOpen === post._id && (
                          <div className="absolute right-0 mt-2 w-36 bg-luxury-bg border border-text-main/10 rounded-lg shadow-xl overflow-hidden z-20">
                            <button 
                              onClick={() => { setEditingPost({ id: post._id, content: post.content }); setDropdownOpen(null); }}
                              className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-white/5 text-text-main"
                            >
                              <Edit2 className="w-3 h-3" /> Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(post._id)}
                              className="w-full px-4 py-2 text-sm text-left flex items-center gap-2 hover:bg-white/5 text-red-400"
                            >
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {editingPost?.id === post._id ? (
                    <div className="mb-6">
                      <textarea 
                        value={editingPost?.content || ''}
                        onChange={e => setEditingPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                        className="w-full bg-black/30 border border-luxury-purple/30 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-luxury-purple mb-2"
                        rows={3}
                      />
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setEditingPost(null)} className="px-3 py-1 text-xs text-text-muted hover:text-white"><X className="w-4 h-4" /></button>
                        <button onClick={handleEdit} className="px-3 py-1 text-xs bg-luxury-purple/20 text-luxury-purple rounded hover:bg-luxury-purple/30"><Check className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-text-main font-light leading-relaxed mb-6 whitespace-pre-wrap">
                      {post.content}
                    </p>
                  )}
                  
                  <div className="flex gap-6 pt-4 border-t border-text-main/5">
                    <button 
                      onClick={() => handleLike(post._id, post.hasLiked)}
                      className={`flex items-center gap-2 transition-colors text-sm font-semibold ${post.hasLiked ? 'text-red-500' : 'text-text-muted hover:text-red-400'}`}
                    >
                      <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-current' : ''}`} /> {post.likes || 0}
                    </button>
                    <button 
                      onClick={() => setReplyingTo(replyingTo === post._id ? null : post._id)}
                      className={`flex items-center gap-2 transition-colors text-sm font-semibold ${replyingTo === post._id ? 'text-luxury-purple' : 'text-text-muted hover:text-luxury-purple'}`}
                    >
                      <MessageSquare className="w-4 h-4" /> {post.replies?.length || 0}
                    </button>
                    <button 
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                      className="flex items-center gap-2 text-text-muted hover:text-text-main transition-colors text-sm font-semibold ml-auto"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>

                  {/* Replies Section */}
                  <AnimatePresence>
                    {(replyingTo === post._id || post.replies?.length > 0) && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-text-main/5 space-y-4"
                      >
                        {post.replies?.map((reply: any) => (
                          <div key={reply._id} className="flex gap-3 bg-text-main/5 p-3 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-luxury-purple/20 flex shrink-0 items-center justify-center text-luxury-purple font-bold text-xs">
                              {reply.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="font-semibold text-text-main text-sm">{reply.user}</span>
                                <span className="text-[10px] text-text-muted">{new Date(reply.timestamp).toLocaleString()}</span>
                              </div>
                              <p className="text-text-main text-sm font-light mt-1 whitespace-pre-wrap">{reply.content}</p>
                            </div>
                          </div>
                        ))}

                        {replyingTo === post._id && (
                          <div className="flex gap-2 mt-2">
                            <input 
                              type="text"
                              value={replyContent}
                              onChange={e => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              className="flex-1 bg-black/30 border border-text-main/10 rounded px-3 py-2 text-sm text-text-main focus:outline-none focus:border-luxury-purple"
                              onKeyDown={e => e.key === 'Enter' && handleReply(post._id)}
                            />
                            <button 
                              onClick={() => handleReply(post._id)}
                              disabled={!replyContent.trim()}
                              className="px-4 bg-luxury-purple/20 text-luxury-purple rounded text-sm font-semibold disabled:opacity-50"
                            >
                              Reply
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-luxury-purple" /> Top Contributors
            </h3>
            <div className="space-y-4">
              {posts && posts.length > 0 ? (
                // Group by user and sum up likes/replies as a fake representation if we aren't querying the actual leaderboardStats yet
                posts.slice(0, 5).map((post: any, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-text-main/10 flex items-center justify-center text-text-main text-xs font-bold">
                      {post.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-main">{post.user}</div>
                      {/* Using likes * 2 + replies + 2 for display mockup purposes. In real app, query leaderboardStats.reputation */}
                      <div className="text-xs text-text-muted">{(post.likes || 0) * 2 + (post.replies?.length || 0) + 2} Rep</div>
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
