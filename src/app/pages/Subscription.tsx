import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopNav } from '../components/TopNav';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { Check, Crown, CreditCard } from 'lucide-react';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    features: [
      'Limited workout plans',
      'Basic nutrition tracking',
      'Progress photos',
    ],
  },
  {
    id: 'workout',
    name: 'Workout Pro',
    price: '$9.99/month',
    features: [
      'All workout plans',
      'Custom exercise library',
      'Advanced tracking',
      'Video demonstrations',
    ],
  },
  {
    id: 'nutrition',
    name: 'Nutrition Pro',
    price: '$9.99/month',
    features: [
      'Personalized meal plans',
      'Recipe database',
      'Macro tracking',
      'Shopping lists',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$14.99/month',
    features: [
      'All workout plans',
      'Personalized meal plans',
      'Advanced analytics',
      'Priority support',
      '1-on-1 coaching sessions',
      'Ad-free experience',
    ],
    recommended: true,
  },
];

const billingHistory = [
  { date: '2026-03-17', amount: '$14.99', status: 'Paid' },
  { date: '2026-02-17', amount: '$14.99', status: 'Paid' },
  { date: '2026-01-17', amount: '$14.99', status: 'Paid' },
];

export function Subscription() {
  const navigate = useNavigate();
  const [currentPlan] = useState('premium');

  return (
    <div className="min-h-screen bg-background pb-8">
      <TopNav title="Subscription" showBack />

      <div className="px-6 py-6 max-w-md mx-auto space-y-6">
        {/* Current Plan Card */}
        <div className="bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-3xl p-6 text-white shadow-2xl shadow-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm text-white/80 mb-1">Current Plan</div>
              <h2 className="text-2xl font-bold tracking-tight">Premium</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Crown className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-4">$14.99<span className="text-lg text-white/80">/month</span></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2.5 text-sm font-semibold inline-block">
            ✓ Active
          </div>
        </div>

        {/* Available Plans */}
        <div>
          <h3 className="font-bold mb-4 text-[17px] tracking-tight">Available Plans</h3>
          <div className="space-y-4">
            {plans.map((plan) => {
              const isCurrent = currentPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-6 border-2 transition-all shadow-sm ${
                    isCurrent
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card'
                  } ${plan.recommended ? 'ring-2 ring-primary/20' : ''}`}
                >
                  {plan.recommended && (
                    <div className="inline-block bg-gradient-to-r from-primary to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl mb-3">
                      RECOMMENDED
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg tracking-tight mb-1">{plan.name}</h4>
                      <div className="text-2xl font-bold text-primary">{plan.price}</div>
                    </div>
                    {isCurrent && (
                      <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-xs font-bold">
                        ACTIVE
                      </div>
                    )}
                  </div>
                  <ul className="space-y-2 mb-5">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {!isCurrent && (
                    <button className="w-full py-3 bg-card border-2 border-primary text-primary font-semibold rounded-2xl hover:bg-primary/10 transition-colors">
                      Select Plan
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing Management */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-[17px] tracking-tight">Billing</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Payment Method</span>
              <span className="text-sm font-semibold">•••• 4242</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Next Billing Date</span>
              <span className="text-sm font-semibold">May 17, 2026</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-muted-foreground">Renewal</span>
              <span className="text-sm font-semibold">Auto-renew ON</span>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-border/50">
            <SecondaryButton fullWidth onClick={() => {}}>
              Manage Billing
            </SecondaryButton>
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 text-[17px] tracking-tight">Billing History</h3>
          <div className="space-y-3">
            {billingHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div>
                  <div className="text-sm font-semibold">{item.amount}</div>
                  <div className="text-xs text-muted-foreground">{item.date}</div>
                </div>
                <div className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-xl">
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Subscription */}
        <button className="w-full py-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Cancel Subscription
        </button>
      </div>
    </div>
  );
}
