import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { X, ChevronLeft, ChevronRight, Check, Timer, Weight, User, Plus, Minus } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import type { SetLog, DropsetEntry } from '../contexts/AppContext';

export function ActiveWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workoutPlan, completeWorkout } = useApp();

  const workout = workoutPlan.find(w => w.id === id);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [setLogs, setSetLogs] = useState<SetLog[]>([]);

  useEffect(() => {
    if (showRestTimer && restTimeLeft > 0) {
      const timer = setTimeout(() => {
        setRestTimeLeft(restTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showRestTimer && restTimeLeft === 0) {
      setShowRestTimer(false);
    }
  }, [showRestTimer, restTimeLeft]);

  useEffect(() => {
    if (workout) {
      initializeSetLogs();
    }
  }, [currentExerciseIndex, workout]);

  const initializeSetLogs = () => {
    if (!workout) return;
    const exercise = workout.exercises[currentExerciseIndex];
    const logs: SetLog[] = Array.from({ length: exercise.sets }, (_, i) => ({
      setNumber: i + 1,
      targetReps: exercise.reps,
      actualReps: undefined,
      weight: exercise.defaultWeight,
      completed: false,
      isDropset: false,
      dropsets: [],
    }));
    setSetLogs(logs);
  };

  if (!workout) {
    navigate('/plan');
    return null;
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const progress = currentExerciseIndex + 1;
  const total = workout.exercises.length;
  const progressPercent = (progress / total) * 100;
  const completedSets = setLogs.filter(s => s.completed).length;

  const updateSetLog = (setIndex: number, updates: Partial<SetLog>) => {
    setSetLogs(prev => prev.map((log, i) =>
      i === setIndex ? { ...log, ...updates } : log
    ));
  };

  const addDropset = (setIndex: number) => {
    setSetLogs(prev => prev.map((log, i) => {
      if (i === setIndex) {
        return {
          ...log,
          dropsets: [...log.dropsets, { weight: log.weight ? log.weight * 0.7 : 0, reps: 0 }]
        };
      }
      return log;
    }));
  };

  const removeDropset = (setIndex: number, dropsetIndex: number) => {
    setSetLogs(prev => prev.map((log, i) => {
      if (i === setIndex) {
        return {
          ...log,
          dropsets: log.dropsets.filter((_, di) => di !== dropsetIndex)
        };
      }
      return log;
    }));
  };

  const updateDropset = (setIndex: number, dropsetIndex: number, updates: Partial<DropsetEntry>) => {
    setSetLogs(prev => prev.map((log, i) => {
      if (i === setIndex) {
        return {
          ...log,
          dropsets: log.dropsets.map((d, di) =>
            di === dropsetIndex ? { ...d, ...updates } : d
          )
        };
      }
      return log;
    }));
  };

  const handleCompleteSet = (setIndex: number) => {
    const set = setLogs[setIndex];
    if (set.actualReps === undefined || set.actualReps === 0) {
      alert('Please enter reps completed');
      return;
    }

    updateSetLog(setIndex, { completed: true });

    // Start rest timer if not the last set
    if (setIndex < currentExercise.sets - 1) {
      setRestTimeLeft(currentExercise.restTime || 60);
      setShowRestTimer(true);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setShowRestTimer(false);
    } else {
      handleFinishWorkout();
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setShowRestTimer(false);
    }
  };

  const handleFinishWorkout = () => {
    completeWorkout(workout.id);
    navigate('/workout-complete');
  };

  const handleExit = () => {
    if (confirm('Are you sure you want to exit? Your progress will not be saved.')) {
      navigate(-1);
    }
  };

  const allSetsCompleted = setLogs.every(s => s.completed);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="bg-card/80 backdrop-blur-xl border-b border-border px-6 py-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleExit}
              className="p-2 hover:bg-muted/50 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <span className="text-sm font-semibold text-muted-foreground">
              Exercise {progress}/{total}
            </span>
          </div>
        </div>
        <div className="max-w-md mx-auto mt-4">
          <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-orange-600 transition-all duration-300 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 max-w-md mx-auto space-y-6">
          {/* Exercise Animation/Image Area */}
          <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl aspect-video flex items-center justify-center relative overflow-hidden border border-border/50">
            <div className="text-center">
              <div className="text-7xl mb-4">💪</div>
              <p className="text-sm text-muted-foreground font-medium">Exercise Demo</p>
            </div>
          </div>

          {/* Exercise Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">{currentExercise.name}</h1>
            {currentExercise.targetMuscles && (
              <p className="text-sm text-primary font-semibold mb-3">{currentExercise.targetMuscles}</p>
            )}
            {currentExercise.instructions && (
              <p className="text-muted-foreground text-[15px] leading-relaxed">{currentExercise.instructions}</p>
            )}
          </div>

          {/* Load Type Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-2xl">
              {currentExercise.loadType === 'bodyweight' ? (
                <User className="w-4 h-4 text-primary" />
              ) : (
                <Weight className="w-4 h-4 text-primary" />
              )}
              <span className="text-sm font-semibold capitalize">{currentExercise.loadType}</span>
            </div>
            {currentExercise.defaultWeight && (
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2.5 rounded-2xl">
                <Weight className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Suggested: {currentExercise.defaultWeight} kg</span>
              </div>
            )}
          </div>

          {/* Set Logging Section */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg tracking-tight">Log Your Sets</h3>

            {setLogs.map((setLog, index) => (
              <div
                key={index}
                className={`bg-card border-2 rounded-3xl overflow-hidden transition-all ${
                  setLog.completed
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-border hover:border-border/70'
                }`}
              >
                <div className="p-5">
                  {/* Set Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                        setLog.completed ? 'bg-primary text-white' : 'bg-muted/50'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Target</div>
                        <div className="text-sm font-bold">{setLog.targetReps} reps</div>
                      </div>
                    </div>
                    {setLog.completed && (
                      <div className="flex items-center gap-2 text-primary">
                        <Check className="w-5 h-5" />
                        <span className="text-sm font-semibold">Done</span>
                      </div>
                    )}
                  </div>

                  {/* Input Fields */}
                  {!setLog.completed && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Reps Input */}
                        <div>
                          <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mb-2">
                            Reps
                          </label>
                          <input
                            type="number"
                            value={setLog.actualReps || ''}
                            onChange={(e) => updateSetLog(index, { actualReps: parseInt(e.target.value) || 0 })}
                            className="w-full bg-background border border-border rounded-2xl px-4 py-3 text-center font-bold text-lg focus:outline-none focus:border-primary transition-colors"
                            placeholder="0"
                          />
                        </div>

                        {/* Weight Input */}
                        {currentExercise.loadType !== 'bodyweight' && (
                          <div>
                            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mb-2">
                              Weight (kg)
                            </label>
                            <input
                              type="number"
                              step="0.5"
                              value={setLog.weight || ''}
                              onChange={(e) => updateSetLog(index, { weight: parseFloat(e.target.value) || 0 })}
                              className="w-full bg-background border border-border rounded-2xl px-4 py-3 text-center font-bold text-lg focus:outline-none focus:border-primary transition-colors"
                              placeholder="0"
                            />
                          </div>
                        )}
                      </div>

                      {/* Dropset Toggle */}
                      <div className="flex items-center justify-between bg-muted/30 rounded-2xl px-4 py-3">
                        <span className="text-sm font-semibold">Dropset</span>
                        <button
                          onClick={() => updateSetLog(index, { isDropset: !setLog.isDropset })}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            setLog.isDropset ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            setLog.isDropset ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      {/* Dropset Entries */}
                      {setLog.isDropset && (
                        <div className="space-y-2 pt-2">
                          {setLog.dropsets.map((dropset, dropIndex) => (
                            <div key={dropIndex} className="bg-background border border-border/50 rounded-2xl p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-semibold text-muted-foreground">Dropset {dropIndex + 1}</span>
                                <button
                                  onClick={() => removeDropset(index, dropIndex)}
                                  className="ml-auto text-muted-foreground hover:text-red-500 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="number"
                                  value={dropset.reps || ''}
                                  onChange={(e) => updateDropset(index, dropIndex, { reps: parseInt(e.target.value) || 0 })}
                                  className="bg-muted/50 border border-border/30 rounded-xl px-3 py-2 text-sm font-semibold text-center focus:outline-none focus:border-primary"
                                  placeholder="Reps"
                                />
                                {currentExercise.loadType !== 'bodyweight' && (
                                  <input
                                    type="number"
                                    step="0.5"
                                    value={dropset.weight || ''}
                                    onChange={(e) => updateDropset(index, dropIndex, { weight: parseFloat(e.target.value) || 0 })}
                                    className="bg-muted/50 border border-border/30 rounded-xl px-3 py-2 text-sm font-semibold text-center focus:outline-none focus:border-primary"
                                    placeholder="kg"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={() => addDropset(index)}
                            className="w-full py-2 text-sm font-semibold text-primary hover:text-orange-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Dropset
                          </button>
                        </div>
                      )}

                      {/* Complete Set Button */}
                      <button
                        onClick={() => handleCompleteSet(index)}
                        className="w-full py-3 bg-primary hover:bg-orange-600 text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Complete Set {index + 1}
                      </button>
                    </div>
                  )}

                  {/* Completed Set Summary */}
                  {setLog.completed && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Reps:</span>
                        <span className="font-bold">{setLog.actualReps}</span>
                      </div>
                      {currentExercise.loadType !== 'bodyweight' && setLog.weight && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Weight:</span>
                          <span className="font-bold">{setLog.weight} kg</span>
                        </div>
                      )}
                      {setLog.isDropset && setLog.dropsets.length > 0 && (
                        <div className="pt-2 border-t border-border/50">
                          <div className="text-xs font-semibold text-muted-foreground mb-2">Dropsets</div>
                          {setLog.dropsets.map((dropset, di) => (
                            <div key={di} className="text-xs flex justify-between py-1">
                              <span className="text-muted-foreground">Drop {di + 1}:</span>
                              <span className="font-semibold">
                                {dropset.reps} reps {currentExercise.loadType !== 'bodyweight' && `× ${dropset.weight} kg`}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className="bg-card border border-border rounded-3xl p-5 text-center">
            <div className="text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wider">Sets Completed</div>
            <div className="text-4xl font-bold mb-1">{completedSets}/{currentExercise.sets}</div>
            <div className="flex justify-center gap-2 mt-4">
              {setLogs.map((log, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    log.completed ? 'bg-primary shadow-md shadow-primary/30' : 'bg-muted/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="space-y-3 pb-6">
            <div className="flex gap-3">
              <button
                onClick={handlePreviousExercise}
                disabled={currentExerciseIndex === 0}
                className="flex-1 py-4 bg-card border-2 border-border rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:border-border/70 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={handleNextExercise}
                disabled={!allSetsCompleted}
                className="flex-1 py-4 bg-card border-2 border-border rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:border-border/70 transition-all"
              >
                {currentExerciseIndex === workout.exercises.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {allSetsCompleted && (
              <PrimaryButton
                fullWidth
                onClick={handleNextExercise}
              >
                {currentExerciseIndex === workout.exercises.length - 1 ? 'Complete Workout' : 'Next Exercise'}
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>

      {/* Rest Timer Modal */}
      {showRestTimer && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-xl flex items-center justify-center z-50 p-6">
          <div className="bg-card border border-border rounded-[2rem] p-10 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Timer className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3 tracking-tight">Rest Time</h2>
            <div className="text-7xl font-bold text-primary mb-6 tracking-tight">
              {restTimeLeft}s
            </div>
            <p className="text-muted-foreground mb-8 text-[15px]">
              Get ready for the next set
            </p>
            <button
              onClick={() => setShowRestTimer(false)}
              className="text-primary font-semibold text-[15px] hover:text-orange-600 transition-colors"
            >
              Skip Rest
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
