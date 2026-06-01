import { useState } from 'react';
import { X, Users, CheckCircle, XCircle, Clock, Calendar, Lock } from 'lucide-react';
import { useAdminStore, ADMIN_PASSWORD } from '@/stores/adminStore';

export default function AdminDashboard() {
  const {
    isAdminOpen, isAuthenticated, rsvpEntries,
    weddingDate, setAdminOpen, setAuthenticated, setWeddingDate,
  } = useAdminStore();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [dateSaved, setDateSaved] = useState(false);

  if (!isAdminOpen) return null;

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Wrong password');
    }
  };

  const handleClose = () => {
    setAdminOpen(false);
    setAuthenticated(false);
    setPassword('');
    setError('');
  };

  const handleSaveDate = () => {
    if (!newDate || !newTime) return;
    setWeddingDate(`${newDate}T${newTime}:00+03:00`);
    setDateSaved(true);
    setTimeout(() => setDateSaved(false), 2000);
  };

  // Stats
  const attending = rsvpEntries.filter((e) => e.attending);
  const notAttending = rsvpEntries.filter((e) => !e.attending);
  const totalGuests = attending.reduce((sum, e) => sum + e.guestCount, 0);

  const currentDate = new Date(weddingDate);
  const dateStr = currentDate.toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const timeStr = currentDate.toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl"
        style={{
          background: 'linear-gradient(160deg, #5A000F 0%, #3D000A 100%)',
          border: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
          style={{
            background: 'linear-gradient(160deg, #5A000F 0%, #3D000A 100%)',
            borderBottom: '1px solid rgba(212,175,55,0.2)',
          }}
        >
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-gold" />
            <span className="font-vibes text-gold text-2xl">Admin Dashboard</span>
          </div>
          <button onClick={handleClose} className="text-champagne/60 hover:text-gold transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isAuthenticated ? (
            /* ── Login ── */
            <div className="flex flex-col items-center gap-4 py-8">
              <Lock className="w-12 h-12 text-gold/60" />
              <p className="font-cairo text-champagne/70 text-sm">Enter admin password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Password"
                className="w-full max-w-xs h-12 px-4 rounded-md bg-burgundy-dark/60 border border-gold/25 text-champagne placeholder:text-champagne/30 focus:border-gold focus:outline-none text-center"
              />
              {error && <p className="text-red-400 text-sm font-cairo">{error}</p>}
              <button
                onClick={handleLogin}
                className="h-11 px-8 rounded-md bg-gold text-burgundy-dark font-cairo font-medium text-sm hover:bg-gold-light transition-colors"
              >
                Enter
              </button>
            </div>
          ) : (
            /* ── Dashboard ── */
            <div className="flex flex-col gap-6">

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Users, label: 'Total Responses', value: rsvpEntries.length, color: 'text-gold' },
                  { icon: CheckCircle, label: 'Attending', value: attending.length, color: 'text-green-400' },
                  { icon: XCircle, label: 'Not Attending', value: notAttending.length, color: 'text-red-400' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 p-4 rounded-lg"
                    style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className={`font-amiri text-2xl font-bold ${color}`}>{value}</span>
                    <span className="font-cairo text-champagne/50 text-[10px] text-center">{label}</span>
                  </div>
                ))}
              </div>

              {/* Total guests */}
              <div
                className="flex items-center justify-between px-5 py-3 rounded-lg"
                style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold" />
                  <span className="font-cairo text-champagne/70 text-sm">Total Guests Expected</span>
                </div>
                <span className="font-amiri text-gold text-2xl font-bold">{totalGuests}</span>
              </div>

              {/* Change wedding date */}
              <div
                className="p-5 rounded-lg flex flex-col gap-3"
                style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="font-cairo text-gold text-sm font-medium">Wedding Date & Time</span>
                </div>
                <p className="font-cairo text-champagne/50 text-xs">
                  Current: {dateStr} at {timeStr}
                </p>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="flex-1 h-10 px-3 rounded-md bg-burgundy-dark/60 border border-gold/25 text-champagne text-sm focus:border-gold focus:outline-none"
                  />
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-28 h-10 px-3 rounded-md bg-burgundy-dark/60 border border-gold/25 text-champagne text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleSaveDate}
                  disabled={!newDate || !newTime}
                  className="h-10 px-6 rounded-md bg-gold text-burgundy-dark font-cairo text-sm font-medium disabled:opacity-40 hover:bg-gold-light transition-colors self-start"
                >
                  {dateSaved ? '✓ Saved!' : 'Save Date'}
                </button>
              </div>

              {/* RSVP list */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-gold" />
                  <span className="font-cairo text-gold text-sm font-medium">RSVP Responses</span>
                </div>

                {rsvpEntries.length === 0 ? (
                  <p className="font-cairo text-champagne/40 text-sm text-center py-6">No responses yet</p>
                ) : (
                  rsvpEntries.slice().reverse().map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-start justify-between p-4 rounded-lg gap-3"
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(212,175,55,0.1)' }}
                    >
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="font-cairo text-champagne text-sm font-medium truncate">{entry.name}</span>
                        {entry.notes && (
                          <span className="font-cairo text-champagne/40 text-xs truncate">{entry.notes}</span>
                        )}
                        <span className="font-cairo text-champagne/30 text-[10px]">
                          {new Date(entry.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {entry.attending ? (
                          <>
                            <span className="font-cairo text-green-400 text-xs">Attending</span>
                            <span
                              className="font-cairo text-xs px-2 py-0.5 rounded-full"
                              style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}
                            >
                              {entry.guestCount} guest{entry.guestCount !== 1 ? 's' : ''}
                            </span>
                          </>
                        ) : (
                          <span className="font-cairo text-red-400 text-xs">Not attending</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
