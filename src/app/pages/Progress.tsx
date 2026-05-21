import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BottomNav } from '../components/BottomNav';
import { TopNav } from '../components/TopNav';
import { Plus, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { id: 'w1', date: 'Week 1', weight: 75 },
  { id: 'w2', date: 'Week 2', weight: 74.5 },
  { id: 'w3', date: 'Week 3', weight: 74 },
  { id: 'w4', date: 'Week 4', weight: 73.5 },
];

const tabs = ['Weight', 'Measurements', 'Photos', 'Strength'];

export function Progress() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Weight');

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav
        title="Progress"
        rightElement={
          <button
            onClick={() => navigate('/progress/add')}
            className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-6 py-6 max-w-md mx-auto space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-5 py-2.5 rounded-2xl whitespace-nowrap font-semibold transition-all text-[15px]
                ${activeTab === tab ? 'bg-gradient-to-r from-primary to-orange-600 text-white shadow-md shadow-primary/20' : 'bg-card border border-border text-foreground hover:border-primary/50'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Weight Tab */}
        {activeTab === 'Weight' && (
          <>
            {/* Stats Card */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-[17px] tracking-tight">Weight Progress</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">Current</div>
                  <div className="text-2xl font-bold tracking-tight">73.5 kg</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">Start</div>
                  <div className="text-2xl font-bold tracking-tight">75 kg</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">Change</div>
                  <div className="text-2xl font-bold text-primary tracking-tight">-1.5 kg</div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold mb-5 text-[17px] tracking-tight">Last 4 Weeks</h3>
              <ResponsiveContainer width="100%" height={200} key="weight-chart">
                <LineChart data={mockData} key="weight-line-chart">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} />
                  <XAxis
                    dataKey="date"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    domain={['dataMin - 1', 'dataMax + 1']}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '16px',
                      padding: '8px 12px',
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                    itemStyle={{ color: '#FF751F' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#FF751F"
                    strokeWidth={3}
                    dot={{ fill: '#FF751F', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'Measurements' && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-[15px]">No measurements recorded yet</p>
          </div>
        )}

        {activeTab === 'Photos' && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-[15px]">No progress photos yet</p>
          </div>
        )}

        {activeTab === 'Strength' && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-[15px]">No strength records yet</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}