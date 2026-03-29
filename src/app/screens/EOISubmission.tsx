import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Upload, Check, FileText, ChevronRight, AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sampleEOI } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

const STATUS_STEPS = ['draft', 'submitted', 'reviewed', 'confirmed'] as const;

export function EOISubmission() {
  const navigate = useNavigate();
  const { shortlist } = useApp();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    nric: '',
    email: '',
    mobile: '+65 ',
    nationality: 'Singapore Citizen',
    firstProperty: true,
    preferredUnits: shortlist.slice(0, 3).map(u => u.unitNumber),
    docs: { nric: false, income: false, funds: false, optionFee: false },
    agreed: false,
  });

  const eoi = sampleEOI;
  const currentStatusIdx = STATUS_STEPS.indexOf(eoi.status);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
          <h1 className="text-base font-semibold">EOI Submitted</h1>
        </header>

        <div className="px-4 py-8 text-center">
          <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-[#10B981]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">EOI Submitted!</h2>
          <p className="text-sm text-gray-500 mb-6">Reference: <span className="font-semibold text-gray-900">EOI-2026-0343</span></p>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 text-left mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">What happens next?</h3>
            <div className="space-y-3">
              {[
                { step: '1', label: 'Review (3 working days)', done: false },
                { step: '2', label: 'Ballot if oversubscribed', done: false },
                { step: '3', label: 'OTP issuance notification', done: false },
                { step: '4', label: 'Sign OTP & pay option fee', done: false },
              ].map(({ step, label, done }) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    done ? 'bg-[#10B981] text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {done ? <Check className="w-3.5 h-3.5" /> : step}
                  </div>
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate('/profile')} className="w-full bg-[#01696F] hover:bg-[#0C4E54] rounded-xl">
              Back to My Profile
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full border-[#01696F] text-[#01696F] rounded-xl">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold ml-2">Expression of Interest</h1>
      </header>

      {/* Existing EOI Status */}
      <div className="bg-white mx-4 mt-4 rounded-2xl border border-blue-100 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-900">Existing EOI</p>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {eoi.status}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3">Ref: {eoi.referenceNumber}</p>
        <div className="flex items-center gap-1">
          {STATUS_STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1 flex-1">
              <div className={`h-1.5 flex-1 rounded-full ${i <= currentStatusIdx ? 'bg-[#01696F]' : 'bg-gray-200'}`} />
              {i === STATUS_STEPS.length - 1 && (
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  i <= currentStatusIdx ? 'bg-[#01696F]' : 'bg-gray-200'
                }`}>
                  {i <= currentStatusIdx && <Check className="w-2.5 h-2.5 text-white" />}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          {STATUS_STEPS.map(s => (
            <span key={s} className="capitalize">{s}</span>
          ))}
        </div>
      </div>

      {/* Progress stepper */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex gap-2">
        {['Personal Info', 'Unit Preference', 'Documents', 'Review'].map((label, i) => (
          <div key={label} className="flex-1 text-center">
            <div className={`h-1.5 rounded-full mb-1 ${i < step ? 'bg-[#01696F]' : i === step - 1 ? 'bg-[#01696F]' : 'bg-gray-200'}`} />
            <p className={`text-[10px] ${i === step - 1 ? 'text-[#01696F] font-semibold' : 'text-gray-400'}`}>{label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200 space-y-4">
              <h2 className="font-semibold text-gray-900 text-sm">Personal Information</h2>
              {[
                { id: 'fullName', label: 'Full Name (as per NRIC/Passport)', placeholder: 'e.g. Tan Wei Ming' },
                { id: 'nric', label: 'NRIC / Passport Number', placeholder: 'S1234567A' },
                { id: 'email', label: 'Email Address', placeholder: 'name@email.com' },
                { id: 'mobile', label: 'Mobile Number', placeholder: '+65 9xxx xxxx' },
              ].map(({ id, label, placeholder }) => (
                <div key={id}>
                  <Label htmlFor={id} className="text-sm">{label}</Label>
                  <Input
                    id={id}
                    className="mt-1.5"
                    placeholder={placeholder}
                    value={(formData as Record<string, unknown>)[id] as string}
                    onChange={e => setFormData(prev => ({ ...prev, [id]: e.target.value }))}
                  />
                </div>
              ))}

              <div className="flex items-center gap-3">
                <Checkbox
                  id="firstProperty"
                  checked={formData.firstProperty}
                  onCheckedChange={v => setFormData(prev => ({ ...prev, firstProperty: !!v }))}
                />
                <Label htmlFor="firstProperty" className="text-sm font-normal">
                  This is my first property purchase
                </Label>
              </div>
            </div>

            <div className="bg-[#F59E0B]/10 rounded-xl p-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-[#92400E] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#92400E]">
                Additional Buyer Stamp Duty (ABSD) may apply for non-citizens or additional properties.
              </p>
            </div>

            <Button onClick={() => setStep(2)} className="w-full bg-[#01696F] hover:bg-[#0C4E54] rounded-xl h-12">
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Unit Preference */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">Preferred Units</h2>
              <p className="text-xs text-gray-500 mb-3">
                Select up to 3 units in order of preference. Ballot applies if oversubscribed.
              </p>

              {formData.preferredUnits.length > 0 ? (
                <div className="space-y-2 mb-3">
                  {formData.preferredUnits.map((unit, i) => (
                    <div key={unit} className="flex items-center gap-3 bg-[#01696F]/5 rounded-xl px-3 py-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#01696F] text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-900 flex-1">{unit}</span>
                      <button
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          preferredUnits: prev.preferredUnits.filter(u => u !== unit)
                        }))}
                        className="text-gray-400 text-xs hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 mb-3">No units selected from shortlist.</p>
              )}

              <Button
                variant="outline"
                onClick={() => navigate('/shortlist')}
                className="w-full border-dashed border-gray-300 text-gray-600 rounded-xl"
              >
                + Add from Shortlist
              </Button>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl">Back</Button>
              <Button onClick={() => setStep(3)} className="flex-1 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl">Continue</Button>
            </div>
          </div>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">Required Documents</h2>
              {[
                { key: 'nric', label: 'NRIC / Passport (front & back)', required: true },
                { key: 'income', label: 'Income Documents (latest 3 months payslip or NOA)', required: true },
                { key: 'funds', label: 'Proof of Funds (bank statement or CPF statement)', required: true },
                { key: 'optionFee', label: 'Option Fee Cheque / PayNow', required: false },
              ].map(({ key, label, required }) => {
                const uploaded = formData.docs[key as keyof typeof formData.docs];
                return (
                  <div key={key} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      uploaded ? 'bg-[#10B981]/10' : 'bg-gray-100'
                    }`}>
                      {uploaded ? (
                        <Check className="w-5 h-5 text-[#10B981]" />
                      ) : (
                        <Upload className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{label}</p>
                      {required && (
                        <p className="text-xs text-gray-400">Required</p>
                      )}
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        docs: { ...prev.docs, [key]: !uploaded }
                      }))}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${
                        uploaded
                          ? 'border-[#10B981] text-[#10B981]'
                          : 'border-[#01696F] text-[#01696F]'
                      }`}
                    >
                      {uploaded ? 'Uploaded ✓' : 'Upload'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-xl">Back</Button>
              <Button onClick={() => setStep(4)} className="flex-1 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl">Continue</Button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">Review & Confirm</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900">{formData.fullName || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">NRIC</span>
                  <span className="font-medium text-gray-900">{formData.nric || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mobile</span>
                  <span className="font-medium text-gray-900">{formData.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Units</span>
                  <span className="font-medium text-gray-900">
                    {formData.preferredUnits.join(', ') || '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Documents</span>
                  <span className="font-medium text-gray-900">
                    {Object.values(formData.docs).filter(Boolean).length} / 4 uploaded
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white rounded-2xl border border-gray-200 p-4">
              <Checkbox
                id="agreed"
                checked={formData.agreed}
                onCheckedChange={v => setFormData(prev => ({ ...prev, agreed: !!v }))}
              />
              <Label htmlFor="agreed" className="text-sm font-normal text-gray-700 leading-relaxed">
                I confirm the above information is accurate and I agree to the Terms & Conditions and Privacy Policy for submitting this Expression of Interest.
              </Label>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1 rounded-xl">Back</Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.agreed}
                className="flex-1 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl disabled:opacity-50"
              >
                <FileText className="w-4 h-4 mr-2" />
                Submit EOI
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
