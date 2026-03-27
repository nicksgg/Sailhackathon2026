import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Info, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function AffordabilityCalculator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    monthlyIncome: 12000,
    cashAvailable: 300000,
    cpfBalance: 200000,
    loanTenure: 25,
    interestRate: 4.0,
    existingLoans: 0,
  });
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState({
    maxBudget: 0,
    affordableUnits: 0,
    monthlyInstalment: 0,
    downPaymentCash: 0,
    downPaymentCPF: 0,
    tdsr: 0,
    stressTestMonthly: 0,
    bsd: 0,
  });

  const handleCalculate = () => {
    // Singapore property calculations
    const monthlyIncome = formData.monthlyIncome;
    const tdsr = formData.existingLoans === 0 ? 0.55 : 0.45; // TDSR limit
    const maxMonthlyPayment = monthlyIncome * tdsr;
    
    // Loan calculation
    const monthlyRate = formData.interestRate / 100 / 12;
    const numPayments = formData.loanTenure * 12;
    const maxLoanAmount = maxMonthlyPayment * ((1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate);
    
    // Budget calculation (assuming 75% LTV)
    const maxBudget = maxLoanAmount / 0.75;
    const downPayment = maxBudget * 0.25;
    const downPaymentCash = Math.min(maxBudget * 0.05, formData.cashAvailable); // Min 5% cash
    const downPaymentCPF = Math.min(downPayment - downPaymentCash, formData.cpfBalance);
    
    // BSD calculation (simplified)
    let bsd = 0;
    if (maxBudget <= 180000) bsd = maxBudget * 0.01;
    else if (maxBudget <= 360000) bsd = 1800 + (maxBudget - 180000) * 0.02;
    else if (maxBudget <= 1000000) bsd = 5400 + (maxBudget - 360000) * 0.03;
    else if (maxBudget <= 1500000) bsd = 24600 + (maxBudget - 1000000) * 0.04;
    else bsd = 44600 + (maxBudget - 1500000) * 0.05;
    
    // Stress test at +1%
    const stressRate = (formData.interestRate + 1) / 100 / 12;
    const stressTestMonthly = maxLoanAmount * (stressRate * Math.pow(1 + stressRate, numPayments)) / (Math.pow(1 + stressRate, numPayments) - 1);
    
    // Count affordable units
    const affordableUnits = 120; // Mock count
    
    setResults({
      maxBudget: Math.round(maxBudget),
      affordableUnits,
      monthlyInstalment: Math.round(maxMonthlyPayment),
      downPaymentCash: Math.round(downPaymentCash),
      downPaymentCPF: Math.round(downPaymentCPF),
      tdsr: Math.round((maxMonthlyPayment / monthlyIncome) * 100),
      stressTestMonthly: Math.round(stressTestMonthly),
      bsd: Math.round(bsd),
    });
    
    setCalculated(true);
  };

  const formatCurrency = (amount: number) => `$${(amount / 1000).toFixed(0)}k`;
  const formatLargeCurrency = (amount: number) => `$${(amount / 1000000).toFixed(2)}M`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold ml-2">Affordability Calculator</h1>
        <button className="p-2 ml-auto -mr-2">
          <Info className="w-5 h-5 text-gray-500" />
        </button>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Financial Profile Section */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">Your Financial Profile</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="income">Household Monthly Income</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="income"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                  className="pl-7"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cash">Cash Available for Property</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="cash"
                  type="number"
                  value={formData.cashAvailable}
                  onChange={(e) => setFormData({ ...formData, cashAvailable: Number(e.target.value) })}
                  className="pl-7"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cpf">CPF Ordinary Account Balance</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="cpf"
                  type="number"
                  value={formData.cpfBalance}
                  onChange={(e) => setFormData({ ...formData, cpfBalance: Number(e.target.value) })}
                  className="pl-7"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Loan Tenure</Label>
                <span className="text-sm font-medium text-gray-900">{formData.loanTenure} years</span>
              </div>
              <Slider
                value={[formData.loanTenure]}
                onValueChange={([value]) => setFormData({ ...formData, loanTenure: value })}
                min={5}
                max={30}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Interest Rate</Label>
                <span className="text-sm font-medium text-gray-900">{formData.interestRate.toFixed(1)}% p.a.</span>
              </div>
              <Slider
                value={[formData.interestRate]}
                onValueChange={([value]) => setFormData({ ...formData, interestRate: value })}
                min={2.5}
                max={5.5}
                step={0.1}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="loans">Number of Existing Property Loans</Label>
              <Select
                value={formData.existingLoans.toString()}
                onValueChange={(value) => setFormData({ ...formData, existingLoans: Number(value) })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full mt-6 h-12 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl font-semibold"
          >
            Calculate
          </Button>
        </div>

        {/* Results Section */}
        {calculated && (
          <>
            <div className="bg-gradient-to-br from-[#01696F] to-[#0C4E54] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <p className="text-sm font-medium opacity-90">Estimated Max Budget</p>
              </div>
              <p className="text-4xl font-bold mb-2">{formatLargeCurrency(results.maxBudget)}</p>
              <p className="text-sm opacity-90">
                ▲ You can afford {results.affordableUnits} of 600 available units
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Monthly Instalment</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.monthlyInstalment)}/mo</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Down Payment</p>
                <p className="text-sm font-bold text-gray-900">Cash: {formatCurrency(results.downPaymentCash)}</p>
                <p className="text-sm font-bold text-gray-900">CPF: {formatCurrency(results.downPaymentCPF)}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Total Debt Servicing</p>
                <p className="text-xl font-bold text-gray-900">{results.tdsr}%</p>
                <p className="text-xs text-gray-500">(Limit: 55%)</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Stress Test at +1%</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(results.stressTestMonthly)}/mo</p>
                <p className="text-xs text-green-600">Still OK ✓</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Additional Costs Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Buyer Stamp Duty (BSD):</span>
                  <span className="font-medium text-gray-900">{formatCurrency(results.bsd)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Additional BSD (if applicable):</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Legal fees (est.):</span>
                  <span className="font-medium text-gray-900">$3k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valuation fee:</span>
                  <span className="font-medium text-gray-900">$500</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-[#01696F] text-[#01696F]">
                Save as Scenario
              </Button>
              <Button variant="outline" className="flex-1 border-[#01696F] text-[#01696F]">
                Send to Consultant
              </Button>
            </div>

            <button
              onClick={() => navigate('/discover')}
              className="w-full text-center text-sm font-medium text-[#01696F]"
            >
              View units within my budget →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
