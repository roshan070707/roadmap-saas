import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, Clock, X, Maximize2, Minimize2, SkipForward, Flame, Flag, GripHorizontal } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

type TimerMode = 'pomodoro' | 'deepWork' | 'sprint' | 'custom' | 'stopwatch';
type TimerState = 'work' | 'break';

const MODES = {
  pomodoro: { label: 'Pomodoro', work: 25, break: 5 },
  deepWork: { label: 'Deep Work', work: 50, break: 10 },
  sprint: { label: 'Sprint', work: 90, break: 15 },
  custom: { label: 'Custom', work: 15, break: 5 },
  stopwatch: { label: 'Stopwatch', work: 0, break: 0 }
};

const CIRCLE_RADIUS = 120;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export const StudyTimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timerState, setTimerState] = useState<TimerState>('work');
  const [time, setTime] = useState(MODES.pomodoro.work * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Custom Timer Settings
  const [customWork, setCustomWork] = useState(15);
  const [customBreak, setCustomBreak] = useState(5);
  const [showCustomSettings, setShowCustomSettings] = useState(false);

  // Stopwatch Settings
  const [laps, setLaps] = useState<number[]>([]);

  const saveSession = useMutation(api.study.saveSession);
  const studyStats = useQuery(api.study.getStats);

  const getTargetDuration = () => {
    if (mode === 'stopwatch') return 0;
    if (timerState === 'work') return (mode === 'custom' ? customWork : MODES[mode].work) * 60;
    return (mode === 'custom' ? customBreak : MODES[mode].break) * 60;
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((t) => mode === 'stopwatch' ? t + 1 : t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, mode]);

  useEffect(() => {
    if (mode !== 'stopwatch' && isActive && time <= 0) {
      setIsActive(false);
      handleTimeComplete();
    }
  }, [time, isActive, mode]);

  const handleTimeComplete = async () => {
    if (timerState === 'work') {
      setIsSaving(true);
      const durationMins = mode === 'custom' ? customWork : MODES[mode].work;
      try {
        await saveSession({ mode, durationMinutes: durationMins });
      } catch (error) {
        console.error("Failed to save session", error);
      } finally {
        setIsSaving(false);
        setTimerState('break');
        setTime((mode === 'custom' ? customBreak : MODES[mode].break) * 60);
        setIsActive(true); // Auto start break
      }
    } else {
      setTimerState('work');
      setTime((mode === 'custom' ? customWork : MODES[mode].work) * 60);
      setIsActive(false);
    }
  };

  const skipBreak = () => {
    setTimerState('work');
    setTime((mode === 'custom' ? customWork : MODES[mode].work) * 60);
    setIsActive(false);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTime(getTargetDuration());
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimerState('work');
    setIsActive(false);
    setLaps([]);
    setShowCustomSettings(newMode === 'custom');
    
    if (newMode === 'stopwatch') setTime(0);
    else setTime((newMode === 'custom' ? customWork : MODES[newMode].work) * 60);
  };

  const applyCustomSettings = () => {
    setTime(customWork * 60);
    setShowCustomSettings(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const targetDuration = getTargetDuration();
  const progress = mode === 'stopwatch' 
    ? 0 // Stopwatch ring doesn't deplete, maybe loops or stays full
    : ((targetDuration - time) / targetDuration) * 100;
    
  const strokeDashoffset = mode === 'stopwatch' 
    ? CIRCLE_CIRCUMFERENCE - ( (time % 60) / 60 ) * CIRCLE_CIRCUMFERENCE // stopwatch sweeps every 60s
    : CIRCLE_CIRCUMFERENCE - (progress / 100) * CIRCLE_CIRCUMFERENCE;

  const messages = ["Keep going.", "Great focus session.", "You are building your future.", "Stay immersed."];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-luxury-purple text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Clock className="w-6 h-6" />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <motion.div
        drag
        dragMomentum={false}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-[60] glass-card px-4 py-3 flex items-center gap-4 border border-luxury-purple/30 cursor-pointer active:cursor-grabbing"
        onDoubleClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center gap-2">
          {isActive ? <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> : <Square className="w-3 h-3 text-text-muted" />}
          <span className="font-mono font-bold text-text-main text-lg">{formatTime(time)}</span>
        </div>
        <div className="text-xs text-text-muted uppercase tracking-wider">{mode === 'stopwatch' ? 'Stopwatch' : timerState}</div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        drag={!isFullScreen}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`fixed z-[60] transition-opacity duration-300 ${
          isFullScreen ? 'inset-0 bg-luxury-bg/95 backdrop-blur-3xl flex flex-col items-center justify-center' : 'bottom-24 right-6 w-[420px] glass-card p-6 shadow-2xl border-text-main/10 active:cursor-grabbing cursor-grab'
        }`}
      >
        <div className="flex justify-between items-center w-full mb-6 cursor-default">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
            <GripHorizontal className="w-4 h-4 text-luxury-purple cursor-grab active:cursor-grabbing" /> {isFullScreen ? 'Focus Mode' : 'Study Timer'}
          </h3>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsFullScreen(!isFullScreen)} className="text-text-muted hover:text-text-main transition-colors">
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            {!isFullScreen && (
              <button onClick={() => setIsMinimized(true)} className="text-text-muted hover:text-text-main transition-colors">
                <div className="w-4 h-0.5 bg-current"></div>
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-red-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={`flex flex-wrap gap-2 mb-6 bg-text-main/5 p-1 rounded-lg w-full ${isFullScreen ? 'max-w-md' : ''} cursor-default`}>
          {Object.keys(MODES).map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m as TimerMode)}
              className={`flex-1 min-w-[70px] py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === m ? 'bg-luxury-purple text-white shadow-lg' : 'text-text-muted hover:text-text-main'
              }`}
            >
              {MODES[m as keyof typeof MODES].label}
            </button>
          ))}
        </div>

        {showCustomSettings && (
          <div className="flex gap-4 mb-6 w-full cursor-default">
            <div className="flex-1">
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1 block">Work (min)</label>
              <input type="number" value={customWork} onChange={e => setCustomWork(Number(e.target.value))} className="w-full bg-text-main/5 border border-text-main/10 rounded-md px-3 py-1.5 text-text-main focus:outline-none focus:border-luxury-purple" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1 block">Break (min)</label>
              <input type="number" value={customBreak} onChange={e => setCustomBreak(Number(e.target.value))} className="w-full bg-text-main/5 border border-text-main/10 rounded-md px-3 py-1.5 text-text-main focus:outline-none focus:border-luxury-purple" />
            </div>
            <div className="flex items-end">
              <button onClick={applyCustomSettings} className="bg-luxury-purple text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-luxury-purple/80 transition-colors">Apply</button>
            </div>
          </div>
        )}

        {/* Circular Timer UI */}
        <div className={`relative flex items-center justify-center mb-8 cursor-default ${isFullScreen ? 'scale-150 my-16' : ''}`}>
          <svg className="transform -rotate-90" width="260" height="260">
            <circle
              cx="130"
              cy="130"
              r={CIRCLE_RADIUS}
              className="stroke-text-main/5"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="130"
              cy="130"
              r={CIRCLE_RADIUS}
              className={`transition-all duration-1000 ease-linear ${mode === 'stopwatch' ? 'stroke-blue-500' : timerState === 'work' ? 'stroke-luxury-purple' : 'stroke-green-500'}`}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-text-muted mb-2">
              {mode === 'stopwatch' ? 'Stopwatch' : timerState === 'work' ? 'Focus' : 'Break'}
            </div>
            <div className="text-5xl font-mono font-bold text-text-main tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {formatTime(time)}
            </div>
            {isSaving && <div className="text-[10px] text-luxury-purple mt-2 animate-pulse absolute -bottom-6">Saving...</div>}
          </div>
        </div>

        {timerState === 'work' && isActive && isFullScreen && mode !== 'stopwatch' && (
          <div className="text-text-muted text-lg font-light tracking-wide animate-pulse mb-8 cursor-default">
            {randomMessage}
          </div>
        )}

        <div className="flex items-center justify-center gap-6 w-full cursor-default">
          {timerState === 'break' && mode !== 'stopwatch' && (
            <button onClick={skipBreak} className="text-xs text-text-muted hover:text-text-main flex items-center gap-1 uppercase tracking-wider">
              <SkipForward className="w-3 h-3" /> Skip
            </button>
          )}

          {mode === 'stopwatch' && isActive && (
            <button onClick={recordLap} className="text-xs text-text-muted hover:text-text-main flex items-center gap-1 uppercase tracking-wider">
              <Flag className="w-3 h-3" /> Lap
            </button>
          )}
          
          <button
            onClick={resetTimer}
            disabled={isSaving}
            className="w-12 h-12 rounded-full bg-text-main/5 text-text-muted hover:bg-text-main/10 hover:text-text-main flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            <Square className="w-4 h-4" />
          </button>
          
          <button
            onClick={toggleTimer}
            disabled={isSaving}
            className={`w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg ${
              mode === 'stopwatch' ? 'bg-blue-500 text-white shadow-blue-500/20' :
              timerState === 'work' ? 'bg-luxury-purple text-white hover:bg-luxury-purple/90 shadow-luxury-purple/20' : 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/20'
            }`}
          >
            {isActive ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
          </button>
        </div>

        {/* Laps Panel for Stopwatch */}
        {mode === 'stopwatch' && laps.length > 0 && !isFullScreen && (
          <div className="mt-6 pt-4 border-t border-text-main/10 w-full max-h-[120px] overflow-y-auto scrollbar-hide cursor-default">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Laps</h4>
            {laps.slice().reverse().map((lapTime, i) => (
              <div key={i} className="flex justify-between items-center py-1 text-sm text-text-main border-b border-text-main/5 last:border-0">
                <span className="text-text-muted">Lap {laps.length - i}</span>
                <span className="font-mono">{formatTime(lapTime)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stats & Settings Panel */}
        {!isFullScreen && mode !== 'stopwatch' && (
          <div className="mt-8 pt-6 border-t border-text-main/10 w-full cursor-default">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Today's Focus</div>
                <div className="text-lg font-semibold text-text-main flex items-center gap-2">
                  <Flame className="w-4 h-4 text-luxury-gold" />
                  {studyStats?.dailyTime || 0}m
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Total Sessions</div>
                <div className="text-lg font-semibold text-text-main">
                  {studyStats?.sessionsCount || 0}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
