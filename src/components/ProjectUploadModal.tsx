import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { X, Loader2, Link as LinkIcon, Code, Image as ImageIcon } from 'lucide-react';

export default function ProjectUploadModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const addProject = useMutation(api.projects.addProject);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      await addProject({
        title,
        description,
        githubUrl: githubUrl || undefined,
        liveDemoUrl: liveDemoUrl || undefined,
        imageUrl: imageUrl || undefined,
      });

      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to add project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-luxury-bg border border-text-main/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-text-main/10">
          <h3 className="text-xl font-bold text-text-main">Add Project</h3>
          <button onClick={onClose} className="p-2 hover:bg-text-main/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Project Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-text-main/5 border border-text-main/10 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-luxury-purple/50 transition-colors"
              placeholder="E.g., AI Chatbot MVP"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description *</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-text-main/5 border border-text-main/10 rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-luxury-purple/50 transition-colors resize-none"
              placeholder="Briefly describe what you built, technologies used, and your role."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="url" 
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full bg-text-main/5 border border-text-main/10 rounded-xl pl-10 pr-4 py-3 text-text-main focus:outline-none focus:border-luxury-purple/50 transition-colors"
                placeholder="https://example.com/screenshot.png"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">GitHub URL</label>
              <div className="relative">
                <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input 
                  type="url" 
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  className="w-full bg-text-main/5 border border-text-main/10 rounded-xl pl-10 pr-4 py-3 text-text-main focus:outline-none focus:border-luxury-purple/50 transition-colors"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Live Demo URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input 
                  type="url" 
                  value={liveDemoUrl}
                  onChange={e => setLiveDemoUrl(e.target.value)}
                  className="w-full bg-text-main/5 border border-text-main/10 rounded-xl pl-10 pr-4 py-3 text-text-main focus:outline-none focus:border-luxury-purple/50 transition-colors"
                  placeholder="https://myproject.com"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-text-muted font-bold hover:bg-text-main/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-luxury-purple text-white font-bold hover:bg-luxury-purple/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
